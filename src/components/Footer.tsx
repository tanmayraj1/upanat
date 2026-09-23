import Link from 'next/link';
import { LeafMark } from '@/components/icons';

const COLUMNS = [
  {
    title: 'Shop',
    links: [
      { label: 'Women', href: '/shop/?g=Women' },
      { label: 'Men', href: '/shop/?g=Men' },
      { label: 'New arrivals', href: '/shop/?sort=newest' },
      { label: 'Wishlist', href: '/wishlist/' }
    ]
  },
  {
    title: 'Help',
    links: [
      { label: 'Track an order', href: '/track/' },
      { label: 'Size guide', href: '/shop/' },
      { label: 'Refund & return policy', href: '/contact/' },
      { label: 'Privacy policy', href: '/contact/' }
    ]
  },
  {
    title: 'Studio',
    links: [
      { label: 'About the founder', href: '/about/' },
      { label: 'Contact us', href: '/contact/' },
      { label: 'My account', href: '/account/' }
    ]
  }
];

const PAYMENTS = ['UPI', 'RuPay', 'Visa', 'Mastercard', 'Net banking', 'Cash on delivery'];

export function Footer() {
  return (
    <footer className="bg-ink text-ivory">
      <div className="shell grid gap-12 py-16 md:grid-cols-[minmax(0,1.3fr)_repeat(3,minmax(0,1fr))] md:gap-10">
        <div className="max-w-[420px]">
          <div className="mb-6 flex items-center gap-2.5">
            <LeafMark size={22} />
            <span className="font-display text-[28px] font-semibold leading-none">Upanat</span>
          </div>
          <p className="font-display text-[clamp(26px,3vw,36px)] font-semibold leading-[1.08] tracking-[-0.018em]">
            Because for us, footwear is not an afterthought.{' '}
            <span className="text-gold-foil">Tradition begins at your feet.</span>
          </p>
          <p className="mt-6 text-[13.5px] leading-relaxed text-ivory/65">
            Premium handcrafted footwear designed for elegance and comfort. Made in Delhi.
          </p>
        </div>

        {COLUMNS.map((col) => (
          <div key={col.title}>
            <h3 className="mb-5 text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-foil">{col.title}</h3>
            <ul className="space-y-2.5">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-[14px] text-ivory/75 no-underline transition-colors duration-200 hover:text-gold-foil">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="shell flex flex-col gap-5 border-t border-ivory/12 py-7 md:flex-row md:items-center md:justify-between">
        <p className="text-[12.5px] text-ivory/55">© 2026 Upanat Studio, New Delhi</p>
        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-1 text-[11px] uppercase tracking-[0.18em] text-ivory/45">We accept</span>
          {PAYMENTS.map((p) => (
            <span key={p} className="rounded-full border border-ivory/20 px-3 py-1 text-[11px] text-ivory/70">
              {p}
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
}
