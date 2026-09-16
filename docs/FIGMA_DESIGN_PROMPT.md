# Revenant Marketing Site — Figma Design Prompts

Copy each block into Figma AI (Make Designs), Galileo, v0, or hand to a designer.
**Brand:** Revenant — disaster recovery proof for PostgreSQL. **Metaphor:** Shield / Aegis — protection, restore, evidence.

---

## Global design system (create this frame first)

```
Design a dark-mode SaaS design system called "Revenant Aegis".

COLORS:
- Abyss background: #070D18
- Void surface: #0C1929
- Shield blue: #0F4C6E
- Cyan glow (primary accent): #22D3EE
- Electric blue: #38BDF8
- Text primary: #F1F5F9
- Text muted: #94A3B8
- Success: #34D399
- Warning: #FBBF24
- Error: #F87171

TYPOGRAPHY:
- Headings & UI: IBM Plex Sans (600–700 weight)
- Code/CLI: JetBrains Mono

EFFECTS:
- Glass panels: rgba(15,25,45,0.72) with 1px border rgba(56,189,248,0.12), backdrop blur 16px
- Shield glow: cyan radial gradient behind hero shield, subtle hex grid at 56px
- Shadows: soft cyan outer glow on primary CTAs

COMPONENTS:
- Primary button: cyan gradient (#22D3EE → #0891B2), dark text, rounded-xl
- Secondary: glass border, white/5 fill
- Cards: glass-panel style, rounded-2xl
- Badge pills: cyan/10 bg, cyan/20 border

ICON MOTIF:
- Central shield shape with database cylinder + downward restore arrow inside
- Hexagonal grid lines, orbital rings (thin cyan circles)

Create: color styles, text styles, button variants, card, nav bar, footer, shield logo mark.
Frame size: 1440×900 desktop, 390×844 mobile.
```

---

## Prompt 1 — Homepage hero (the face of Revenant)

```
Landing page hero for "Revenant" — a powerful shield-themed DR (disaster recovery) SaaS.

Layout: 1440px wide, split 50/50.
LEFT:
- Small pill badge: "DR proof · PostgreSQL · AWS RDS" with shield icon
- Headline (large, bold): "Your backups are not proof until they restore." — second line in cyan glow
- Subhead: "Revenant is the shield between 'we have backups' and 'we can recover in minutes.' Free CLI for CI. Managed cloud drills. Signed evidence."
- Two CTAs: "Start 30-day trial" (primary cyan) + "Install CLI" (secondary glass)
- Trust row: icons + "Free forever CLI · Managed AWS drills · Signed evidence vault"

RIGHT:
- Large animated-style shield icon (cyan gradient fill, metallic edge highlight)
- Concentric thin orbital rings around shield
- Floating glass card below shield: monospace "revenant verify" + "RTO 4m 12s · all checks passed"
- Background: deep navy #070D18, subtle hex grid, radial cyan glow from top center

Mood: Premium cybersecurity, confident, not scary. Think Vercel meets Cloudflare — but for database recovery. Powerful, trustworthy, Indian SaaS quality.
```

---

## Prompt 2 — Features grid ("Shield for your data layer")

```
Section below hero: "A shield for your data layer"
Subtitle: "Most teams discover backup gaps during the outage."

6 feature cards in 3×2 grid (glass morphism):
1. Real restore drills — database icon — AWS RDS sandbox from snapshot
2. Signed evidence — document check — tamper-evident audit reports
3. One command in CI — terminal — GitHub Action, language agnostic
4. Shield-grade security — lock — keys stay in customer AWS
5. YAML in git — branch — validation plans in repo
6. Fleet health — chart — RTO trends dashboard

Each card: cyan icon in rounded square, white title, gray body text.
Hover state: slightly brighter border cyan/25, soft glow.
Background continues dark navy grid.
```

---

## Prompt 3 — CLI terminal showcase

```
Split section: left copy, right terminal mockup.

LEFT:
- Label "FREE CLI" in cyan caps
- Headline: "One command. Real restore proof."
- Body about CLI + GitHub Action, no account required
- Buttons: "Full CLI docs" + "GitHub Action"

RIGHT:
- macOS-style terminal window (dark glass)
- Title bar: red/yellow/green dots + "~/prod-api — revenant verify"
- Monospace output in colors:
  - prompts in cyan
  - success checks in green with ✓
  - RTO line in amber
  - reap message in gray
- Blinking cursor at end

Below: install command in copyable bar with copy button.

Style: developer-focused, crisp, JetBrains Mono.
```

