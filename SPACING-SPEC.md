# Vertical rhythm fix — spec

Prompt written from measurement, not impression. Numbers come from a headless audit of the live page
that finds every vertical band containing no text, image or icon.

## Measured baseline

| | 1440px | 390px |
|---|---|---|
| Page height | 5107px | 9627px |
| Ink (bands containing content) | 2814px — **55%** | 4657px — **48%** |
| Dead space in bands ≥56px | **1551px — 30% of the page** | **1981px — 21%** |
| Bands ≥56px | 13 | 22 |

Worst offenders at 1440px:

| Gap | Between |
|---|---|
| 178px | HCP band → Newsletter |
| 166px | Newsletter → Footer |
| 159px | Upcoming sessions → "Where would you like to start?" |
| 143px | Hero caption → "Latest amyloidosis news" |
| 138px | Quick-access cards → Spotlight Series |
| 132px | Featured → "In their words" |
| 132px | **Inside** the news column, below the third news item |
| 128px | Community voices → HCP band |

Note two measurement artifacts to ignore: form inputs and unlabelled media register as gaps because
they contain no text node (e.g. the newsletter email field, the footer mark).

## Root causes

1. **Doubled section padding at every boundary.** Sections use `py-12 lg:py-16` (48/64px). Where two
   meet, the boundary is 96–128px of pure padding, before any margin on the first heading.
2. **Inconsistent scale.** Three different rhythms are in use — `py-12 lg:py-16`, `py-11 lg:py-14`,
   `pt-9 pb-11 lg:pt-11 lg:pb-14`. Nothing enforces a common step.
3. **Unbalanced grid columns.** The news column's content is shorter than the sessions panel beside
   it, and nothing anchors its base, leaving the 132px void the review flagged.
4. **Double-counted card spacing.** Quick-access card descriptions carry `mb-4` *and* the CTA row
   carries `mt-auto pt-4`, so single-column mobile gets 32px plus a border between them (73px
   measured between consecutive cards).
5. **Hero bottom padding** (`pb-10 lg:pb-20`) stacks on top of the following section's top padding.

## Horizontal baseline

Measured separately, because the cause turned out to be different from the vertical one.

| Viewport | Container | Side gutters | Width unused |
|---|---|---|---|
| 1440px | 1240px | 100px each | 14% |
| 1920px | 1240px | 340px each | **35%** |

**Inside** the container there is very little waste — blocks use 1054–1176px of the 1240px, so only
32–105px sits unused on the right, which is normal ragging. The waste is the **container cap itself**:
`max-w-[1240px]` never grows, so on a 1920px monitor the page reads as a narrow ribbon with a third of
the screen empty.

Prose is already constrained by its own `max-w-xl` / `max-w-3xl`, so raising the container widens the
*grids* (quick-access cards, spotlight cards, footer columns) without lengthening reading lines.

**Change:** container becomes `max-w-[1240px] 2xl:max-w-[1440px]`. Deliberately not wider — beyond
~1440px the four-card row starts to look sparse and the eye has too far to travel between the news
column and the sessions panel.

## Rules

- **One section step:** `py-8 lg:py-10` (32/40px). Applies to every band, whatever its background.
  Target boundary ≈64px mobile, ≈80px desktop.
- **Heading block → content:** `mt-6`, not `mt-7`/`mt-8`.
- **Never pay twice for the same gap.** A trailing margin on the last child *or* section padding, not
  both.
- **Columns in a grid must terminate together.** If one column is naturally shorter, either give it
  more content or anchor its base with an action; do not leave the void.
- Padding may not be reduced below 32px mobile / 40px desktop — this is a low-cognitive-load patient
  site and cramping it is a worse failure than a little slack.

## Changes

1. All section padding → `py-8 lg:py-10`. Hero → `pt-8 pb-8 lg:pt-14 lg:pb-10`.
2. News column: add a fourth news item, and move "All news" from the top-right to the column foot as
   a full-width link, so the column has a proper terminus and both columns end together.
3. Remove `mb-4` from quick-access card descriptions; `mt-auto pt-4` on the CTA row already spaces it.
4. Heading→content margins `mt-7`/`mt-8` → `mt-6`.
5. Newsletter card inner padding `p-6 sm:p-9 lg:p-12` → `p-6 sm:p-8 lg:p-10`.

## Acceptance criteria

- Dead space ≤ **18%** of page height at 1440px (from 30%).
- **No band ≥120px** at either width, excluding the known form/media artifacts.
- News-column trailing void ≤ **24px** (from 132px).
- No section padding below 32px mobile / 40px desktop.
- Ink share ≥ 65% at 1440px (from 55%).
- No horizontal overflow, no wrapped nav, no JS errors — the existing header and menu checks still pass.
