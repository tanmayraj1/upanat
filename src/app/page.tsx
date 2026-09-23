import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Sparkle } from '@/components/icons';
import { ProductCard } from '@/components/ProductCard';
import { ProductFrame } from '@/components/ProductFrame';
import { Reveal } from '@/components/Reveal';
import { EmptyState, SectionHeading, TrustPills } from '@/components/ui';
import { Carousel } from '@/components/home/Carousel';
import { Hero } from '@/components/home/Hero';
import { Marquee } from '@/components/home/Marquee';
import { Newsletter } from '@/components/home/Newsletter';
import { CATEGORY_TILES, PRODUCTS } from '@/data/products';
import { img, inr } from '@/lib/utils';

const PILLARS = [
  {
    n: '01',
    title: 'Comfort first, always',
    body: 'We test and refine our fits so you can step out at morning light and walk through the evening without a second thought.'
  },
  {
    n: '02',
    title: 'Heritage reimagined',
    body: 'We bring ancient Indian hand-craftsmanship into modern daily wear, proving that traditional juttis belong in every everyday outfit.'
  },
  {
    n: '03',
    title: 'More is less',
    body: 'Fine details, thoughtful design, zero effort. We deliver rich, elevated pairs that simplify your wardrobe rather than cluttering it.'
  }
];

