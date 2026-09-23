'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ProductCard } from '@/components/ProductCard';
import { ProductFrame } from '@/components/ProductFrame';
import { Reveal, Rise } from '@/components/Reveal';
import { Breadcrumb, FreeShipBar, QtyStepper, SectionHeading } from '@/components/ui';
import { PRODUCTS } from '@/data/products';
import { getProduct, img, inr } from '@/lib/utils';
import { useStore } from '@/store/StoreProvider';

const EASE = [0.16, 1, 0.3, 1] as const;

export function BagView() {
  const { state, dispatch, subtotal, shipping, count, ready } = useStore();

  const inBag = new Set(state.cart.map((l) => l.slug));
  const crossSell = PRODUCTS.filter((p) => !inBag.has(p.slug)).slice(0, 4);

  if (ready && state.cart.length === 0) {
    return (
      <div className="shell py-12">
        <Breadcrumb trail={[{ label: 'Home', href: '/' }, { label: 'Bag' }]} />
        <div className="section flex flex-col items-center text-center">
          <h1 className="h-page max-w-[14ch]">Nothing in your bag yet</h1>
          <p className="mt-6 max-w-[48ch] text-[15px] leading-relaxed text-ink-body">
            Every pair is handcrafted, carefully packed and delivered within 5–7 business days.
          </p>
          <Link href="/shop/" className="btn-primary mt-10 no-underline">
            Shop the collection
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="shell py-12">
      <Breadcrumb trail={[{ label: 'Home', href: '/' }, { label: 'Bag' }]} />

      <div className="mt-6 flex flex-wrap items-end justify-between gap-5">
        <Rise>
          <h1 className="h-page">Your bag</h1>
        </Rise>
        <Rise i={1}>
          <p className="tnum pb-3 text-[13px] text-ink-muted">
            {count} item{count === 1 ? '' : 's'}
          </p>
        </Rise>
      </div>

      <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-16">
        <ul className="divide-y divide-line border-t border-line">
          <AnimatePresence initial={false}>
            {state.cart.map((l) => {
              const p = getProduct(l.slug);
              if (!p) return null;
              return (
                <motion.li
                  key={l.key}
                  layout
                  exit={{ opacity: 0, x: 48, height: 0, paddingTop: 0, paddingBottom: 0 }}
                  transition={{ duration: 0.46, ease: EASE }}
                  className="flex flex-col gap-5 overflow-hidden py-7 sm:flex-row sm:gap-7"
                >
                  <Link href={`/product/${p.slug}/`} className="w-[120px] shrink-0 no-underline">
                    <ProductFrame inset={5} corners={false}>
                      <Image src={img(p.imgs[0])} alt={p.name} fill sizes="120px" className="object-cover" />
                    </ProductFrame>
                  </Link>
                  <div className="min-w-0 flex-1">
                    <p className="eyebrow">{p.cat}</p>
                    <div className="mt-2 flex items-start justify-between gap-5">
                      <Link href={`/product/${p.slug}/`} className="font-display text-[28px] font-semibold leading-none tracking-[-0.01em] text-ink no-underline">
                        {p.name}
                      </Link>
                      <span className="tnum shrink-0 text-[16px] font-bold">{inr(p.price * l.qty)}</span>
                    </div>
                    <p className="tnum mt-2 text-[13px] text-ink-muted">
                      Size {l.size} · {inr(p.price)} each
                    </p>
                    <div className="mt-5 flex items-center gap-5">
                      <QtyStepper qty={l.qty} onChange={(d) => dispatch({ t: 'qty', key: l.key, delta: d })} />
                      <button
                        onClick={() => dispatch({ t: 'remove', key: l.key })}
                        className="text-[12px] uppercase tracking-[0.14em] text-ink-muted underline underline-offset-4 transition-colors hover:text-maroon"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </motion.li>
              );
            })}
          </AnimatePresence>
        </ul>

        <aside className="lg:sticky lg:top-[112px] lg:self-start">
          <div className="bg-sand p-7">
            <h2 className="font-display text-[30px] font-semibold leading-none tracking-[-0.018em]">Summary</h2>
            <FreeShipBar subtotal={subtotal} className="mt-5" />
            <dl className="mt-7 space-y-3 text-[14px]">
              <Row label="Subtotal" value={inr(subtotal)} />
              <Row label="Delivery" value={shipping === 0 ? 'Free' : inr(shipping)} />
              <div className="hairline pt-3">
                <Row label="Total" value={inr(subtotal + shipping)} large />
              </div>
            </dl>
            <p className="mt-3 text-[12px] text-ink-muted">Prices include GST.</p>
            <div className="mt-6 grid gap-2.5">
              <Link href="/checkout/" className="btn-primary no-underline">
                Checkout
              </Link>
              <Link href="/shop/" className="btn-outline no-underline">
                Continue shopping
              </Link>
            </div>
          </div>
        </aside>
      </div>

      {crossSell.length > 0 && (
        <section className="section">
          <Reveal>
            <SectionHeading eyebrow="Add these too" line1="Pairs that travel" line2="well together" />
          </Reveal>
          <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-11 lg:grid-cols-4">
            {crossSell.map((p, i) => (
              <Reveal key={p.slug} i={i}>
                <ProductCard p={p} />
              </Reveal>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function Row({ label, value, large = false }: { label: string; value: string; large?: boolean }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <dt className={large ? 'text-[13px] uppercase tracking-[0.14em] text-ink-muted' : 'text-ink-body'}>{label}</dt>
      <dd className={large ? 'tnum font-display text-[30px] font-semibold tracking-[-0.018em]' : 'tnum font-semibold'}>{value}</dd>
    </div>
  );
}
