'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ExpandIcon, HeartIcon } from '@/components/icons';
import { ProductCard } from '@/components/ProductCard';
import { ProductFrame } from '@/components/ProductFrame';
import { Reveal, Rise } from '@/components/Reveal';
import { AddToBagButton, Breadcrumb, QtyStepper, SectionHeading, SizeChips, TrustPills } from '@/components/ui';
import { PAIR, PRODUCTS } from '@/data/products';
import { cx, deliverBy, deliveryDays, getProduct, img, inr, sizeSystem, sizeRange, sizesFor } from '@/lib/utils';
import { useStore } from '@/store/StoreProvider';
import { Accordion } from '@/components/product/Accordion';
import { PincodeCheck } from '@/components/product/PincodeCheck';
import { OftenBoughtTogether } from '@/components/product/OftenBoughtTogether';
import { Reviews } from '@/components/product/Reviews';

export function ProductView({ slug }: { slug: string }) {
  const p = getProduct(slug)!;
  const { addToBag, toggleWish, state, dispatch, setUi } = useStore();
  const [size, setSize] = useState<number | null>(null);
  const [qty, setQty] = useState(1);
  const [frame, setFrame] = useState(0);
  const [err, setErr] = useState(false);

  useEffect(() => {
    setSize(null);
    setQty(1);
    setFrame(0);
    dispatch({ t: 'viewed', slug });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  const wished = state.wish.includes(p.slug);
  const alike = PRODUCTS.filter((x) => x.slug !== p.slug).sort((a, b) => Number(b.cat === p.cat) - Number(a.cat === p.cat) || a.rank - b.rank).slice(0, 4);
  const recent = state.recent.filter((s) => s !== p.slug).map(getProduct).filter(Boolean).slice(0, 4);

  return (
    <div className="shell py-12">
      <Breadcrumb trail={[{ label: 'Home', href: '/' }, { label: 'Shop', href: '/shop/' }, { label: p.cat, href: `/shop/?cat=${encodeURIComponent(p.cat)}` }, { label: p.name }]} />

      <div className="mt-8 grid gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,.95fr)] lg:gap-16">
        {/* Gallery */}
        <div className="flex gap-4" data-product={p.slug}>
          <div className="flex w-[76px] shrink-0 flex-col gap-3">
            {p.imgs.map((f, i) => (
              <button
                key={f}
                onClick={() => setFrame(i)}
                aria-label={`View photograph ${i + 1}`}
                aria-pressed={i === frame}
                className={cx('block transition-opacity', i === frame ? 'opacity-100 ring-1 ring-emerald' : 'opacity-70 hover:opacity-100')}
              >
                <ProductFrame inset={3} corners={false}>
                  <Image src={img(f)} alt="" fill sizes="76px" className="object-cover" />
                </ProductFrame>
              </button>
            ))}
          </div>
          <div className="relative min-w-0 flex-1">
            <ProductFrame>
              <Image key={frame} src={img(p.imgs[frame])} alt={`${p.name} — photograph ${frame + 1}`} fill priority sizes="(max-width: 1024px) 92vw, 560px" className="up-fade object-cover" />
            </ProductFrame>
            <button
              onClick={() => setUi({ lightbox: { slug: p.slug, index: frame } })}
              aria-label="Open larger photographs"
              className="up-float absolute bottom-4 right-4"
            >
              <ExpandIcon size={16} />
            </button>
          </div>
        </div>

        {/* Buy column */}
        <div className="lg:sticky lg:top-[112px] lg:self-start">
          <Rise>
            <p className="eyebrow">
              {p.cat} · {p.work}
            </p>
          </Rise>
          <Rise i={1}>
            <h1 className="h-pdp mt-3">{p.name}</h1>
          </Rise>
          <Rise i={2}>
            <p className="mt-6 flex flex-wrap items-baseline gap-3">
              {p.was && <span className="tnum text-[16px] text-strike line-through">{inr(p.was)}</span>}
              <span className={cx('tnum text-[24px] font-bold', p.was && 'text-emerald')}>{inr(p.price)}</span>
              <span className="text-[12.5px] text-ink-muted">Inclusive of GST</span>
            </p>
            <p className="mt-5 max-w-[50ch] text-[15px] leading-relaxed text-ink-body">{p.short}.</p>
          </Rise>

          <div className="mt-9 flex items-end justify-between">
            <p className="text-[12.5px] font-semibold uppercase tracking-[0.14em]">
              Size ({sizeSystem(p)}) <span className="tnum font-normal normal-case tracking-normal text-ink-muted">· {sizeRange(p)}</span>
            </p>
            <button onClick={() => setUi({ sizeGuide: true })} className="text-[12.5px] text-emerald underline underline-offset-4">
              Size guide
            </button>
          </div>
          <SizeChips
            className="mt-3.5"
            sizes={sizesFor(p)}
            value={size}
            onChange={(s) => {
              setSize(s);
              setErr(false);
            }}
          />
          {err && (
            <p role="alert" className="mt-2.5 text-[13px] text-maroon">
              Please select your size first.
            </p>
          )}

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <QtyStepper qty={qty} onChange={(d) => setQty((q) => Math.max(1, q + d))} />
            <AddToBagButton
              className="flex-1"
              onAdd={(el) => {
                if (size == null) {
                  setErr(true);
                  return false;
                }
                addToBag(p.slug, size, qty, el);
              }}
            />
            <button
              onClick={() => toggleWish(p.slug)}
              aria-label={wished ? 'Remove from wishlist' : 'Save to wishlist'}
              aria-pressed={wished}
              className="grid h-[50px] w-[50px] place-items-center border border-ink transition-transform active:scale-95"
            >
              <HeartIcon filled={wished} />
            </button>
          </div>

          <Link
            href="/checkout/"
            onClick={(e) => {
              if (size == null) {
                e.preventDefault();
                setErr(true);
                return;
              }
              addToBag(p.slug, size, qty, e.currentTarget);
            }}
            className="btn-outline mt-3 w-full no-underline"
          >
            Buy now
          </Link>

          <PincodeCheck className="mt-8" />

          <TrustPills className="mt-8" />

          <Accordion
            className="mt-10"
            items={[
              { id: 'desc', title: 'Description', body: p.long },
              {
                id: 'mat',
                title: 'Materials & care',
                body: 'Hand-embroidered upper on a padded leather sole. Store away from direct sun, wipe the upper with a dry cloth, and let a damp pair air-dry before wearing again. Juttis have no left or right — they soften to your foot within a few wears.'
              },
              {
                id: 'ship',
                title: 'Shipping & returns',
                body: `Carefully packed in Delhi and delivered within 5–7 business days, estimated by ${deliverBy(deliveryDays())}. Free delivery above ₹2,999. Exchanges for size are accepted within 7 days of delivery on unworn pairs.`
              }
            ]}
          />
        </div>
      </div>

      {PAIR[p.slug] && <OftenBoughtTogether slug={p.slug} partner={PAIR[p.slug]} />}

      <Reviews name={p.name} />

      <section className="section pb-0">
        <Reveal>
          <SectionHeading eyebrow="From the same workshop" line1="You may also like" />
        </Reveal>
        <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-11 lg:grid-cols-4">
          {alike.map((x, i) => (
            <Reveal key={x.slug} i={i}>
              <ProductCard p={x} />
            </Reveal>
          ))}
        </div>
      </section>

      {recent.length > 0 && (
        <section className="section">
          <Reveal>
            <h2 className="eyebrow">Recently viewed</h2>
          </Reveal>
          <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-11 lg:grid-cols-4">
            {recent.map((x, i) => (
              <Reveal key={x!.slug} i={i}>
                <ProductCard p={x!} />
              </Reveal>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
