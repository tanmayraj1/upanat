'use client';

import Image from 'next/image';
import { useState } from 'react';
import { ProductFrame } from '@/components/ProductFrame';
import { AddToBagButton, SizeChips } from '@/components/ui';
import { getProduct, img, inr, sizesFor } from '@/lib/utils';
import { useStore } from '@/store/StoreProvider';

/** Pairs the current product with its partner; both need a size before adding. */
export function OftenBoughtTogether({ slug, partner }: { slug: string; partner: string }) {
  const a = getProduct(slug)!;
  const b = getProduct(partner)!;
  const { addToBag, setUi } = useStore();
  const [aSize, setASize] = useState<number | null>(null);
  const [bSize, setBSize] = useState<number | null>(null);
  const [err, setErr] = useState(false);

  return (
    <section className="section">
      <div className="bg-sand p-7 md:p-10">
        <p className="eyebrow">Often bought together</p>
        <h2 className="display mt-3 text-[clamp(30px,3.6vw,46px)]">
          {a.name} &amp; {b.name}
        </h2>
        <p className="mt-4 max-w-[54ch] text-[14.5px] leading-relaxed text-ink-body">
          One pair for the ceremony, one for the reception — both on padded leather soles.
        </p>

        <div className="mt-9 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto] lg:items-start">
          {[
            { p: a, size: aSize, set: setASize },
            { p: b, size: bSize, set: setBSize }
          ].map(({ p, size, set }) => (
            <div key={p.slug} className="flex gap-4" data-product={p.slug}>
              <div className="w-[110px] shrink-0">
                <ProductFrame inset={5}>
                  <Image src={img(p.imgs[0])} alt={p.name} fill sizes="110px" className="object-cover" />
                </ProductFrame>
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-display text-[24px] font-semibold leading-tight tracking-[-0.01em]">{p.name}</p>
                <p className="tnum mt-1 text-[13px] text-ink-muted">
                  {inr(p.price)} · {size ? `Size ${size}` : 'pick a size'}
                </p>
                <SizeChips
                  className="mt-3"
                  size="sm"
                  sizes={sizesFor(p)}
                  value={size}
                  onChange={(s) => {
                    set(s);
                    setErr(false);
                  }}
                />
              </div>
            </div>
          ))}

          <div className="lg:pl-4">
            <p className="text-[12px] uppercase tracking-[0.16em] text-ink-muted">Together</p>
            <p className="tnum font-display text-[38px] font-semibold leading-none tracking-[-0.018em]">{inr(a.price + b.price)}</p>
            <AddToBagButton
              className="mt-4 w-full"
              label="Add both to bag"
              onAdd={(el) => {
                if (aSize == null || bSize == null) {
                  setErr(true);
                  return false;
                }
                addToBag(a.slug, aSize, 1, el);
                addToBag(b.slug, bSize, 1, el);
                window.setTimeout(() => setUi({ bagOpen: true }), 800);
              }}
            />
            {err && (
              <p role="alert" className="mt-2 text-[12.5px] text-maroon">
                Pick a size for both pairs.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
