# CalTB

An interactive **AP Calculus AB/BC** textbook, where every worked result is
checked by a program and every graph is something you can move.

In the same family as [CppTB](https://github.com/Abiel990310/CppTB),
[JavaTB](https://github.com/Abiel990310/JavaTB) and
[CsaTB](https://github.com/Abiel990310/CsaTB).

> **Not an official College Board product.** AP® is a trademark of the College
> Board, which does not endorse and is not involved with this book. Every
> practice question here is original, written to the same shapes the exam uses —
> none is reproduced from a real exam.

## One book, both courses

BC is AB plus more, not a separate course, so this is one book. Every chapter
and problem is tagged `ab` or `bc`; an AB reader filters to AB and never sees
series.

## The idea

The sibling books lean on a compiler: a claim is true because the program runs.
Here the equivalent is symbolic — every derivative, integral, limit and series
in the prose is verified by SymPy, and your answers are graded by symbolic
equivalence rather than string matching, so a correct answer written differently
is still correct.

And where a graph explains something, it is a graph you can drag: watch a secant
become a tangent as *h* → 0, or a Riemann sum converge as *n* grows.

## Status

Earliest stage — the engine is not built yet. See
[`docs/ROADMAP.md`](docs/ROADMAP.md) for the plan and the order.