---

## Prompt 4 — Pricing page

```
Pricing page for Revenant with 4 tiers in a row:

1. Developer — Free forever — CLI + GitHub Action
2. Starter — ₹999/mo — "Most popular" badge — 30-day trial — 1 workflow, managed AWS drill
3. Pro — ₹4,999/mo — 10 workflows, 3 parallel drills, Slack
4. Enterprise — Contact us — SSO, custom SLAs

Each card: glass panel, plan name, large price, tagline, 4 bullet checks with cyan checkmarks, CTA button at bottom.
Starter card: elevated, cyan border glow, "Recommended" pill.

Header: "Simple pricing. Serious protection."
Footer FAQ card: "What counts as a workflow?"

Currency: INR (₹). Dark theme consistent with homepage.
```

---

## Prompt 5 — Toast component showcase (open source UI)

```
Marketing section for "Revenant Toast" — a React notification component.

Layout: wide glass card, rounded-3xl.
LEFT: title "Revenant Toast", description about form feedback, react-hook-form friendly, dark mode.
RIGHT: 4 demo buttons — Success, Error, Warning, Info.

Show 2 example toast notifications floating top-right (stacked):
- Success toast: "Restore drill passed" / "RTO 4m 12s — evidence saved" — cyan accent, progress bar
- Error toast: "Sandbox failed" — red accent

Toast design: dark bg slate-900/90, colored left icon circle, dismiss X, 3px progress bar at bottom, subtle blur.

Link: "View component docs →"
```

---

## Prompt 6 — Logo / shield mark exploration

```
Logo exploration for "Revenant" — 4 variations on one artboard.

Concept: Shield (protection) + database restore (recovery proof).

Variation A: Minimal shield outline, single cyan stroke, DB cylinder inside
Variation B: Filled shield with gradient cyan→teal, white DB + down arrow
Variation C: Shield merged with PostgreSQL elephant silhouette (subtle)
Variation D: Hexagonal shield (futuristic) with checkmark

Wordmark: "Revenant" in IBM Plex Sans Semibold, optional "Cloud" in lighter weight.

Use on: dark #070D18 and light #F1F5F9 backgrounds.
Export: SVG-friendly, works at 32px favicon and 200px hero.
Avoid: generic padlock clipart, red alarm aesthetics, skull/hacker tropes.
```

---

## Prompt 7 — Mobile homepage

```
Mobile version (390px) of Revenant homepage.

Stack vertically:
1. Sticky nav: logo + hamburger
2. Hero: badge, headline (smaller), subhead, full-width CTAs stacked
3. Shield icon centered, smaller, with orbital rings
4. Feature cards single column
5. Terminal full width, horizontal scroll for long lines
6. Pricing cards horizontal scroll or stacked
7. Footer compact 2-column links

Touch targets min 44px. Keep cyan glow accents. Dark theme.
```

---

## Prompt 8 — Full page flow (Figma Make — one shot)

```
Create a complete marketing website design for Revenant (revenant.dev) — 5 pages linked in nav:

Pages: Home, CLI Docs, Pricing, Toast Component, Sign in CTA → app.revenant.dev

Visual identity: "Aegis" — dark navy shield theme, cyan electric accents, glass morphism cards, hex grid background, premium Indian B2B SaaS.

Home sections: Hero with shield, Features 6-grid, CLI terminal, Toast demo, Pricing preview 3 cards, final CTA banner.

Tone: Confident, technical, trustworthy. Tagline: "Prove your backups actually recover."

Fonts: IBM Plex Sans + JetBrains Mono.
Do NOT use purple gradients or generic startup illustrations.
```

---

## Asset checklist for designer

- [ ] Shield logo SVG (32, 64, 200, 512px)
- [ ] OG image 1200×630 (shield + headline on dark bg)
- [ ] Favicon ICO + SVG
- [ ] Terminal screenshot for social
- [ ] Pricing table desktop + mobile
- [ ] Toast component states (4 tones)
- [ ] Nav + footer component

---

## Reference URLs (for mood, not copy)

- Dark dev tools aesthetic: linear.app, vercel.com
- Security trust: cloudflare.com (structure, not colors)
- Existing app palette: app.revenant.dev login panel (navy + cyan aurora)
