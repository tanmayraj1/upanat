'use client';

import Link from 'next/link';
import { AccountIcon, BagIcon, HeartIcon, LeafMark, SearchIcon } from '@/components/icons';
import { useStore } from '@/store/StoreProvider';
import { FREE_SHIP_AT } from '@/data/products';
import { inr } from '@/lib/utils';

const NAV = [
  { label: 'Women', href: '/shop/?g=Women' },
  { label: 'Men', href: '/shop/?g=Men' },
  { label: 'New arrivals', href: '/shop/?sort=newest' },
  { label: 'Our craft', href: '/about/' }
];

export function Header() {
  const { state, ui, setUi, count, bagIconRef, ready } = useStore();
  const wishCount = state.wish.length;

  return (
    <>
      <div className="bg-emerald-deep px-4 py-[9px] text-center text-[12px] tracking-[0.1em] text-gold-foil">
        Free delivery across India above <span className="tnum">{inr(FREE_SHIP_AT)}</span> · Every pair handcrafted in Delhi
      </div>

      <header className="sticky top-0 z-40 border-b border-line bg-ivory/95 backdrop-blur-[8px]">
        <div className="shell grid min-h-[76px] grid-cols-[1fr_auto] items-center gap-6 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]">
          <nav className="hidden flex-wrap gap-x-7 gap-y-1.5 text-[12.5px] uppercase tracking-[0.14em] lg:flex">
            {NAV.map((n) => (
              <Link key={n.label} href={n.href} className="up-navlink font-semibold text-ink no-underline">
                {n.label}
              </Link>
            ))}
          </nav>

          <Link href="/" aria-label="Upanat Studio home" className="flex items-center gap-2.5 no-underline lg:justify-self-center">
            <LeafMark />
            <span className="flex flex-col items-start gap-[3px]">
              <span className="font-display text-[30px] font-semibold leading-[0.9] tracking-[0.02em] text-ink">Upanat</span>
              <span className="text-[9px] uppercase leading-none tracking-[0.46em] text-ink-muted">Studio</span>
            </span>
          </Link>

          <div className="flex items-center justify-end gap-1">
            <button onClick={() => setUi({ searchOpen: true })} aria-label="Search" className="up-iconbtn">
              <SearchIcon />
            </button>
            <Link href="/account/" aria-label="Account" className="up-iconbtn no-underline">
              <AccountIcon />
            </Link>
            <Link href="/wishlist/" aria-label={`Wishlist, ${wishCount} saved`} className="up-iconbtn relative no-underline">
              <HeartIcon />
              {ready && wishCount > 0 && <span className="up-badge bg-maroon">{wishCount}</span>}
            </Link>
            <button
              ref={bagIconRef}
              onClick={() => setUi({ bagOpen: !ui.bagOpen })}
              aria-label={`Bag, ${count} item${count === 1 ? '' : 's'}`}
              className="up-iconbtn relative"
            >
              <BagIcon />
              {ready && count > 0 && (
                <span data-badge className="up-badge bg-emerald">
                  {count}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile nav row. */}
        <nav className="shell up-noscrollbar flex gap-x-6 gap-y-1 overflow-x-auto pb-2.5 text-[11.5px] uppercase tracking-[0.14em] lg:hidden">
          {NAV.map((n) => (
            <Link key={n.label} href={n.href} className="up-navlink shrink-0 font-semibold text-ink no-underline">
              {n.label}
            </Link>
          ))}
        </nav>
      </header>
    </>
  );
}
