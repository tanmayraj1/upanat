'use client';

import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { ProductFrame } from '@/components/ProductFrame';
import { Rise } from '@/components/Reveal';
import { Breadcrumb, EmptyState } from '@/components/ui';
import { getProduct, img, inr } from '@/lib/utils';
import { useStore } from '@/store/StoreProvider';

export function WishlistView() {
  const { state, dispatch, setUi, ready } = useStore();
  const items = state.wish.map(getProduct).filter(Boolean);

  return (
    <div className="shell py-12">
      <Breadcrumb trail={[{ label: 'Home', href: '/' }, { label: 'Wishlist' }]} />

      <div className="mt-6 flex flex-wrap items-end justify-between gap-5">
        <Rise>
          <h1 className="h-page">Wishlist</h1>
        </Rise>
        <Rise i={1}>
          <p className="tnum pb-3 text-[13px] text-ink-muted">{items.length} saved</p>
        </Rise>
      </div>

      {ready && items.length === 0 ? (
        <div className="mt-14">
          <EmptyState
            title="Nothing saved yet"
            body="Tap the heart on any pair to keep it here while you decide — useful when you're matching a lehenga."
            action={
              <Link href="/shop/" className="btn-primary no-underline">
                Browse pairs
              </Link>
            }
          />
        </div>
      ) : (
        <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
          <AnimatePresence initial={false}>
            {items.map((p) => (
              <motion.div
                key={p!.slug}
                layout
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.36, ease: [0.22, 0.61, 0.36, 1] }}
                data-product={p!.slug}
              >
                <Link href={`/product/${p!.slug}/`} className="group block no-underline">
                  <ProductFrame>
                    <Image src={img(p!.imgs[0])} alt={p!.name} fill sizes="(max-width: 1024px) 45vw, 300px" className="object-cover transition-transform duration-[900ms] ease-craft group-hover:scale-[1.04]" />
                  </ProductFrame>
                </Link>
                <div className="mt-4 flex items-start justify-between gap-3">
                  <div>
                    <p className="eyebrow">{p!.cat}</p>
                    <p className="mt-1.5 font-display text-[26px] font-semibold leading-none tracking-[-0.01em]">{p!.name}</p>
                  </div>
                  <span className="tnum mt-[18px] text-[15px] font-bold">{inr(p!.price)}</span>
                </div>
                <div className="mt-4 flex flex-wrap gap-2.5">
                  <button onClick={() => setUi({ quickView: { slug: p!.slug, move: true } })} className="btn-primary flex-1 !px-4 !py-3">
                    Move to bag
                  </button>
                  <button
                    onClick={() => dispatch({ t: 'unwish', slug: p!.slug })}
                    className="text-[12px] uppercase tracking-[0.14em] text-ink-muted underline underline-offset-4 transition-colors hover:text-alert"
                  >
                    Remove
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
