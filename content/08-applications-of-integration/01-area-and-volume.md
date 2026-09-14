---
title: "Area and volume"
navTitle: "Area and volume"
summary: >-
  Integration accumulates. Choose the slice, write its contribution, and add
  them up — which is the same procedure for every problem in this unit.
objectives:
  - Find the area between two curves
  - Compute a volume by discs, washers, or known cross-sections
  - Choose the variable of integration deliberately
  - Recognise the one procedure underneath all of them
scope: ab
status: complete
standard: none
---

This unit looks like a list of formulas and is not. Every problem in it is the
same three steps:

1. **Slice** the region into pieces of thickness $dx$ or $dy$.
2. **Write one slice's contribution** — its area or volume.
3. **Integrate** across the range the slices cover.

Memorising four formulas is harder than learning that, and it fails on the fifth
problem.

## Area between curves

A slice is a thin rectangle of height "top minus bottom" and width $dx$:

$$A = \int_a^b \big(f(x) - g(x)\big)\,dx$$

For the region between $y = x$ and $y = x^2$ from $0$ to $1$, the line is above
the parabola throughout:

```math verify
int (x - x**2) dx = x**2/2 - x**3/3
1/2 - 1/3 = 1/6
```

So the area is $\tfrac16$. The verified lines are the antiderivative and the
evaluation, which is the whole calculation.

:::pitfall
**"Top minus bottom" means top for that slice, not top overall.** If the curves
cross inside the interval, they swap, and a single integral computes the
difference of signed areas rather than the total area.

Split the integral at every crossing, or integrate $|f - g|$, which is the same
thing written shorter. A negative area is the symptom that this was missed.
:::

## Volume by discs

Rotate a region about an axis and each slice sweeps out a disc of radius equal
to the function's value:

$$V = \pi\int_a^b \big[f(x)\big]^2\,dx$$

Rotating $y = \sqrt{x}$ from $0$ to $4$ about the $x$-axis:

```math verify
int x dx = x**2/2
pi*(4**2/2) = 8*pi
```

The radius is $\sqrt x$, so the radius squared is just $x$, and the volume is
$8\pi$.

That $\pi r^2$ is the area of a circle — the disc formula is not a new fact, it
is step 2 of the procedure with a circular slice.

## Volume by washers

When the solid has a hole, the slice is an annulus: subtract the inner disc from
the outer.

$$V = \pi\int_a^b \left(R_{\text{outer}}^2 - R_{\text{inner}}^2\right)dx$$

```math verify
int (x**2 - x**4) dx = x**3/3 - x**5/5
pi*(1/3 - 1/5) = 2*pi/15
```

That is the region between $y = x$ and $y = x^2$ from $0$ to $1$ rotated about
the $x$-axis: outer radius $x$, inner radius $x^2$, volume $\tfrac{2\pi}{15}$.

:::warning
**Square the radii separately and then subtract.** $R^2 - r^2$ is not
$(R - r)^2$, and substituting the height of the region for the radius difference
is the single most common error in this unit.

The washer's area is genuinely $\pi R^2 - \pi r^2$; there is no shortcut through
the difference of the radii.
:::

## Known cross-sections

The general case, and the one that shows the formulas were never the point. If
the slice is a square, a semicircle, or an equilateral triangle rather than a
disc, only step 2 changes:

| Cross-section | Area of one slice |
|---|---|
| square, side $s$ | $s^2$ |
| semicircle, diameter $s$ | $\tfrac{\pi s^2}{8}$ |
| equilateral triangle, side $s$ | $\tfrac{\sqrt3}{4}s^2$ |

with $s$ the distance between the bounding curves at that $x$.

```math verify
int x**2 dx = x**3/3
sqrt(3)/4 * (1/3) = sqrt(3)/12
```

Squares on the region under $y = x$ from $0$ to $1$ give $\int_0^1 x^2 dx
= \tfrac13$; equilateral triangles on the same base give $\tfrac{\sqrt3}{12}$.
Same slicing, same limits, different slice area.

## Choosing the variable

Slice **perpendicular to the axis of rotation**, and in the direction that
avoids splitting the region.

- Rotating about a **horizontal** axis → slices are vertical → integrate $dx$.
- Rotating about a **vertical** axis → slices are horizontal → integrate $dy$,
  which means rewriting the curves as $x$ in terms of $y$.

A region whose top boundary changes partway along needs two integrals in $x$ but
often only one in $y$. Spending thirty seconds choosing can halve the work, and
the choice is where the marks quietly are.

:::quiz
{
  "question": "A solid has circular base of radius 2, and cross-sections perpendicular to the x-axis are squares. What does the integrand look like?",
  "options": [
    {
      "text": "The side is the full chord 2√(4 − x²), so the integrand is 4(4 − x²)",
      "correct": true,
      "why": "The circle x² + y² = 4 has half-chord √(4 − x²), so the full chord — the square's side — is twice that. Squaring gives 4(4 − x²)."
    },
    {
      "text": "π(4 − x²), the area of a circular slice",
      "correct": false,
      "why": "That is the disc formula, for a solid of revolution. Here the cross-sections are squares, so step 2 of the procedure uses s² rather than πr²."
    },
    {
      "text": "√(4 − x²), the half-chord",
      "correct": false,
      "why": "Two errors: the side is the full chord, not half of it, and a square's area is the side squared rather than the side itself."
    },
    {
      "text": "(4 − x²), the half-chord squared",
      "correct": false,
      "why": "Right to square, but the side is the whole chord. Using the half-chord loses a factor of 4 in the final answer."
    }
  ]
}
:::

:::recap
- Every problem here is: slice, write one slice's contribution, integrate.
- Area between curves: $\int (\text{top} - \text{bottom})$, split wherever they
  cross.
- Discs: $\pi\int f^2$. Washers: $\pi\int (R^2 - r^2)$, squaring **before**
  subtracting.
- Known cross-sections change only the slice's area formula; the procedure is
  identical.
- Slice perpendicular to the axis of rotation, and choose the variable that
  avoids splitting the region.
:::
