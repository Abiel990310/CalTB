---
title: "The chain rule"
navTitle: "Chain rule"
summary: >-
  The rule for a function inside a function, and the one students most often
  apply without noticing they needed to.
objectives:
  - Identify the outer and inner function in a composition
  - Differentiate nested compositions correctly
  - Explain why the inner derivative appears as a factor
  - Recognise a composition disguised as something simpler
scope: ab
status: complete
standard: none
---

Everything so far differentiated functions that were added, multiplied or
divided. The chain rule handles the remaining way to build a function: putting
one **inside** another.

$$\frac{d}{dx} f\big(g(x)\big) = f'\big(g(x)\big)\cdot g'(x)$$

In words: differentiate the outside, leave the inside alone, then multiply by
the derivative of the inside.

That final factor is the whole rule. Forgetting it is the single most common
mistake in differential calculus, and it is silent — the answer looks plausible.

## Why the inner derivative is there

Think about rates. If $y$ changes three times as fast as $u$, and $u$ changes
five times as fast as $x$, then $y$ changes fifteen times as fast as $x$. Rates
through a chain **multiply**:

$$\frac{dy}{dx} = \frac{dy}{du}\cdot\frac{du}{dx}$$

which is the same statement in Leibniz notation, and is the version worth
remembering because the cancellation is a useful mnemonic — even though the
symbols are not really fractions being cancelled.

```math verify
d/dx sin(2*x) = 2*cos(2*x)
d/dx sin(x**2) = 2*x*cos(x**2)
d/dx exp(3*x) = 3*exp(3*x)
d/dx (x**2 + 1)**5 = 10*x*(x**2 + 1)**4
```

Look at the first: $\sin(2x)$ oscillates twice as fast as $\sin x$, so its slope
is twice as steep. The factor of $2$ is not bookkeeping — it is the function
genuinely changing twice as quickly.

:::graph
{
  "kind": "secant",
  "title": "sin(2x) — the inner factor of 2 is visible as the steeper slope",
  "fn": "sin(2*x)",
  "domain": [-0.2, 3.2],
  "range": [-1.6, 1.6],
  "at": 0,
  "controls": [
    { "name": "h", "label": "h", "min": 0.02, "max": 1.5, "step": 0.01, "value": 1.0 }
  ]
}
:::

Drag $h$ towards zero at $x = 0$: the slope heads for $2$, not $1$. The
derivative of $\sin x$ at zero is $1$; compressing the input doubles it.

## Spotting the composition

The hard part is not the rule, it is noticing that a composition is present.
Ask: **to evaluate this at a number, what would I compute first?** That inner
computation is $g$.

| Expression | Inner $g$ | Outer $f$ |
|---|---|---|
| $\sin(x^2)$ | $x^2$ | $\sin$ |
| $(3x+1)^7$ | $3x+1$ | $(\ )^7$ |
| $e^{\cos x}$ | $\cos x$ | $e^{(\ )}$ |
| $\sqrt{1 - x^2}$ | $1 - x^2$ | $\sqrt{\ }$ |
| $\ln(5x)$ | $5x$ | $\ln$ |

```math verify
d/dx (3*x + 1)**7 = 21*(3*x + 1)**6
d/dx exp(cos(x)) = -exp(cos(x))*sin(x)
d/dx sqrt(1 - x**2) = -x/sqrt(1 - x**2)
d/dx log(5*x) = 1/x
```

The last one is worth pausing on. The chain rule gives
$\tfrac{1}{5x}\cdot 5 = \tfrac{1}{x}$ — the $5$ cancels entirely. That is not a
coincidence: $\ln(5x) = \ln 5 + \ln x$, and $\ln 5$ is a constant, so the two
functions differ by a constant and must have the same derivative. Two routes,
one answer, and each checks the other.

## Nesting deeper

Three layers is the same rule applied twice, working outward in:

$$\frac{d}{dx} f\big(g(h(x))\big) = f'\big(g(h(x))\big)\cdot g'\big(h(x)\big)\cdot h'(x)$$

```math verify
d/dx sin(exp(2*x)) = 2*exp(2*x)*cos(exp(2*x))
d/dx (sin(x**2))**3 = 6*x*sin(x**2)**2*cos(x**2)
```

Peel one layer at a time and write each factor as you go. The mechanical
discipline matters more than cleverness here — most errors in nested problems
are dropped factors, not misunderstood rules.

:::pitfall
The most common failure is not getting the chain rule wrong; it is **not
noticing it applies.**

$$\frac{d}{dx}\sin(x^2) \ne \cos(x^2)$$

That answer would be right if the inside were $x$. Because it is $x^2$, a factor
of $2x$ is missing — and the wrong answer is perfectly well-formed, so nothing
looks amiss.

Before differentiating anything, ask whether the argument is just $x$. If it is
not, a chain rule factor is owed.
:::

## Where it shows up next

The chain rule is not one topic among several. It is the machinery behind:

- **implicit differentiation** — every $y$ is secretly $y(x)$, so differentiating
  it produces $\tfrac{dy}{dx}$ as an inner derivative,
- **related rates** — every quantity is secretly a function of $t$,
- **$u$-substitution** in integration, which is the chain rule run backwards.

Getting comfortable now pays three more times before the course ends.

:::quiz
{
  "question": "What is the derivative of (x³ + 1)⁴?",
  "options": [
    {
      "text": "12x²(x³ + 1)³",
      "correct": true,
      "why": "Outer: 4( )³. Inner: x³ + 1, whose derivative is 3x². Multiply: 4(x³+1)³ · 3x² = 12x²(x³+1)³."
    },
    {
      "text": "4(x³ + 1)³",
      "correct": false,
      "why": "This is the classic omission — correct only if the inside were x. The inner derivative 3x² is owed, and the answer looks entirely reasonable without it, which is what makes the mistake dangerous."
    },
    {
      "text": "4(3x²)³",
      "correct": false,
      "why": "This differentiates the inside and then applies the outer power to the result. The outer function must be evaluated at the inside itself, not at the inside's derivative."
    },
    {
      "text": "12x²(x³ + 1)⁴",
      "correct": false,
      "why": "The inner factor is right but the outer power was not reduced. Differentiating ( )⁴ gives 4( )³ — the exponent drops by one, exactly as in the power rule."
    }
  ]
}
:::

:::recap
- $\tfrac{d}{dx}f(g(x)) = f'(g(x))\cdot g'(x)$: differentiate the outside, keep
  the inside, multiply by the inside's derivative.
- In Leibniz form $\tfrac{dy}{dx} = \tfrac{dy}{du}\tfrac{du}{dx}$ — rates
  through a chain multiply.
- To find the inner function, ask what you would compute first when evaluating
  at a number.
- Nested compositions are the same rule applied repeatedly, outward in. Write
  each factor down as you peel.
- The usual error is not misapplying the rule but failing to notice it is
  needed. If the argument is not plain $x$, a factor is owed.
:::
