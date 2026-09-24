'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ProductFrame } from '@/components/ProductFrame';
import { CloseButton, FreeShipBar, QtyStepper } from '@/components/ui';
import { PRODUCTS } from '@/data/products';
import { getProduct, img, inr } from '@/lib/utils';
import { useStore } from '@/store/StoreProvider';

const EASE = [0.16, 1, 0.3, 1] as const;

export function BagDrawer() {
  const { ui, setUi, state, dispatch, subtotal, count, addToBag } = useStore();
  const close = () => setUi({ bagOpen: false });

  const inBag = new Set(state.cart.map((l) => l.slug));
  const crossSell = PRODUCTS.filter((p) => !inBag.has(p.slug)).slice(0, 3);

  return (
    <AnimatePresence>
      {ui.bagOpen && (
        <div className="fixed inset-0 z-[100]">
          <motion.div
            className="absolute inset-0 bg-ink/40 backdrop-blur-[3px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={close}
          />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label="Your bag"
            className="absolute right-0 top-0 flex h-full w-full max-w-[440px] flex-col bg-ivory shadow-drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.62, ease: EASE }}
          >
            <header className="flex items-center justify-between border-b border-line px-6 py-5">
              <div>
                <h2 className="font-display text-[32px] font-semibold leading-none tracking-[-0.018em]">Your bag</h2>
                <p className="tnum mt-1.5 text-[12px] text-ink-muted">
                  {count} item{count === 1 ? '' : 's'}
                </p>
              </div>
              <CloseButton onClose={close} />
            </header>

            {state.cart.length > 0 && <FreeShipBar subtotal={subtotal} className="border-b border-line px-6 py-4" />}

            <div className="flex-1 overflow-y-auto px-6">
              {state.cart.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center gap-5 py-16 text-center">
                  <h3 className="font-display text-[34px] font-semibold leading-[1.02] tracking-[-0.018em]">Your bag is empty</h3>
                  <p className="max-w-[34ch] text-[14px] leading-relaxed text-ink-body">
                    Start with a pair you’ll reach for every morning. Delivered within 5–7 business days.
                  </p>
                  <Link href="/shop/" onClick={close} className="btn-primary no-underline">
                    Shop the collection
                  </Link>
                </div>
              ) : (
                <ul className="divide-y divide-line">
                  <AnimatePresence initial={false}>
                    {state.cart.map((l, i) => {
                      const p = getProduct(l.slug);
                      if (!p) return null;
                      return (
                        <motion.li
                          key={l.key}
                          layout
                          initial={{ opacity: 0, x: 28, scale: 0.98 }}
                          animate={{ opacity: 1, x: 0, scale: 1 }}
                          exit={{ opacity: 0, x: 48, height: 0, paddingTop: 0, paddingBottom: 0 }}
                          transition={{ duration: 0.46, delay: i * 0.07, ease: EASE }}
                          className="flex gap-4 overflow-hidden py-5"
                        >
                          <Link href={`/product/${p.slug}/`} onClick={close} className="w-[76px] shrink-0 no-underline">
                            <ProductFrame inset={4} corners={false} ratio="76 / 95">
                              <Image src={img(p.imgs[0])} alt={p.name} fill sizes="76px" className="object-cover" />
                            </ProductFrame>
                          </Link>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-start justify-between gap-3">
                              <Link href={`/product/${p.slug}/`} onClick={close} className="font-display text-[21px] font-semibold leading-tight tracking-[-0.005em] text-ink no-underline">
                                {p.name}
                              </Link>
                              <span className="tnum shrink-0 text-[14px] font-bold">{inr(p.price * l.qty)}</span>
                            </div>
                            <p className="tnum mt-1 text-[12.5px] text-ink-muted">
                              {p.cat} · Size {l.size} · {inr(p.price)} each
                            </p>
                            <div className="mt-3 flex items-center gap-4">
                              <QtyStepper qty={l.qty} compact onChange={(d) => dispatch({ t: 'qty', key: l.key, delta: d })} />
                              <button
                                onClick={() => dispatch({ t: 'remove', key: l.key })}
                                className="text-[12px] uppercase tracking-[0.14em] text-ink-muted underline underline-offset-4 transition-colors hover:text-alert"
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
              )}

              {state.cart.length > 0 && crossSell.length > 0 && (
                <section className="border-t border-line py-6">
                  <h3 className="eyebrow mb-4">Add these too</h3>
                  <ul className="space-y-3">
                    {crossSell.map((x) => (
                      <li key={x.slug} className="flex items-center gap-3">
                        <div className="w-[52px] shrink-0">
                          <ProductFrame inset={3} corners={false} ratio="4 / 5">
                            <Image src={img(x.imgs[0])} alt={x.name} fill sizes="52px" className="object-cover" />
                          </ProductFrame>
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-display text-[18px] font-semibold leading-tight">{x.name}</p>
                          <p className="tnum text-[12px] text-ink-muted">
                            {x.cat} · {inr(x.price)}
                          </p>
                        </div>
                        <button
                          onClick={(e) => addToBag(x.slug, x.g === 'Men' ? 8 : 38, 1, e.currentTarget)}
                          className="chip shrink-0 font-semibold uppercase tracking-[0.14em] hover:border-primary hover:text-primary"
                        >
                          Add
                        </button>
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </div>

            {state.cart.length > 0 && (
              <footer className="border-t border-line bg-sand px-6 py-5">
                <div className="flex items-baseline justify-between">
                  <span className="text-[13px] uppercase tracking-[0.14em] text-ink-muted">Subtotal</span>
                  <span className="tnum font-display text-[30px] font-semibold tracking-[-0.018em]">{inr(subtotal)}</span>
                </div>
                <p className="mt-1 text-[12px] text-ink-muted">Delivery calculated at checkout. Prices include GST.</p>
                <div className="mt-4 grid gap-2.5">
                  <Link href="/checkout/" onClick={close} className="btn-primary no-underline">
                    Checkout
                  </Link>
                  <Link href="/bag/" onClick={close} className="btn-outline no-underline">
                    View bag
                  </Link>
                </div>
              </footer>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
