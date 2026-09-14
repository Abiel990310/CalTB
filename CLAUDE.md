# CalTB — working notes for Claude

An interactive **AP Calculus AB/BC** textbook, in the same family as CppTB,
JavaTB and CsaTB.

**Nineteen chapters written, 168 claims checked, 2 graded problems.** Units 1,
2, 3, 4, 6, 7, 8 and the BC parametric/polar unit are complete; unit 5 has one
chapter and the BC series unit has two, and both want more. The site engine,
KaTeX typesetting and three graph presets (secant, riemann, taylor) are in
place. `docs/ROADMAP.md` holds what is left; `docs/AUTHORING.md` documents how a
claim is written and proved.

## What makes this book different from the others

The compiled books lean on a compiler: a claim is true because the program runs.
There is no compiler here, so the equivalent machine had to be built — **SymPy
checking every worked result**. That part is done, and it is what lets this book
honour the family's rule at all.

Its grading counterpart is built too: **symbolic equivalence grading**, so a
reader's answer is judged by what it means rather than how it is spelled. Three
different-looking antiderivatives of sin·cos are all accepted, because the
grader compares derivatives rather than expressions.

The third piece is that a calculus idea is often best shown by a graph the
reader can *move*: drag *h* → 0 and watch the secant become the tangent. That
widget is shared with PhysTB — build it once, in a portable shape.

## The one rule, restated for this book

Nothing ships unverified. Every derivative, integral, limit and series in the
prose is checked by a program:

```bash
npm run setup      # installs SymPy, once
npm run verify     # self-test, then every claim in content/
```

A claim SymPy cannot decide comes back `unproved` and **fails the build**. That
is deliberate: it does not mean the claim is false, it means the book would be
asserting something no program can check, which is the thing this family exists
not to do. Rewrite it so it checks, or cut it.

The checker has its own test and it runs first, because a change that stopped it
catching false mathematics would otherwise look exactly like a green build.

## Settled decisions — do not relitigate

- **One book, not two.** BC is AB plus more, so a `scope: ab | bc` tag on every
  chapter and problem serves both. Two repos would duplicate eighty per cent of
  the content. The tag must be there from chapter one.
- **Problems are original.** College Board questions are copyrighted; write to
  the archetypes, never transcribe.
- **Not an official College Board product**, and nothing may imply otherwise.

## Before writing any chapter

`docs/ROADMAP.md` opens with an unticked item: check the unit list against the
current CED. What is in there was written from knowledge, not from the published
document. Do that first.

## Scheduling

Covered by **`trig_017zYznE5wwj44ZGRirzmBRL`**, the shared 07:00 UTC+8 routine.
One item per run. Do not create a second Routine.

**Pushing `main` deploys** to https://abiel990310.github.io/CalTB/ once the
engine and its workflow are in place.

## When porting the engine

Take it from CsaTB or JavaTB, and carry these across deliberately:

- The **search index must use `url()`** from `build/base.ts`, never a raw
  `/part/chapter/`. These sites are served from `/<repo>/` and a raw path 404s —
  invisibly, since `npm run dev` serves from `/`. That bug shipped in two books
  before it was caught.
- **Per-site localStorage keys.** All these sites share the `abiel990310.github.io`
  origin, so a generic progress key would let one book overwrite another's.
- **Theme key: use `tb-theme`.** Progress must stay per-book, but the theme is
  worth sharing, so a reader's choice follows them across the family. JavaTB
  already uses `tb-theme`; CppTB still uses `cpptb-theme` and should be aligned
  when someone is next in that file. This is a convention being adopted, not one
  already in place everywhere.
