---
title: "Substitution"
navTitle: "Substitution"
summary: >-
  The chain rule run backwards. Recognising when it applies is most of the
  skill; executing it is bookkeeping.
objectives:
  - Recognise an integrand that is a chain rule derivative
  - Carry out a u-substitution, including changing the limits
  - Choose u when several candidates present themselves
  - Say why a substitution sometimes fails
scope: ab
status: complete
standard: none
---

Every differentiation rule runs backwards into an integration technique. The
chain rule runs backwards into **substitution**, which is the one technique AB
needs and the foundation of every technique BC adds.

The chain rule says

$$\frac{d}{dx}F\big(u(x)\big) = F'\big(u(x)\big)\cdot u'(x)$$

Read right to left: anything of the form $f(u)\cdot u'$ integrates to $F(u)$.
The whole method is recognising that shape.

## The shape to look for

An integrand that contains **a function and its own derivative**, up to a
constant factor.

$$\int 2x\cos(x^2)\,dx$$

The inside is $x^2$; its derivative is $2x$; and $2x$ is sitting right there.
Substitute $u = x^2$, so $du = 2x\,dx$, and the integral becomes
$\int\cos u\,du = \sin u = \sin(x^2)$.

```math verify
int 2*x*cos(x**2) dx = sin(x**2)
d/dx sin(x**2) = 2*x*cos(x**2)
```

Both directions checked. The second line is the honest test of any integration:
**differentiate your answer and see whether you get the integrand back.** That
takes seconds and catches nearly every mistake, which makes skipping it
inexcusable on an exam.

## Working the bookkeeping

$$\int x\,e^{x^2}\,dx$$

The derivative of $x^2$ is $2x$ and only $x$ is present — off by a constant,
which is always fixable.

Let $u = x^2$, so $du = 2x\,dx$, hence $x\,dx = \tfrac12\,du$:

$$\int x e^{x^2}dx = \tfrac12\int e^u\,du = \tfrac12 e^u = \tfrac12 e^{x^2}$$

```math verify
int x*exp(x**2) dx = exp(x**2)/2
int sin(x)*cos(x) dx = sin(x)**2/2
int (2*x + 1)*exp(x**2 + x) dx = exp(x**2 + x)
```

:::pitfall
A **constant** mismatch is fixable; a **variable** one is not.

$\int x e^{x^2}dx$ works because the missing factor is the number $2$, which
moves freely across the integral sign.

$\int e^{x^2}dx$ does not work, and no substitution rescues it — this integral
has no elementary antiderivative at all. Not "hard"; impossible in elementary
functions.

You cannot divide by a variable to fix a mismatch. $\int x^2 e^{x^2}dx$ is not
$\tfrac{x}{2}e^{x^2}$, because $x$ cannot be moved through the integral sign.
:::

## Definite integrals: change the limits

With definite integrals there are two routes, and one is reliably safer.

**Substitute the limits too.** When $u = x^2$ and $x$ runs from $0$ to $2$, then
$u$ runs from $0$ to $4$:

$$\int_0^2 x e^{x^2}dx = \tfrac12\int_0^4 e^u\,du = \tfrac12\left(e^4 - 1\right)$$

**Or convert back to $x$ first**, then use the original limits. Both are
correct; the first is less error-prone, because forgetting to convert back is a
standard way to evaluate the antiderivative at the wrong numbers.

```math verify
int exp(u) du = exp(u)
d/dx (exp(x**2)/2) = x*exp(x**2)
```

:::warning
If you change the limits, **do not** substitute back to $x$ as well. Doing both
evaluates $\tfrac12 e^{x^2}$ at $0$ and $4$ instead of $0$ and $2$, and produces
an answer that is wrong by an enormous margin while looking like ordinary work.

Pick one route per problem and finish it.
:::

## Choosing $u$

When more than one candidate presents itself, these heuristics hold up:

- **The inside of a composition.** In $\cos(x^2)$, take $u = x^2$.
- **Whatever is under a root**, inside a denominator, or in an exponent.
- **The thing whose derivative is also present**, which is the real criterion —
  the others are shortcuts to it.

A quick test before committing: compute $du$ and see whether the rest of the
integrand is exactly $du$ up to a constant. If a stray $x$ survives, that choice
of $u$ is wrong. Trying the other candidate takes fifteen seconds.

```math verify
int 1/(x*log(x)) dx = log(log(x))
int tan(x) dx = -log(cos(x))
int x/(x**2 + 1) dx = log(x**2 + 1)/2
```

Those three are all the same move. In the first, $u = \ln x$ gives
$du = \tfrac{dx}{x}$, which is exactly what remains. In the second,
$\tan x = \tfrac{\sin x}{\cos x}$ and $u = \cos x$ gives $du = -\sin x\,dx$.
In the third, $u = x^2 + 1$ gives $du = 2x\,dx$, off by the usual constant.

Once the pattern is visible, these stop being separate problems.

:::quiz
{
  "question": "Which substitution evaluates ∫ x·√(x² + 1) dx?",
  "options": [
    {
      "text": "u = x² + 1, because du = 2x dx and the x is already present",
      "correct": true,
      "why": "The integrand contains the inside function and its derivative up to the constant 2. It becomes ½∫√u du = ⅓(x²+1)^{3/2}, and differentiating that returns x√(x²+1)."
    },
    {
      "text": "u = x, since that is the variable of integration",
      "correct": false,
      "why": "That substitution changes nothing — du = dx and the integral is exactly as it was. A substitution has to simplify the composition to be worth making."
    },
    {
      "text": "u = √(x² + 1), because it is the outermost function",
      "correct": false,
      "why": "Workable but needlessly painful: du involves the square root in the denominator and has to be untangled. Take the inside of the composition, not the outside."
    },
    {
      "text": "No substitution works; this needs integration by parts",
      "correct": false,
      "why": "Parts is for products of unrelated functions. Here the two factors are related — one is essentially the derivative of what is inside the other — which is exactly the substitution signature."
    }
  ]
}
:::

## Practice

:::exercise antiderivatives

:::recap
- Substitution is the chain rule backwards: $\int f(u)u'\,dx = F(u)$.
- Look for a function and its own derivative in the same integrand.
- A constant mismatch is fixable; a variable one is not, and some integrands —
  $e^{x^2}$ — have no elementary antiderivative at all.
- For definite integrals, change the limits with the variable, or convert back
  before evaluating. Never both.
- Choose $u$ as the inside of the composition, then confirm by checking that
  $du$ accounts for everything else.
- Always differentiate your answer. It costs seconds and catches almost
  everything.
:::
