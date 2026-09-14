---
title: "The definite integral"
navTitle: "The definite integral"
summary: >-
  An integral is a limit of sums. Watching the rectangles converge is the
  fastest way to believe that, and to see which rule converges fastest.
objectives:
  - Express an area as a Riemann sum and then as an integral
  - Compare left, right, midpoint and trapezoid approximations
  - Say which rules over- and under-estimate, and why
  - Interpret a definite integral as accumulated change
scope: ab
status: complete
standard: none
---

The derivative was a limit of slopes. The integral is a limit of sums, and the
parallel is exact: both take a quantity you can compute for a finite step, and
ask what it approaches as the step shrinks to nothing.

Slice the region under a curve into $n$ rectangles of width
$\Delta x = \tfrac{b-a}{n}$, add their areas, and let $n$ grow:

$$\int_a^b f(x)\,dx = \lim_{n \to \infty}\sum_{i=1}^{n} f(x_i)\,\Delta x$$

That is the definition. Everything else in this unit is a way of avoiding
having to use it.

## Watch it converge

:::graph
{
  "kind": "riemann",
  "title": "∫₀² x² dx — drag n, and switch rules. The exact value is 8/3 ≈ 2.6667.",
  "fn": "x**2",
  "domain": [-0.15, 2.15],
  "range": [-0.4, 4.4],
  "from": 0,
  "to": 2,
  "rule": "left",
  "exact": 2.6666666666666665,
  "controls": [
    { "name": "n", "label": "n", "min": 1, "max": 60, "step": 1, "value": 4 }
  ]
}
:::

Three things are worth doing with that before reading on.

**Drag $n$ up on the left rule.** The error shrinks, and roughly halves each
time you double $n$. Slow, steady, predictable.

**Switch to right.** On this increasing function the left rule undershoots and
the right rule overshoots, so the true value is trapped between them. At $n = 4$
they give $1.75$ and $3.75$ — and their average, $2.75$, is *exactly* what the
trapezoid rule gives. That is not a resemblance: averaging the two rules is
algebraically identical to averaging each strip's two edges.

**Switch to midpoint and trapezoid at the same $n$.** Both are dramatically
better. At $n = 4$ the left rule is out by $0.92$, the trapezoid by $0.083$, and
the midpoint by $0.042$ — a factor of twenty for no extra work.

```math verify
int x**2 dx = x**3/3
2**3/3 - 0**3/3 = 8/3
```

The exact value is $\tfrac83$, and the widget's error readout is measured
against exactly that.

## Which rules over- and under-estimate

This is a standard exam question, and it is decided by two properties of the
function, not by memorising four cases.

| | increasing $f$ | decreasing $f$ |
|---|---|---|
| **left rule** | under | over |
| **right rule** | over | under |

For left and right it is about **monotonicity**: on an increasing function, the
left edge of each strip is the lowest point in it, so every rectangle sits below
the curve.

| | concave up | concave down |
|---|---|---|
| **trapezoid** | over | under |
| **midpoint** | under | over |

For trapezoid and midpoint it is about **concavity**: a chord across a
concave-up curve lies above it, so the trapezoid overshoots. The midpoint
rectangle's error is subtler — the bit it misses on one side is more than made
up on the other — and it lands on the opposite side, which is why midpoint and
trapezoid errors have opposite signs.

:::note
Those opposite signs are exploitable. $\tfrac{2M + T}{3}$ — twice the midpoint
plus the trapezoid, over three — is **Simpson's rule**, weighted so the two
errors cancel rather than merely shrink.

On this example it does something startling: at $n = 4$ it gives $2.6\overline{6}$,
the exact answer, with four strips. Simpson's rule is exact for every polynomial
of degree three or less, and $x^2$ is one — so the approximation has no error to
have. Try it on $\sin$ and the magic goes away, leaving merely excellent.
:::

## It is not only area

Area is the picture, but it is not the meaning. A definite integral is
**accumulated change**, and the units come from the product $f(x)\,dx$:

| $f$ is | $x$ is | the integral is |
|---|---|---|
| velocity (m/s) | time (s) | displacement (m) |
| rate of flow (L/s) | time (s) | volume (L) |
| force (N) | distance (m) | work (J) |
| density (kg/m) | length (m) | mass (kg) |

This is why the integral sign turns up throughout physics, and why the units
question — "what does this integral represent?" — is answered by multiplying the
units of the integrand by the units of the variable.

**Signed area.** Where $f$ is negative the product $f(x)\Delta x$ is negative,
so the integral subtracts. A velocity that goes negative contributes backwards
displacement, exactly as it should.

```math verify
int x dx = x**2/2
int sin(x) dx = -cos(x)
int exp(x) dx = exp(x)
int 1/x dx = log(x)
```

:::pitfall
$\displaystyle\int_a^b f(x)\,dx$ is the **signed** area. If a question asks for
the total area between the curve and the axis, that is
$\int_a^b |f(x)|\,dx$, which needs splitting at every root and adding the
magnitudes.

"Area" in a question means one of these two things, and choosing the wrong one
is a reliable way to get a plausible wrong answer.
:::

:::quiz
{
  "question": "You approximate ∫₀² x² dx with 4 left rectangles and get 1.75, while the exact value is 8/3 ≈ 2.667. Why is the estimate low?",
  "options": [
    {
      "text": "x² is increasing on [0,2], so each rectangle's left edge is the lowest point of its strip",
      "correct": true,
      "why": "Exactly. On an increasing function the left endpoint gives the smallest value in each subinterval, so every rectangle fits under the curve and the total is an underestimate."
    },
    {
      "text": "Because 4 rectangles is too few — the left rule is exact in the limit",
      "correct": false,
      "why": "True but not an explanation of the direction. More rectangles shrink the error, yet the left rule stays below the true value at every n here. The sign of the error comes from monotonicity, not from n."
    },
    {
      "text": "Because x² is concave up, and concavity decides left-rule error",
      "correct": false,
      "why": "Concavity decides the trapezoid and midpoint errors. For left and right rules it is whether the function increases or decreases that matters."
    },
    {
      "text": "Because part of the region lies below the axis and subtracts",
      "correct": false,
      "why": "x² is non-negative on [0,2], so nothing subtracts. Signed area matters when the integrand changes sign, which it does not here."
    }
  ]
}
:::

:::recap
- $\int_a^b f\,dx = \lim_{n\to\infty}\sum f(x_i)\Delta x$: a limit of sums, in
  exact parallel to the derivative as a limit of slopes.
- Left and right errors are decided by whether $f$ increases; trapezoid and
  midpoint errors by concavity.
- Midpoint and trapezoid err in opposite directions, which is what Simpson's
  rule exploits.
- An integral is accumulated change. Its units are the integrand's times the
  variable's — velocity by time is displacement, force by distance is work.
- $\int f$ is signed area. Total area needs $\int |f|$, split at the roots.
:::
