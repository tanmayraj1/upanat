'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { AccountIcon, ArrowRight, HeartIcon, LeafMark, PaisleyIcon, Sparkle } from '@/components/icons';
import { CloseButton } from '@/components/ui';
import { NAV } from '@/components/Header';
import { useStore } from '@/store/StoreProvider';

const EASE = [0.16, 1, 0.3, 1] as const;

const SECONDARY = [
  { label: 'Track an order', href: '/track/' },
  { label: 'About the founder', href: '/about/' },
  { label: 'Contact us', href: '/contact/' }
];

/**
 * Full-height mobile menu. The primary links get display type and stagger in
 * behind the panel; wishlist and account move here from the header bar, where
 * four icons at 42px left no room for the logo to breathe.
 */
export function MobileNav({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { state } = useStore();

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[95] lg:hidden">
          <motion.div
            className="absolute inset-0 bg-ink/45 backdrop-blur-[3px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28 }}
            onClick={onClose}
          />

          <motion.nav
            aria-label="Main menu"
            className="absolute inset-y-0 left-0 flex w-[min(86vw,360px)] flex-col overflow-y-auto bg-ivory"
            style={{ boxShadow: '24px 0 48px -24px rgba(34,26,20,.35)' }}
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.56, ease: EASE }}
          >
            <div className="flex items-center justify-between border-b border-line px-6 py-4">
              <span className="flex items-center gap-2.5">
                <LeafMark size={20} />
                <span className="font-display text-[24px] font-semibold leading-none tracking-[0.02em]">Upanat</span>
              </span>
              <CloseButton onClose={onClose} />
            </div>

            <ul className="px-6 py-7">
              {NAV.map((n, i) => (
                <motion.li
                  key={n.label}
                  initial={{ opacity: 0, x: -14 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.42, delay: 0.12 + i * 0.06, ease: EASE }}
                  className="border-b border-line last:border-0"
                >
                  <Link
                    href={n.href}
                    onClick={onClose}
                    className="group flex items-center justify-between gap-4 py-4 no-underline"
                  >
                    <span className="font-display text-[30px] font-semibold leading-none tracking-[-0.014em] text-ink">
                      {n.label}
                    </span>
                    <ArrowRight size={18} stroke="#C9972E" className="transition-transform duration-300 ease-craft group-hover:translate-x-1" />
                  </Link>
                </motion.li>
              ))}
            </ul>

            <div className="mt-auto">
              <div className="grid grid-cols-2 gap-px bg-line">
                <Link href="/wishlist/" onClick={onClose} className="flex items-center gap-2.5 bg-ivory px-5 py-4 text-[12.5px] font-semibold uppercase tracking-[0.12em] text-ink no-underline">
                  <HeartIcon size={17} />
                  Wishlist
                  {state.wish.length > 0 && <span className="tnum text-maroon">({state.wish.length})</span>}
                </Link>
                <Link href="/account/" onClick={onClose} className="flex items-center gap-2.5 bg-ivory px-5 py-4 text-[12.5px] font-semibold uppercase tracking-[0.12em] text-ink no-underline">
                  <AccountIcon size={17} />
                  Account
                </Link>
              </div>

              <ul className="border-t border-line px-6 py-5">
                {SECONDARY.map((s) => (
                  <li key={s.label}>
                    <Link href={s.href} onClick={onClose} className="block py-2 text-[13.5px] text-ink-body no-underline transition-colors hover:text-emerald">
                      {s.label}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="relative overflow-hidden bg-emerald-deep px-6 py-7 text-ivory">
                <div className="pointer-events-none absolute -right-8 -top-8 opacity-50" style={{ animation: 'spinSlow 80s linear infinite' }} aria-hidden>
                  <PaisleyIcon size={120} />
                </div>
                <p className="relative font-display text-[24px] font-semibold leading-[1.12] tracking-[-0.014em]">
                  Every pair handcrafted in Delhi.
                </p>
                <Link href="/shop/" onClick={onClose} className="btn-ivory relative mt-5 w-full no-underline">
                  Shop the collection
                  <Sparkle size={12} stroke="#C9972E" />
                </Link>
              </div>
            </div>
          </motion.nav>
        </div>
      )}
    </AnimatePresence>
  );
}
