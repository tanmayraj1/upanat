import Image from 'next/image';
import Link from 'next/link';
import { ProductFrame } from '@/components/ProductFrame';
import { Reveal, Rise } from '@/components/Reveal';
import { Breadcrumb, SectionHeading } from '@/components/ui';
import { PRODUCTS } from '@/data/products';
import { img } from '@/lib/utils';

export const metadata = {
  title: 'About the founder',
  description: 'Handcrafted stories from the ground up — the studio behind Upanat.'
};

const DETAILS = [
  { file: 'sunheri-2.webp', caption: 'Sunheri · geometric gold sequins', pos: 'md:left-[2%] md:top-0', w: 'w-[46%] md:w-[30%]', bob: 0 },
  { file: 'kiyana-2.webp', caption: 'Kiyana · zardozi & leaf motifs', pos: 'md:left-[36%] md:top-[18%]', w: 'w-[46%] md:w-[30%]', bob: 1 },
  { file: 'raven-3.webp', caption: 'Raven · gold toe-ring', pos: 'md:left-[68%] md:top-[4%]', w: 'w-[46%] md:w-[28%]', bob: 2 }
];

const PILLARS = [
  { n: '01 · Comfort first, always', body: 'We test and refine our fits so you can step out at morning light and walk through the evening without a second thought.', img: 'heer-2.webp' },
  { n: '02 · Heritage reimagined', body: 'We bring ancient Indian hand-craftsmanship into modern daily wear, proving that traditional juttis belong in every everyday outfit.', img: 'noorani-5.webp' },
  { n: '03 · More is less', body: 'Fine details, thoughtful design, zero effort. Rich, elevated pairs that simplify your wardrobe rather than cluttering it.', img: 'begum-3.webp' },
  { n: '04 · Our promise', body: 'Each pair is handcrafted with love, focusing on fine detailing, quality materials, and wearability that lasts beyond just one occasion.', img: 'nazakat-5.webp' }
];

const FOUNDER = [
  'I’ve always loved a great pair of shoes, but I constantly found myself asking the same questions: Why are women’s shoes so rarely designed with real life in mind? How are we supposed to wear these all day? And who says everyday footwear has to be plain and simple?',
  'I wanted to challenge the idea that comfort means boring, or that a fine pair of handcrafted juttis should be saved only for special occasions. Why shouldn’t you be able to pair a beautifully detailed jutti with your favorite everyday dress and walk effortlessly through your entire day?',
  'That search for genuine ease led me to Upanat. At Upanat Studio, our highest priority is creating shoes you instinctively reach for every morning — because rich craftsmanship, thoughtful detail, and everyday comfort shouldn’t take effort. It should just feel like home.'
];

