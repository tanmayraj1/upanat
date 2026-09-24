'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMemo, useState } from 'react';
import { ProductCard } from '@/components/ProductCard';
import { ProductFrame } from '@/components/ProductFrame';
import { HeartIcon } from '@/components/icons';
import { Reveal, Rise } from '@/components/Reveal';
import { Breadcrumb, CloseButton, EmptyState } from '@/components/ui';
import { CATEGORIES, COLORS, MENS_SIZES, PRODUCTS, WOMENS_SIZES, type Category } from '@/data/products';
import { cx, img, inr, sizeRange } from '@/lib/utils';
import { useStore } from '@/store/StoreProvider';

const SORTS = [
  { v: 'featured', l: 'Featured' },
  { v: 'newest', l: 'Newest' },
  { v: 'bestselling', l: 'Bestselling' },
  { v: 'price-asc', l: 'Price: low to high' },
  { v: 'price-desc', l: 'Price: high to low' }
];

const MAX_PRICE = 3500;
const MIN_PRICE = 1800;

type Filters = { cats: Category[]; sizes: number[]; colors: string[]; max: number };

export function ShopView() {
  const params = useSearchParams();
  const router = useRouter();
  const { toggleWish, state, setUi } = useStore();

  const q = params.get('q') ?? '';
  const gender = params.get('g');
  const catParam = params.get('cat') as Category | null;

  const [f, setF] = useState<Filters>({ cats: catParam ? [catParam] : [], sizes: [], colors: [], max: MAX_PRICE });
  const [sort, setSort] = useState(params.get('sort') ?? 'featured');
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [filtersOpen, setFiltersOpen] = useState(false);

  const scoped = useMemo(
    () => PRODUCTS.filter((p) => (!gender || p.g === gender) && (!q || [p.name, p.cat, p.work, p.color, p.short].join(' ').toLowerCase().includes(q.toLowerCase()))),
    [gender, q]
  );

  const results = useMemo(() => {
    const list = scoped.filter((p) => {
      if (f.cats.length && !f.cats.includes(p.cat)) return false;
      if (f.colors.length && !f.colors.includes(p.color)) return false;
      if (p.price > f.max) return false;
      // Every pair is stocked in its full run, so a size filter narrows by system.
      if (f.sizes.length) {
        const own = p.g === 'Men' ? MENS_SIZES : WOMENS_SIZES;
        if (!f.sizes.some((s) => own.includes(s))) return false;
      }
      return true;
    });
    const by: Record<string, (a: typeof list[0], b: typeof list[0]) => number> = {
      featured: (a, b) => a.rank - b.rank,
      newest: (a, b) => a.fresh - b.fresh,
      bestselling: (a, b) => a.rank - b.rank,
      'price-asc': (a, b) => a.price - b.price,
      'price-desc': (a, b) => b.price - a.price
    };
    return [...list].sort(by[sort] ?? by.featured);
  }, [scoped, f, sort]);

  const title = q
    ? `Results for “${q}”`
    : catParam
      ? CATEGORIES.find((c) => c === catParam) ?? 'All pairs'
      : gender === 'Men'
        ? 'Men'
        : gender === 'Women'
          ? 'Women'
          : params.get('sort') === 'newest'
            ? 'New arrivals'
            : 'All pairs';

  const countFor = (cat: Category) => scoped.filter((p) => p.cat === cat).length;

  const toggle = <K extends keyof Filters>(key: K, value: Filters[K] extends Array<infer T> ? T : never) =>
    setF((cur) => {
      const arr = cur[key] as unknown as unknown[];
      return { ...cur, [key]: arr.includes(value) ? arr.filter((x) => x !== value) : [...arr, value] } as Filters;
    });

  const activeChips = [
    ...f.cats.map((c) => ({ label: c, clear: () => toggle('cats', c) })),
    ...f.sizes.map((s) => ({ label: `Size ${s}`, clear: () => toggle('sizes', s) })),
    ...f.colors.map((c) => ({ label: c, clear: () => toggle('colors', c) })),
    ...(f.max < MAX_PRICE ? [{ label: `Up to ${inr(f.max)}`, clear: () => setF((c) => ({ ...c, max: MAX_PRICE })) }] : []),
    ...(q ? [{ label: `“${q}”`, clear: () => router.push('/shop/') }] : [])
  ];

  const clearAll = () => {
    setF({ cats: [], sizes: [], colors: [], max: MAX_PRICE });
    if (q || gender || catParam) router.push('/shop/');
  };

  const filterBody = (
    <div className="space-y-8">
      <FilterGroup title="Category">
        {CATEGORIES.map((c) => (
          <label key={c} className="flex cursor-pointer items-center justify-between py-1.5 text-[14px]">
            <span className="flex items-center gap-2.5">
              <input type="checkbox" checked={f.cats.includes(c)} onChange={() => toggle('cats', c)} className="h-4 w-4 accent-[#7A1F2B]" />
              {c}
            </span>
            <span className="tnum text-[12px] text-ink-muted">{countFor(c)}</span>
          </label>
        ))}
      </FilterGroup>

      <FilterGroup title="Size">
        <div className="flex flex-wrap gap-1.5">
          {[...WOMENS_SIZES, ...MENS_SIZES].map((s, i) => (
            <button
              key={`${s}-${i}`}
              onClick={() => toggle('sizes', s)}
              aria-pressed={f.sizes.includes(s)}
              className={cx(
                'tnum h-[38px] min-w-[46px] border px-2 text-[13px] transition-colors duration-200 lg:h-[34px] lg:min-w-[40px]',
                f.sizes.includes(s) ? 'border-primary bg-primary text-ivory' : 'border-line-strong hover:border-ink'
              )}
            >
              {i < WOMENS_SIZES.length ? s : `UK ${s}`}
            </button>
          ))}
        </div>
        <button onClick={() => setUi({ sizeGuide: true })} className="mt-3 text-[12.5px] text-primary underline underline-offset-4">
          Not sure? Size guide
        </button>
      </FilterGroup>

      <FilterGroup title="Colour">
        <div className="flex flex-wrap gap-2.5">
          {COLORS.map((c) => (
            <button
              key={c.n}
              onClick={() => toggle('colors', c.n)}
              aria-pressed={f.colors.includes(c.n)}
              aria-label={c.n}
              title={c.n}
              className={cx(
                'h-8 w-8 rounded-full border transition-transform duration-200 hover:scale-110 lg:h-7 lg:w-7',
                f.colors.includes(c.n) ? 'border-primary ring-2 ring-primary ring-offset-2 ring-offset-ivory' : 'border-line-strong'
              )}
              style={{ background: c.hex }}
            />
          ))}
        </div>
      </FilterGroup>

      <FilterGroup title="Price">
        <input
          type="range"
          min={MIN_PRICE}
          max={MAX_PRICE}
          step={100}
          value={f.max}
          onChange={(e) => setF((c) => ({ ...c, max: Number(e.target.value) }))}
          className="w-full"
          aria-label="Maximum price"
        />
        <p className="tnum mt-2 text-[13px] text-ink-body">Up to {inr(f.max)}</p>
      </FilterGroup>
    </div>
  );

  return (
    <div className="shell py-12">
      <Breadcrumb trail={[{ label: 'Home', href: '/' }, { label: 'Shop' }]} />

      <div className="mt-4 flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
        <Rise>
          <h1 className="h-page">{title}</h1>
        </Rise>
        <Rise i={1}>
          <p className="tnum pb-2.5 text-[13px] text-ink-muted">
            {results.length} pair{results.length === 1 ? '' : 's'}
          </p>
        </Rise>
      </div>

      <div className="mt-7 grid gap-10 lg:mt-9 lg:grid-cols-[236px_minmax(0,1fr)] lg:gap-14">
        {/* Desktop: a sticky rail. Mobile: the same controls in a bottom sheet. */}
        <aside className="hidden lg:sticky lg:top-[112px] lg:block lg:self-start">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="eyebrow">Filters</h2>
            {activeChips.length > 0 && (
              <button onClick={clearAll} className="text-[12px] text-primary underline underline-offset-4">
                Clear all
              </button>
            )}
          </div>
          {filterBody}
        </aside>

        <div>
          <div className="up-rule flex flex-wrap items-center justify-between gap-3 pb-4">
            <button onClick={() => setFiltersOpen(true)} className="up-control lg:hidden" aria-haspopup="dialog">
              Filters
              {activeChips.length > 0 && <span className="tnum text-primary">({activeChips.length})</span>}
            </button>

            <div className="flex flex-wrap items-center gap-2">
              {activeChips.map((c) => (
                <button key={c.label} onClick={c.clear} className="chip hover:border-alert hover:text-alert">
                  {c.label}
                  <span aria-hidden>✕</span>
                  <span className="sr-only">Remove filter</span>
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2.5">
              <label className="up-control up-control--select">
                <span className="text-ink-muted">Sort</span>
                <select value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Sort products">
                  {SORTS.map((o) => (
                    <option key={o.v} value={o.v}>
                      {o.l}
                    </option>
                  ))}
                </select>
              </label>
              <div className="up-segment" role="group" aria-label="View">
                {(['grid', 'list'] as const).map((v) => (
                  <button key={v} onClick={() => setView(v)} aria-pressed={view === v} className={cx(view === v && 'is-on')}>
                    {v}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {results.length === 0 ? (
            <div className="mt-12">
              <EmptyState
                title="No pairs match these filters"
                body="Try removing a size or colour — or browse everything."
                action={
                  <button onClick={clearAll} className="btn-primary">
                    Clear filters
                  </button>
                }
              />
            </div>
          ) : view === 'grid' ? (
            <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-11 lg:grid-cols-3">
              {results.map((p, i) => (
                <Reveal key={p.slug} i={i % 3}>
                  <ProductCard p={p} priority={i < 3} />
                </Reveal>
              ))}
            </div>
          ) : (
            <ul className="mt-10 divide-y divide-line">
              {results.map((p, i) => (
                <Reveal key={p.slug} as="li" i={i % 4} className="flex flex-col gap-6 py-7 sm:flex-row">
                  <Link href={`/product/${p.slug}/`} data-product={p.slug} className="w-full shrink-0 no-underline sm:w-[180px]">
                    <ProductFrame>
                      <Image src={img(p.imgs[0])} alt={p.name} fill sizes="180px" className="object-cover" />
                    </ProductFrame>
                  </Link>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <p className="eyebrow">{p.cat} · {p.work}</p>
                    <div className="mt-2 flex items-start justify-between gap-5">
                      <Link href={`/product/${p.slug}/`} className="font-display text-[30px] font-semibold leading-none tracking-[-0.01em] text-ink no-underline">
                        {p.name}
                      </Link>
                      <span className="tnum shrink-0 text-[15.5px] font-bold">{inr(p.price)}</span>
                    </div>
                    <p className="mt-3 max-w-[58ch] text-[14.5px] leading-relaxed text-ink-body">{p.short}.</p>
                    <p className="tnum mt-3 text-[13px] text-ink-muted">Sizes {sizeRange(p)}</p>
                    <div className="mt-auto flex flex-wrap items-center gap-3 pt-5">
                      <button onClick={() => setUi({ quickView: { slug: p.slug } })} className="btn-outline">
                        Choose size
                      </button>
                      <button
                        onClick={() => toggleWish(p.slug)}
                        aria-label="Save to wishlist"
                        aria-pressed={state.wish.includes(p.slug)}
                        className="grid h-[50px] w-[50px] place-items-center border border-line-strong transition-transform active:scale-95"
                      >
                        <HeartIcon filled={state.wish.includes(p.slug)} />
                      </button>
                    </div>
                  </div>
                </Reveal>
              ))}
            </ul>
          )}
        </div>
      </div>

      <FilterSheet
        open={filtersOpen}
        onClose={() => setFiltersOpen(false)}
        onClear={clearAll}
        count={results.length}
        hasFilters={activeChips.length > 0}
      >
        {filterBody}
      </FilterSheet>
    </div>
  );
}

/** Bottom sheet that carries the filter rail on phones and small tablets. */
function FilterSheet({
  open, onClose, onClear, count, hasFilters, children
}: {
  open: boolean;
  onClose: () => void;
  onClear: () => void;
  count: number;
  hasFilters: boolean;
  children: React.ReactNode;
}) {
  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[100] lg:hidden">
          <motion.div
            className="absolute inset-0 bg-ink/45 backdrop-blur-[3px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28 }}
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Filters"
            className="absolute inset-x-0 bottom-0 flex max-h-[86vh] flex-col bg-ivory"
            style={{ borderRadius: '12px 12px 0 0', boxShadow: '0 -24px 48px -24px rgba(34,26,20,.4)' }}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ duration: 0.52, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="up-rule flex items-center justify-between px-6 pb-4 pt-5">
              <span className="mx-auto absolute left-1/2 top-2.5 h-1 w-10 -translate-x-1/2 rounded-full bg-line-strong" aria-hidden />
              <h2 className="font-display text-[26px] font-semibold leading-none tracking-[-0.018em]">Filters</h2>
              <CloseButton onClose={onClose} />
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-6">{children}</div>

            <div className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3 bg-sand px-6 py-4" style={{ borderTop: '1px solid rgba(201,151,46,.45)' }}>
              <button onClick={onClear} disabled={!hasFilters} className="btn-outline !px-5 !py-3 disabled:opacity-40">
                Clear all
              </button>
              <button onClick={onClose} className="btn-primary">
                Show {count} pair{count === 1 ? '' : 's'}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h3 className="up-rule mb-3.5 pb-2 text-[12px] font-semibold uppercase tracking-[0.16em]">{title}</h3>
      {children}
    </section>
  );
}
