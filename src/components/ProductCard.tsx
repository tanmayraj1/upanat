'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState } from 'react';
import { ProductFrame } from '@/components/ProductFrame';
import { BagIcon, DrawnCheck, HeartIcon } from '@/components/icons';
import { useStore } from '@/store/StoreProvider';
import type { Product } from '@/data/products';
import { cx, img, inr, sizesFor } from '@/lib/utils';

export function ProductCard({ p, priority = false }: { p: Product; priority?: boolean }) {
  const { state, toggleWish, addToBag, setUi } = useStore();
  const [added, setAdded] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const wished = state.wish.includes(p.slug);
  const second = p.imgs[1] ?? p.imgs[0];

  const pick = (size: number) => {
    addToBag(p.slug, size, 1, rootRef.current);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1400);
  };

  return (
    <div ref={rootRef} data-product={p.slug} className="group relative">
      <Link href={`/product/${p.slug}/`} className="block no-underline" aria-label={`${p.name} — ${inr(p.price)}`}>
        <ProductFrame className="transition-transform duration-[420ms] ease-craft group-hover:-translate-y-[5px] group-hover:shadow-card">
          <Image
            src={img(p.imgs[0])}
            alt={p.name}
            fill
            sizes="(max-width: 700px) 50vw, (max-width: 1100px) 33vw, 320px"
            priority={priority}
            className="object-cover transition-[transform,opacity] duration-[900ms] ease-craft group-hover:scale-[1.04] group-hover:opacity-0"
          />
          <Image
            src={img(second)}
            alt=""
            fill
            sizes="(max-width: 700px) 50vw, (max-width: 1100px) 33vw, 320px"
            aria-hidden
            className="object-cover opacity-0 transition-[transform,opacity] duration-[420ms] ease-craft group-hover:scale-[1.04] group-hover:opacity-100"
          />
        </ProductFrame>
      </Link>

      {/* Floating actions, top-right of the frame. */}
      <div className="absolute right-2.5 top-2.5 flex flex-col gap-2">
        <button
          onClick={() => toggleWish(p.slug)}
          aria-label={wished ? `Remove ${p.name} from wishlist` : `Save ${p.name} to wishlist`}
          aria-pressed={wished}
          className="up-float"
          data-pop={wished ? 'on' : undefined}
        >
          <HeartIcon filled={wished} size={17} />
        </button>
        <button onClick={() => setUi({ quickView: { slug: p.slug } })} aria-label={`Quick view ${p.name}`} className="up-float">
          <BagIcon size={17} />
        </button>
      </div>

      {/* Quick-size panel — inset at the bottom of the frame. */}
      <div className="up-quick pointer-events-none absolute inset-x-2 bottom-2 opacity-0 transition-[opacity,transform] duration-[320ms] ease-craft group-hover:pointer-events-auto group-hover:opacity-100">
        <div className="bg-ivory/95 px-3 py-2.5 backdrop-blur-sm" style={{ border: '1px solid rgba(201,151,46,.55)' }}>
          {added ? (
            <p className="flex items-center justify-center gap-2 py-1.5 text-[12px] font-semibold uppercase tracking-[.14em] text-emerald">
              <DrawnCheck size={16} stroke="#0F4C3A" /> Added to bag
            </p>
          ) : (
            <>
              <p className="mb-2 text-center text-[10.5px] font-semibold uppercase tracking-[.16em] text-ink-muted">
                Add to bag · pick a size
              </p>
              <div className="flex flex-wrap justify-center gap-1.5">
                {sizesFor(p).map((s) => (
                  <button
                    key={s}
                    onClick={() => pick(s)}
                    className="tnum h-[30px] min-w-[34px] border border-line-strong px-1.5 text-[12.5px] transition-colors duration-200 ease-craft hover:border-emerald hover:bg-emerald hover:text-ivory"
                    aria-label={`Add ${p.name} size ${s} to bag`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      <Link href={`/product/${p.slug}/`} className="mt-4 flex items-start justify-between gap-4 no-underline">
        <span>
          <span className="eyebrow block">{p.cat}</span>
          <span className="mt-1.5 block font-display text-[28px] font-semibold leading-none tracking-[-0.01em] text-ink">
            {p.name}
          </span>
        </span>
        <span className="mt-[18px] shrink-0 text-right">
          {p.was && <span className="tnum mr-2 text-[13px] text-strike line-through">{inr(p.was)}</span>}
          <span className={cx('tnum text-[15.5px] font-bold', p.was ? 'text-emerald' : 'text-ink')}>{inr(p.price)}</span>
        </span>
      </Link>
    </div>
  );
}
