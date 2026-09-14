---
title: "Parametric, polar, and vector-valued functions"
navTitle: "Parametric and polar"
summary: >-
  Three ways to describe a curve that no y = f(x) can, and the calculus that
  goes with each.
objectives:
  - Find dy/dx for a parametric curve
  - Compute arc length and speed from a parametrisation
  - Convert between polar and Cartesian, and find polar area
  - Treat a vector-valued function as a position over time
scope: bc
status: complete
standard: none
---

A function $y = f(x)$ cannot describe a circle, a spiral, or any path that
doubles back — one $x$ gets one $y$, and those curves refuse. Three
representations get around it, and all three carry the same idea: describe the
curve by *something other than $x$*.

## Parametric curves

Give both coordinates as functions of a parameter, usually $t$:

$$x = f(t), \qquad y = g(t)$$

A circle becomes effortless: $x = \cos t$, $y = \sin t$.

```math verify
sin(t)**2 + cos(t)**2 = 1
d/dt cos(t) = -sin(t)
d/dt sin(t) = cos(t)
```

The first line confirms the path really is the unit circle; the other two are
the velocity components.

**The derivative** comes from the chain rule, with $dt$ cancelling formally:

$$\frac{dy}{dx} = \frac{dy/dt}{dx/dt}$$

For the circle that is $\tfrac{\cos t}{-\sin t} = -\cot t$ — undefined at
$t = 0$, where the curve is vertical, which is correct and is the kind of thing
a Cartesian description handles badly.

**The second derivative** is the one students get wrong:

$$\frac{d^2y}{dx^2} = \frac{\frac{d}{dt}\left(\frac{dy}{dx}\right)}{\frac{dx}{dt}}$$

:::pitfall
The second derivative is **not** $\tfrac{d^2y/dt^2}{d^2x/dt^2}$.

Differentiate $\tfrac{dy}{dx}$ with respect to $t$, then divide by
$\tfrac{dx}{dt}$ again — because you are differentiating with respect to $x$, and
each such differentiation costs another division by $\tfrac{dx}{dt}$.

Writing the ratio of second derivatives is the standard wrong answer and it is
never right.
:::

## Speed and arc length

A parametrisation is naturally a motion, and its velocity components are
$\tfrac{dx}{dt}$ and $\tfrac{dy}{dt}$. Speed is their magnitude:

$$\text{speed} = \sqrt{\left(\frac{dx}{dt}\right)^2 + \left(\frac{dy}{dt}\right)^2}$$

and arc length is speed integrated over time — distance is speed times time,
accumulated:

$$L = \int_a^b \sqrt{\left(\frac{dx}{dt}\right)^2 + \left(\frac{dy}{dt}\right)^2}\,dt$$

```math verify
sin(t)**2 + cos(t)**2 = 1
int 1 dt = t
```

For the unit circle the speed is $\sqrt{\sin^2 t + \cos^2 t} = 1$ — constant —
so the arc length from $0$ to $2\pi$ is $2\pi$. The circumference falls out of
the integral, which is a reassuring check on the formula.

:::note
Speed constant does **not** mean velocity constant. On the circle the speed is
$1$ throughout while the direction changes continuously — exactly the situation
in PhysTB's circular-motion chapters, where a force changes direction without
changing speed.
:::

## Polar coordinates

Locate a point by distance and angle rather than by two distances:

$$x = r\cos\theta, \qquad y = r\sin\theta$$
$$r^2 = x^2 + y^2, \qquad \tan\theta = \frac{y}{x}$$

```math verify
(r*cos(t))**2 + (r*sin(t))**2 = r**2
```

That verified identity is the conversion's consistency: the Cartesian distance
of a polar point is exactly $r$, as it must be.

Curves that are awkward in Cartesian become simple here. A circle centred at the
origin is just $r = 3$. A spiral is $r = \theta$. A cardioid is
$r = 1 + \cos\theta$ — try writing that as $y = f(x)$.

