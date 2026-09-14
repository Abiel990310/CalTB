/**
 * Grade a reader's answer in the browser.
 *
 * The authoritative grader is `scripts/grade_answer.py`, which has SymPy and
 * decides equivalence symbolically. SymPy cannot run on a static page, so this
 * is the reader-facing half, and it decides the same question a different way:
 *
 *   **two expressions are the same when they agree numerically everywhere.**
 *
 * Sampling is not a poor substitute for symbolic comparison here — it is the
 * honest one. Two elementary expressions that agree at a dozen irrational
 * points agree, and this accepts `sin(x)**2 + cos(x)**2` for `1` without
 * knowing a single trigonometric identity. What it cannot do is *explain* a
 * rejection the way SymPy can, so the messages stay modest.
 *
 * The two graders must never disagree, and `scripts/verify-browser-grading.ts`
 * enforces that: every case in the fixture and every answer in every problem is
 * run through both, and a single mismatched verdict fails the build. If this
 * file drifts from the Python one, the build says so — which matters, because
 * a reader who is told their correct answer is wrong stops trusting the book.
 */

export type Mode = 'expression' | 'antiderivative';

export interface Verdict {
  readonly correct: boolean;
  readonly detail: string;
}

// ---------------------------------------------------------------------------
// Tokenising
// ---------------------------------------------------------------------------

type Tok =
  | { k: 'num'; v: number }
  | { k: 'name'; v: string }
  | { k: 'op'; v: string }
  | { k: '('; v: '(' }
  | { k: ')'; v: ')' }
  | { k: ','; v: ',' };

const OPS: Record<string, { prec: number; right: boolean }> = {
  '+': { prec: 1, right: false },
  '-': { prec: 1, right: false },
  '*': { prec: 2, right: false },
  '/': { prec: 2, right: false },
  '^': { prec: 4, right: true },
  // Unary minus binds tighter than × but looser than ^, so -x^2 is -(x^2)
  // and (-x)^2 needs its parentheses — the usual convention.
  'u-': { prec: 3, right: true },
  'u+': { prec: 3, right: true },
};

const FUNCTIONS: Record<string, (...a: number[]) => number> = {
  sin: Math.sin,
  cos: Math.cos,
  tan: Math.tan,
  sec: (x) => 1 / Math.cos(x),
  csc: (x) => 1 / Math.sin(x),
  cot: (x) => 1 / Math.tan(x),
  asin: Math.asin,
  acos: Math.acos,
  atan: Math.atan,
  arcsin: Math.asin,
  arccos: Math.acos,
  arctan: Math.atan,
  sinh: Math.sinh,
  cosh: Math.cosh,
  tanh: Math.tanh,
  exp: Math.exp,
  // `log` is the natural logarithm, matching SymPy and matching the reference
  // answers in the book. A reader who means log base ten should write log10.
  log: Math.log,
  ln: Math.log,
  log10: Math.log10,
  log2: Math.log2,
  sqrt: Math.sqrt,
  cbrt: Math.cbrt,
  abs: Math.abs,
};

const CONSTANTS: Record<string, number> = {
  pi: Math.PI,
  e: Math.E,
  oo: Infinity,
  inf: Infinity,
  infinity: Infinity,
};

class ParseError extends Error {}

function tokenise(src: string): Tok[] {
  const out: Tok[] = [];
  let i = 0;

  // Normalise what readers actually type or paste: unicode operators, the
  // exponent spelling `**`, and multiplication dots.
  const text = src
    .replace(/\*\*/g, '^')
    .replace(/[−–—]/g, '-')
    .replace(/[×·⋅]/g, '*')
    .replace(/[÷]/g, '/')
    .replace(/[∞]/g, 'oo')
    .replace(/[πΠ]/g, 'pi')
    .replace(/√/g, 'sqrt')
    .replace(/[[{]/g, '(')
    .replace(/[\]}]/g, ')');

  while (i < text.length) {
    const c = text[i];

    if (/\s/.test(c)) { i++; continue; }

    if (/[0-9.]/.test(c)) {
      const m = /^(?:\d+\.?\d*|\.\d+)(?:[eE][+-]?\d+)?/.exec(text.slice(i));
      if (!m) throw new ParseError(`bad number at "${text.slice(i, i + 8)}"`);
      out.push({ k: 'num', v: Number(m[0]) });
      i += m[0].length;
      continue;
    }

    if (/[A-Za-z_]/.test(c)) {
      const m = /^[A-Za-z_]\w*/.exec(text.slice(i))!;
      out.push({ k: 'name', v: m[0] });
      i += m[0].length;
      continue;
    }

    if (c === '(') { out.push({ k: '(', v: '(' }); i++; continue; }
    if (c === ')') { out.push({ k: ')', v: ')' }); i++; continue; }
    if (c === ',') { out.push({ k: ',', v: ',' }); i++; continue; }

    if ('+-*/^'.includes(c)) { out.push({ k: 'op', v: c }); i++; continue; }

    throw new ParseError(`I do not understand the character "${c}"`);
  }

  return out;
}

