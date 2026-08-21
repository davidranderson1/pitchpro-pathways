# pitchpro-pathways

Static site and interactive mockups for **PitchPro Pathways** and the Motion Intelligence platform, published with GitHub Pages.

**Live:** https://davidranderson1.github.io/pitchpro-pathways/
**All pages index:** https://davidranderson1.github.io/pitchpro-pathways/hub.html

Every page also carries a floating **◈ All pages** button in the bottom-right corner that opens the same index without leaving the page.

---

## What is here

### Public site

| Page | What it is |
| --- | --- |
| `index.html` | Public marketing site. Links out to the three guide pages. |
| `pro-pathways.html` | Programme site. |
| `sandro-rajic-website.html` | Movement assessment practice site. The one page without the floating button, so the index links to it in a new tab. |

### Motion Intelligence — "the Brain"

| Page | What it is |
| --- | --- |
| `motion-intelligence.html` | Platform concept, knowledge base, athlete profile, guide academy, integration map, build plan. |
| `device-intelligence.html` | Playermaker, Ōura and Plantiga translated into age-group percentile radar charts, with the subscription gate. |
| `deck.html` | Thirteen-slide meeting deck — options A and B, questions one to ten. |

### Player moments feature

| Page | What it is |
| --- | --- |
| `player-moments-flow.html` | Feature map, flow, build order and launch blockers. **Start here for this feature.** |
| `portal-player.html` | Player portal — timeline, composer, profile, goals, who sees what. |
| `portal-parent.html` | Parent portal — approvals queue, safety and permissions, promotion links. |
| `portal-guide.html` | Guide portal — player feed, comments, **my showcase**, my record. |
| `portal-admin.html` | Admin portal — safeguarding queue, guide conduct, audit log, compliance. |

### Guide pages

| Page | What it is |
| --- | --- |
| `guide-portal-sandro.html` | Guide profile page. Media showcase in its not-yet-connected state. |
| `guide-portal-nick.html` | Guide profile page. Media showcase in its not-yet-connected state. |
| `guide-portal-grego.html` | Guide profile page, Lovrencsics Academy. The worked example of the media showcase, with a featured video. |
| `grego-brand-guidelines.html` | Colours, type and usage. |

### Shared

| File | What it is |
| --- | --- |
| `hub.html` | The site index as a full page. |
| `site-nav.js` | The floating "All pages" button and overlay index. One include per page: `<script src="site-nav.js" defer></script>`. Self-contained — no CSS file, no dependencies. When a page is added, add it to the `PAGES` array here **and** to `hub.html`. |

---

## The media showcase

Each guide page has a `#showcase` section: a featured video, a row of clip and photo slots, and a panel setting out the media rules. The matching **My Showcase** screen in `portal-guide.html` is where a guide would connect a media platform, choose which video to feature, add photos, and write an introduction.

Only `guide-portal-grego.html` carries a real embed — a Fradi Média portrait of Lovrencsics Gergő, served through `youtube-nocookie.com`. The other guide pages show the empty state deliberately, rather than filling the space with stock footage.

**Nothing on the showcase is wired up.** The connect and upload controls are inert. The intended chain is Connect → Choose → Review → Live, with review before anything is published.

Rules written into the pages, and to be honoured by any future implementation:

- No recognisable child without their parent's written consent on file.
- Nothing that came from a family-only moment.
- No surnames, school kit, venue signage or training times.
- Same-day takedown on request, without a discussion.

---

## Conventions

- **One file per page, no build step.** Each page is a single self-contained HTML file with its own `<style>` block. Fonts come from Google Fonts; there is no bundler, package manager or CI.
- **Each page keeps its own palette.** The guide pages in particular are styled to their guide's brand, so shared components are re-implemented per page rather than centralised.
- **Wide tables sit in a `.tw` scroll container** so they scroll inside their own box instead of widening the page.
- **Anything editable in a mockup does nothing.** Buttons, fields and toggles are static. Screens are shown and hidden with a small inline script; there is no state, no storage and no back end.

## Before this is circulated widely

- **The repository is public**, so every page above is reachable by anyone with the address, whether or not it is linked from anywhere.
- **Placeholder statistics and testimonials are still present on several pages** and should be replaced with real figures, or removed, before the site is shared beyond the working group.
- Portal pages use **sample data** and are labelled as demos on screen.
