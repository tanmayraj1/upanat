# Handoff: Upanat Studio — Storefront Redesign

## Overview
Full e-commerce redesign for **Upanat Studio**, a Delhi-based handcrafted footwear label (juttis, block heels, mules, wedges, men's festive loafers). The prototype covers every customer-facing surface: Home, Shop/PLP, Product Detail, Quick View, Bag (drawer + page), Checkout, Order Confirmation, Wishlist, Account (orders, tracking, addresses, details), guest Order Tracking, About/Founder, Contact, Search overlay, Size Guide, and 404.

Positioning: heritage craft, "affordable luxury". The site must never read as a generic template — every motif (gold hairline frames, jharokha arch, paisley seal, sequin sparkles, dotted "journey" line) traces back to jutti craft.

## About the Design Files
The files in this bundle are **design references created in HTML** — interactive prototypes showing intended look, copy and behavior. They are **not production code to copy directly**. Recreate them in the target stack. The original brief specifies:

- **Next.js 14+ (App Router), React 18, TypeScript**
- **Tailwind CSS** with the custom tokens below (no default palette)
- **Framer Motion** for all motion (one easing, one duration scale)
- **shadcn/ui** primitives restyled (Dialog → Quick View / Size Guide / Lightbox; Sheet → Bag drawer, mobile filters; Accordion → PDP info)
- **Embla Carousel** for product rows
- `next/image` for all imagery; commerce backend = Shopify / headless WooCommerce / Medusa (keep the product → variant(size) → cart → address contract)

Open `Upanat Studio.dc.html` in a browser to explore (it loads `ProductCard.dc.html`, `support.js`, `image-slot.js` from the same folder). The Tweaks panel exposes: free-shipping threshold, live-viewer toggle, reviews empty/populated, hero stat badge, preloader, and a "jump to page" navigator.

## Fidelity
**High-fidelity.** Final colors, type, spacing, copy, and motion. Recreate pixel-accurately.

---

## Design Tokens

### Color
| Token | Hex | Use |
|---|---|---|
| emerald | `#0F4C3A` | Primary buttons, selected states, stats, links |
| emerald-deep | `#0A362A` | Hero bg, top banner, marquee band, primary hover |
| gold | `#C9972E` | Hairlines, frames, icon strokes, dividers, progress bar |
| gold-foil | `#E8C36B` | Text/accents on dark grounds only, sparkles — never large fills |
| gold-ink | `#8C6516` | Eyebrow labels on light grounds (AA-contrast gold) |
| maroon | `#6B1F2A` | Wishlist heart fill, errors, low-stock |
| plum | `#3D1F3D` | Reserved per-category accent |
| ivory | `#FBF6EE` | Page background, frame mat |
| sand | `#F3EBDD` | Alternate section bg, summary panels |
| placeholder | `#EFE6D8` | Image wells |
| line | `#E6DCCB` / `#D9CDB8` | Section rules / input & chip borders |
| surface | `#FFFFFF` | Form inputs, address/payment cards |
| ink | `#221A14` | Text, outline buttons, footer bg |
| ink-body | `#4A3F35` | Body copy |
| ink-muted | `#6E6154` | Captions, meta |
| strike | `#8A7C6D` | Strikethrough original price |

Gold is **linework only** — borders at `rgba(201,151,46,.45–.7)`, 1px.

### Typography
- **Display:** Cormorant Garamond 600 (700 for stat numbers in badges). All display headings letter-spacing `-0.022em`, line-height ≤ 0.94. Smaller serif (product names, list items) `-0.005em` to `-0.01em`.
- **UI/Body:** Public Sans 400 body, 600 labels/nav/eyebrows, 700 buttons & prices.
- **Numerals:** `font-variant-numeric: tabular-nums` on every price, qty, count, size.
- **Scale (fluid clamp):**
  - Hero h1: `clamp(65px, 8.6vw, 132px)`, two lines: "Tradition begins" / indented 1.1em "at your feet."
  - Page h1: `clamp(50px, 6.5vw, 90px)`
  - PDP h1: `clamp(58px, 7vw, 100px)`
  - Section h2: `clamp(46px, 5.7vw, 77px)` — asymmetric: long line then short indented line
  - Stat numbers: `clamp(64px, 7vw, 104px)` emerald
  - Product card name: 28px / 600; card price 15.5px / 700
  - Eyebrow: 11–11.5px, uppercase, letter-spacing .2em, 600, gold-ink
  - Buttons: 12.5px uppercase, letter-spacing .18em, 700
  - Body: 15px/1.55; small 13–14px

### Radius
Craft aesthetic — mostly sharp. Buttons `2px`; modals `12px`; trust pills & chips `999px`; icon buttons circular. Product frames `0`. Hero/About/category-jutti tile use arch: `border-radius: 50% 50% 0 0 / 30% 30% 0 0`.

### Shadow
- Card hover: `0 18px 36px -18px rgba(34,26,20,.38)`
- Primary button hover: `0 14px 26px -12px rgba(10,54,42,.6)`
- Floating badges: `0 18px 36px -16px rgba(0,0,0,.55)`
- Floating icon buttons: `0 6px 16px -8px rgba(34,26,20,.45)`
- Drawer: `-24px 0 48px -24px rgba(34,26,20,.35)`

### Spacing
Container max-width 1320px, side padding `clamp(20px, 4vw, 56px)`. Section vertical rhythm `clamp(64px, 8vw, 112px)`. Grid gaps 24px (cards), 40–44px row gap.

---

## Signature Components

### Product Frame (used everywhere a product image appears)
- Outer box: ivory `#FBF6EE` bg, 1px gold hairline `rgba(201,151,46,.45)` (→ `.9` on hover).
- Inner image inset **8px** (mat); small thumbs inset 3px.
- Four 20×20 corner "L" marks in gold (stroke 1.4), sitting 5px outside the border. They **draw in** (stroke-dashoffset 1→0, 420ms, staggered 0/60/120/180ms) on hover (always drawn on touch devices).

### Product Card (`ProductCard.dc.html`)
- 4:5 framed image; hover: card lifts −5px, image scales 1.04 (900ms), crossfades to 2nd angle (420ms).
- Top-left: badge slot (New / Bestseller / Sold out) — **only from real data; currently none are set.**
- Top-right floating circular buttons (38px, ivory 95%, soft shadow): **Wishlist heart** (pop scale 1→1.4→.9→1, 440ms; maroon fill), **Quick add bag** → opens Quick View.
- Bottom inset panel (appears on hover / always on touch): "Add to bag · pick a size" + size chips (30px tall). Picking a size adds directly; panel shows drawn checkmark "Added to bag" for 1.4s.
- Body: category eyebrow (gold-ink), name (serif 28/600) left, price right (700). If `was` exists: strikethrough muted original + emerald sale price.

### Buttons
- **Primary:** emerald fill, ivory 700 uppercase text. Hover: `translateY(-1px) scale(1.02)` + emerald shadow, bg → emerald-deep. Active: `scale(.97)`.
- **Secondary/outline:** 1px ink border. Hover: border thickens (inset 1px shadow) + `translateY(-1px)`; **does not fill**. Active: `scale(.97)`.
- **Trust pills:** 48px tall, 999px radius, ink border, custom gold icon + 700 label. Hover lifts −2px + thicker border.
- All: `transition: transform 220ms, box-shadow 260ms` on the global ease.

### Custom Icon Set (gold stroke, 1–1.3 weight, 24 grid)
Leaf-mark logo · gift-box/pouch (delivery) · jutti silhouette (affordable luxury / comfort) · double-ring seal with check (quality) · needle & thread (more is less) · pouch-shaped bag (header cart) · paisley (rotating seal) · 4-point sequin sparkle. SVG paths are in the HTML — lift them directly. Don't ship default Lucide glyphs.

---

## Screens

### Home
1. **Top banner** (emerald-deep, gold-foil 12px): free-delivery threshold + "Every pair handcrafted in Delhi".
2. **Sticky header** (ivory 95% + blur): left nav (Women / Men / New arrivals / Our craft, 600 uppercase, gold underline on hover); centered logo (leaf mark + "Upanat" serif 30/600 + "STUDIO" 9px tracked); right icons (search, account, wishlist w/ maroon count, bag w/ emerald count).
3. **Hero** (emerald-deep): jaali lattice pattern at 9% opacity; gold thread line draws across once (3.2s). Left: eyebrow, 2-line h1, origin line sub-copy, "Shop the collection" (ivory button w/ 2 twinkling sparkles) + "Our craft" link. Right: arched frame (460px max, gold hairline outset 14px) with **banner video** (autoplay, muted, loop). Floating: "Handcrafted in Delhi" framed badge (left, bobbing), rotating paisley seal (bottom-right, 80s/rev), optional stat badge (hidden until real data via `heroStat`).
   - Ambient: 3 blurred blooms (emerald `rgba(38,122,92,.55)`, gold `.2`, maroon `.5`, blur 40–50px) drifting on 64–88s loops; 6 gold flecks pulsing (5–11s).
   - Parallax factors on scroll: blooms .28, flecks .18, trust badge .12, seal .10, stat badge .08; video/text static.
4. **Stats + trust pills:** "15" handcrafted designs · "5–7" business days (emerald display numerals beside body copy) + 3 pills.
5. **Tilted marquee** (−2°, emerald-deep, gold hairlines top/bottom): "HANDCRAFTED ✦ ZARDOZI EMBROIDERY ✦ PADDED LEATHER SOLE ✦ MADE IN DELHI ✦ LEAF MOTIFS ✦ SEQUIN ACCENTS", 46s loop, near-stops on hover.
6. **Shop by category:** 12-col asymmetric grid — Juttis (5 col × 2 rows, arched top), Block heels (4), Mules (3), Wedges (3), Men (4). Ivory label plate bottom-left + emerald arrow circle; hover crossfades to 2nd image.
7. **New arrivals** carousel (sand bg), 4-up, prev/next circular outline buttons, scroll-snap.
8. **Bestsellers:** left feature (Kiyana editorial image + CTA with sparkle), right 2×2 cards offset down.
9. **Founder's vision:** jharokha (pointed Mughal arch) clip-path image with gold arch outline drawing in, overlapping square macro image; right column founder quote.
10. **What we stand for:** 3 columns — Comfort First, Always / Heritage Reimagined / More is Less (real copy).
11. **Reviews:** honest empty-state card (dashed gold outline) — "The first reviews are still being stitched". Populated variant exists.
12. **Newsletter** (emerald): Email / WhatsApp segmented toggle, underline input, validation, success state.
13. **Footer** (ink): brand statement "Because for us, footwear is not an afterthought. **Tradition begins at your feet.**" (gold-foil emphasis), 4 link columns, payment chips.

### Shop / PLP
Breadcrumb, h1 (dynamic: All pairs / Juttis / Women / Men / New arrivals / search results), results count. Sticky left filter sidebar (Category checkboxes w/ counts, Size chips EU 36–41 + UK 6–11, Colour swatches, Price range slider ₹1,800–3,500, Material — hidden while no data). Toolbar: active filter chips (individual ✕), Clear all, Sort select (Featured/Newest/Bestselling/Price ↑/↓), Grid/List toggle. Empty-results state. List view: framed image + description + "Choose size" + wishlist. Mobile: filters should become a bottom Sheet.

### Product Detail
Breadcrumb. Left: vertical thumbnail strip (76px, outline on active) + main framed image (crossfade 520ms, corner marks draw on load, expand button → lightbox with prev/next and count). Right (sticky): eyebrow cat · work, h1, price (+ strike if sale) "Inclusive of GST", short desc, optional live-viewer pulse dot (**disabled by default — real data only**), Size (EU/UK) + Size guide link, size buttons 58×50, error text, low-stock line (data-driven), qty stepper + Add to bag (morph to drawn check + "Added to bag", 1.2s) + wishlist square, Buy now (outline), pincode checker (6-digit validation; Delhi 11xxxx → +5 days, else +7), trust pills, accordion (Description / Materials & care / Shipping & returns; + rotates 45°).
Below: **Often bought together** (sand panel; 2 framed items, partner size picker, combined price, "Add both to bag" → opens drawer), **Reviews** (avg, 5-bar breakdown, write-review form with star picker, textarea, photo upload slot; thank-you state; empty state), **You may also like** (same category first), **Recently viewed** (session).

### Quick View (modal)
1080px max, 12px radius, blur backdrop. Left (sand): thumb column + large framed image with corners. Right: close (rotates 90° on hover), eyebrow, name `clamp(46px,4.8vw,68px)`, price/strike, description, size selector, qty, Add to bag (morph), round wishlist, delivery note, "View full details". "Move to bag" label when opened from Wishlist (removes from wishlist on add).

### Bag drawer (Sheet, right, 440px)
Spring-ish slide `620ms cubic-bezier(.16,1,.3,1)`. Header "Your bag" + count. Free-shipping text + gold progress bar (600ms eased width). Lines: framed 76×95 thumb, name, size, unit price, qty stepper (number bounces), Remove (row slides right + collapses height, 460ms). Rows stagger in (70ms) on open. "Add these too" cross-sell (3). Footer: subtotal, GST note, Checkout (primary) + View bag (outline). Empty state.

### Bag page
Lines (120px frames) + sticky Summary panel (sand): free-ship bar, subtotal, delivery, total, Checkout, Continue shopping. Cross-sell grid below.

### Checkout
Three numbered steps (serif gold-ink numerals):
1. **Delivery address** — segmented: Saved addresses (radio cards, Default tag; "Manage addresses") / New address-guest (grid form: name, email, phone 10-digit, address, city, state, 6-digit pincode; inline errors). Toggle switch "Ship to a different address" reveals a second form.
2. **What you're ordering** — compact recap: thumb, name, **Size** bold, qty, line total; "Edit bag"; delivery estimate.
3. **Payment** — radio cards: UPI, Card, Net banking, Cash on delivery (+₹49 fee line).
Sticky summary: subtotal, delivery (free ≥ threshold else ₹99), COD fee, total, "Place order · ₹X" (→ "Placing order…"), payment chips.

### Order Confirmation
Gold circle draws (900ms) then emerald check (520ms, delay 720ms). Order number, "Thank you — your pairs are on the workbench", email, items, 3-step timeline (Today / Next few days / By date), Track this order + Continue shopping.

### Wishlist
Card grid + per-card "Move to bag" (opens Quick View in move mode) and "Remove". Empty state.

### Account
Greeting h1 "Namaste, {name}". Left tab rail (gold left border active): Orders (cards w/ status pill, items, Track, Write a review), Track an order (form or 5-stage vertical timeline), Addresses (cards: Edit/Delete/Set default; add/edit form w/ validation; deleting default promotes next), Account details (form + "Saved.").

### Guest Order Tracking
Order number + email lookup (demo: `UPS-10482` / `ananya@example.com`), error message, timeline result.

### About / Founder
Hero: "Introducing Upanat Studio", h1 "Handcrafted stories from the ground up", origin paragraph, arched image. **Up close:** 3 floating framed detail photos (Sunheri sequins, Kiyana zardozi, Raven toe-ring) connected by a dotted gold path, each bobbing. 4-column pillar grid with images (staggered). Founder section: portrait slot (**asset still needed**) + full founder's-vision text.

### Contact
WhatsApp (https://wa.link/dcuhsv), Phone +91 99111 16301, Instagram @upanatstudio, Delhi, India. Buttons: Track an order, Size guide.

### Search overlay
Slides down from top. Large serif input, trending chips (Jutti, Block heels, Zardozi, Kiyana, Mules, Men), live results (thumb, name, cat · work, price) or "Most loved"; no-results hint. Enter → PLP with query chip.

### Size Guide (modal)
Women/Men tabs. Women: EU 36–41 ↔ India/UK 3–8 ↔ foot length cm. Men: UK 6–11 ↔ EU 40–45 ↔ cm. 3-step measuring instructions. Values are standard conversions — **confirm against Upanat's lasts.**

### 404
Line-art jutti + gold thread trailing off (staggered stroke draws), "This path has come unstitched", Back to home + Search.

---

## Interactions & Motion
**One ease:** `cubic-bezier(.22,.61,.36,1)`. Durations: 200–260ms (micro), 320–520ms (UI), 620–680ms (reveals, fly), long ambient loops 5–90s.

- **Preloader** once per session (sessionStorage): leaf/paisley stroke draws (1.5s), fades at 1.9s.
- **Page transitions:** fade + 10px slide, 260ms; scroll to top.
- **Scroll reveal:** opacity 0→1 + 12px rise, 640ms, 70ms stagger per batch (IntersectionObserver). h1s rise on mount with 90ms step stagger.
- **Add to bag choreography:** button compresses (active scale) → clone of the largest visible product image (gold border) arcs to header bag icon (640ms: lift, up-arc −120px, shrink to .08, fade) → bag icon elastic bounce (scale 1.28/rotate −6° → .9 → 1.06 → 1, 620ms) → count badge pops (1.6×, 520ms). Drawer stays closed. Button shows drawn checkmark ~1.2s.
- **Wishlist:** heart pop; header wishlist badge pulses.
- **Qty change:** number bounces (−4px, 1.3×, 360ms).
- **Line removal:** slide right 48px + fade, then height/padding collapse to 0 (460ms), then remove from state.
- **Carousel:** smooth scrollBy 75% width.
- **Accordion:** icon rotates 45°, body pops in.
- **Modals:** pop (opacity + 12px + scale .985, 320ms). Esc closes everything.
- **Reduced motion:** disable all infinite loops, fly-to-cart, parallax, collapse animation.

## State
- `cart: {key, slug, size, qty}[]`, `wishlist: slug[]`, `recentlyViewed: slug[]` (session), `addresses[]` (one `default`), `orders[]` (`no, date, email, items, total, stage 0–4`), `user details`.
- UI: route, drawer/search/quick-view/size-guide/lightbox open, PLP filters `{cats, sizes, colors, mats, maxPrice}`, sort, view mode, PDP `{size, qty, image, accordion, pincode}`, checkout `{mode saved|new, selectedAddress, shipToDifferent, payment, guest fields, errors, placing}`.
- Totals: subtotal; delivery ₹0 if subtotal ≥ threshold (prototype ₹2,999 — **confirm**) else ₹99 (**confirm**); COD +₹49 (**confirm**).
- Live-viewer, low-stock, badges, reviews: **render only from real data**; components exist but are data-gated.

## Product Data (as sourced from upanatstudio.com)
| Product | Category | Price | Copy/Images |
|---|---|---|---|
| Kiyana | Jutti | ₹2,499 | real copy + 3 photos |
| Sunheri | Wedge | ₹2,499 | real copy + 6 photos |
| Raven | Block heels | ₹2,499 | real copy + 4 photos |
| Darbar (Brown) | Men | ₹2,499 | real copy (brown finish) + 3 photos |
| Darbar (Black) | Men | ₹2,499 | copy adapted (polished black); photos needed |
| Noorani, Deedar, Nazakat | Jutti | ₹3,199 | copy + photos needed |
| Begum, Chitra | Jutti | ₹2,499 | copy + photos needed |
| Heer | Wedge | ₹2,499 | copy + photos needed |
| Saahibo | Wedge | ₹3,199 | copy + photos needed |
| Taara | Mules | ₹2,499 | copy + photos needed |
| Inaayat, Saanjh | unverified | unverified | category, price, copy, photos needed |

Sizes: women EU 36–41; men UK 6–11.
Image base URL: `https://upanatstudio.com/wp-content/uploads/2026/09/`

## Assets
- Hero video: `https://upanatstudio.com/wp-content/themes/upanat/assets/images/home/banner-video.mp4`
- Product photos: filenames listed in the `P` array inside `Upanat Studio.dc.html`
- Fonts: Google Fonts — Cormorant Garamond (400–700), Public Sans (400–700)
- **Still needed from client:** founder portrait, karigar-hands macro (craft section), mules category image, photos + descriptions for the 11 non-sourced products.
- All icons/motifs are inline SVG in the HTML.

## Files
- `Upanat Studio.dc.html` — the entire storefront prototype (template + logic class with product data, routing, cart/checkout/account state, motion helpers `motion()`, `fly()`, `bump()`, `removeLine()`).
- `ProductCard.dc.html` — the card component (frame, corners, floating actions, quick-size panel).
- `support.js`, `image-slot.js` — prototype runtime only; not needed in production.

> The copy in the Founder, Pillars, Promise, trust and product sections is taken verbatim from the live site — keep it unchanged. "Padded leather sole" in the marquee comes from the brief; confirm it with the client.
