---
title: "Limits at infinity and asymptotes"
navTitle: "Limits at infinity"
summary: >-
  What a function does far out, and how the two kinds of asymptote come from
  two different limits.
objectives:
  - Evaluate a limit as x grows without bound
  - Find horizontal asymptotes by comparing degrees
  - Distinguish a vertical asymptote from a hole
  - Rank the growth rates that decide every such limit
scope: ab
status: complete
standard: none
---

So far the input has approached a finite point. Let it run off instead:
$x \to \infty$ asks what the function settles down to far out, and the answer is
a **horizontal asymptote** when there is one.

This is the same limit idea with a different approach, and the technique is
different too — nothing to factor and cancel, because nothing is $\tfrac{0}{0}$.
The competition is between things growing.

## The one move: divide by the dominant term

For a ratio of polynomials, divide top and bottom by the highest power of $x$
appearing anywhere in the fraction. Every term then either survives as a
constant or dies as $\tfrac{c}{x^k} \to 0$.

$$\lim_{x \to \infty}\frac{3x^2 + 5x - 1}{2x^2 - 7}
 = \lim_{x \to \infty}\frac{3 + \tfrac{5}{x} - \tfrac{1}{x^2}}{2 - \tfrac{7}{x^2}}
 = \frac{3}{2}$$

```math verify
lim x->oo (3*x**2 + 5*x - 1)/(2*x**2 - 7) = 3/2
lim x->oo 1/x = 0
lim x->oo (2*x + 1)/(x**2 + 3) = 0
lim x->oo (x**3 + 1)/(x**2 + 1) = oo
```

Those three outcomes are the only ones, and a degree comparison predicts which
without doing any work:

| Degrees | Limit | Asymptote |
|---|---|---|
| top $<$ bottom | $0$ | $y = 0$ |
| top $=$ bottom | ratio of leading coefficients | $y = $ that ratio |
| top $>$ bottom | $\pm\infty$ | none (horizontal) |

:::note
The shortcut is safe, and it is worth knowing *why* it works rather than
memorising the table: dividing by the dominant power is what turns every lower
term into something that vanishes. The table is just the three cases of which
side keeps a surviving constant.
:::

## Roots need care about sign

$\sqrt{x^2} = |x|$, not $x$. Going to $+\infty$ that distinction is invisible;
going to $-\infty$ it flips the answer's sign.

$$\lim_{x \to \infty}\frac{\sqrt{4x^2+1}}{x} = 2
\qquad\text{but}\qquad
\lim_{x \to -\infty}\frac{\sqrt{4x^2+1}}{x} = -2$$

```math verify
lim x->oo sqrt(4*x**2 + 1)/x = 2
lim x->-oo sqrt(4*x**2 + 1)/x = -2
```

Both are verified above, and they differ. A student who writes $\sqrt{x^2} = x$
gets the second one wrong and has no way to notice.

## Which grows faster

Beyond polynomials, limits at infinity are decided by a ranking. Each of these
beats everything to its left, eventually and permanently:

$$\ln x \;\ll\; x^{p} \;\ll\; e^{x} \;\ll\; x! $$

"Eventually" is doing real work in that sentence. $x^{100}$ is vastly larger
than $e^x$ for a long time — they cross somewhere past $x \approx 1000$ — and
after the crossing the exponential wins by margins that grow without bound.
A table of small values would tell you the opposite of the truth.

```math verify
lim x->oo log(x)/x = 0
lim x->oo x**5/exp(x) = 0
lim x->oo exp(x)/x**100 = oo
```

The middle claim is the useful one: **any power divided by an exponential tends
to zero.** It settles most questions of this kind on sight.

## Vertical asymptotes

A horizontal asymptote comes from $x \to \infty$. A **vertical** one comes from
the other kind of limit — a finite point where the function grows without bound.

For a rational function, that is a zero of the denominator which is *not* also a
zero of the numerator. When it is a zero of both, the factor cancels and you get
a hole instead.

$$\frac{x-1}{(x-1)(x+2)}$$

has a hole at $x = 1$ and a vertical asymptote at $x = -2$ — the same expression
producing both kinds of behaviour, distinguished only by whether the factor
cancels.

```math verify
(x - 1)/((x - 1)*(x + 2)) = 1/(x + 2)
lim x->1 (x - 1)/((x - 1)*(x + 2)) = 1/3
```

At $x = 1$ the limit is a perfectly ordinary $\tfrac13$ — the hole is invisible
to the limit, which is chapter 1.1's point arriving again. At $x = -2$ nothing
cancels, and there is no limit at all.

:::quiz
{
  "question": "What is the limit of (5x³ − 2x)/(x³ + 4) as x → ∞?",
  "options": [
    {
      "text": "5, the ratio of the leading coefficients",
      "correct": true,
      "why": "Equal degrees, so dividing top and bottom by x³ leaves (5 − 2/x²)/(1 + 4/x³), and both fractions vanish. The horizontal asymptote is y = 5."
    },
    {
      "text": "∞, because the numerator has the larger coefficient",
      "correct": false,
      "why": "Coefficients do not decide growth — degree does, and these degrees are equal. A larger coefficient scales the ratio, it does not make it diverge."
    },
    {
      "text": "0, because both parts grow without bound",
      "correct": false,
      "why": "Both growing is what makes it indeterminate, not what makes it zero. You get 0 only when the denominator grows strictly faster, which needs a higher degree below."
    },
    {
      "text": "It does not exist, since ∞/∞ is undefined",
      "correct": false,
      "why": "∞/∞ is indeterminate, which means the form alone decides nothing — exactly like 0/0. Doing the division resolves it to 5."
    }
  ]
}
:::

:::recap
- Divide top and bottom by the dominant power; lower terms vanish as
  $\tfrac{c}{x^k} \to 0$.
- Degree comparison predicts the result: lower over higher gives $0$, equal
  gives the coefficient ratio, higher over lower diverges.
- $\sqrt{x^2} = |x|$. Going to $-\infty$ this changes the sign of the answer.
- Growth ranking: $\ln x \ll x^p \ll e^x \ll x!$, each beating the last
  eventually — and "eventually" can be a very long way out.
- A vertical asymptote is a denominator zero that does not cancel. One that
  cancels is a hole, and a hole is invisible to the limit.
:::
