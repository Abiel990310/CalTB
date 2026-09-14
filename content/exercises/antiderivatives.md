---
id: antiderivatives
title: "Four antiderivatives"
difficulty: core
chapter: substitution
topics: [integration, substitution]
scope: ab
---

Give an antiderivative of each. The constant of integration is optional — any
correct antiderivative is accepted, since they all differ by a constant.

```answer
prompt: ∫ 6x² dx
reference: 2*x**3
mode: antiderivative
variable: x
accept:
  - 2*x**3 + C
  - 2*x**3 + 11
  - 2*x*x*x
reject:
  - 6*x**3
  - 12*x
  - x**3/3
```

```answer
prompt: ∫ x·e^(x²) dx
reference: exp(x**2)/2
mode: antiderivative
variable: x
accept:
  - exp(x**2)/2 + C
  - 0.5*exp(x**2)
reject:
  - exp(x**2)
  - x*exp(x**2)/2
  - exp(x**2)*x**2/2
```

```answer
prompt: ∫ 1/(x + 3) dx
reference: log(x + 3)
mode: antiderivative
variable: x
accept:
  - log(x + 3) + C
  - log(3 + x)
reject:
  - log(x) + 3
  - 1/log(x + 3)
  - -1/(x + 3)**2
```

```answer
prompt: ∫ sin(x)·cos(x) dx
reference: sin(x)**2/2
mode: antiderivative
variable: x
accept:
  - sin(x)**2/2 + C
  - -cos(x)**2/2
  - -cos(2*x)/4
reject:
  - sin(x)*cos(x)
  - cos(x)**2/2
  - -sin(x)*cos(x)
```

## Notes
**Always differentiate your answer.** Every rejection below would have been
caught in seconds by doing so, and it is the only check available on an exam.

The last problem is the interesting one. Three *different-looking* answers are
all accepted:

$$\frac{\sin^2 x}{2}, \qquad -\frac{\cos^2 x}{2}, \qquad -\frac{\cos 2x}{4}$$

They differ by constants — $\tfrac{\sin^2x}{2} + \tfrac{\cos^2x}{2} = \tfrac12$,
and the double-angle identity supplies the third — so all three differentiate to
$\sin x\cos x$ and all three are correct.

This is exactly why the grader compares **derivatives** rather than expressions.
A reader who substitutes $u = \sin x$ and a reader who substitutes $u = \cos x$
get answers that look nothing alike, and both have done the problem.