export default function AboutPage() {
  return (
    <div className="pb-4">
      <div className="shell pt-12">
        <Breadcrumb trail={[{ label: 'Home', href: '/' }, { label: 'Our craft' }]} />
      </div>

      {/* Hero */}
      <section className="shell grid gap-12 py-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,.9fr)] lg:items-center lg:gap-16">
        <div>
          <Rise>
            <p className="eyebrow">Introducing Upanat Studio</p>
          </Rise>
          <Rise i={1}>
            <h1 className="h-page mt-5">Handcrafted stories from the ground up</h1>
          </Rise>
          <Rise i={2}>
            <p className="mt-8 max-w-[58ch] text-[15px] leading-relaxed text-ink-body">
              Named after the earliest recorded footwear of the Indian subcontinent, Upanat Studio is an homage to raw
              materials and ancient craftsmanship. Derived from the ancient Sanskrit word for the foot coverings that
              protected early travelers, our name reflects our core belief: returning to the roots of design.
            </p>
          </Rise>
        </div>
        <Rise i={3}>
          <div className="relative mx-auto w-full max-w-[420px]">
            <div className="pointer-events-none absolute -inset-3" style={{ border: '1px solid rgba(201,151,46,.55)', borderRadius: '50% 50% 0 0 / 30% 30% 0 0' }} aria-hidden />
            <div className="relative overflow-hidden bg-well" style={{ aspectRatio: '4 / 5', borderRadius: '50% 50% 0 0 / 30% 30% 0 0' }}>
              <Image src={img('editorial-2.webp')} alt="Upanat juttis photographed in the studio" fill priority sizes="(max-width: 1024px) 88vw, 420px" className="object-cover" />
            </div>
          </div>
        </Rise>
      </section>

      {/* Up close — floating detail photographs on a dotted gold path */}
      <section className="section bg-sand">
        <div className="shell">
          <Reveal>
            <SectionHeading eyebrow="Up close" line1="The details," line2="one pair at a time" />
          </Reveal>

          <div className="relative mt-14 md:h-[560px]">
            <svg className="pointer-events-none absolute inset-0 hidden h-full w-full md:block" viewBox="0 0 100 60" preserveAspectRatio="none" fill="none" aria-hidden>
              {/* Dash lengths are in viewBox units, so no pathLength here — it would
                  rescale the pattern to the whole path and render a solid line. */}
              <path
                d="M14 18C30 40 44 8 58 34 68 52 80 26 92 18"
                stroke="rgba(201,151,46,.85)"
                strokeWidth=".45"
                strokeDasharray="0.1 1.6"
                strokeLinecap="round"
              />
            </svg>

            <div className="grid gap-8 sm:grid-cols-3 md:block">
              {DETAILS.map((d) => (
                <Reveal key={d.file} i={d.bob} className={`md:absolute ${d.pos} ${d.w}`}>
                  <div style={{ animation: `bob ${5.6 + d.bob * 1.1}s ease-in-out ${d.bob * 0.9}s infinite` }}>
                    <ProductFrame inset={6}>
                      <Image src={img(d.file)} alt={d.caption} fill sizes="(max-width: 768px) 46vw, 30vw" className="object-cover" />
                    </ProductFrame>
                    <p className="mt-3 text-[12.5px] text-ink-muted">{d.caption}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="section">
        <div className="shell grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-7">
          {PILLARS.map((p, i) => (
            <Reveal key={p.n} i={i} className={i % 2 ? 'lg:mt-14' : undefined}>
              <ProductFrame inset={6} ratio="4 / 3.4">
                <Image src={img(p.img)} alt="" fill sizes="(max-width: 1024px) 45vw, 300px" className="object-cover" />
              </ProductFrame>
              <h3 className="mt-6 font-display text-[24px] font-semibold leading-tight tracking-[-0.01em]">{p.n}</h3>
              <p className="mt-3 text-[14px] leading-relaxed text-ink-body">{p.body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Founder */}
      <section className="section bg-sand">
        <div className="shell grid gap-14 lg:grid-cols-[minmax(0,.85fr)_minmax(0,1.15fr)] lg:gap-20">
          <Reveal>
            <ProductFrame inset={8} ratio="4 / 5">
              <Image src={img('founder.webp')} alt="The founder of Upanat Studio" fill sizes="(max-width: 1024px) 88vw, 400px" className="object-cover" />
            </ProductFrame>
          </Reveal>
          <Reveal i={1}>
            <SectionHeading eyebrow="About the founder" line1="The founder’s vision" />
            <div className="mt-8 space-y-5">
              {FOUNDER.map((para) => (
                <p key={para.slice(0, 24)} className="max-w-[62ch] text-[15px] leading-relaxed text-ink-body">
                  {para}
                </p>
              ))}
            </div>
            <p className="mt-7 text-[12px] font-semibold uppercase tracking-[0.18em] text-gold-ink">— Founder, Upanat Studio</p>
            <Link href="/shop/" className="btn-primary mt-9 no-underline">
              Shop the collection
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Collection strip */}
      <section className="section">
        <div className="shell">
          <Reveal>
            <SectionHeading eyebrow="The current collection" line1={`${PRODUCTS.length} handcrafted designs`} />
          </Reveal>
          <div className="mt-12 grid grid-cols-3 gap-4 md:grid-cols-6 lg:grid-cols-7">
            {PRODUCTS.map((p, i) => (
              <Reveal key={p.slug} i={i % 7}>
                <Link href={`/product/${p.slug}/`} className="block no-underline">
                  <ProductFrame inset={4} corners={false}>
                    <Image src={img(p.imgs[0])} alt={p.name} fill sizes="140px" className="object-cover transition-transform duration-700 ease-craft hover:scale-105" />
                  </ProductFrame>
                  <p className="mt-2.5 text-center font-display text-[17px] font-semibold leading-none">{p.name}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
