---
title: "Taylor series"
navTitle: "Taylor series"
summary: >-
  A polynomial that agrees with a function to as many derivatives as you like —
  and the radius beyond which it stops agreeing at all.
objectives:
  - Construct a Taylor polynomial from derivatives at a point
  - Recognise the four standard Maclaurin series
  - Explain what the radius of convergence means
  - Use a series to evaluate an otherwise impossible integral
scope: bc
status: complete
standard: none
---

A polynomial is the easiest kind of function: you can differentiate it,
integrate it and evaluate it with arithmetic alone. A Taylor series is the
attempt to replace a hard function with a polynomial that behaves like it.

$$f(x) = \sum_{n=0}^{\infty}\frac{f^{(n)}(a)}{n!}(x-a)^n$$

Match the value at $a$, then the first derivative, then the second, and so on.
Each term fixes one more derivative, and matching infinitely many usually
recovers the function exactly.

When $a = 0$ it is called a **Maclaurin** series, which is the case the exam
asks for almost every time.

## Watch it converge — and stop

:::graph
{
  "kind": "taylor",
  "title": "sin(x) and its Maclaurin polynomial. Drag the degree up and watch where the fit ends.",
  "fn": "sin(x)",
  "domain": [-8, 8],
  "range": [-2.2, 2.2],
  "center": 0,
  "terms": [0, 1, 0, -0.16666666666666666, 0, 0.008333333333333333, 0, -0.0001984126984126984, 0, 0.0000027557319223985893, 0, -0.000000025052108385441718],
  "controls": [
    { "name": "terms", "label": "degree", "min": 0, "max": 11, "step": 1, "value": 1 }
  ]
}
:::

At degree $1$ the polynomial is just $x$ — the tangent line at the origin, which
tracks the curve to within $0.01$ out to about $\pm 0.4$ and then leaves.

Drag the degree up and each odd term pushes that window outward: degree $3$
holds to about $\pm 1$, degree $7$ to about $\pm 2.5$, degree $11$ to about
$\pm 4$. Near the centre the improvement is dramatic.

**Watch the edges of the panel while you do it.** The worst-error readout covers
the whole visible window, and it does *not* fall steadily — it is about $78$ at
degree $3$, about $221$ at degree $7$, then about $67$ at degree $11$. A
higher-degree polynomial fits better where it fits and diverges harder where it
does not, because its leading term grows faster. The improvement is local, and
the readout is honest about that.

**Sine's series converges everywhere**, so pushing the degree far enough covers
any interval you like — the wild edges retreat as the degree climbs. That is a
special property, not the general case, and the next section is the general
case.

```math verify
d/dx sin(x) = cos(x)
d/dx (x - x**3/6) = 1 - x**2/2
d/dx (1 - x**2/2) = -x
```

Those three check the pattern: the derivative of the degree-3 polynomial is the
degree-2 polynomial for cosine, exactly as $\sin' = \cos$ demands. **A Taylor
series differentiates term by term into the series of the derivative**, which is
one of the most useful facts in the unit.

## The four to know

$$e^x = 1 + x + \frac{x^2}{2!} + \frac{x^3}{3!} + \cdots$$
$$\sin x = x - \frac{x^3}{3!} + \frac{x^5}{5!} - \cdots$$
$$\cos x = 1 - \frac{x^2}{2!} + \frac{x^4}{4!} - \cdots$$
$$\frac{1}{1-x} = 1 + x + x^2 + x^3 + \cdots \quad (|x| < 1)$$

```math verify
sum n=0..oo 1/2**n = 2
d/dx exp(x) = exp(x)
d/dx (1 + x + x**2/2 + x**3/6) = 1 + x + x**2/2
```

The last verified line is $e^x$'s defining property showing up in its series: the
polynomial's derivative is the polynomial one degree lower, which is the only way
a function can be its own derivative.

The fourth series is the geometric series from chapter 10.1 read backwards, and
it is the source of most series you will be asked to *derive* rather than recall
— substitute, differentiate or integrate it and you get many others.

## The radius of convergence

Sine and $e^x$ converge everywhere. $\tfrac{1}{1-x}$ does not: its series is
geometric with ratio $x$, so it converges only for $|x| < 1$.

That number — $1$ here — is the **radius of convergence**, and outside it the
series does not approximate the function badly. It fails to converge at all.

```math verify
sum n=0..oo (1/2)**n = 2
sum n=0..oo (1/3)**n = 3/2
```

At $x = \tfrac12$ the series gives $2$, which is $\tfrac{1}{1 - 1/2}$. At
$x = \tfrac13$ it gives $\tfrac32$, which is $\tfrac{1}{1 - 1/3}$. Both inside
the radius, both correct.

At $x = 2$ the terms are $1, 2, 4, 8, \ldots$ — growing without bound, while the
function $\tfrac{1}{1-2}$ is a perfectly ordinary $-1$. The function is fine; the
series is not.

:::pitfall
Adding more terms **outside** the radius of convergence makes the approximation
*worse*, not better. This is the opposite of the intuition the sine graph above
builds, which is exactly why the graph is of a function whose radius is infinite
and this warning is here.

Always check the radius before trusting a series at a particular $x$.
:::

## What series are for

Beyond approximation, they make otherwise impossible integrals possible.

$\int e^{-x^2}dx$ has no elementary antiderivative — chapter 6.3 said so. But
substituting $-x^2$ into the series for $e^x$ gives a polynomial, and polynomials
always integrate:

$$e^{-x^2} = 1 - x^2 + \frac{x^4}{2!} - \frac{x^6}{3!} + \cdots$$

$$\int e^{-x^2}dx = x - \frac{x^3}{3} + \frac{x^5}{10} - \cdots$$

```math verify
int (1 - x**2 + x**4/2) dx = x - x**3/3 + x**5/10
```

The verified line is the first three terms integrated, and it matches. The
integral that had no answer in elementary functions has one as a series — which
is how such integrals are actually computed, in this course and outside it.

:::quiz
{
  "question": "The Maclaurin series for 1/(1−x) is evaluated at x = 2. What happens?",
  "options": [
    {
      "text": "It diverges — 2 is outside the radius of convergence of 1",
      "correct": true,
      "why": "The terms are 1, 2, 4, 8, … growing without bound. The function itself is a perfectly ordinary −1 at x = 2; the series simply has nothing to say there."
    },
    {
      "text": "It converges to −1, the value of the function",
      "correct": false,
      "why": "The function is −1, but the series does not reach it. Inside the radius the two agree; outside, the series diverges while the function carries on being defined."
    },
    {
      "text": "It converges, but slowly, so you need many terms",
      "correct": false,
      "why": "Slow convergence means the terms shrink gradually. Here they grow, and no number of terms helps — more terms make the partial sums larger."
    },
    {
      "text": "It converges to 1, since the first term is 1",
      "correct": false,
      "why": "A series is the limit of its partial sums, not its first term. Those sums are 1, 3, 7, 15, … heading to infinity."
    }
  ]
}
:::

:::recap
- A Taylor series matches a function's value and every derivative at a point:
  $\sum \tfrac{f^{(n)}(a)}{n!}(x-a)^n$. Centred at $0$ it is a Maclaurin series.
- Know $e^x$, $\sin x$, $\cos x$ and $\tfrac{1}{1-x}$; most others come from
  substituting into or differentiating these.
- Series differentiate and integrate term by term into the series of the
  derivative or antiderivative.
- The radius of convergence is where the series stops meaning anything. Outside
  it, more terms make things worse.
- Substituting into a known series turns an impossible integral — $e^{-x^2}$ —
  into a polynomial that integrates term by term.
:::
