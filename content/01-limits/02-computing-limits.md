---
title: "Computing limits"
navTitle: "Computing limits"
summary: >-
  Four techniques, and a rule for choosing between them: substitute, factor,
  rationalise, or recognise a known limit.
objectives:
  - Evaluate a limit by direct substitution and say when that is legal
  - Resolve a 0/0 form by factoring or by rationalising
  - Recognise the standard limits that no algebra will produce
  - Choose the right technique from the shape of the expression
scope: ab
status: complete
standard: none
---

Chapter 1.1 said what a limit *is*. This one is about getting the number.

There are only four moves, and the shape of the expression tells you which to
reach for. Start by substituting — not because it always works, but because what
it produces tells you what to do next.

## Move 1: substitute

If $f$ is built from polynomials, roots, exponentials, sines and cosines by the
usual arithmetic, and the substitution produces an ordinary number, then that
number **is** the limit.

$$\lim_{x \to 3} \left(x^2 - 4x + 1\right) = 9 - 12 + 1 = -2$$

```math verify
lim x->3 (x**2 - 4*x + 1) = -2
lim x->0 cos(x) = 1
lim x->2 sqrt(x + 7) = 3
```

This is not laziness; it is a theorem. Those functions are **continuous** on
their domains, and continuity is precisely the statement that the limit equals
the value. Chapter 1.3 makes that formal.

Substitution can produce three kinds of result, and each is an instruction:

| What you get | What it means |
|---|---|
| An ordinary number | That is the answer. Stop. |
| $\tfrac{\text{nonzero}}{0}$ | The limit does not exist; check the signs for $\pm\infty$ |
| $\tfrac{0}{0}$ | **Indeterminate.** Do more work — moves 2, 3 or 4 |

:::pitfall
$\tfrac{0}{0}$ is not an answer and not zero and not one. It is the algebra
telling you it has no opinion, because *some* functions of that shape approach
$2$, others approach $0$, and others have no limit at all. The form tells you
nothing; only further work does.
:::

## Move 2: factor and cancel

When substitution gives $\tfrac{0}{0}$ in a rational function, the numerator and
denominator share a factor of $(x - a)$. Find it, cancel it, substitute again.

$$\lim_{x \to 3}\frac{x^2 - 9}{x - 3}
  = \lim_{x \to 3}\frac{(x-3)(x+3)}{x - 3}
  = \lim_{x \to 3}(x + 3) = 6$$

```math verify
(x**2 - 9)/(x - 3) = x + 3
lim x->3 (x**2 - 9)/(x - 3) = 6
lim x->-1 (x**2 + 3*x + 2)/(x + 1) = 1
lim x->0 (x**3 - x)/x = -1
```

The cancellation is legal for the reason chapter 1.1 gave: the two expressions
agree everywhere except at $x = a$, and the limit never looks at $x = a$.

**Why the shared factor must be there.** If substituting $a$ makes the numerator
zero, then $a$ is a root of it, and a polynomial with root $a$ has $(x - a)$ as a
factor. Same for the denominator. So the $\tfrac{0}{0}$ form *guarantees* the
cancellation exists — you are never searching blindly.

## Move 3: rationalise

A root in the expression blocks factoring. Multiply by the conjugate instead,
which converts a difference of roots into a difference of squares.

$$\lim_{x \to 0}\frac{\sqrt{1+x} - 1}{x}
 = \lim_{x \to 0}\frac{\sqrt{1+x} - 1}{x}\cdot\frac{\sqrt{1+x} + 1}{\sqrt{1+x} + 1}
 = \lim_{x \to 0}\frac{x}{x\left(\sqrt{1+x} + 1\right)}
 = \frac{1}{2}$$

```math verify
lim x->0 (sqrt(1 + x) - 1)/x = 1/2
lim x->4 (sqrt(x) - 2)/(x - 4) = 1/4
lim x->0 (sqrt(9 + x) - 3)/x = 1/6
```

