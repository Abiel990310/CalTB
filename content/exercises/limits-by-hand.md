---
id: limits-by-hand
title: "Four limits, four techniques"
difficulty: core
chapter: computing-limits
topics: [limits]
scope: ab
---

Each of these is $\tfrac{0}{0}$ on substitution, and each needs a different
move from chapter 1.2. Give the exact value.

```answer
prompt: lim(x→4) (x² − 16)/(x − 4)
reference: 8
mode: expression
accept:
  - 8.0
  - 16/2
reject:
  - 0
  - 4
  - oo
```

```answer
prompt: lim(x→0) (√(9 + x) − 3)/x
reference: 1/6
mode: expression
accept:
  - 0.16666666667
  - 2/12
reject:
  - 1/3
  - 0
  - 6
```

```answer
prompt: lim(x→0) sin(5x)/(3x)
reference: 5/3
mode: expression
accept:
  - 1.6666666667
  - 10/6
reject:
  - 1
  - 5
  - 3/5
```

```answer
prompt: lim(x→∞) (3x² − x)/(2x² + 7)
reference: 3/2
mode: expression
accept:
  - 1.5
  - 6/4
reject:
  - 0
  - oo
  - 2/3
```

## Notes
The four techniques, one each.

**Factor.** $x^2 - 16 = (x-4)(x+4)$, the $(x-4)$ cancels, and substituting gives
$8$. The $\tfrac00$ form *guaranteed* that shared factor existed.

**Rationalise.** Multiply by $\tfrac{\sqrt{9+x}+3}{\sqrt{9+x}+3}$; the numerator
becomes $x$, which cancels, leaving $\tfrac{1}{\sqrt{9+x}+3} \to \tfrac16$. The
tempting wrong answer is $\tfrac13$ — that is the value of the *denominator*
factor alone, forgetting the other $3$.

**Recognise and match.** $\tfrac{\sin 5x}{3x} = \tfrac53\cdot\tfrac{\sin 5x}{5x}$,
and the fraction tends to $1$. Answering $1$ means the standard limit was
applied without matching the argument to the denominator; answering $\tfrac35$
means the constants went in upside down.

**Divide by the dominant power.** Equal degrees, so the answer is the ratio of
leading coefficients. Answering $0$ or $\infty$ means the degree comparison was
read the wrong way round.
