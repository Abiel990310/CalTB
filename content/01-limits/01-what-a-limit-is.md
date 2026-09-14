---
title: "What a limit is"
navTitle: "What a limit is"
summary: >-
  A limit is not the value of a function. It is where the function is headed,
  which is a different question and often has a different answer.
objectives:
  - State what it means for a limit to exist
  - Distinguish the limit at a point from the value at that point
  - Use one-sided limits to show a limit does not exist
  - Read a limit off a graph and off a table
scope: ab
status: complete
standard: none
---

Almost every idea in this course is a limit wearing a costume. Derivatives are
limits of slopes, integrals are limits of sums, and series are limits of partial
sums. Getting this chapter right pays for itself four times over.

Here is the whole idea in one sentence: **a limit asks where a function is
headed as the input approaches some point, and deliberately refuses to look at
what happens when it arrives.**

That refusal is the useful part, not a technicality.

## The function that cannot answer for itself

Consider

$$f(x) = \frac{x^2 - 1}{x - 1}$$

At $x = 1$ this is $\tfrac{0}{0}$, which is not a number. The function has
nothing to say there. But for every other $x$, the numerator factors and the
fraction cancels:

```math verify
(x**2 - 1)/(x - 1) = x + 1
lim x->1 (x**2 - 1)/(x - 1) = 2
```

So $f$ agrees with $x + 1$ everywhere except at $x = 1$, where $f$ is undefined
and $x + 1$ is $2$. Approach $1$ from either side and $f$ gets arbitrarily close
to $2$. It never *is* $2$.

We write

$$\lim_{x \to 1} f(x) = 2$$

and read it "the limit of $f(x)$ as $x$ approaches $1$ is $2$". The statement is
about the neighbourhood of $1$, not about $1$.

:::note
The first thing to unlearn: $\lim_{x \to a} f(x)$ and $f(a)$ are **different
questions.** They often have the same answer — that is exactly what continuity
means, and it is the subject of chapter 1.3 — but a limit can exist where the
function is undefined, and a function can be defined at a point where the limit
is not.
:::

## From both sides, or not at all

A limit exists only if the function approaches the *same* value from the left
and from the right. Those two are the **one-sided limits**:

$$\lim_{x \to a^-} f(x) \quad \text{from below,} \qquad
  \lim_{x \to a^+} f(x) \quad \text{from above}$$

and the two-sided limit exists exactly when both exist and agree.

The standard counterexample is $\tfrac{|x|}{x}$. For positive $x$ it is $1$;
for negative $x$ it is $-1$. It never settles.

:::graph
{
  "kind": "secant",
  "title": "abs(x)/x — drag the second point across zero and watch the slope refuse to settle",
  "fn": "abs(x)/x",
  "domain": [-2, 2],
  "range": [-2.5, 2.5],
  "at": -0.6,
  "controls": [
    { "name": "h", "label": "h", "min": 0.05, "max": 1.8, "step": 0.01, "value": 1.4 }
  ]
}
:::

The jump at zero is what "no limit" looks like. There is no single value the
function is heading towards, so there is nothing for the limit to be — and
saying "the limit is both $1$ and $-1$" is not an answer, because a limit is a
single number or it does not exist.

:::pitfall
"The limit does not exist" is a complete and correct answer. Students often
treat it as an admission of failure and write something down anyway. It is a
finding, and on an exam it earns the point.
:::

## Three ways a limit fails

Worth knowing by name, because a question that asks *why* a limit fails is
asking which of these it is:

1. **The one-sided limits disagree** — a jump, like $\tfrac{|x|}{x}$ at $0$.
2. **The function grows without bound** — $\tfrac{1}{x^2}$ at $0$. It is heading
   somewhere, but $\infty$ is not a number, so the limit does not exist. Writing
   $\lim = \infty$ describes *how* it fails; it is not a value.
3. **The function oscillates forever** — $\sin\!\left(\tfrac{1}{x}\right)$ at
   $0$ crosses every value between $-1$ and $1$ infinitely often in any
   neighbourhood of zero, so it is never eventually close to anything.

```math verify
lim x->0 1/x**2 = oo
lim x->2 (x**2 - 4)/(x - 2) = 4
lim x->0 (sqrt(1 + x) - 1)/x = 1/2
```

The second and third of those are the shape you will meet most: a fraction that
is $\tfrac{0}{0}$ at the point, rescued by algebra. The third needs multiplying
by the conjugate rather than factoring, which is chapter 1.2's business.

## Reading a limit off a table

When the algebra is not obvious, a table narrows things down. For
$\dfrac{\sqrt{1+x} - 1}{x}$ near zero:

| *x* | value |
|---|---|
| 0.1 | 0.4881 |
| 0.01 | 0.4988 |
| 0.001 | 0.4999 |
| −0.001 | 0.5001 |
| −0.01 | 0.5013 |
| −0.1 | 0.5132 |

Both sides converge on $0.5$, which is what the verified claim above says
exactly — the limit is $\tfrac{1}{2}$.

:::warning
A table suggests; it does not prove. A function can look settled at every
sample you take and still misbehave between them — $\sin\!\left(\tfrac{1}{x}\right)$
evaluated at $x = \tfrac{1}{n\pi}$ gives exactly $0$ every time, which would
convince you the limit is $0$ when in fact there is none. Use a table to form a
guess, then justify it with algebra.
:::

:::quiz
{
  "question": "f(x) = (x² − 1)/(x − 1) is undefined at x = 1, yet the limit as x approaches 1 is 2. What best explains this?",
  "options": [
    {
      "text": "The limit ignores what happens at x = 1 and describes only what happens near it",
      "correct": true,
      "why": "Exactly the definition. f agrees with x + 1 at every x other than 1, and the limit is determined entirely by those other points."
    },
    {
      "text": "The 0/0 cancels, so f(1) is really 2 after simplification",
      "correct": false,
      "why": "The cancellation is valid only where x ≠ 1, because that is the only place you may divide by x − 1. f(1) remains undefined; the simplified expression is a different function that happens to agree everywhere else."
    },
    {
      "text": "The limit is an approximation of f(1), accurate to within a small error",
      "correct": false,
      "why": "It is not an approximation of anything — it is an exact statement about the neighbourhood. f(1) does not exist, so there is nothing to approximate."
    },
    {
      "text": "Limits only exist where a function is undefined",
      "correct": false,
      "why": "Backwards. Most limits are taken where the function is perfectly well defined and equal to the limit — that situation has a name, continuity, and it is the usual case rather than the exception."
    }
  ]
}
:::

:::recap
- A limit describes where a function is headed near a point, and deliberately
  ignores the value at that point.
- lim(x→a) f(x) and f(a) are separate questions. When they agree, the function
  is continuous there.
- The two-sided limit exists only when both one-sided limits exist and are
  equal.
- Three failure modes: a jump, unbounded growth, and endless oscillation.
  "Does not exist" is a complete answer.
- A table forms a guess; algebra justifies it. Sampling can be fooled.
:::