The middle step is the whole trick: $(\sqrt{1+x}-1)(\sqrt{1+x}+1) = (1+x) - 1 = x$,
and that $x$ cancels the one downstairs. The conjugate does for roots exactly
what factoring does for polynomials — it produces the shared factor that the
$\tfrac{0}{0}$ form promised.

## Move 4: recognise

Some limits yield to no algebra at all. These are worth memorising, because the
exam expects them and no manipulation produces them:

$$\lim_{x \to 0}\frac{\sin x}{x} = 1
\qquad
\lim_{x \to 0}\frac{1 - \cos x}{x} = 0
\qquad
\lim_{x \to 0}\frac{e^x - 1}{x} = 1$$

```math verify
lim x->0 sin(x)/x = 1
lim x->0 (1 - cos(x))/x = 0
lim x->0 (exp(x) - 1)/x = 1
lim x->0 (1 - cos(x))/x**2 = 1/2
lim x->0 tan(x)/x = 1
```

Note the fourth: $\tfrac{1-\cos x}{x} \to 0$ but $\tfrac{1-\cos x}{x^2} \to \tfrac{1}{2}$.
The numerator vanishes like $x^2$, not like $x$ — so which denominator you divide
by changes the answer entirely. Students who memorise only the first of those get
the second wrong every time.

These three are the derivatives of $\sin$, $\cos$ and $e^x$ at zero, which is why
they turn up everywhere in chapter 2.

## Composing them

Most real limits need two moves. $\dfrac{\sin 5x}{x}$ is not a standard limit,
but it becomes one after a rearrangement:

$$\frac{\sin 5x}{x} = 5 \cdot \frac{\sin 5x}{5x}$$

and as $x \to 0$ the inner argument $5x \to 0$ too, so the fraction tends to $1$
and the whole thing to $5$.

```math verify
lim x->0 sin(5*x)/x = 5
lim x->0 sin(3*x)/sin(7*x) = 3/7
lim x->0 (exp(2*x) - 1)/x = 2
```

The pattern: **make the argument and the denominator match**, then the standard
limit applies and the constant comes out front.

:::quiz
{
  "question": "Substituting into lim(x→2) (x² − x − 2)/(x² − 4) gives 0/0. What does that tell you?",
  "options": [
    {
      "text": "That both numerator and denominator have a factor of (x − 2), so cancelling will resolve it",
      "correct": true,
      "why": "Right, and it is a guarantee rather than a hope: substituting 2 makes each polynomial zero, so 2 is a root of each, so (x − 2) divides each. Cancelling gives (x+1)/(x+2) → 3/4."
    },
    {
      "text": "That the limit is 0, since the numerator approaches 0",
      "correct": false,
      "why": "The denominator approaches 0 too, and that competition is exactly what makes the form indeterminate. Here the answer is 3/4 — neither 0 nor 1 nor undefined."
    },
    {
      "text": "That the limit does not exist",
      "correct": false,
      "why": "0/0 says the algebra has no opinion yet, not that there is no answer. Non-existence looks like disagreeing one-sided limits or unbounded growth, neither of which this has."
    },
    {
      "text": "That you must rationalise, because factoring only works when there are no squares",
      "correct": false,
      "why": "Rationalising is for expressions containing roots. This is a ratio of polynomials, so factoring is the tool; squares are no obstacle to it."
    }
  ]
}
:::

## Practice

:::exercise limits-by-hand

:::recap
- Substitute first. The result is either the answer, a non-existence, or
  $\tfrac{0}{0}$ telling you to work harder.
- $\tfrac{0}{0}$ in a rational function guarantees a shared factor of $(x-a)$.
  Cancel it and substitute again.
- A root blocks factoring; multiplying by the conjugate produces the shared
  factor instead.
- Three standard limits — $\tfrac{\sin x}{x}$, $\tfrac{1-\cos x}{x}$,
  $\tfrac{e^x-1}{x}$ — cannot be reached by algebra and must be recognised.
- $\tfrac{1-\cos x}{x} \to 0$ but $\tfrac{1-\cos x}{x^2} \to \tfrac12$: the
  denominator's power matters.
- Match the argument to the denominator and the constant falls out front.
:::