/**
 * Insert the multiplications readers leave out.
 *
 * `2x`, `3sin(x)`, `(x+1)(x-1)` and `2pi` all mean a product, and a grader that
 * rejects them is testing typing rather than calculus. A name directly followed
 * by `(` is left alone — that is function application, not multiplication.
 */
function addImplicitProducts(toks: Tok[]): Tok[] {
  const out: Tok[] = [];
  for (let i = 0; i < toks.length; i++) {
    const cur = toks[i];
    const next = toks[i + 1];
    out.push(cur);
    if (!next) continue;

    const curEnds = cur.k === 'num' || cur.k === ')' ||
      (cur.k === 'name' && !FUNCTIONS[cur.v]);
    const nextStarts = next.k === 'num' || next.k === 'name' || next.k === '(';

    // `x(` after a non-function name is a product; `sin(` is a call.
    if (curEnds && nextStarts) out.push({ k: 'op', v: '*' });
  }
  return out;
}

// ---------------------------------------------------------------------------
// Parsing to RPN, then evaluating
// ---------------------------------------------------------------------------

type Node =
  | { t: 'num'; v: number }
  | { t: 'var'; v: string }
  | { t: 'call'; fn: string; args: Node[] }
  | { t: 'bin'; op: string; l: Node; r: Node }
  | { t: 'un'; op: string; a: Node };

export interface Expr {
  readonly node: Node;
  /** Free variable names, excluding known constants. */
  readonly vars: ReadonlySet<string>;
}

