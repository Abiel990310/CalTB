# What to write next

Take the top unticked item. One item per session, one item per commit.

## Read this first

**The unit list below is not verified against the current CED.** It was written
from knowledge, not from the College Board's published Course and Exam
Description. Before Wave A:

- [ ] **Check the current CED.** Confirm the units, their order, their exam
      weightings, which topics are BC-only, and the calculator / no-calculator
      split. Correct this file and record the date of the check.

## One book, two courses

BC is not a parallel course to AB — it is AB plus more: series, parametric and
polar, a few extra integration techniques. The BC exam even reports an AB
subscore.

So this is **one book**, and every chapter and every problem carries a
`scope: ab | bc` in its front-matter. An AB reader filters to AB and never sees
series; a BC reader sees everything. `/reference/` and `/progress/` already
render from front-matter, so this costs almost nothing — but it has to be there
from the first chapter, because retrofitting a scope tag across a finished book
means re-reading every problem.

Two books would have meant maintaining two copies of eighty per cent of the
same material. That decision is settled; do not relitigate it.

## The engine work, which comes first

This is the part that makes the book worth existing, and none of it exists yet.
CppTB's rule — *if a claim cannot be demonstrated by a program that runs, write
the program or delete the claim* — needs a new machine here, because there is no
compiler to lean on.

- [x] **A symbolic verifier.** `npm run verify:math`, the analogue of compiling.
      Done 2026-09-14. Five claim forms (derivative, integral, limit, series,
      identity) in ```math verify blocks; SymPy decides each. Integrals are
      checked by differentiating the claimed antiderivative, so `+ C` is handled
      by the definition rather than by a special case. Three verdicts, and the
      third is the point: a claim SymPy cannot decide is reported `unproved` and
      fails the build, because the book may not assert what no program can
      check. The checker has its own test (`verify:selftest`, 18 cases) that
      runs first — a change that stopped it catching false mathematics would
      otherwise look like a green build. See `docs/AUTHORING.md`.
- [ ] **Symbolic answer grading.** A reader types `e^x(x-1)+C` and SymPy decides
      equivalence to the reference, up to the constant of integration. String
      matching is not acceptable here — a grader that rejects a correct answer
      written differently is worse than no grader, because readers stop
      believing it.
- [x] **An interactive graph widget.** Done 2026-09-14. `:::graph` blocks, two
      kinds so far, deliberately preset rather than a general plotter — one
      preset that does a thing exactly right beats a configurable one that does
      four adequately.
      - [x] `secant` — drag *h* → 0 and watch the slope settle
      - [x] `riemann` — drag *n*, toggle left / right / midpoint / trapezoid,
            with the error against the exact value when the spec gives one
      - [x] `taylor` — add terms, watch it hug the curve then fly off at the
            edges, with the worst error over the window reported honestly
      - [ ] `slopefield` — a draggable initial condition tracing its solution
- [ ] **MCQ and free-response problem shapes.** The quiz widget ports from
      JavaTB unchanged, including the rule that every wrong option needs a
      `why`. Free response needs part-by-part entry and **rubric-point
      scoring** — AP awards points per rubric line, and "justify your answer"
      earns nothing without the justification. Grading against rubric points
      rather than the final number is the clearest reason for this book to
      exist.

## Provisional unit structure

To be confirmed against the CED. AB unless marked.

- [ ] 1 Limits and continuity
- [ ] 2 Differentiation: definition and basic rules
- [ ] 3 Differentiation: composite, implicit, and inverse functions
- [ ] 4 Contextual applications of differentiation
- [ ] 5 Analytical applications of differentiation
- [ ] 6 Integration and accumulation of change
- [ ] 7 Differential equations
- [ ] 8 Applications of integration
- [ ] 9 Parametric, polar, and vector-valued functions — **BC**
- [ ] 10 Infinite sequences and series — **BC**

## Rules specific to this book

- **Problems are original.** Real College Board questions are copyrighted. Same
  archetypes, same difficulty, never transcribed.
- **This is not an official College Board product** and must not imply it is.
- **Every mathematical claim is machine-checked**, or it is deleted. Same rule
  as the compiled books; different machine.
- **A graph that cannot be moved is a picture**, and a picture is usually a sign
  the chapter has not found its demonstration yet.
