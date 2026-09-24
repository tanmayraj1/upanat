'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AccountIcon, BagIcon, HeartIcon, LeafMark, SearchIcon } from '@/components/icons';
import { MobileNav } from '@/components/MobileNav';
import { useStore } from '@/store/StoreProvider';
import { FREE_SHIP_AT } from '@/data/products';
import { inr } from '@/lib/utils';

export const NAV = [
  { label: 'Women', href: '/shop/?g=Women' },
  { label: 'Men', href: '/shop/?g=Men' },
  { label: 'New arrivals', href: '/shop/?sort=newest' },
  { label: 'Our craft', href: '/about/' }
];

export function Header() {
  const { state, ui, setUi, count, bagIconRef, ready } = useStore();
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const wishCount = state.wish.length;

  // A route change closes the menu; the drawer's own links do too, but the
  // browser's back button doesn't go through them.
  useEffect(() => setMenuOpen(false), [pathname]);

  return (
    <>
      <div className="bg-primary-deep px-4 py-2 text-center text-[11px] leading-snug tracking-[0.08em] text-gold-foil sm:py-[9px] sm:text-[12px] sm:tracking-[0.1em]">
        Free delivery above <span className="tnum">{inr(FREE_SHIP_AT)}</span>
        <span className="hidden sm:inline"> across India</span> · Handcrafted in Delhi
      </div>

      <header className="sticky top-0 z-40 border-b border-line bg-ivory/95 backdrop-blur-[8px]">
        <div className="shell grid min-h-[62px] grid-cols-[1fr_auto_1fr] items-center gap-3 lg:min-h-[76px] lg:gap-6">
          {/* Left: nav on desktop, menu toggle on mobile. */}
          <nav className="hidden flex-wrap gap-x-7 gap-y-1.5 text-[12.5px] uppercase tracking-[0.14em] lg:flex">
            {NAV.map((n) => (
              <Link key={n.label} href={n.href} className="up-navlink font-semibold text-ink no-underline">
                {n.label}
              </Link>
            ))}
          </nav>

          <button
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={menuOpen}
            className="up-iconbtn -ml-2.5 justify-self-start lg:hidden"
          >
            <MenuGlyph />
          </button>

          <Link href="/" aria-label="Upanat Studio home" className="flex items-center gap-2 justify-self-center no-underline lg:gap-2.5">
            <LeafMark size={19} className="lg:hidden" />
            <LeafMark size={22} className="hidden lg:block" />
            <span className="flex flex-col items-start gap-[2px] lg:gap-[3px]">
              <span className="font-display text-[25px] font-semibold leading-[0.9] tracking-[0.02em] text-ink lg:text-[30px]">
                Upanat
              </span>
              <span className="text-[7.5px] uppercase leading-none tracking-[0.42em] text-ink-muted lg:text-[9px] lg:tracking-[0.46em]">
                Studio
              </span>
            </span>
          </Link>

          {/* Right: search and bag stay out on mobile; account and wishlist
              live in the menu, where there is room to label them. */}
          <div className="flex items-center justify-end gap-0.5 justify-self-end lg:gap-1">
            <button onClick={() => setUi({ searchOpen: true })} aria-label="Search" className="up-iconbtn">
              <SearchIcon />
            </button>
            <Link href="/account/" aria-label="Account" className="up-iconbtn hidden no-underline lg:flex">
              <AccountIcon />
            </Link>
            <Link href="/wishlist/" aria-label={`Wishlist, ${wishCount} saved`} className="up-iconbtn relative hidden no-underline lg:flex">
              <HeartIcon />
              {ready && wishCount > 0 && <span className="up-badge bg-alert">{wishCount}</span>}
            </Link>
            <button
              ref={bagIconRef}
              onClick={() => setUi({ bagOpen: !ui.bagOpen })}
              aria-label={`Bag, ${count} item${count === 1 ? '' : 's'}`}
              className="up-iconbtn relative -mr-2.5 lg:mr-0"
            >
              <BagIcon />
              {ready && count > 0 && (
                <span data-badge className="up-badge bg-primary">
                  {count}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      <MobileNav open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}

function MenuGlyph() {
  return (
    <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#221A14" strokeWidth={1.3} strokeLinecap="round" aria-hidden>
      <path d="M4 7h16M4 12h16M4 17h11" />
    </svg>
  );
}
