---
title: "Motion, rates, and L'Hôpital"
navTitle: "Motion and rates"
summary: >-
  Derivatives as rates in context — where the units carry the meaning, and
  where an indeterminate limit finally becomes easy.
objectives:
  - Interpret a derivative in context, with units
  - Analyse rectilinear motion from a position function
  - Distinguish displacement from total distance
  - Apply L'Hôpital's rule and know when it does not apply
scope: ab
status: complete
standard: none
---

A derivative is a rate of change, and in context the units say what kind. That
sounds like a triviality and is worth most of a chapter, because "interpret this
derivative" is asked on every exam and is marked on the sentence, not the number.

## Units carry the meaning

If $V(t)$ is volume in litres and $t$ is time in minutes, then $V'(t)$ is in
**litres per minute** — a rate of filling. The unit is not decoration; it is the
interpretation.

| $f$ measures | $x$ measures | $f'$ means |
|---|---|---|
| position (m) | time (s) | velocity (m/s) |
| cost ($) | items | marginal cost ($/item) |
| population | years | growth rate (people/year) |
| temperature (°C) | time (min) | rate of cooling (°C/min) |

An answer that says "$V'(5) = -3$" earns less than one saying "at 5 minutes the
tank is **draining** at 3 litres per minute". The second states the sign's
meaning and the units, which is what the rubric asks for.

## Rectilinear motion

Position $s(t)$, and everything else follows:

$$v(t) = s'(t) \qquad a(t) = v'(t) = s''(t)$$

```math verify
d/dt (t**3 - 6*t**2 + 9*t) = 3*t**2 - 12*t + 9
d/dt (3*t**2 - 12*t + 9) = 6*t - 12
```

For $s(t) = t^3 - 6t^2 + 9t$: velocity $3t^2 - 12t + 9 = 3(t-1)(t-3)$, zero at
$t = 1$ and $t = 3$; acceleration $6t - 12$, zero at $t = 2$.

Three questions the exam asks from exactly this setup:

**When is it at rest?** $v = 0$, so $t = 1$ and $t = 3$.

**When does it change direction?** When $v$ changes *sign* — which it does at
both, since each is a simple root. A double root would touch zero without
crossing, and the object would not turn.

**When is it speeding up?** When $v$ and $a$ share a sign. Between $t=1$ and
$t=2$, $v$ is negative and $a$ is negative, so it is speeding up while moving
backwards — the case that catches people, and the same point PhysTB's chapter
1.1 makes.

## Displacement is not distance

$$\text{displacement} = \int_a^b v\,dt
\qquad
\text{total distance} = \int_a^b |v|\,dt$$

Displacement is net change in position and can be zero for a long journey.
Total distance never decreases.

```math verify
int (3*t**2 - 12*t + 9) dt = t**3 - 6*t**2 + 9*t
```

To compute total distance, **split at every time the velocity changes sign** and
add the magnitudes. Integrating $v$ straight through lets the backwards stretch
cancel the forwards one — which is the right answer to a different question.

:::pitfall
"How far did it travel?" means total distance. "How far is it from where it
started?" means displacement. A question using the word *total* almost always
wants the absolute value, and the split.
:::

## L'Hôpital's rule

Chapter 1.2 resolved $\tfrac00$ by factoring, rationalising, or recognising a
standard limit. L'Hôpital handles the cases none of those reach.

If $\lim \tfrac{f}{g}$ is $\tfrac00$ or $\tfrac{\infty}{\infty}$, then

$$\lim\frac{f(x)}{g(x)} = \lim\frac{f'(x)}{g'(x)}$$

provided the second limit exists.

```math verify
lim x->0 sin(x)/x = 1
lim x->0 (exp(x) - 1)/x = 1
lim x->oo x/exp(x) = 0
lim x->0 (1 - cos(x))/x**2 = 1/2
```

All four verified, and all four are one or two applications of the rule. The
last needs it twice: $\tfrac{1-\cos x}{x^2} \to \tfrac{\sin x}{2x} \to
\tfrac{\cos x}{2} = \tfrac12$.

:::warning
**Check the form first, every time.**

L'Hôpital applies only to $\tfrac00$ and $\tfrac{\infty}{\infty}$. Applied to
anything else it gives a confidently wrong answer:
$\lim_{x\to 0}\tfrac{x+1}{x+2}$ is plainly $\tfrac12$, and differentiating top
and bottom gives $\tfrac11 = 1$.

Nothing warns you. The rule produces a number either way, and only checking the
form distinguishes a valid application from a wrong one.
:::

**Differentiate top and bottom separately** — this is not the quotient rule, and
using the quotient rule here is the other standard error.

Other indeterminate forms — $0\cdot\infty$, $\infty - \infty$, $1^\infty$ — must
be algebraically rearranged into a quotient before the rule applies.

:::quiz
{
  "question": "A particle has v(t) = t² − 4. Over 0 ≤ t ≤ 3, how does total distance compare with displacement?",
  "options": [
    {
      "text": "Total distance is larger, because v changes sign at t = 2",
      "correct": true,
      "why": "v is negative on [0,2) and positive on (2,3]. Displacement lets the backwards stretch cancel part of the forwards one; total distance adds their magnitudes, so it is strictly larger."
    },
    {
      "text": "They are equal, since the particle ends up ahead of where it started",
      "correct": false,
      "why": "Where it ends up is irrelevant. They are equal only when v never changes sign, and here it does at t = 2."
    },
    {
      "text": "Displacement is larger, since it integrates v rather than |v|",
      "correct": false,
      "why": "|v| ≥ v everywhere, so the distance integral can never be smaller. Displacement is at most equal and here strictly less."
    },
    {
      "text": "It cannot be determined without the starting position",
      "correct": false,
      "why": "Both are computed from velocity alone. The starting position shifts where the particle is, not how far it goes."
    }
  ]
}
:::

:::recap
- A derivative's units state its meaning. Interpret with a sentence naming the
  units and the direction, not a bare number.
- $v = s'$, $a = v' = s''$. At rest where $v = 0$; turning where $v$ changes
  sign; speeding up where $v$ and $a$ share a sign.
- Displacement is $\int v$; total distance is $\int|v|$, split at every sign
  change.
- L'Hôpital applies **only** to $\tfrac00$ and $\tfrac\infty\infty$ — check the
  form first, since it returns a plausible number regardless.
- Differentiate numerator and denominator separately; it is not the quotient
  rule.
:::
