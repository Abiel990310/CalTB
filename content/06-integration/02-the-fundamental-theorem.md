---
title: "The Fundamental Theorem"
navTitle: "The FTC"
summary: >-
  Differentiation and integration are inverse operations. That is the theorem,
  and it is why nobody computes a Riemann sum by hand twice.
objectives:
  - State both parts of the Fundamental Theorem
  - Evaluate a definite integral using an antiderivative
  - Differentiate a function defined by an integral, including with the chain rule
  - Explain why the theorem is true, not just what it says
scope: ab
status: complete
standard: none
---

Chapter 6.1 defined the integral as a limit of sums, which is honest and
unusable — nobody evaluates $\int_0^2 x^2\,dx$ by summing rectangles. The
Fundamental Theorem of Calculus is the shortcut, and calling it *fundamental* is
not decoration. It says that the two central operations of the subject undo each
other.

## Part 2: evaluating integrals

Most-used first. If $F$ is any antiderivative of $f$ — that is, $F' = f$ — then

$$\int_a^b f(x)\,dx = F(b) - F(a)$$

```math verify
int x**2 dx = x**3/3
int cos(x) dx = sin(x)
int 1/x**2 dx = -1/x
2**3/3 - 0**3/3 = 8/3
```

So $\int_0^2 x^2\,dx = \tfrac{2^3}{3} - \tfrac{0^3}{3} = \tfrac83$ — the number
the rectangles were converging on, obtained in one line.

**Any antiderivative works.** $\tfrac{x^3}{3}$ and $\tfrac{x^3}{3} + 17$ are
both antiderivatives of $x^2$, and the constant cancels in the subtraction:
$(F(b) + C) - (F(a) + C) = F(b) - F(a)$. That is why the $+C$ that matters so
much for indefinite integrals is irrelevant for definite ones.

## Part 1: the derivative of an accumulation

Define a function by an integral with a variable upper limit:

$$g(x) = \int_a^x f(t)\,dt$$

Then $g'(x) = f(x)$.

Read that slowly, because it is the surprising half. **Accumulating $f$ and then
differentiating gives $f$ back.** Integration and differentiation are inverses,
and this is the precise statement of it.

:::note
The variable of integration must differ from the limit. Writing
$\int_a^x f(x)\,dx$ uses $x$ for two different things — a bound and a dummy
variable being summed over — and while a marker will usually let it pass, it
stops making sense the moment you differentiate. Use $t$ inside.
:::

**Why it is true**, in one sentence: $g(x + h) - g(x)$ is the area of a thin
strip of width $h$ and height about $f(x)$, so the difference quotient
$\tfrac{g(x+h) - g(x)}{h}$ is about $f(x)$, and exactly $f(x)$ in the limit.

That is the whole proof, and it explains the theorem rather than asserting it:
the rate at which accumulated area grows is the height of the curve at the edge
where it is growing.

## With the chain rule

The upper limit is often a function of $x$, not $x$ itself. Then Part 1 composes
with the chain rule:

$$\frac{d}{dx}\int_a^{u(x)} f(t)\,dt = f\big(u(x)\big)\cdot u'(x)$$

For $\displaystyle g(x) = \int_0^{x^2}\sin t\,dt$:

$$g'(x) = \sin(x^2)\cdot 2x$$

```math verify
d/dx (-cos(x**2)) = 2*x*sin(x**2)
```

That verified line is the check: the integral evaluates to $-\cos(x^2) + 1$ by
Part 2, and differentiating it gives $2x\sin(x^2)$ — the same answer the chain
rule route produced, from an entirely different direction.

When the **lower** limit varies instead, the sign flips, because swapping the
limits of an integral negates it:

$$\frac{d}{dx}\int_{u(x)}^{b} f(t)\,dt = -f\big(u(x)\big)\cdot u'(x)$$

## The properties you get for free

All of these follow from the definition and are worth recognising rather than
deriving under time pressure:

$$\int_a^a f = 0
\qquad
\int_b^a f = -\int_a^b f
\qquad
\int_a^c f = \int_a^b f + \int_b^c f$$

The middle one is a convention, and it is the *right* convention: it makes the
third hold even when $b$ lies outside $[a, c]$, which keeps the algebra uniform
instead of full of special cases.

```math verify
int (3*x**2 + 2*x) dx = x**3 + x**2
int (sin(x) + cos(x)) dx = sin(x) - cos(x)
```

Linearity comes across from differentiation unchanged — integrals split over
sums and let constants out front — because the sums defining them do.

:::pitfall
**The theorem needs $f$ continuous on $[a,b]$.**

$\int_{-1}^{1}\tfrac{1}{x^2}\,dx$ looks like it evaluates to
$\left[-\tfrac1x\right]_{-1}^{1} = -1 - 1 = -2$, which is nonsense: the
integrand is positive everywhere it is defined, so no correct answer is
negative.

The function has an infinite discontinuity at $0$, inside the interval, so the
theorem simply does not apply. Mechanically applying it to a discontinuous
integrand produces confident nonsense, and the negative sign is the only clue
that anything went wrong.
:::

:::quiz
{
  "question": "If g(x) = ∫₁ˣ t³ dt, what is g′(2)?",
  "options": [
    {
      "text": "8, since g′(x) = x³ by Part 1",
      "correct": true,
      "why": "Part 1 says differentiating an accumulation returns the integrand, so g′(x) = x³ and g′(2) = 8. No evaluation of the integral is needed at all."
    },
    {
      "text": "4, since g(x) = x⁴/4 − 1/4 and g′(2) = 2⁴/4",
      "correct": false,
      "why": "The antiderivative is right but it was not differentiated — x⁴/4 evaluated at 2 is 4, which is g(2)-ish, not g′(2). Differentiating x⁴/4 gives x³, back to 8."
    },
    {
      "text": "15/4, the value of the integral from 1 to 2",
      "correct": false,
      "why": "That is g(2), the accumulated amount. The question asks for the rate at which it is accumulating, which is the integrand's height at x = 2."
    },
    {
      "text": "It cannot be found without evaluating the integral first",
      "correct": false,
      "why": "This is precisely what Part 1 spares you. The derivative of an accumulation is the integrand, so the antiderivative never has to be computed."
    }
  ]
}
:::

:::recap
- Part 2: $\int_a^b f = F(b) - F(a)$ for any antiderivative $F$. The constant
  cancels, which is why $+C$ does not matter for definite integrals.
- Part 1: $\tfrac{d}{dx}\int_a^x f(t)\,dt = f(x)$ — accumulating then
  differentiating returns the integrand.
- The reason: the thin strip added between $x$ and $x+h$ has height about
  $f(x)$, so the rate of accumulation is the height of the curve.
- A variable upper limit brings the chain rule: multiply by $u'(x)$. A variable
  lower limit does the same with a minus sign.
- The theorem requires continuity on the interval. Applied across an infinite
  discontinuity it returns confident nonsense.
:::
