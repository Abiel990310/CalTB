---
title: "Continuity"
navTitle: "Continuity"
summary: >-
  Continuity is one equation, and it is the equation that makes substitution
  legal. Everything else in this chapter follows from it.
objectives:
  - State the three conditions for continuity at a point
  - Classify a discontinuity as removable, jump, or infinite
  - Choose a constant that makes a piecewise function continuous
  - Apply the Intermediate Value Theorem, and say what it does not promise
scope: ab
status: complete
standard: none
---

Chapter 1.1 insisted that $\lim_{x \to a} f(x)$ and $f(a)$ are different
questions. Continuity is the name for the situation where they happen to have
the same answer — and that is the situation in which the whole of move 1,
substitution, is legal.

$f$ is **continuous at $a$** when

$$\lim_{x \to a} f(x) = f(a)$$

which is really three demands folded into one line, and it is worth unfolding
them because an exam question usually breaks exactly one:

1. $f(a)$ **exists** — $a$ is in the domain.
2. $\lim_{x \to a} f(x)$ **exists** — both one-sided limits agree.
3. They are **equal**.

## The three ways it breaks

Each failure has a name, and naming it is often the question.

**Removable.** The limit exists but the value does not match it — either $f(a)$
is undefined, or it is defined to be something else. The graph has a hole.

$$f(x) = \frac{x^2-1}{x-1} \quad\text{at } x = 1$$

The limit is $2$; $f(1)$ does not exist. Defining $f(1) = 2$ repairs it
completely, which is why it is called removable.

```math verify
lim x->1 (x**2 - 1)/(x - 1) = 2
```

**Jump.** The one-sided limits both exist and disagree, so condition 2 fails.
No redefinition at the single point can help — the problem is on both sides of
it, not at it.

**Infinite.** The function grows without bound, so condition 2 fails in a
different way. $\tfrac{1}{x^2}$ at $0$, or $\tan x$ at $\tfrac{\pi}{2}$.

```math verify
lim x->0 1/x**2 = oo
```

:::pitfall
A hole and a vertical asymptote look similar in a table of values near the point
and are completely different. At a hole the function is *close to a number* and
merely fails to equal it; at an asymptote there is no number to be close to. If
cancelling a factor removes the problem, it was a hole.
:::

## Making a function continuous on purpose

The standard exam question: a piecewise function with an unknown constant, and
"find $k$ so that $f$ is continuous". The method follows straight from the three
conditions — set the one-sided limits equal to each other and to the value.

For

$$f(x) = \begin{cases} x^2 + k & x \le 2 \\ 3x - 1 & x > 2 \end{cases}$$

the left limit is $4 + k$, the right limit is $5$, and continuity demands they
match: $k = 1$.

```math verify
2**2 + 1 = 3*2 - 1
```

That verified line *is* the condition, written out at the joint. If the two
sides do not agree there, no choice of $k$ makes them.

## The Intermediate Value Theorem

If $f$ is continuous on the closed interval $[a, b]$, and $N$ is any value
between $f(a)$ and $f(b)$, then $f(c) = N$ for at least one $c$ in $(a, b)$.

Informally: **a continuous function cannot get from one value to another without
passing through everything in between.** It is obvious once stated and it is the
tool behind every "show that this equation has a solution" question.

To show $x^3 + x - 1 = 0$ has a root between $0$ and $1$: the function is a
polynomial, so continuous; at $0$ it is $-1$; at $1$ it is $1$. Zero lies
between them, so some $c$ in $(0,1)$ gives exactly zero.

```math verify
0**3 + 0 - 1 = -1
1**3 + 1 - 1 = 1
```

Those two evaluations are the entire proof. The theorem does the rest.

:::warning
The IVT promises **existence, and nothing else.**

- It does not tell you where the root is.
- It does not say there is only one — there may be many.
- It says nothing when $f(a)$ and $f(b)$ have the *same* sign; a root may still
  exist, the theorem simply has no opinion.
- It requires continuity on the **closed** interval. Drop that and the
  conclusion collapses: $\tfrac{1}{x}$ runs from $-1$ at $x=-1$ to $1$ at
  $x=1$ and never takes the value $0$, because it is not continuous at $0$.

An exam answer that does not state continuity has not earned the point, however
correct the arithmetic.
:::

:::quiz
{
  "question": "f is continuous on [1, 4] with f(1) = −3 and f(4) = 5. Which conclusion does the Intermediate Value Theorem support?",
  "options": [
    {
      "text": "There is at least one c in (1,4) with f(c) = 0",
      "correct": true,
      "why": "0 lies between −3 and 5, and f is continuous on the closed interval, so the theorem applies exactly. Note it gives at least one — there could be three."
    },
    {
      "text": "There is exactly one c in (1,4) with f(c) = 0",
      "correct": false,
      "why": "Nothing here rules out several crossings. A function can wander up and down many times between those endpoints. Uniqueness needs a further argument, usually that f is strictly increasing."
    },
    {
      "text": "f is increasing on (1,4)",
      "correct": false,
      "why": "The endpoints rise but the path between them is unconstrained — f could dip to −100 first. Continuity says nothing about direction."
    },
    {
      "text": "f(c) = 7 for some c in (1,4)",
      "correct": false,
      "why": "7 is outside the interval [−3, 5], and the theorem only fills in values between the two endpoint values. f may well reach 7 somewhere, but the IVT does not promise it."
    }
  ]
}
:::

:::recap
- Continuity at $a$ is $\lim_{x \to a} f(x) = f(a)$: the value exists, the limit
  exists, and they agree.
- Removable discontinuity — the limit exists but the value does not match;
  redefining one point repairs it.
- Jump — one-sided limits disagree. Infinite — the function is unbounded.
  Neither is repairable at a point.
- To make a piecewise function continuous, set the one-sided limits equal at
  the joint and solve.
- The IVT gives existence only: at least one $c$, nowhere in particular, and
  only when $f$ is continuous on the closed interval.
:::
