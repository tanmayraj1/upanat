import Link from 'next/link';
import { Reveal, Rise } from '@/components/Reveal';
import { Breadcrumb } from '@/components/ui';
import { ArrowRight, LeafMark, PaisleyIcon } from '@/components/icons';

export const metadata = {
  title: 'Talk to the studio',
  description: 'WhatsApp, phone and Instagram for Upanat Studio, New Delhi.'
};

const CHANNELS = [
  { title: 'WhatsApp', value: 'Message the studio', note: 'Fastest for sizing questions', href: 'https://wa.link/dcuhsv', external: true },
  { title: 'Phone', value: '+91 99111 16301', note: 'Call the studio', href: 'tel:+919911116301', external: true },
  { title: 'Instagram', value: '@upanatstudio', note: 'New drops and styling', href: 'https://instagram.com/upanatstudio', external: true },
  { title: 'Studio', value: 'New Delhi', note: 'Delhi, India' }
];

export default function ContactPage() {
  return (
    <div className="shell py-12">
      <Breadcrumb trail={[{ label: 'Home', href: '/' }, { label: 'Contact' }]} />

      <div className="mt-6 grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,.8fr)] lg:gap-16">
        <div>
          <Rise>
            <p className="eyebrow">Contact us</p>
          </Rise>
          <Rise i={1}>
            <h1 className="h-page mt-5">Talk to the studio</h1>
          </Rise>
          <Rise i={2}>
            <p className="mt-7 max-w-[56ch] text-[15px] leading-relaxed text-ink-body">
              Questions about sizing, a wedding order for the whole family, or a pair that needs attention — WhatsApp is
              the fastest way to reach us.
            </p>
          </Rise>

          <ul className="mt-12 divide-y divide-line border-y border-line">
            {CHANNELS.map((c, i) => (
              <Reveal key={c.title} as="li" i={i}>
                {c.href ? (
                  <a
                    href={c.href}
                    target={c.external ? '_blank' : undefined}
                    rel={c.external ? 'noreferrer noopener' : undefined}
                    className="group flex items-center justify-between gap-6 py-6 no-underline"
                  >
                    <ChannelBody {...c} />
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-ink transition-[transform,background,color] duration-300 ease-craft group-hover:translate-x-1 group-hover:bg-ink group-hover:text-ivory">
                      <ArrowRight size={17} />
                    </span>
                  </a>
                ) : (
                  <div className="py-6">
                    <ChannelBody {...c} />
                  </div>
                )}
              </Reveal>
            ))}
          </ul>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/track/" className="btn-primary no-underline">
              Track an order
            </Link>
            <Link href="/shop/" className="btn-outline no-underline">
              Browse the collection
            </Link>
          </div>
        </div>

        <Reveal className="relative hidden lg:block">
          <div className="sticky top-[112px] flex flex-col items-center justify-center gap-8 bg-emerald-deep p-12 text-ivory" style={{ minHeight: 460 }}>
            <div style={{ animation: 'spinSlow 80s linear infinite' }} aria-hidden>
              <PaisleyIcon size={130} />
            </div>
            <div className="text-center">
              <LeafMark size={26} className="mx-auto" />
              <p className="mt-5 font-display text-[30px] font-semibold leading-[1.08] tracking-[-0.018em]">
                Every pair handcrafted
                <br />
                in Delhi.
              </p>
              <p className="mt-4 text-[12.5px] uppercase tracking-[0.2em] text-gold-foil">Mon–Sat · 10am–7pm IST</p>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}

function ChannelBody({ title, value, note }: { title: string; value: string; note: string }) {
  return (
    <span className="min-w-0">
      <span className="eyebrow block">{title}</span>
      <span className="mt-2 block font-display text-[clamp(26px,3vw,38px)] font-semibold leading-none tracking-[-0.018em] text-ink">
        {value}
      </span>
      <span className="mt-2 block text-[13px] text-ink-muted">{note}</span>
    </span>
  );
}
