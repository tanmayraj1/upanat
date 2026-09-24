'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';
import { ProductFrame } from '@/components/ProductFrame';
import { CloseButton } from '@/components/ui';
import { PRODUCTS } from '@/data/products';
import { img, inr } from '@/lib/utils';
import { useStore } from '@/store/StoreProvider';

const EASE = [0.22, 0.61, 0.36, 1] as const;
const TRENDING = ['Jutti', 'Block heels', 'Zardozi', 'Kiyana', 'Mules', 'Men'];

export function matchProducts(q: string) {
  const term = q.trim().toLowerCase();
  if (!term) return [];
  return PRODUCTS.filter((p) =>
    [p.name, p.cat, p.work, p.color, p.short, p.g].join(' ').toLowerCase().includes(term)
  );
}

export function SearchOverlay() {
  const { ui, setUi } = useStore();
  const [q, setQ] = useState('');
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const close = () => setUi({ searchOpen: false });

  useEffect(() => {
    if (ui.searchOpen) window.setTimeout(() => inputRef.current?.focus(), 140);
    else setQ('');
  }, [ui.searchOpen]);

  const results = useMemo(() => (q.trim() ? matchProducts(q) : PRODUCTS.slice(0, 4)), [q]);
  const heading = q.trim() ? `${results.length} result${results.length === 1 ? '' : 's'}` : 'Most loved';

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!q.trim()) return;
    close();
    router.push(`/shop/?q=${encodeURIComponent(q.trim())}`);
  };

  return (
    <AnimatePresence>
      {ui.searchOpen && (
        <div className="fixed inset-0 z-[105]">
          <motion.div
            className="absolute inset-0 bg-ink/40 backdrop-blur-[4px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.26 }}
            onClick={close}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Search the shop"
            className="absolute inset-x-0 top-0 max-h-[88vh] overflow-y-auto border-b border-line bg-ivory"
            initial={{ y: '-100%' }}
            animate={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{ duration: 0.52, ease: EASE }}
          >
            <div className="shell py-8">
              <div className="flex items-start justify-between gap-6">
                <form onSubmit={submit} className="flex-1">
                  <label htmlFor="site-search" className="eyebrow mb-3 block">
                    Search
                  </label>
                  <input
                    id="site-search"
                    ref={inputRef}
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    placeholder="Juttis, zardozi, mules…"
                    className="w-full border-b border-line-strong bg-transparent pb-3 font-display text-[clamp(32px,5vw,58px)] font-semibold leading-none tracking-[-0.022em] outline-none transition-colors focus:border-gold"
                  />
                </form>
                <CloseButton onClose={close} className="mt-8 shrink-0" />
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {TRENDING.map((t) => (
                  <button key={t} onClick={() => setQ(t)} className="chip hover:border-primary hover:text-primary">
                    {t}
                  </button>
                ))}
              </div>

              <h3 className="eyebrow mt-9">{heading}</h3>

              {results.length === 0 ? (
                <p className="mt-5 max-w-[56ch] text-[14.5px] leading-relaxed text-ink-body">
                  Nothing matches “{q}”. Try a colour, a category or a style of work — “emerald”, “mules”, “zardozi”.
                </p>
              ) : (
                <ul className="mt-5 grid gap-x-8 gap-y-4 pb-4 sm:grid-cols-2">
                  {results.slice(0, 8).map((p, i) => (
                    <motion.li
                      key={p.slug}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.34, delay: i * 0.04, ease: EASE }}
                    >
                      <button
                        onClick={() => {
                          close();
                          router.push(`/product/${p.slug}/`);
                        }}
                        className="group flex w-full items-center gap-4 border-b border-line py-3 text-left transition-colors hover:bg-sand/60"
                      >
                        <div className="w-[56px] shrink-0">
                          <ProductFrame inset={3} corners={false}>
                            <Image src={img(p.imgs[0])} alt="" fill sizes="56px" className="object-cover" />
                          </ProductFrame>
                        </div>
                        <span className="min-w-0 flex-1">
                          <span className="block font-display text-[22px] font-semibold leading-tight tracking-[-0.005em]">{p.name}</span>
                          <span className="block text-[12.5px] text-ink-muted">
                            {p.cat} · {p.work}
                          </span>
                        </span>
                        <span className="tnum shrink-0 text-[14px] font-bold">{inr(p.price)}</span>
                      </button>
                    </motion.li>
                  ))}
                </ul>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
