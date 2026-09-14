---
title: "Implicit differentiation"
navTitle: "Implicit"
summary: >-
  Differentiating an equation you cannot solve for y — which is most equations,
  and the technique behind related rates and inverse functions.
objectives:
  - Differentiate an equation implicitly and solve for dy/dx
  - Explain why every y produces a dy/dx factor
  - Find the tangent line to an implicitly defined curve
  - Derive the derivative of an inverse function
scope: ab
status: complete
standard: none
---

$x^2 + y^2 = 25$ is a circle, and no function describes it — a circle fails the
vertical line test. Yet it plainly has a tangent line at every point, so a
derivative exists locally even though $y$ is not a function of $x$ globally.

Implicit differentiation gets that derivative without ever solving for $y$.

## The one rule

**Differentiate both sides with respect to $x$, treating $y$ as a function of
$x$.** Every $y$ you differentiate produces a factor of $\tfrac{dy}{dx}$, by the
chain rule.

For $x^2 + y^2 = 25$:

$$2x + 2y\frac{dy}{dx} = 0 \qquad\Longrightarrow\qquad \frac{dy}{dx} = -\frac{x}{y}$$

```math verify
d/dx (x**2) = 2*x
d/dy (y**2) = 2*y
```

The second line is where the $\tfrac{dy}{dx}$ comes from: differentiating $y^2$
with respect to $y$ gives $2y$, and the chain rule multiplies by
$\tfrac{dy}{dx}$ to convert it to a derivative with respect to $x$.

:::pitfall
**The $\tfrac{dy}{dx}$ factor is the entire technique**, and omitting it is the
mistake that defines this topic. Writing $2x + 2y = 0$ treats $y$ as a constant,
which it is not — $y$ changes when $x$ does, and saying so is the chain rule.

Test yourself: $\tfrac{d}{dx}(y^3)$ is $3y^2\tfrac{dy}{dx}$, not $3y^2$.
:::

## Checking against the explicit route

The circle is one of the rare cases where you *can* solve for $y$, which makes
it a good check. The upper half is $y = \sqrt{25 - x^2}$:

```math verify
d/dx sqrt(25 - x**2) = -x/sqrt(25 - x**2)
```

That is $-\tfrac{x}{y}$, since $y = \sqrt{25-x^2}$ on the upper half. The two
routes agree, and the implicit one gave the answer in one line without a square
root and without splitting the circle into halves.

That economy is the point. For $x^3 + y^3 = 6xy$ — the folium of Descartes —
solving for $y$ means a cubic formula. Differentiating implicitly takes a line:

$$3x^2 + 3y^2\frac{dy}{dx} = 6y + 6x\frac{dy}{dx}$$

Collect the $\tfrac{dy}{dx}$ terms on one side and factor:

$$\frac{dy}{dx} = \frac{6y - 3x^2}{3y^2 - 6x}$$

The answer depends on both $x$ and $y$, which is normal for an implicit
derivative and is exactly right — a curve that doubles back has different slopes
at two points with the same $x$.

## Products need the product rule

A term with both variables needs the product rule *and* the chain rule:

$$\frac{d}{dx}(xy) = 1\cdot y + x\frac{dy}{dx}$$

```math verify
d/dx (x*y) = y
```

That verified line is the first half — the derivative of $xy$ treating $y$ as
constant is $y$ — and the second half, $x\tfrac{dy}{dx}$, is what implicit
differentiation adds. Missing it is the same omission as before, wearing a
different hat.

## Tangent lines

The usual exam question: find the tangent to $x^2 + y^2 = 25$ at $(3, 4)$.

$\tfrac{dy}{dx} = -\tfrac{x}{y} = -\tfrac{3}{4}$, so the tangent is

$$y - 4 = -\tfrac34(x - 3)$$

Sanity check: the radius to $(3,4)$ has slope $\tfrac43$, and $-\tfrac34$ is its
negative reciprocal — the tangent is perpendicular to the radius, as a circle's
tangent must be. Geometry confirming calculus is a free check, and worth taking.

## Inverse functions

Implicit differentiation gives the inverse-function rule immediately. If
$y = f^{-1}(x)$ then $f(y) = x$, and differentiating both sides:

$$f'(y)\frac{dy}{dx} = 1 \qquad\Longrightarrow\qquad \frac{dy}{dx} = \frac{1}{f'(y)}$$

The derivative of an inverse is the reciprocal of the original's derivative,
evaluated at the corresponding point.

That is where the inverse trigonometric derivatives come from:

```math verify
d/dx asin(x) = 1/sqrt(1 - x**2)
d/dx atan(x) = 1/(x**2 + 1)
d/dx log(x) = 1/x
```

For $\arcsin$: if $y = \arcsin x$ then $\sin y = x$, so
$\cos y \tfrac{dy}{dx} = 1$, giving $\tfrac{dy}{dx} = \tfrac{1}{\cos y}$. Then
$\cos y = \sqrt{1 - \sin^2 y} = \sqrt{1 - x^2}$, and the standard result drops
out.

The third line is the same trick on $e^y = x$, which is why $\ln$ differentiates
to $\tfrac1x$ — a result that looks like it should need its own proof and does
not.

:::quiz
{
  "question": "Differentiating x² + y² = 25 implicitly, what is d/dx of y²?",
  "options": [
    {
      "text": "2y·dy/dx, because y is a function of x and the chain rule applies",
      "correct": true,
      "why": "Differentiating y² with respect to y gives 2y; the chain rule multiplies by dy/dx to convert it to a derivative with respect to x. That factor is the whole technique."
    },
    {
      "text": "2y, by the power rule",
      "correct": false,
      "why": "That treats y as if it were the variable of differentiation. It is not — x is — and y depends on x, so the chain rule owes a factor."
    },
    {
      "text": "0, since y is a constant with respect to x",
      "correct": false,
      "why": "y is emphatically not constant: move along the circle and both coordinates change. That dependence is exactly what implicit differentiation captures."
    },
    {
      "text": "2x·dy/dx, substituting x for y",
      "correct": false,
      "why": "The power rule applies to whatever is being raised, which is y. No substitution of one variable for the other is licensed here."
    }
  ]
}
:::

:::recap
- Differentiate both sides with respect to $x$, treating $y$ as a function of
  $x$. Every $y$ differentiated owes a $\tfrac{dy}{dx}$.
- Collect the $\tfrac{dy}{dx}$ terms, factor, and divide.
- The answer usually contains both $x$ and $y$, which is correct — a curve can
  have two slopes at one $x$.
- A term like $xy$ needs the product rule as well as the chain rule.
- The inverse-function rule $\tfrac{d}{dx}f^{-1} = \tfrac{1}{f'(y)}$ falls out
  of differentiating $f(y) = x$, and with it every inverse trig derivative.
:::
