# oneVoice redesign — mockups

Front-page mockups for the oneVoice / SomebodyTalkTo redesign, published for team review.

**Live:** https://askit-inc.github.io/onevoice-mockups/

> **Draft.** All headlines, statistics, names and body copy are placeholder content written to test
> layout and typography. Nothing here is medical information.

## Files

| File | What it is |
|---|---|
| `index.html` | Landing page / review guide |
| `onevoice-homepage.mockup.html` | The homepage design at full size — the implementation spec |
| `onevoice-homepage-responsive.mockup.html` | The same page in live frames at 390 / 834 / 1440 px |

The responsive file loads the page file in iframes, so there is exactly one copy of the design.

## How it works

Self-contained HTML using the Tailwind CSS Play CDN, so the utility classes, the `tailwind.config`
block and the `:root[data-tenant]` token block are all production-shaped — porting to a Next.js +
Tailwind component library is mechanical rather than a re-interpretation.

- **Accent tokens** — `--nv-accent-50…900` as RGB triplets, swapped per indication via
  `html[data-tenant]`. The warm neutral `ink` scale is shared by every community.
- **Content tokens** — every indication-variable string carries `data-t="…"`. Copy patterns are
  derived, not authored per community, e.g. `{name}: information, clinical trials and community support`.
- **Deep links** — `?tenant=scd`, `?notes=on`.

Adding an indication means one config entry: slug, display name, Drupal `domain_access` id, accent
palette name, icon mark.
