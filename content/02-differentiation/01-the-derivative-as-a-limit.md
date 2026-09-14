---
title: "The derivative as a limit"
navTitle: "The derivative"
summary: >-
  A slope needs two points, and a tangent line only has one. The difference
  quotient is how you get the second one and then take it away again.
objectives:
  - Write the difference quotient for a function at a point
  - Explain why the limit is needed and what goes wrong without it
  - Compute a derivative from the definition, not the rules
  - Say where a function fails to be differentiable, and why
scope: ab
status: complete
standard: none
---

A slope needs two points. That is not a limitation of the notation — it is what
a slope *is*: a change in one thing divided by a change in another. Ask for the
slope at a single point and the question appears to be malformed, because
dividing by a change of zero is not a small number, it is nothing at all.

And yet "how fast is this changing *right now*" is an obviously sensible
question. A car has a speed at the instant you glance at the speedometer, not
just an average over the last minute.

The whole of differential calculus is the trick for answering it. Take a second
point, at a distance *h*. Compute the slope you can actually compute. Then let
*h* go to zero and watch where the answer settles.

:::graph
{
  "kind": "secant",
  "title": "Drag h towards zero. Watch the line, and watch the number.",
  "fn": "x**2",
  "domain": [-0.5, 2.6],
  "range": [-2, 7],
  "at": 1,
  "controls": [
    { "name": "h", "label": "h", "min": 0.01, "max": 2, "step": 0.01, "value": 1.5 }
  ]
}
:::

The line through the two points is a **secant**. As *h* shrinks, the second
point slides towards the first, the secant pivots, and its slope approaches
something. At *h* = 1.5 the slope reads 3.5; at *h* = 0.5, 2.5; at *h* = 0.01,
2.01. It is heading for 2, and it never gets there, because at *h* = 0 there is
no second point and no line.

That is the point worth sitting with: **the answer is not the value at zero. It
is the value the answer is heading towards.**

## The difference quotient

For a function *f* and a point *a*, the slope of the secant through
(*a*, *f*(*a*)) and (*a*+*h*, *f*(*a*+*h*)) is

```
f(a + h) - f(a)
---------------
       h
```

and the derivative is what that approaches as *h* → 0:

```
f'(a) = lim(h→0)  [ f(a + h) - f(a) ] / h
```

Every derivative rule you will meet is a shortcut for this limit. They are
worth knowing, and they are not worth mistaking for the definition — a rule
tells you the answer, and the definition tells you what the answer *means*.

## Doing it by hand, once

Take *f*(*x*) = *x*², at *a* = 1. Expand:

```
(1 + h)² - 1²      1 + 2h + h² - 1      2h + h²
--------------  =  ----------------  =  --------  =  2 + h
      h                   h                h
```

That last cancellation is the entire trick. Before it, the expression is 0/0 at
*h* = 0 and tells you nothing. After it, the expression is `2 + h`, which is
perfectly well behaved at *h* = 0 and says 2.

The two expressions are equal **everywhere except at h = 0**, and the limit only
cares about what happens near zero, not at it. That is why the cancellation is
legitimate.

```math verify
(1 + h)**2 - 1 = 2*h + h**2
lim h->0 ((1 + h)**2 - 1)/h = 2
d/dx x**2 = 2*x
```

The third line is the general result: the slope at *a* is 2*a*, which at *a* = 1
is 2 — the number the widget above was creeping towards.

## Why the limit is not optional

It is tempting to read the difference quotient as "the slope when *h* is very
small" and skip the limit. Two things go wrong.

**The first is that "very small" is not a number.** Any *h* you pick gives a
secant, not a tangent, and the answer it gives is wrong by an amount you have
chosen not to measure. For *x*² at 1 the secant slope is exactly `2 + h` — so
picking *h* = 0.001 gives 2.001, and the error is not a rounding artefact but
the actual answer to a slightly different question.

**The second is that the limit can exist when no single small value is right.**
That is the case the definition handles and arithmetic does not.

```math verify
lim h->0 (sin(h))/h = 1
lim h->0 (cos(h) - 1)/h = 0
lim h->0 (exp(h) - 1)/h = 1
```

Those three are the derivative of sin, cos and exp at zero, each computed
straight from the definition, and none of them simplifies by cancelling a factor
of *h*. There is no algebra that makes `sin(h)/h` into something defined at
zero — the limit is the only route to the answer.

## Where it fails

A derivative is a limit, and a limit need not exist. Three ways a function can
have no derivative at a point:

- **A corner.** |*x*| at 0: approach from the right and the secant slope is 1,
  from the left it is −1. The two one-sided limits disagree, so there is no
  limit and no derivative — even though the function is perfectly continuous.
- **A vertical tangent.** The cube root of *x* at 0: the secant slope grows
  without bound. The tangent line exists geometrically; its slope does not
  exist as a number.
- **A discontinuity.** If the function jumps, the difference quotient does not
  settle. Differentiability implies continuity, and this is the contrapositive.

The first is the one worth remembering, because it separates two ideas students
routinely fuse: **continuous does not mean smooth.** |*x*| has no break in it
and still has no derivative at the origin.

```math verify
abs(h)/h = abs(h)/h    # true but useless: the two-sided limit is what fails
```

That last line is deliberately vacuous, and it is in the chapter to make a
point about this book's own machinery: the checker will confirm an identity
that says nothing. **A verified claim is not automatically a meaningful one.**
What fails for |*x*| is not an identity but the existence of a two-sided limit,
and that is a fact about limits rather than an equation to check.

:::quiz
{
  "question": "For f(x) = x², the secant slope at a = 1 is exactly 2 + h. A student says \"so the derivative is 2 + h where h is infinitely small.\" What is wrong with that?",
  "options": [
    {
      "text": "Nothing is wrong; that is what the derivative means",
      "correct": false,
      "why": "It gives the right number here by accident of this example being simple, but the reasoning does not survive contact with sin(h)/h, where no cancellation is available and there is no 'infinitely small h' to substitute."
    },
    {
      "text": "There is no such number as an infinitely small h — the limit describes what the slope approaches, not a value it takes",
      "correct": true,
      "why": "Exactly. Every real h gives a secant and a wrong answer; the derivative is the number those wrong answers approach. 'Infinitely small' sounds like a value but names nothing in the real numbers."
    },
    {
      "text": "The secant slope is 2 + h only for a = 1, so the statement does not generalise",
      "correct": false,
      "why": "True but beside the point — the general result is 2a + h, and the same objection applies to it. The problem is the phrase 'infinitely small', not the specific point."
    },
    {
      "text": "The derivative of x² is 2x, so the student has the wrong function",
      "correct": false,
      "why": "The student's arithmetic is right: at a = 1, 2a is 2, which is what 2 + h approaches. The error is in what they think h is, not in the algebra."
    }
  ]
}
:::

:::recap
- A slope needs two points; the difference quotient supplies a second one at
  distance *h* and then removes it by taking a limit.
- `f'(a) = lim(h→0) [f(a+h) − f(a)] / h`. Every differentiation rule is a
  shortcut for this, and none of them replaces it.
- The cancellation that makes the quotient computable is legal because the two
  expressions agree everywhere except at *h* = 0, and the limit does not look
  at *h* = 0.
- The limit is not a stand-in for "a very small *h*". For sin(*h*)/*h* there is
  no algebra to cancel and no small value that is correct.
- Continuous does not mean differentiable: |*x*| is continuous at 0 and has no
  derivative there, because the one-sided slopes disagree.
:::
