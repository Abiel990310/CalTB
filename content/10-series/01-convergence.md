---
title: "Series and convergence"
navTitle: "Convergence"
summary: >-
  An infinite sum that has a finite answer, and the tests that decide which
  sums do. The BC unit that carries the most marks.
objectives:
  - Distinguish a sequence from a series
  - Apply the nth-term test and say what it cannot do
  - Recognise and sum a geometric series
  - Choose an appropriate convergence test
scope: bc
status: complete
standard: none
---

Adding infinitely many numbers should give infinity. Sometimes it does not, and
that is the whole subject.

$$\frac12 + \frac14 + \frac18 + \frac1{16} + \cdots = 1$$

```math verify
sum n=1..oo 1/2**n = 1
sum n=0..oo 1/2**n = 2
```

Both are verified, and the difference between them is only where the sum starts
— which is worth noticing early, because an off-by-one in the index is the most
common arithmetic slip in this unit.

## Sequence against series

- A **sequence** is a list: $a_1, a_2, a_3, \ldots$
- A **series** is the sum of a sequence: $\sum a_n$.

They converge for different reasons, and confusing them is fatal. The sequence
$\tfrac1n$ converges — to zero. The series $\sum\tfrac1n$ diverges — to infinity.
Same numbers, opposite answers.

A series converges when its **partial sums** $S_N = \sum_{n=1}^{N} a_n$ approach
a limit. The series is the limit of a sequence — the sequence of partial sums,
not the sequence of terms.

## The nth-term test

If $\lim_{n\to\infty} a_n \ne 0$, the series **diverges**.

```math verify
lim n->oo 1/n = 0
lim n->oo n/(n + 1) = 1
```

$\sum \tfrac{n}{n+1}$ diverges, because its terms head for $1$ rather than $0$ —
you are eventually adding roughly $1$ forever.

:::pitfall
**The test only ever proves divergence.** Terms going to zero proves nothing at
all.

$\tfrac1n$ and $\tfrac1{n^2}$ both have terms tending to zero. The first series
diverges and the second converges. Writing "the terms go to zero, so it
converges" is the single most common error in the unit, and it earns no marks
even when the conclusion happens to be right.
:::

```math verify
sum n=1..oo 1/n**2 = pi**2/6
```

That is the convergent one, and its value — Euler's famous result — is verified
above. The harmonic series $\sum\tfrac1n$ has no such value, because it has no
sum.

## Geometric series

The one family with a closed form, and therefore the one worth knowing cold:

$$\sum_{n=0}^{\infty} ar^n = \frac{a}{1-r}\quad\text{when } |r| < 1$$

and diverges when $|r| \ge 1$.

```math verify
sum n=0..oo (1/3)**n = 3/2
sum n=0..oo (1/2)**n = 2
sum n=1..oo (1/3)**n = 1/2
```

Compare the first and third: same ratio, different starting index, and the
answers differ by exactly the $n = 0$ term, which is $1$. Starting index is not
a detail.

**Why $|r| < 1$.** The partial sum is $a\tfrac{1-r^N}{1-r}$, and $r^N \to 0$
exactly when $|r| < 1$. Outside that, $r^N$ grows or oscillates and nothing
settles.

## Choosing a test

| The series looks like | Try |
|---|---|
| $ar^n$ | geometric — and you get the exact sum |
| $\tfrac{1}{n^p}$ | $p$-series: converges exactly when $p > 1$ |
| terms not going to zero | nth-term test, done |
| alternating signs | alternating series test |
| a messy rational function | limit comparison with its dominant behaviour |
| factorials or $n$th powers | ratio test |

```math verify
sum n=1..oo 1/n**4 = pi**4/90
sum n=1..oo 1/n**3 = zeta(3)
```

Both are $p$-series with $p > 1$, so both converge — and the contrast between
them is the point. The fourth-power sum has the tidy closed form
$\tfrac{\pi^4}{90}$. The cube sum has none: the best anyone can write is
$\zeta(3)$, which is a *name* for the number rather than a formula for it. It
is called Apéry's constant, and proving it is even irrational took until 1978.

Writing the second claim as a decimal is what I tried first, and the checker
refused it — correctly, because a truncated decimal is not equal to the sum. It
would not prove the claim false either, which is exactly the `unproved` verdict
doing its job.

So: **knowing a series converges is a different question from knowing its
value**, and the exam almost always asks the first.

:::note
That distinction is why the tests matter. For all but geometric and telescoping
series, the tests tell you *whether* a sum exists without producing it. A
question asking "does this converge" is answered by a test; one asking "what
does it converge to" is nearly always geometric in disguise.
:::

:::quiz
{
  "question": "A student writes: 'The terms of ∑ 1/n go to zero, so the series converges.' What is wrong?",
  "options": [
    {
      "text": "The nth-term test can only prove divergence; terms going to zero proves nothing",
      "correct": true,
      "why": "It is the converse error. ∑1/n is the harmonic series and diverges, despite its terms tending to zero — so the reasoning is invalid and the conclusion is also false."
    },
    {
      "text": "The terms of 1/n do not actually go to zero",
      "correct": false,
      "why": "They do — 1/n → 0 is verified in this chapter. The premise is fine; the inference from it is not."
    },
    {
      "text": "Nothing is wrong; ∑1/n converges to a finite value",
      "correct": false,
      "why": "The harmonic series diverges. Its partial sums grow like ln N — slowly, without bound, which is what makes it such a persuasive counterexample."
    },
    {
      "text": "The student should have used the ratio test, which is the only valid test here",
      "correct": false,
      "why": "The ratio test is inconclusive for 1/n — the limit of the ratio is exactly 1. The p-series rule settles it: p = 1 is not greater than 1, so it diverges."
    }
  ]
}
:::

:::recap
- A sequence is a list; a series is its sum. $\tfrac1n$ converges as a
  sequence and diverges as a series.
- A series converges when its **partial sums** approach a limit.
- The nth-term test proves divergence only. Terms tending to zero proves
  nothing.
- Geometric: $\sum ar^n = \tfrac{a}{1-r}$ for $|r| < 1$, and the starting index
  changes the answer.
- $p$-series converge exactly when $p > 1$.
- Knowing a series converges and knowing its value are different questions, and
  the exam usually asks the first.
:::