/** Shunting-yard, producing a tree. */
export function parse(src: string): Expr {
  if (!src.trim()) throw new ParseError('nothing to grade — the box is empty');

  const toks = addImplicitProducts(tokenise(src));
  const values: Node[] = [];
  const ops: Array<{ v: string; kind: 'op' | 'fn' | 'paren'; argc?: number }> = [];
  const vars = new Set<string>();
  let expectValue = true;   // distinguishes unary from binary +/-

  const popOp = () => {
    const top = ops.pop();
    if (!top) throw new ParseError('mismatched parentheses');
    if (top.kind === 'fn') {
      const argc = top.argc ?? 1;
      const args = values.splice(values.length - argc, argc);
      if (args.length !== argc) throw new ParseError(`${top.v} is missing an argument`);
      values.push({ t: 'call', fn: top.v, args });
      return;
    }
    if (top.v === 'u-' || top.v === 'u+') {
      const a = values.pop();
      if (!a) throw new ParseError(`nothing for the ${top.v === 'u-' ? 'minus' : 'plus'} to apply to`);
      values.push({ t: 'un', op: top.v, a });
      return;
    }
    const r = values.pop();
    const l = values.pop();
    if (!l || !r) throw new ParseError(`"${top.v}" is missing a side`);
    values.push({ t: 'bin', op: top.v, l, r });
  };

  for (let i = 0; i < toks.length; i++) {
    const tok = toks[i];

    if (tok.k === 'num') {
      values.push({ t: 'num', v: tok.v });
      expectValue = false;
      continue;
    }

    if (tok.k === 'name') {
      const lower = tok.v.toLowerCase();
      if (FUNCTIONS[lower] && toks[i + 1]?.k === '(') {
        ops.push({ v: lower, kind: 'fn', argc: 1 });
        expectValue = true;
        continue;
      }
      if (lower in CONSTANTS) {
        values.push({ t: 'num', v: CONSTANTS[lower] });
        expectValue = false;
        continue;
      }
      if (FUNCTIONS[lower]) {
        throw new ParseError(`${tok.v} needs parentheses, as in ${tok.v}(x)`);
      }
      vars.add(tok.v);
      values.push({ t: 'var', v: tok.v });
      expectValue = false;
      continue;
    }

    if (tok.k === '(') {
      ops.push({ v: '(', kind: 'paren' });
      expectValue = true;
      continue;
    }

    if (tok.k === ')') {
      while (ops.length && ops[ops.length - 1].kind !== 'paren') popOp();
      if (!ops.length) throw new ParseError('a closing parenthesis has no opening one');
      ops.pop();
      // A function sitting under the parenthesis now collapses.
      if (ops.length && ops[ops.length - 1].kind === 'fn') popOp();
      expectValue = false;
      continue;
    }

    if (tok.k === ',') {
      while (ops.length && ops[ops.length - 1].kind !== 'paren') popOp();
      const fn = ops[ops.length - 2];
      if (!fn || fn.kind !== 'fn') throw new ParseError('a comma outside a function call');
      fn.argc = (fn.argc ?? 1) + 1;
      expectValue = true;
      continue;
    }

    // An operator.
    let op = tok.v;
    if (expectValue) {
      if (op === '-') op = 'u-';
      else if (op === '+') op = 'u+';
      else throw new ParseError(`"${op}" needs something on its left`);
    }
    const info = OPS[op];
    while (ops.length) {
      const top = ops[ops.length - 1];
      if (top.kind === 'paren') break;
      const topInfo = top.kind === 'fn' ? { prec: 5, right: false } : OPS[top.v];
      if (topInfo.prec > info.prec || (topInfo.prec === info.prec && !info.right)) popOp();
      else break;
    }
    ops.push({ v: op, kind: 'op' });
    expectValue = true;
  }

  while (ops.length) {
    if (ops[ops.length - 1].kind === 'paren') throw new ParseError('an unclosed parenthesis');
    popOp();
  }

  if (values.length !== 1) {
    throw new ParseError(
      values.length === 0 ? 'nothing to grade' : 'that reads as two expressions side by side',
    );
  }

  return { node: values[0], vars };
}

export function evaluate(expr: Expr, env: Record<string, number>): number {
  const walk = (n: Node): number => {
    switch (n.t) {
      case 'num':
        return n.v;
      case 'var': {
        const v = env[n.v];
        return v === undefined ? NaN : v;
      }
      case 'un':
        return n.op === 'u-' ? -walk(n.a) : walk(n.a);
      case 'call': {
        const fn = FUNCTIONS[n.fn];
        return fn(...n.args.map(walk));
      }
      case 'bin': {
        const l = walk(n.l);
        const r = walk(n.r);
        switch (n.op) {
          case '+': return l + r;
          case '-': return l - r;
          case '*': return l * r;
          case '/': return l / r;
          case '^': return Math.pow(l, r);
          default: return NaN;
        }
      }
    }
  };
  return walk(expr.node);
}

// ---------------------------------------------------------------------------
// Comparing
// ---------------------------------------------------------------------------

/**
 * Where to sample.
 *
 * Deliberately irrational-looking and spread across both signs, because round
 * numbers are exactly where wrong answers accidentally agree: `x**2` and `2*x`
 * are equal at 0 and 2, and a sampler that used those would pass a wrong
 * answer. Negative points are included so that odd and even confusions show up,
 * and points where an expression is undefined are skipped rather than failed.
 */
const SAMPLES = [
  0.317_23, 0.713_41, 1.247_19, 1.831_77, 2.463_91, 3.179_03,
  4.271_13, 5.918_37, -0.521_39, -1.437_11, -2.716_53, -3.918_21,
];

const FINITE_TOL = 1e-7;

function close(a: number, b: number): boolean {
  if (a === b) return true;                                  // catches ±Infinity
  if (!Number.isFinite(a) || !Number.isFinite(b)) return false;
  return Math.abs(a - b) <= FINITE_TOL * Math.max(1, Math.abs(a), Math.abs(b));
}

interface Sampled {
  readonly xs: number[];
  readonly given: number[];
  readonly reference: number[];
}

