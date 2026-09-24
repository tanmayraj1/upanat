'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import { ProductFrame } from '@/components/ProductFrame';
import { HeartIcon } from '@/components/icons';
import { useStore } from '@/store/StoreProvider';
import type { Product } from '@/data/products';
import { cx, img, inr } from '@/lib/utils';

/**
 * Grid card. The wishlist heart is the only floating action — everything that
 * commits to a purchase is an explicit, labelled button under the price.
 *
 * Every pair is sold in a size run, so neither action can complete from the
 * grid alone: both open Quick View, which is where a size gets chosen. Buy now
 * carries `intent: 'buy'` so Quick View sends you to checkout after adding.
 */
export function ProductCard({ p, priority = false }: { p: Product; priority?: boolean }) {
  const { state, toggleWish, setUi } = useStore();
  const rootRef = useRef<HTMLDivElement>(null);
  const wished = state.wish.includes(p.slug);
  const second = p.imgs[1] ?? p.imgs[0];

  return (
    <div ref={rootRef} data-product={p.slug} className="group relative flex flex-col">
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

      <button
        onClick={() => toggleWish(p.slug)}
        aria-label={wished ? `Remove ${p.name} from wishlist` : `Save ${p.name} to wishlist`}
        aria-pressed={wished}
        className="up-float absolute right-2.5 top-2.5"
        data-pop={wished ? 'on' : undefined}
      >
        <HeartIcon filled={wished} size={17} />
      </button>

      <Link href={`/product/${p.slug}/`} className="mt-4 block no-underline">
        <span className="eyebrow block">{p.cat}</span>
        <span className="mt-2 block font-display text-[clamp(21px,4.6vw,28px)] font-semibold leading-[1.04] tracking-[-0.012em] text-ink">
          {p.name}
        </span>
        <span className="mt-2 flex items-baseline gap-2.5">
          {p.was && <span className="tnum text-[14px] text-strike line-through">{inr(p.was)}</span>}
          <span className={cx('tnum text-[21px] font-bold leading-none', p.was ? 'text-primary' : 'text-ink')}>
            {inr(p.price)}
          </span>
        </span>
      </Link>

      {/* Buy now is revealed on hover where there is a pointer, and sits
          alongside Add to cart on touch, where nothing is hoverable. */}
      <div className="up-actions mt-3.5 grid gap-2">
        <button
          onClick={() => setUi({ quickView: { slug: p.slug } })}
          className="btn-primary !px-4 !py-3 !text-[11.5px]"
        >
          Add to cart
        </button>
        <button
          onClick={() => setUi({ quickView: { slug: p.slug, intent: 'buy' } })}
          className="up-buynow btn-outline !px-4 !py-3 !text-[11.5px]"
        >
          Buy now
        </button>
      </div>
    </div>
  );
}
