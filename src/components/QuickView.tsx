'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ProductFrame } from '@/components/ProductFrame';
import { HeartIcon } from '@/components/icons';
import { AddToBagButton, CloseButton, Modal, QtyStepper, SizeChips } from '@/components/ui';
import { cx, getProduct, img, inr, sizeSystem, sizesFor } from '@/lib/utils';
import { useStore } from '@/store/StoreProvider';

export function QuickView() {
  const { ui, setUi, addToBag, toggleWish, state, dispatch } = useStore();
  const router = useRouter();
  const slug = ui.quickView?.slug;
  const move = !!ui.quickView?.move;
  const buyNow = ui.quickView?.intent === 'buy';
  const p = slug ? getProduct(slug) : undefined;

  const [size, setSize] = useState<number | null>(null);
  const [qty, setQty] = useState(1);
  const [frame, setFrame] = useState(0);
  const [err, setErr] = useState(false);

  useEffect(() => {
    setSize(null);
    setQty(1);
    setFrame(0);
    setErr(false);
  }, [slug]);

  const close = () => setUi({ quickView: null });
  if (!p) return null;

  const wished = state.wish.includes(p.slug);

  return (
    <Modal open onClose={close} label={`${buyNow ? "Buy" : "Quick view"} — ${p.name}`}>
      <div className="grid max-h-[86vh] overflow-y-auto md:grid-cols-2">
        <div className="bg-sand p-5 md:p-7">
          <div className="flex gap-3">
            <div className="flex w-[58px] shrink-0 flex-col gap-2">
              {p.imgs.slice(0, 5).map((f, i) => (
                <button key={f} onClick={() => setFrame(i)} aria-label={`View image ${i + 1}`} className={cx('block', i === frame && 'ring-1 ring-primary')}>
                  <ProductFrame inset={3} corners={false}>
                    <Image src={img(f)} alt="" fill sizes="58px" className="object-cover" />
                  </ProductFrame>
                </button>
              ))}
            </div>
            <div className="min-w-0 flex-1">
              <ProductFrame>
                <Image key={frame} src={img(p.imgs[frame])} alt={p.name} fill sizes="(max-width: 768px) 90vw, 440px" className="up-fade object-cover" />
              </ProductFrame>
            </div>
          </div>
        </div>

        <div className="relative p-6 md:p-9">
          <CloseButton onClose={close} className="absolute right-5 top-5" />
          <p className="eyebrow pr-12">
            {p.cat} · {p.work}
          </p>
          <h2 className="display mt-3 text-[clamp(40px,4.8vw,64px)]">{p.name}</h2>
          <p className="mt-4 flex items-baseline gap-3">
            {p.was && <span className="tnum text-[15px] text-strike line-through">{inr(p.was)}</span>}
            <span className={cx('tnum text-[21px] font-bold', p.was && 'text-primary')}>{inr(p.price)}</span>
            <span className="text-[12px] text-ink-muted">Inclusive of GST</span>
          </p>
          <p className="mt-4 max-w-[46ch] text-[14.5px] leading-relaxed text-ink-body">{p.short}.</p>

          <div className="mt-7 flex items-center justify-between">
            <p className="text-[12.5px] font-semibold uppercase tracking-[0.14em]">Size ({sizeSystem(p)})</p>
            <button onClick={() => setUi({ sizeGuide: true })} className="text-[12.5px] text-primary underline underline-offset-4">
              Size guide
            </button>
          </div>
          <SizeChips
            className="mt-3"
            size="sm"
            sizes={sizesFor(p)}
            value={size}
            onChange={(s) => {
              setSize(s);
              setErr(false);
            }}
          />
          {err && <p className="mt-2 text-[12.5px] text-alert">Select your size to add to bag.</p>}

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <QtyStepper qty={qty} onChange={(d) => setQty((q) => Math.max(1, q + d))} />
            <AddToBagButton
              className="flex-1"
              label={buyNow ? 'Buy now' : move ? 'Move to bag' : 'Add to bag'}
              onAdd={(el) => {
                if (size == null) {
                  setErr(true);
                  return false;
                }
                addToBag(p.slug, size, qty, el);
                if (move) dispatch({ t: 'unwish', slug: p.slug });
                // Buy now goes straight on to checkout once the size is set.
                window.setTimeout(() => {
                  close();
                  if (buyNow) router.push('/checkout/');
                }, 900);
              }}
            />
            <button onClick={() => toggleWish(p.slug)} aria-label="Save to wishlist" aria-pressed={wished} className="grid h-[50px] w-[50px] place-items-center border border-ink transition-transform active:scale-95">
              <HeartIcon filled={wished} />
            </button>
          </div>

          <p className="mt-5 text-[12.5px] text-ink-muted">Carefully packed and delivered within 5–7 business days.</p>
          <Link href={`/product/${p.slug}/`} onClick={close} className="mt-4 inline-block text-[12.5px] font-semibold uppercase tracking-[0.14em] text-primary">
            View full details
          </Link>
        </div>
      </div>
    </Modal>
  );
}