function sample(given: Expr, reference: Expr, variable: string, mode: Mode): Sampled {
  const xs: number[] = [];
  const g: number[] = [];
  const r: number[] = [];

  // In antiderivative mode the reader may write "+ C". SymPy substitutes that
  // constant away; here it is pinned to zero and the constant-offset test below
  // absorbs whatever difference remains, which comes to the same thing.
  const extra: Record<string, number> = mode === 'antiderivative' ? { C: 0 } : {};

  for (const x of SAMPLES) {
    const env = { ...extra, [variable]: x };
    const gv = evaluate(given, env);
    const rv = evaluate(reference, env);
    // Skip points outside either domain — log of a negative, a division by
    // zero. A point one of them cannot reach proves nothing about the other.
    if (Number.isNaN(gv) || Number.isNaN(rv)) continue;
    if (!Number.isFinite(rv) || !Number.isFinite(gv)) continue;
    xs.push(x);
    g.push(gv);
    r.push(rv);
  }
  return { xs, given: g, reference: r };
}

export function compare(
  given: Expr,
  reference: Expr,
  variable: string,
  mode: Mode,
): Verdict {
  const free = new Set([...given.vars, ...reference.vars]);
  free.delete(variable);
  if (mode === 'antiderivative') free.delete('C');

  if (free.size > 0) {
    const names = [...free].sort().join(', ');
    return { correct: false, detail: `I do not know what ${names} is here` };
  }

  const constantOnly = !given.vars.has(variable) && !reference.vars.has(variable);

  if (constantOnly) {
    const gv = evaluate(given, {});
    const rv = evaluate(reference, {});
    if (Number.isNaN(gv)) return { correct: false, detail: 'that does not evaluate to a number' };
    if (close(gv, rv)) return { correct: true, detail: 'equivalent' };
    return { correct: false, detail: `that comes to ${format(gv)}` };
  }

  const s = sample(given, reference, variable, mode);
  if (s.xs.length < 4) {
    return {
      correct: false,
      detail: 'I could not evaluate that at enough points to check it',
    };
  }

  if (mode === 'antiderivative') {
    // Two antiderivatives of the same function differ by a constant, so the
    // gap must be the *same* at every sample point. This is the numeric form
    // of "differentiate both and compare", and it needs no derivative.
    const gaps = s.given.map((g, i) => g - s.reference[i]);
    const first = gaps[0];
    const scale = Math.max(1, ...s.given.map(Math.abs), ...s.reference.map(Math.abs));
    const spread = Math.max(...gaps.map((d) => Math.abs(d - first)));
    if (spread <= FINITE_TOL * scale) {
      return {
        correct: true,
        detail: Math.abs(first) <= FINITE_TOL * scale
          ? 'equivalent'
          : 'the same antiderivative, up to the constant',
      };
    }
    return {
      correct: false,
      detail: 'that differs from the answer by more than a constant, so it is a different function',
    };
  }

  const bad = s.xs.findIndex((_, i) => !close(s.given[i], s.reference[i]));
  if (bad === -1) return { correct: true, detail: 'equivalent' };
  return {
    correct: false,
    detail: `at ${variable} = ${format(s.xs[bad])} that gives ${format(s.given[bad])}, ` +
            `which is not the value of the answer`,
  };
}

function format(v: number): string {
  if (!Number.isFinite(v)) return v > 0 ? '∞' : '−∞';
  if (Number.isInteger(v)) return String(v);
  return String(Number(v.toPrecision(6)));
}

/** The whole job: read both sides, then compare them. */
export function grade(
  givenText: string,
  referenceText: string,
  mode: Mode = 'expression',
  variable = 'x',
): Verdict {
  let reference: Expr;
  try {
    reference = parse(referenceText);
  } catch (err) {
    // The reference comes from the book, so this is the book's bug, not the
    // reader's. Say so rather than blaming them.
    return { correct: false, detail: `this problem's answer will not parse: ${(err as Error).message}` };
  }

  let given: Expr;
  try {
    given = parse(givenText);
  } catch (err) {
    return { correct: false, detail: (err as Error).message };
  }

  try {
    return compare(given, reference, variable, mode);
  } catch {
    return { correct: false, detail: 'I could not evaluate that' };
  }
}
