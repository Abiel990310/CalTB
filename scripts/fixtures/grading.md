---
title: "Answer-grading fixture"
---

Cases with known verdicts, asserted by `verify:grading`. The `no` cases matter
most: a grader that stopped rejecting wrong answers would look like a passing
build, and a grader that rejects right ones destroys its own credibility.

```grade fixture
# reference | mode | yes/no | answer
x**2/2 | antiderivative | yes | x**2/2
x**2/2 | antiderivative | yes | x**2/2 + C
x**2/2 | antiderivative | yes | x**2/2 + 7
x**2/2 | antiderivative | yes | x*x/2
x**2/2 | antiderivative | no  | x**2
x**2/2 | antiderivative | no  | x**2/2 + x
exp(x)*(x - 1) | antiderivative | yes | (x - 1)*exp(x)
exp(x)*(x - 1) | antiderivative | yes | x*exp(x) - exp(x)
exp(x)*(x - 1) | antiderivative | no  | exp(x)*(x + 1)
2/3 | expression | yes | 2/3
2/3 | expression | yes | 4/6
2/3 | expression | yes | 0.6666666667
2/3 | expression | no  | 3/2
sin(x)**2 + cos(x)**2 | expression | yes | 1
(x + 1)**2 | expression | yes | x**2 + 2*x + 1
(x + 1)**2 | expression | no  | x**2 + 1
1/(x + 2) | expression | yes | (x + 2)**(-1)
pi/2 | expression | yes | pi/2
pi/2 | expression | no  | pi/4
x**2/2 | antiderivative | no  | this is not an expression
```
