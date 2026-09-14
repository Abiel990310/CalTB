---
title: "Differential equations"
navTitle: "Differential equations"
summary: >-
  An equation whose unknown is a function. Separation turns it back into two
  ordinary integrals.
objectives:
  - Verify that a function solves a differential equation
  - Solve a separable equation and apply an initial condition
  - Model exponential and logistic growth
  - Read a solution curve off a slope field
scope: ab
status: complete
standard: none
---

Every equation so far had a number for its unknown. A **differential equation**
has a *function* for its unknown, and describes it by how it changes:

$$\frac{dy}{dx} = 2y$$

"Find the function whose rate of change is twice its value." That is a
description of behaviour, not of a value, which is why differential equations are
how science states its laws — chapters 2.1 and 10.1 of PhysTB are both exactly
this.

## Checking a solution is easy

Solving is work; **verifying is just differentiating.**

Is $y = 3e^{2x}$ a solution of $\tfrac{dy}{dx} = 2y$?

```math verify
d/dx (3*exp(2*x)) = 6*exp(2*x)
2*(3*exp(2*x)) = 6*exp(2*x)
```

Both sides come to $6e^{2x}$, so yes. Note that $5e^{2x}$ works too, and so does
$Ce^{2x}$ for any constant — a differential equation has a **family** of
solutions, and pinning down which one needs an extra fact.

That extra fact is an **initial condition** like $y(0) = 3$, and a problem giving
you one is asking for a single function rather than a family.

## Separation of variables

The one technique AB needs. When the equation can be written with all the $y$s
on one side and all the $x$s on the other, integrate both sides.

For $\tfrac{dy}{dx} = 2y$:

$$\frac{dy}{y} = 2\,dx
\quad\Longrightarrow\quad
\int\frac{dy}{y} = \int 2\,dx
\quad\Longrightarrow\quad
\ln|y| = 2x + C$$

```math verify
int 1/y dy = log(y)
int 2 dx = 2*x
d/dx (3*exp(2*x)) = 6*exp(2*x)
```

Exponentiating gives $y = Ce^{2x}$, and $y(0) = 3$ makes $C = 3$.

**Where the constant goes.** One constant is enough — combining the two from the
separate integrals gives a single $C$, and exponentiating turns an additive
constant into a multiplicative one. That is why the answer has $C$ as a
coefficient rather than an addend.

:::pitfall
Apply the initial condition **after** integrating and **before** simplifying
further, and remember that $e^{C}$ is a new constant rather than something to
carry around.

The commonest error is forgetting $C$ entirely, which produces one particular
solution and quietly loses the family. On an FRQ that is most of the marks.
:::

## Exponential growth

$\tfrac{dy}{dt} = ky$ says the rate of growth is proportional to the amount
present, and its solution is

$$y = y_0 e^{kt}$$

```math verify
# assume: k > 0
d/dt (3*exp(k*t)) = 3*k*exp(k*t)
lim t->oo exp(-k*t) = 0
```

Positive $k$ is growth, negative is decay — the second claim is the decay case
heading to zero. This one equation covers compound interest, population growth
without constraint, and radioactive decay.

**Doubling and half-life.** Time to double satisfies $e^{kt} = 2$, so
$t = \tfrac{\ln 2}{k}$ — independent of where you started, which is the
characteristic property of exponential behaviour and a standard exam question.

```math verify
exp(log(2)) = 2
```

## Logistic growth

Unconstrained exponential growth is unphysical: populations run out of food.
The **logistic** equation adds a ceiling $L$:

$$\frac{dy}{dt} = ky\left(1 - \frac{y}{L}\right)$$

The bracket is near $1$ when $y$ is small — so growth starts exponential — and
near $0$ as $y$ approaches $L$, which stalls it. The population levels off at
$L$, the **carrying capacity**.

Two facts the exam asks for directly, and both come from the equation without
solving it:

- $\lim_{t\to\infty} y = L$. Growth stops when the bracket vanishes.
- Growth is **fastest at $y = L/2$**. The rate $ky(1 - y/L)$ is a downward
  parabola in $y$, and its vertex is halfway.

```math verify
# assume: k > 0, L > 0
d/dy (k*y*(1 - y/L)) = k*(1 - 2*y/L)
```

Setting that derivative to zero gives $y = \tfrac{L}{2}$ exactly — the maximum
growth rate, verified. That point is the inflection point of the solution curve,
where it stops curving up and starts curving down.

## Slope fields

A slope field draws a short segment at each point with the slope the equation
prescribes there. Solution curves follow the segments, and one passes through
each point — which is a picture of the family of solutions all at once.

Reading one:

- **Follow the segments** from the initial condition to sketch that solution.
- **Horizontal segments** mark where $\tfrac{dy}{dx} = 0$ — equilibria.
- **Segments depending only on $y$** mean the field looks the same at every $x$,
  which is the signature of an autonomous equation like $\tfrac{dy}{dt} = ky$.

For the logistic equation the field is horizontal along $y = 0$ and $y = L$ —
the two equilibria — steepest in between, and every curve starting between them
climbs toward $L$.

:::quiz
{
  "question": "A population follows dy/dt = 0.4y(1 − y/500). At what population is it growing fastest?",
  "options": [
    {
      "text": "250, half the carrying capacity",
      "correct": true,
      "why": "The growth rate as a function of y is a downward parabola with roots at 0 and 500, so its vertex is at 250. Differentiating the right-hand side and setting it to zero gives y = L/2 in general."
    },
    {
      "text": "500, the carrying capacity",
      "correct": false,
      "why": "At y = 500 the bracket is zero and growth has stopped entirely. That is the limit the population approaches, not where it moves fastest."
    },
    {
      "text": "At the smallest population, since the exponential term dominates",
      "correct": false,
      "why": "Near y = 0 the bracket is close to 1, but the ky factor is tiny — few individuals reproducing. The product is small at both ends and peaks between."
    },
    {
      "text": "It grows at a constant rate until it reaches 500",
      "correct": false,
      "why": "That would be dy/dt = constant, a straight line. The logistic rate depends on y and varies continuously, which is what produces the S-shaped curve."
    }
  ]
}
:::

:::recap
- A differential equation's unknown is a function; verifying a proposed solution
  is just differentiation.
- Solutions come in families. An initial condition picks one out — losing $C$
  loses the family.
- Separate the variables, integrate both sides, then apply the condition.
- $\tfrac{dy}{dt} = ky$ gives $y = y_0e^{kt}$; doubling time is
  $\tfrac{\ln 2}{k}$, independent of the starting amount.
- Logistic growth levels off at $L$ and is fastest at $\tfrac{L}{2}$, which is
  the solution curve's inflection point.
- A slope field shows the whole family at once; follow the segments from the
  initial condition.
:::
