# How to write a chapter

This guide will grow into the full one once the site engine is ported. For now
it covers the piece that already exists and that everything else depends on:
**how a claim in this book is proved.**

## The rule

The compiled books in this family have a compiler to lean on — a claim is true
because the program runs. Here the machine is SymPy, and the rule is the same:

> If a mathematical claim cannot be checked by a program, either write it in a
> form that can be checked, or delete it.

## Writing a claim

Put claims in a fenced block. They read roughly as they would on the page:

````markdown
```math verify
d/dx x**3 = 3*x**2
int x*exp(x) dx = exp(x)*(x - 1) + C
lim x->0 sin(x)/x = 1
sum n=0..oo 1/2**n = 2
sin(x)**2 + cos(x)**2 = 1
```
````

Five forms, recognised by how the left side starts:

| Form | Written as | Checked by |
|---|---|---|
| Derivative | `d/dx <expr> = <claim>` | differentiating and comparing |
| Integral | `int <expr> dx = <claim>` | differentiating your answer back |
| Limit | `lim x-><point> <expr> = <claim>` | evaluating the limit |
| Series | `sum n=<lo>..<hi> <expr> = <claim>` | summing symbolically |
| Identity | `<expr> = <expr>` | simplifying the difference |

Anything else is an identity. `#` starts a comment. Expressions are Python/SymPy
syntax: `**` for powers, `exp`, `log`, `sqrt`, `oo` for infinity, `pi`, `e`.

**Integrals handle `+ C` for you.** The checker differentiates whatever you
claimed and compares against the integrand, so any correct antiderivative
passes — `x**2`, `x**2 + C` and `x**2 + 17` are all accepted for `int 2*x dx`.
That is not leniency; it is the definition.

## The three verdicts, and why the third exists

```
ok        proved true
wrong     proved false — with the point where the two sides differ
unproved  SymPy could not decide
```

`unproved` is the important one. `simplify(a - b)` failing to reach zero means
either "these differ" or "I could not show they are the same", and those are
very different facts. A checker that treated the second as the first would
reject true mathematics; one that treated it as success would pass false
mathematics. So it says which happened, and **`unproved` fails the build** —
not because the claim is wrong, but because this book does not assert things no
program could check.

When you hit one, you have two honest options: rewrite the claim into a form
that checks (often by stating the domain, since many identities are only true on
part of the line), or cut it.

`asin(x) + acos(x) = pi/2` is the worked example in the self-test fixture: true
on [−1, 1], and SymPy will not prove it. `atan(x) + atan(1/x) = pi/2` looks
similar and is *genuinely* not an identity — it is −pi/2 for negative x — so
refusing to prove it is the right answer. Telling those two apart is the
author's job, and the verifier is honest about not doing it for you.

## Running it

```bash
npm run setup            # installs SymPy, once
npm run verify           # self-test, then every claim in content/
npm run verify:math      # just the claims
npm run verify:selftest  # just the checker's own test
```

## The checker has its own test

`scripts/fixtures/selftest.md` holds claims with known verdicts, and
`verify:selftest` asserts each one comes back as expected. It runs *before*
`verify:math`, because the failure worth guarding against is the quiet one: a
change that stops the checker noticing false claims would otherwise look
exactly like a green build.

If you change `scripts/check_math.py`, the self-test is what tells you whether
you broke it. Add a case to the fixture whenever you teach it something new.