**Polar area** uses circular sectors rather than rectangles, and a sector of
angle $d\theta$ and radius $r$ has area $\tfrac12 r^2 d\theta$:

$$A = \frac{1}{2}\int_\alpha^\beta r^2\,d\theta$$

```math verify
int r**2/2 dr = r**3/6
int 9/2 dt = 9*t/2
```

The second line gives the area of $r = 3$ over a full turn: $\tfrac92 \cdot 2\pi
= 9\pi$, which is $\pi r^2$ for $r = 3$. Again the formula reproduces the
elementary result, which is the check worth doing on any new integral.

:::pitfall
The $\tfrac12 r^2$ is not $\pi r^2$ and not $r$. The factor comes from a sector's
area, and forgetting the $\tfrac12$ — or using $r$ instead of $r^2$ — are the two
standard errors.

Deriving it once helps: a sector of angle $d\theta$ is the fraction
$\tfrac{d\theta}{2\pi}$ of a full circle, so its area is
$\tfrac{d\theta}{2\pi}\cdot\pi r^2 = \tfrac12 r^2 d\theta$.
:::

## Vector-valued functions

Bundle the parametrisation into one object:

$$\vec r(t) = \langle x(t),\, y(t)\rangle$$

Then differentiation is componentwise and the names become physical:

- $\vec r(t)$ — position
- $\vec r\,'(t) = \langle x'(t), y'(t)\rangle$ — **velocity**, tangent to the path
- $\vec r\,''(t)$ — **acceleration**
- $|\vec r\,'(t)|$ — **speed**, a scalar

```math verify
d/dt (t**2) = 2*t
d/dt (2*t) = 2
```

For $\vec r(t) = \langle t^2,\, t^2\rangle$ the velocity is $\langle 2t, 2t\rangle$
and the acceleration is the constant $\langle 2, 2\rangle$ — a straight-line path
traversed at increasing speed.

This is the same content as parametric equations with better notation, and it is
the notation PhysTB uses throughout. Displacement over an interval is
$\int \vec r\,'(t)\,dt$, componentwise — which is chapter 1.1 of that book,
arriving from the other direction.

:::quiz
{
  "question": "For a parametric curve, what is d²y/dx²?",
  "options": [
    {
      "text": "The t-derivative of dy/dx, divided by dx/dt",
      "correct": true,
      "why": "Each differentiation with respect to x costs a division by dx/dt. Having formed dy/dx, differentiate it with respect to t and divide by dx/dt once more."
    },
    {
      "text": "(d²y/dt²) divided by (d²x/dt²)",
      "correct": false,
      "why": "The standard wrong answer, by false analogy with the first derivative. It is never correct — the chain rule does not distribute over second derivatives that way."
    },
    {
      "text": "The t-derivative of dy/dx",
      "correct": false,
      "why": "That gives the rate of change with respect to t, not x. The final division by dx/dt is what converts it."
    },
    {
      "text": "dy/dt divided by (dx/dt)²",
      "correct": false,
      "why": "The squared denominator appears in some expanded forms, but the numerator must involve differentiating dy/dx, not dy/dt alone."
    }
  ]
}
:::

:::recap
- Parametric: $\tfrac{dy}{dx} = \tfrac{dy/dt}{dx/dt}$, and the second derivative
  needs another division by $\tfrac{dx}{dt}$ — never a ratio of second
  derivatives.
- Speed is $\sqrt{(x')^2 + (y')^2}$; arc length is speed integrated over $t$.
- Polar: $x = r\cos\theta$, $y = r\sin\theta$; area is
  $\tfrac12\int r^2 d\theta$, with the $\tfrac12$ from a sector.
- A vector-valued function is the same content with physical names: position,
  velocity, acceleration, speed.
- Every formula here reproduces an elementary result on a circle. Check new
  integrals that way.
:::
