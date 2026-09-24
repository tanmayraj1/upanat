# Upanat Studio — Storefront

Production build of the Upanat Studio storefront redesign, implemented from the
handoff in [`design-reference/HANDOFF.md`](design-reference/HANDOFF.md).

**Stack:** Next.js 14 (App Router) · React 18 · TypeScript · Tailwind CSS ·
Framer Motion. Statically exported, so it deploys to GitHub Pages with no server.

**Palette:** burgundy primary (`#7A1F2B`) / deep (`#5C1620`) / light (`#F3E1E3`),
gold linework, ivory ground, ink text. Tokens live in
[`tailwind.config.ts`](tailwind.config.ts) and are mirrored as CSS custom
properties on `:root` in [`globals.css`](src/app/globals.css).

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # static export → ./out
```

## What's here

| Route | Screen |
|---|---|
| `/` | Home — hero video, category grid, carousels, founder, reviews, newsletter |
| `/shop` | PLP with filters, sort, grid/list, search + category/gender deep links |
| `/product/[slug]` | PDP — gallery, sizes, pincode check, accordion, bundles, reviews |
| `/bag` · `/checkout` · `/order-confirmed` | Full purchase flow |
| `/wishlist` · `/account` · `/track` | Saved pairs, orders, addresses, tracking |
| `/about` · `/contact` · 404 | Studio story, channels, the unstitched-path page |

Overlays that live above every route: bag drawer, search, quick view, size
guide, image lightbox.

State (cart, wishlist, recently viewed, addresses, orders, account details) lives
in a reducer in [`src/store/StoreProvider.tsx`](src/store/StoreProvider.tsx) and
persists to `localStorage`. The product → variant(size) → cart → address shape
matches the commerce contract in the brief, so swapping in Shopify/Medusa means
replacing the data module and the reducer's persistence, not the UI.

## Motion

One easing (`cubic-bezier(.22,.61,.36,1)`) and one duration scale throughout.

- **Preloader** — once per session. A jutti is drawn in gold thread, the wordmark
  rises letter by letter, a hairline fills, then the ivory ground splits down a
  gold seam. [`src/components/Preloader.tsx`](src/components/Preloader.tsx)
- **Page transitions** — five jaali-width emerald panels start closed over the
  new route and wipe upward on a 55ms stagger, each trailing a gold hairline,
  while the page fades and rises behind them.
  [`src/components/PageTransition.tsx`](src/components/PageTransition.tsx)
- **Add to bag** — a clone of the product image arcs into the header bag icon,
  which bounces; the count badge pops. `flyToBag` in the store provider.
- Scroll reveals, corner marks that draw in on hover, the tilted marquee that
  near-stops on hover, ambient hero blooms and parallax, the drawn order-confirm
  seal, and the 404's unravelling gold thread.

Every loop, the fly-to-cart and parallax are disabled under
`prefers-reduced-motion`.

## Imagery

No placeholders. All 13 products carry their own gallery, plus the hero video,
editorial stills and the founder portrait — pulled from upanatstudio.com and
re-encoded to sized WebP.

- `public/img/` — the committed, optimised assets the site loads (~6.5 MB).
- `assets-source/` — raw source files, git-ignored.
- `scripts/optimize-images.mjs` — regenerates `public/img` from those sources.

## Share cards

`public/og.jpg` is the site card and `public/og/<slug>.jpg` is a card per pair,
so a shared product link previews that product. Both are wired through
`openGraph` / `twitter` metadata as absolute URLs, alongside the favicon set.

The cards are a real page — `scripts/og-card.html` — captured headless at 2x,
so the type is the actual Cormorant Garamond rather than a traced approximation.
Regenerate after changing the card or its photography:

```bash
node scripts/generate-brand-assets.mjs   # needs Google Chrome installed
```

## Deploying

[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) builds and
publishes to GitHub Pages on every push to `main`.

**One-time setup:** in the repository, set **Settings → Pages → Source** to
**GitHub Actions**. The workflow cannot do this for you — enabling Pages through
`configure-pages`'s `enablement` option needs a write-scoped `GITHUB_TOKEN`,
which a repository using the default read-only Actions permission does not have.

The workflow derives `NEXT_PUBLIC_BASE_PATH` and `NEXT_PUBLIC_SITE_ORIGIN` from
the repository name, so a project site (`/<repo>`) and a user site
(`<user>.github.io`) both resolve assets and absolute share-card URLs correctly.

## Deviations from the handoff

Worth a look before sign-off:

- **Burgundy replaced the emerald primary**, along with `plum`. Gold, ivory and
  ink are untouched. Two knock-on calls: the old `maroon` error colour sat one
  step from the new primary, so it became `alert` (`#A3302A`) — warmer and
  brighter, so an error still reads as an error beside a burgundy button; and
  confirmations ("Free delivery unlocked", "Saved.", a successful pincode
  check) moved to `gold-ink`, because a confirmation rendered in a red-family
  primary reads as a warning. `gold-ink` itself shifted `#8C6516` → `#866014`,
  which is the one gold change: it measured 4.45:1 on sand and so missed AA for
  the 11.5px eyebrows set on it. Every other pairing clears AA — the lowest is
  now 4.80:1.
- **"Emerald" survives as product data**, because Kiyana, Begum and Chitra are
  genuinely emerald green. The colour filter swatch and the product copy both
  describe the shoe, not the brand.
- **The card's hover size-panel became Add to cart / Buy now.** The handoff put
  size chips inside the frame on hover; both actions now sit under the price and
  open Quick View to pick a size, which is the same modal the handoff already
  specced for that job. Buy now is resident on touch and unfolds on hover where
  there is a pointer.

- **Hero headline scale.** The spec's `clamp(65px, 8.6vw, 132px)` only breaks
  into the intended two lines when the headline runs the full container width.
  Inside the hero's left column it fell to three ragged lines, so `.h-hero` is
  `clamp(52px, 6.4vw, 92px)`. Every other type step is as specified.
- **Catalogue is 13 pairs, not 15.** `Inaayat` and `Saanjh` were flagged
  unverified in the handoff and have no page or photography on the live site, so
  they are omitted. The "handcrafted designs" stat counts `PRODUCTS`, so it stays
  truthful whenever they are added.
- **Copy for 8 pairs is studio-voice, not client-approved.** Kiyana, Sunheri,
  Raven and both Darbars carry verbatim site copy. Noorani, Begum, Deedar,
  Nazakat, Chitra, Heer, Saahibo and Taara have descriptions written to match
  the brand voice against their real photography — these need client sign-off.
- **The quick-size panel is hidden below 640px.** The handoff asks for it to stay
  open on touch devices; on a phone's two-up grid it covered the photograph, so
  there the card's bag button opens Quick View instead. Tablets keep the panel.
- **Craft-section macro.** The handoff lists a karigar-hands photograph as still
  needed; the founder block uses an editorial still and a zardozi macro crop from
  Kiyana's gallery until that asset arrives.
- **Still unconfirmed from the brief:** the ₹2,999 free-shipping threshold, the
  ₹99 delivery fee, the ₹49 COD fee, "padded leather sole" in the marquee, and
  the size chart against Upanat's own lasts.

Reviews, low-stock lines, live-viewer counts and product badges are built but
data-gated, and render nothing until real data exists.
