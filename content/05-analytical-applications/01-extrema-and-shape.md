---
title: "Extrema and the shape of a graph"
navTitle: "Extrema and shape"
summary: >-
  The first derivative finds the turning points, the second decides which kind
  they are, and together they draw the curve.
objectives:
  - Find critical points and classify them
  - Use the first and second derivative tests, and know when each fails
  - Locate inflection points and relate them to concavity
  - Apply the Extreme Value Theorem on a closed interval
scope: ab
status: complete
standard: none
---

A derivative is a slope, so it knows where a curve is rising, falling, and
momentarily doing neither. That last case is where maxima and minima live, and
extracting the full shape of a graph from $f'$ and $f''$ is one of the most
heavily tested skills in AB.

## Critical points

$c$ is a **critical point** when $f'(c) = 0$ or $f'(c)$ does not exist.

Those are the only places an interior extremum can occur — which is worth
stating precisely, because the converse is false and the exam tests the
difference.

```math verify
d/dx (x**3 - 3*x) = 3*x**2 - 3
d/dx x**3 = 3*x**2
```

For $x^3 - 3x$, setting $3x^2 - 3 = 0$ gives $x = \pm 1$: two critical points,
and both turn out to be extrema.

For $x^3$, setting $3x^2 = 0$ gives $x = 0$ — a critical point that is **not** an
extremum. The curve flattens momentarily and carries straight on up.

:::pitfall
**$f'(c) = 0$ does not imply an extremum at $c$.** $x^3$ at the origin is the
standard counterexample: zero slope, no maximum, no minimum.

Critical points are *candidates*. Something else has to decide.
:::

## The first derivative test

Look at the **sign of $f'$ on either side** of the critical point:

| $f'$ goes | at $c$ there is |
|---|---|
| $+$ then $-$ | a local **maximum** |
| $-$ then $+$ | a local **minimum** |
| no sign change | neither |

This is the test that always works, and it is the one to fall back on. It
explains $x^3$ immediately: $f' = 3x^2$ is positive on both sides of zero, no
sign change, so no extremum.

## The second derivative test

Faster when it applies:

$$f'(c) = 0 \text{ and } f''(c) > 0 \;\Rightarrow\; \text{minimum}$$
$$f'(c) = 0 \text{ and } f''(c) < 0 \;\Rightarrow\; \text{maximum}$$

```math verify
d/dx (3*x**2 - 3) = 6*x
```

For $x^3 - 3x$, $f'' = 6x$. At $x = 1$ it is $+6$: a minimum. At $x = -1$ it is
$-6$: a maximum. Two substitutions and the classification is done.

:::warning
**When $f''(c) = 0$ the test says nothing at all.** Not "neither" — *nothing*.

$x^4$ has $f''(0) = 0$ and a clear minimum. $-x^4$ has $f''(0) = 0$ and a clear
maximum. $x^3$ has $f''(0) = 0$ and neither. All three look identical to the
second derivative test, which is why an inconclusive result means going back to
the first derivative test rather than guessing.
:::

```math verify
d/dx x**4 = 4*x**3
d/dx (4*x**3) = 12*x**2
```

At $x = 0$ that second derivative is $0$ — and $x^4$ plainly has a minimum
there. Verified, and a reminder that the fast test is not the reliable one.

## Concavity and inflection

$f''$ describes how the slope itself is changing:

- $f'' > 0$ — slope increasing — **concave up**, curving like a cup.
- $f'' < 0$ — slope decreasing — **concave down**, like a cap.

An **inflection point** is where concavity changes sign. As with extrema,
$f'' = 0$ is necessary but not sufficient: $x^4$ has $f''(0) = 0$ and no
inflection there, because $f'' = 12x^2$ never changes sign.

The pattern repeats one level up, and noticing that is worth more than
memorising both cases: **a zero of a derivative is a candidate, and a sign
change is the evidence.**

:::graph
{
  "kind": "secant",
  "title": "x³ − 3x — drag h to read the slope near the turning points at x = ±1",
  "fn": "x**3 - 3*x",
  "domain": [-2.3, 2.3],
  "range": [-3.5, 3.5],
  "at": -1,
  "controls": [
    { "name": "h", "label": "h", "min": 0.02, "max": 1.6, "step": 0.01, "value": 1.0 }
  ]
}
:::

Drag $h$ towards zero with the pivot at $x = -1$: the secant slope heads for
zero, which is what a turning point looks like from the derivative's side.

## The Extreme Value Theorem

If $f$ is continuous on a **closed** interval $[a,b]$, it attains an absolute
maximum and an absolute minimum somewhere on it.

That guarantee makes the closed-interval method work:

1. Find the critical points inside $(a, b)$.
2. Evaluate $f$ at those, **and at both endpoints**.
3. The largest value is the absolute maximum; the smallest is the minimum.

No derivative test is needed — comparing the numbers settles it.

:::pitfall
**Forgetting the endpoints** is the most common error in this procedure. On a
closed interval the extreme value often occurs at an endpoint, where the
derivative is not zero and no critical-point search will find it.

And the theorem needs *closed*. On the open interval $(0,1)$, the function $x$
has no maximum — it approaches $1$ and never arrives.
:::

:::quiz
{
  "question": "f′(2) = 0 and f″(2) = 0. What can you conclude about x = 2?",
  "options": [
    {
      "text": "Nothing yet — check the sign of f′ on either side",
      "correct": true,
      "why": "The second derivative test is inconclusive when f″ = 0, and inconclusive means no information rather than a negative result. x⁴, −x⁴ and x³ all have f′ = f″ = 0 at the origin with three different behaviours. The first derivative test distinguishes them."
    },
    {
      "text": "There is an inflection point at x = 2",
      "correct": false,
      "why": "f″ = 0 is necessary for an inflection but not sufficient — concavity must actually change sign. x⁴ has f″(0) = 0 and stays concave up throughout."
    },
    {
      "text": "There is neither a maximum nor a minimum at x = 2",
      "correct": false,
      "why": "x⁴ is the counterexample: f′(0) = f″(0) = 0 and it has a clear minimum. An inconclusive test rules nothing out."
    },
    {
      "text": "x = 2 is not a critical point",
      "correct": false,
      "why": "f′(2) = 0 makes it a critical point by definition. What is undetermined is which kind."
    }
  ]
}
:::

:::recap
- Critical points are where $f' = 0$ or $f'$ fails to exist — candidates, not
  conclusions.
- First derivative test: a sign change in $f'$ is the evidence. It always works.
- Second derivative test is faster but says **nothing** when $f''(c) = 0$. Fall
  back to the first.
- $f'' > 0$ is concave up, $f'' < 0$ concave down; an inflection needs a sign
  change, not merely a zero.
- On a closed interval the extremes exist (EVT) and are found by comparing
  critical values **and both endpoints**.
:::
