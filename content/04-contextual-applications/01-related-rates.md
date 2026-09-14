---
title: "Related rates"
navTitle: "Related rates"
summary: >-
  Two quantities tied by an equation, both changing with time. Differentiate the
  relationship, not the numbers.
objectives:
  - Set up a related-rates problem from a geometric relationship
  - Differentiate an equation implicitly with respect to time
  - Know why numbers must be substituted only after differentiating
  - Interpret the sign of a rate
scope: ab
status: complete
standard: none
---

A ladder slides down a wall. A balloon inflates. A shadow lengthens. In each,
two quantities are locked together by geometry, and knowing how fast one changes
tells you how fast the other must.

The technique is one idea: **differentiate the relationship with respect to
time.** Every variable becomes a rate via the chain rule, which is why chapter
2.3 was worth the effort.

## The method

1. **Draw it**, and name the changing quantities as variables. Not numbers —
   variables.
2. **Write the equation** relating them. Usually Pythagoras, a volume formula,
   or similar triangles.
3. **Differentiate both sides with respect to $t$.** Every variable picks up a
   $\tfrac{d\ }{dt}$ factor.
4. **Substitute the numbers — now, and not before.**
5. **Solve, and check the sign.**

Step 4 is where most marks are lost, and it deserves its own warning.

:::pitfall
**Never substitute a changing quantity before differentiating.**

If a ladder's base is $6$ m from the wall *at this instant*, writing $x = 6$ into
the equation first turns a variable into a constant. Its derivative then comes
out as zero, the relationship collapses, and the answer is wrong in a way that
leaves no trace.

Substitute only after every derivative has been taken. Constants that genuinely
never change — a ladder's length, a cone's fixed angle — may be substituted
early, and that is the only exception.
:::

## The ladder

A $10$ m ladder leans against a wall. The base slides out at $2$ m/s. How fast
is the top falling when the base is $6$ m from the wall?

With $x$ the base distance and $y$ the height, Pythagoras gives $x^2 + y^2 = 100$.
The $100$ is a genuine constant — the ladder does not stretch — so it may stay.

Differentiating with respect to $t$:

$$2x\frac{dx}{dt} + 2y\frac{dy}{dt} = 0$$

```math verify
d/dx (x**2 + y**2) = 2*x
d/dt (t**2) = 2*t
```

*Now* substitute: $x = 6$, so $y = 8$, and $\tfrac{dx}{dt} = 2$:

$$2(6)(2) + 2(8)\frac{dy}{dt} = 0 \;\Longrightarrow\; \frac{dy}{dt} = -\frac{24}{16} = -1.5$$

The top falls at $1.5$ m/s. **The minus sign is the answer, not an error** — $y$
is decreasing. A related-rates answer whose sign contradicts the physical story
means a slip somewhere.

## The cone, and why the rate is not constant

Water pours into an inverted cone at $3$ m³/min. The cone is $4$ m tall with a
$2$ m top radius. How fast is the level rising when the water is $2$ m deep?

$V = \tfrac13\pi r^2 h$ has two variables, and related rates wants one. Similar
triangles give $\tfrac{r}{h} = \tfrac{2}{4}$, so $r = \tfrac{h}{2}$:

$$V = \frac{1}{3}\pi\left(\frac{h}{2}\right)^2 h = \frac{\pi h^3}{12}$$

```math verify
pi*(x/2)**2*x/3 = pi*x**3/12
d/dx (pi*x**3/12) = pi*x**2/4
```

So $\tfrac{dV}{dt} = \tfrac{\pi h^2}{4}\tfrac{dh}{dt}$, and at $h = 2$ with
$\tfrac{dV}{dt} = 3$:

$$3 = \frac{\pi(4)}{4}\frac{dh}{dt} \;\Longrightarrow\; \frac{dh}{dt} = \frac{3}{\pi} \approx 0.95\ \text{m/min}$$

Note what the $h^2$ means physically: **the level rises more slowly as the cone
fills**, because each extra centimetre of depth needs more water than the last.
Pouring at a constant rate does not raise the level at a constant rate, and the
equation says so.

:::note
Eliminating a variable using a fixed geometric ratio is the step that makes cone
and similar-triangle problems work. Doing it *before* differentiating is correct
here and is not the same as substituting a changing value — a ratio that holds
at every instant is a relationship, not a snapshot.
:::

## Reading the signs

| Sign of the rate | Meaning |
|---|---|
| positive | the quantity is increasing |
| negative | decreasing |
| zero | momentarily unchanging — often a maximum or minimum |

Write the sign into the setup rather than patching it at the end: a ladder base
moving *away* has $\tfrac{dx}{dt} = +2$, and a balloon losing air has
$\tfrac{dV}{dt} < 0$. Getting the signs right at step 1 makes step 5 a check
rather than a guess.

:::quiz
{
  "question": "A spherical balloon is inflated at 100 cm³/s. Why does its radius grow more slowly as it gets larger?",
  "options": [
    {
      "text": "Because dV/dt = 4πr²·dr/dt, so a fixed dV/dt divides by a growing r²",
      "correct": true,
      "why": "Differentiating V = (4/3)πr³ gives that relation, and the r² factor is the surface area. Spreading the same volume over a bigger surface raises it less."
    },
    {
      "text": "Because the rubber resists more as it stretches",
      "correct": false,
      "why": "A physical story, but not what the mathematics says — the result holds for a perfectly ideal balloon with no resistance at all. It is geometry, not material."
    },
    {
      "text": "It does not — a constant dV/dt gives a constant dr/dt",
      "correct": false,
      "why": "That would need V proportional to r, but V goes as r³. The relationship between the rates carries an r² factor that changes as the balloon grows."
    },
    {
      "text": "Because dr/dt = dV/dt divided by the volume",
      "correct": false,
      "why": "Dimensionally impossible — that would give units of 1/length. The correct divisor is the surface area 4πr², which does have the right units."
    }
  ]
}
:::

:::recap
- Differentiate the **relationship** with respect to $t$; every variable picks
  up a rate by the chain rule.
- Substitute numbers only **after** differentiating. Fixing a changing quantity
  early kills its derivative silently.
- A genuine constant, or a ratio that holds at every instant, may be substituted
  first — those are relationships, not snapshots.
- Signs carry meaning: negative means decreasing, and an answer whose sign
  contradicts the story is a slip.
- A constant volume rate rarely gives a constant length rate — the geometry
  factor $r^2$ or $h^2$ is the reason.
:::