export default function HomePage() {
  const newArrivals = [...PRODUCTS].sort((a, b) => a.fresh - b.fresh).slice(0, 8);
  const feature = PRODUCTS.find((p) => p.slug === 'kiyana')!;
  const bestsellers = [...PRODUCTS].sort((a, b) => a.rank - b.rank).filter((p) => p.slug !== feature.slug).slice(0, 4);

  return (
    <>
      <Hero />

      {/* Stats + trust */}
      <section className="section">
        <div className="shell grid gap-12 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <div className="grid gap-10 sm:grid-cols-2">
            <Reveal i={0} className="flex items-end gap-5">
              <span className="stat-num">{PRODUCTS.length}</span>
              <span className="max-w-[20ch] pb-2 text-[14px] leading-snug text-ink-body">
                handcrafted designs in the current collection
              </span>
            </Reveal>
            <Reveal i={1} className="flex items-end gap-5">
              <span className="stat-num">5–7</span>
              <span className="max-w-[20ch] pb-2 text-[14px] leading-snug text-ink-body">
                business days, carefully packed, to your door
              </span>
            </Reveal>
          </div>
          <Reveal i={2}>
            <TrustPills labels={['Fast & secure delivery', 'Affordable luxury', 'Quality guarantee']} />
          </Reveal>
        </div>
      </section>

      <div className="overflow-hidden py-4">
        <Marquee />
      </div>

      {/* Shop by category */}
      <section className="section">
        <div className="shell">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <Reveal>
              <SectionHeading eyebrow="Shop by category" line1="For every step" line2="of the celebration" />
            </Reveal>
            <Reveal i={1}>
              <Link href="/shop/" className="btn-outline no-underline">
                View all pairs
              </Link>
            </Reveal>
          </div>

          <div className="mt-12 grid auto-rows-[minmax(190px,22vw)] grid-cols-2 gap-5 lg:grid-cols-12">
            {CATEGORY_TILES.map((t, i) => {
              const [slug, a, b] = t.a;
              return (
                <Reveal key={t.id} i={i} className={`up-tile up-tile-${t.id} group relative overflow-hidden`}>
                  <Link href={`/shop/?cat=${encodeURIComponent(t.cat)}`} className="block h-full w-full no-underline">
                    <div
                      className="relative h-full w-full overflow-hidden bg-well"
                      style={{ borderRadius: t.arch ? '50% 50% 0 0 / 22% 22% 0 0' : undefined }}
                    >
                      <Image
                        src={img(PRODUCTS.find((p) => p.slug === slug)!.imgs[a])}
                        alt={t.label}
                        fill
                        sizes="(max-width: 1024px) 50vw, 40vw"
                        className="object-cover transition-opacity duration-[520ms] ease-craft group-hover:opacity-0"
                      />
                      <Image
                        src={img(PRODUCTS.find((p) => p.slug === slug)!.imgs[b] ?? PRODUCTS.find((p) => p.slug === slug)!.imgs[a])}
                        alt=""
                        aria-hidden
                        fill
                        sizes="(max-width: 1024px) 50vw, 40vw"
                        className="scale-[1.03] object-cover opacity-0 transition-[opacity,transform] duration-[520ms] ease-craft group-hover:scale-100 group-hover:opacity-100"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink/35 to-transparent" />
                      <div className="absolute bottom-4 left-4 flex items-center gap-3">
                        <span className="bg-ivory px-4 py-3">
                          <span className="block font-display text-[24px] font-semibold leading-none tracking-[-0.01em]">{t.label}</span>
                          <span className="mt-1 block text-[11.5px] text-ink-muted">{t.sub}</span>
                        </span>
                        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-emerald text-ivory transition-transform duration-300 ease-craft group-hover:translate-x-1">
                          <ArrowRight size={17} stroke="#FBF6EE" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* New arrivals */}
      <section className="section bg-sand">
        <div className="shell">
          <Reveal>
            <SectionHeading eyebrow="Just in from the workshop" line1="New arrivals" />
          </Reveal>
          <div className="mt-12">
            <Carousel label="New arrivals">
              {newArrivals.map((p) => (
                <div key={p.slug} className="w-[74vw] shrink-0 snap-start sm:w-[44vw] lg:w-[calc((100%-72px)/4)]">
                  <ProductCard p={p} />
                </div>
              ))}
            </Carousel>
          </div>
        </div>
      </section>

      {/* Bestsellers */}
      <section className="section">
        <div className="shell">
          <Reveal>
            <SectionHeading eyebrow="Bestsellers" line1="Pairs you’ll reach for" line2="every morning" />
          </Reveal>

          <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-14">
            <Reveal className="relative">
              <Link href={`/product/${feature.slug}/`} className="group block no-underline" data-product={feature.slug}>
                <ProductFrame ratio="4 / 4.6">
                  <Image
                    src={img(feature.imgs[0])}
                    alt={feature.name}
                    fill
                    sizes="(max-width: 1024px) 92vw, 46vw"
                    className="object-cover transition-transform duration-[900ms] ease-craft group-hover:scale-[1.04]"
                  />
                </ProductFrame>
                <div className="mt-7">
                  <p className="eyebrow">{feature.cat} · {feature.work}</p>
                  <h3 className="display mt-3 text-[clamp(38px,4.4vw,58px)]">{feature.name}</h3>
                  <p className="mt-4 max-w-[46ch] text-[14.5px] leading-relaxed text-ink-body">
                    Deep emerald with elaborate gold zardozi, leaf motifs and subtle sequin accents. Sizes 36–41.
                  </p>
                  <span className="btn-primary relative mt-7">
                    View {feature.name} · {inr(feature.price)}
                    <span className="absolute -right-1.5 -top-1.5" style={{ animation: 'twinkle 4.6s ease-in-out infinite' }}>
                      <Sparkle size={12} />
                    </span>
                  </span>
                </div>
              </Link>
            </Reveal>

            <div className="grid grid-cols-2 gap-x-6 gap-y-11 lg:mt-16">
              {bestsellers.map((p, i) => (
                <Reveal key={p.slug} i={i}>
                  <ProductCard p={p} />
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Founder's vision — jharokha arch over an overlapping macro */}
      <section className="section bg-sand">
        <div className="shell grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center lg:gap-20">
          <Reveal className="relative">
            <div className="relative mx-auto w-full max-w-[430px]">
              {/* Jharokha arch: an objectBoundingBox clip so it scales with the frame. */}
              <svg width="0" height="0" className="absolute" aria-hidden>
                <defs>
                  <clipPath id="jharokha" clipPathUnits="objectBoundingBox">
                    <path d="M0,1 L0,0.46 C0,0.2 0.22,0.07 0.5,0 C0.78,0.07 1,0.2 1,0.46 L1,1 Z" />
                  </clipPath>
                </defs>
              </svg>
              <svg className="pointer-events-none absolute -inset-4 z-10 h-[calc(100%+32px)] w-[calc(100%+32px)]" viewBox="0 0 100 125" preserveAspectRatio="none" fill="none" aria-hidden>
                <path
                  d="M1 124V57C1 25 23 9 50 1c27 8 49 24 49 56v67"
                  stroke="rgba(201,151,46,.7)"
                  strokeWidth=".55"
                  pathLength={1}
                  strokeDasharray={1}
                  strokeDashoffset={1}
                  style={{ animation: 'drawLine 1.9s cubic-bezier(.45,0,.2,1) .2s forwards' }}
                />
              </svg>
              <div className="relative overflow-hidden bg-well" style={{ aspectRatio: '4 / 5', clipPath: 'url(#jharokha)' }}>
                <Image src={img('editorial-1.webp')} alt="Upanat juttis, photographed in the studio" fill sizes="(max-width: 1024px) 92vw, 430px" className="object-cover" />
              </div>
            </div>
            <div className="absolute -bottom-8 right-0 w-[42%] max-w-[190px] lg:-right-6">
              <ProductFrame inset={5} ratio="1 / 1">
                <Image src={img('kiyana-3.webp')} alt="Zardozi detail, close up" fill sizes="190px" className="object-cover" />
              </ProductFrame>
            </div>
          </Reveal>

          <Reveal i={1} className="pt-10 lg:pt-0">
            <SectionHeading eyebrow="The founder’s vision" line1="Who says comfort" line2="means boring?" />
            <p className="mt-8 max-w-[54ch] text-[15px] leading-relaxed text-ink-body">
              I’ve always loved a great pair of shoes, but I constantly found myself asking the same questions: Why are
              women’s shoes so rarely designed with real life in mind? How are we supposed to wear these all day? And who
              says everyday footwear has to be plain and simple?
            </p>
            <blockquote className="mt-8 border-l pl-6 font-display text-[clamp(22px,2.4vw,30px)] font-semibold leading-[1.22] tracking-[-0.012em]" style={{ borderColor: 'rgba(201,151,46,.7)' }}>
              “I wanted to challenge the idea that comfort means boring, or that a fine pair of handcrafted juttis should
              be saved only for special occasions.”
              <footer className="mt-4 text-[12px] font-semibold uppercase tracking-[0.18em] text-gold-ink">— Founder, Upanat Studio</footer>
            </blockquote>
            <Link href="/about/" className="btn-outline mt-9 no-underline">
              Read the founder’s story
            </Link>
          </Reveal>
        </div>
      </section>

      {/* What we stand for */}
      <section className="section">
        <div className="shell">
          <Reveal>
            <SectionHeading eyebrow="Our philosophy" line1="What we stand for" />
          </Reveal>
          <div className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
            {PILLARS.map((p, i) => (
              <Reveal key={p.n} i={i}>
                <p className="font-display text-[34px] font-semibold leading-none text-gold-ink tnum">{p.n}</p>
                <h3 className="mt-4 font-display text-[28px] font-semibold leading-tight tracking-[-0.01em]">{p.title}</h3>
                <p className="mt-3.5 max-w-[40ch] text-[14.5px] leading-relaxed text-ink-body">{p.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews — honest empty state */}
      <section className="section bg-sand">
        <div className="shell">
          <Reveal>
            <SectionHeading eyebrow="Reviews" line1="In their words" />
            <p className="mt-5 text-[14px] text-ink-muted">We only show reviews from people who bought and wore a pair.</p>
          </Reveal>
          <Reveal i={1} className="mt-12">
            <EmptyState
              title="The first reviews are still being stitched"
              body="We’re a young studio, and we’d rather show nothing than invent praise. Wore a pair from morning light into the evening? Tell the next person how it felt."
              action={
                <Link href="/account/" className="btn-outline no-underline">
                  Review a past order
                </Link>
              }
            />
          </Reveal>
        </div>
      </section>

      <Newsletter />
    </>
  );
}
