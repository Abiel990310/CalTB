# What to write next

Take the top unticked item. One item per session, one item per commit.

## Read this first

**Unit structure checked 2026-09-14.** The ten units, their names and their
order match the published course; the unit titles in `content/*/index.md` are
now the College Board's own wording rather than a paraphrase.

What the check changed, and it was not cosmetic: **the chain rule was in unit 2
and related rates in unit 3**, where the real course puts them in units 3 and 4.
The roadmap list below had it right all along — the directories did not follow
it. Chapters moved accordingly, so the URLs under `/differentiation/` and the
old `/applications-of-derivatives/` changed.

- [x] **Check the current CED.** Done 2026-09-14.
- [ ] **Confirm against the CED PDF itself.** apcentral.collegeboard.org is
      blocked by this environment's network egress, so the unit names and
      weightings below came from secondary sources that agree with each other.
      They are consistent and almost certainly right, but they are not the
      primary document. Anyone who can open the PDF should confirm the
      weightings and the calculator / no-calculator split, which is still
      unverified.

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
- [x] **Symbolic answer grading.** Done 2026-09-14. `grade_answer.py` decides
      equivalence symbolically, with three allowances: the constant of
      integration (by comparing derivatives, so every correct antiderivative
      passes), unsimplified form, and numeric tolerance for a decimal answer to
      an exact question. Problems declare answers that must be accepted AND
      rejected, and the verifier requires at least one rejection — a problem
      that accepts everything is not a problem. 20-case grader self-test.
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

## Unit structure

The College Board's own unit names, checked 2026-09-14. AB weightings; BC
weightings are lower across units 1-8 because units 9 and 10 take up roughly a
third of that exam.

| # | Unit | AB weight | State |
|---|---|---|---|
| 1 | Limits and Continuity | 10-12% | done |
| 2 | Differentiation: Definition and Fundamental Properties | 10-12% | done |
| 3 | Differentiation: Composite, Implicit, and Inverse Functions | 9-13% | needs inverse functions |
| 4 | Contextual Applications of Differentiation | 10-15% | needs linearisation |
| 5 | Analytical Applications of Differentiation | 15-18% | extrema and shape only; wants MVT and optimisation |
| 6 | Integration and Accumulation of Change | 17-20% | done |
| 7 | Differential Equations | 6-12% | done |
| 8 | Applications of Integration | 10-15% | done |
| 9 | Parametric Equations, Polar Coordinates, and Vector-Valued Functions | **BC** | done |
| 10 | Infinite Sequences and Series | **BC**, ~17-18% of BC | convergence and Taylor done; wants the individual tests |

Unit 5 is the second-heaviest unit on the AB exam and currently has one chapter.
It is the most valuable thing left in this book.

## Rules specific to this book

- **Problems are original.** Real College Board questions are copyrighted. Same
  archetypes, same difficulty, never transcribed.
- **This is not an official College Board product** and must not imply it is.
- **Every mathematical claim is machine-checked**, or it is deleted. Same rule
  as the compiled books; different machine.
- **A graph that cannot be moved is a picture**, and a picture is usually a sign
  the chapter has not found its demonstration yet.
