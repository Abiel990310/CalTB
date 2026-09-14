---
title: "The differentiation rules"
navTitle: "The rules"
summary: >-
  Power, product, quotient. Each is a shortcut for a limit you would otherwise
  compute by hand, and each has a failure mode worth naming.
objectives:
  - Differentiate powers, including negative and fractional exponents
  - Apply the product and quotient rules correctly
  - Recognise when a rule does not apply
  - Differentiate the standard functions from memory
scope: ab
status: complete
standard: none
---

Chapter 2.1 computed a derivative from the definition. Doing that every time
would be unbearable, so this chapter is the set of shortcuts — each one a
theorem proved once from the limit, then used forever.

The rules are worth knowing cold. The failure modes are worth knowing better,
because that is where the marks go.

## The power rule

$$\frac{d}{dx}\,x^n = n x^{n-1}$$

```math verify
d/dx x**5 = 5*x**4
d/dx x**(1/2) = 1/(2*sqrt(x))
d/dx 1/x = -1/x**2
d/dx x = 1
```

It holds for **every** real $n$, not just positive integers, and the second and
third claims above are the ones students forget. Rewrite before differentiating:

- $\sqrt{x} = x^{1/2}$, so its derivative is $\tfrac{1}{2}x^{-1/2}$.
- $\tfrac{1}{x} = x^{-1}$, so its derivative is $-x^{-2}$.

:::pitfall
The power rule applies to a **variable raised to a constant**. It does not apply
to a constant raised to a variable.

$$\frac{d}{dx}\,x^2 = 2x \qquad\text{but}\qquad \frac{d}{dx}\,2^x = 2^x \ln 2$$

Those look alike and are entirely different. Writing $x\,2^{x-1}$ is one of the
most common wrong answers on the exam.
:::

```math verify
d/dx 2**x = 2**x*log(2)
d/dx exp(x) = exp(x)
```

$e^x$ is the function that is its own derivative, and that is what makes $e$
special rather than any aesthetic property.

## Linearity

Derivatives pass through sums and constant multiples untouched:

$$\frac{d}{dx}\big(a f(x) + b g(x)\big) = a f'(x) + b g'(x)$$

```math verify
d/dx (3*x**2 + 5*x - 7) = 6*x + 5
d/dx (4*sin(x) - 2*exp(x)) = 4*cos(x) - 2*exp(x)
```

This is the rule that makes polynomials trivial, and it is the reason the next
two rules come as a surprise — **multiplication and division do not behave this
way.**

## The product rule

The tempting guess is that the derivative of a product is the product of the
derivatives. It is not, and one example settles it: if it were, then
$\tfrac{d}{dx}(x \cdot x)$ would be $1 \cdot 1 = 1$, when it is plainly $2x$.

$$\frac{d}{dx}\big(f g\big) = f' g + f g'$$

```math verify
d/dx (x*exp(x)) = x*exp(x) + exp(x)
d/dx (x**2*sin(x)) = x**2*cos(x) + 2*x*sin(x)
d/dx (x*x) = 2*x
```

The last line is the counterexample, verified: the product rule gives
$1 \cdot x + x \cdot 1 = 2x$, which agrees with the power rule. Any proposed rule
has to survive that test.

**Why two terms.** Each factor changes, and each change contributes. Hold $g$
still and vary $f$: you get $f'g$. Hold $f$ still and vary $g$: you get $fg'$.
The real change is both at once, and the term where *both* change is
proportional to $h^2$, which the limit discards.

## The quotient rule

$$\frac{d}{dx}\left(\frac{f}{g}\right) = \frac{f' g - f g'}{g^2}$$

```math verify
d/dx (sin(x)/x) = cos(x)/x - sin(x)/x**2
d/dx ((x + 1)/(x - 1)) = -2/(x - 1)**2
d/dx tan(x) = 1/cos(x)**2
```

Two things go wrong with this one, reliably:

**The order matters.** The numerator is $f'g - fg'$, not $fg' - f'g$. Unlike the
product rule, swapping the terms flips the sign of every answer. A memory hook
that survives pressure: the term starting with the derivative of the *top* comes
first.

**It is often not worth using.** $\tfrac{x^2+1}{x}$ is easier rewritten as
$x + x^{-1}$ and differentiated term by term. Reach for the quotient rule when
the denominator genuinely resists splitting.

```math verify
(x**2 + 1)/x = x + 1/x
d/dx (x + 1/x) = 1 - 1/x**2
```

## The standard derivatives

These must be immediate, because everything else is built on them.

$$\frac{d}{dx}\sin x = \cos x \qquad
\frac{d}{dx}\cos x = -\sin x \qquad
\frac{d}{dx}\tan x = \sec^2 x$$

$$\frac{d}{dx}e^x = e^x \qquad
\frac{d}{dx}\ln x = \frac{1}{x}$$

```math verify
d/dx sin(x) = cos(x)
d/dx cos(x) = -sin(x)
d/dx log(x) = 1/x
d/dx (sin(x)**2 + cos(x)**2) = 0
```

That last claim is a pleasant consistency check: $\sin^2 x + \cos^2 x = 1$ is
constant, so its derivative must be zero — and applying the rules gives
$2\sin x\cos x - 2\cos x \sin x$, which is zero. When a derivative you compute
contradicts something you know, one of them is wrong, and this is a cheap way to
find out which.

:::quiz
{
  "question": "What is the derivative of x·sin(x)?",
  "options": [
    {
      "text": "sin(x) + x·cos(x)",
      "correct": true,
      "why": "Product rule: f = x gives f' = 1, g = sin x gives g' = cos x, so f'g + fg' = sin x + x cos x. Both factors vary, so both contribute a term."
    },
    {
      "text": "cos(x)",
      "correct": false,
      "why": "This treats the derivative of a product as the product of the derivatives — 1 · cos x. The x·x counterexample kills that rule: it would make the derivative of x² equal 1 rather than 2x."
    },
    {
      "text": "x·cos(x)",
      "correct": false,
      "why": "This differentiates sin x and leaves x alone, as if x were a constant. It is not — it varies, and its variation contributes the sin x term."
    },
    {
      "text": "sin(x) − x·cos(x)",
      "correct": false,
      "why": "The minus belongs to the quotient rule, not the product rule. Both product-rule terms are added; nothing here is being divided."
    }
  ]
}
:::

:::recap
- $\tfrac{d}{dx}x^n = nx^{n-1}$ for every real $n$. Rewrite roots and
  reciprocals as powers before applying it.
- A variable to a constant power is not a constant to a variable power:
  $\tfrac{d}{dx}2^x = 2^x\ln 2$.
- Derivatives pass through sums and constant multiples, and do **not** pass
  through products or quotients.
- Product: $f'g + fg'$ — two terms because each factor's change contributes.
- Quotient: $\tfrac{f'g - fg'}{g^2}$ — order matters, and rewriting is often
  easier than applying it.
- When a computed derivative contradicts something you already know, that is a
  free error check. Use it.
:::
