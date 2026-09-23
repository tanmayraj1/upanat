'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { ProductFrame } from '@/components/ProductFrame';
import { Rise } from '@/components/Reveal';
import { OrderTimeline } from '@/components/account/OrderTimeline';
import { TrackForm } from '@/components/account/TrackForm';
import { ORDER_STAGES } from '@/data/products';
import { cx, getProduct, img, inr } from '@/lib/utils';
import { useStore, type Address } from '@/store/StoreProvider';

const TABS = [
  { id: 'orders', label: 'Orders' },
  { id: 'track', label: 'Track an order' },
  { id: 'addresses', label: 'Addresses' },
  { id: 'details', label: 'Account details' }
] as const;

type Tab = (typeof TABS)[number]['id'];

export function AccountView() {
  const { state } = useStore();
  const [tab, setTab] = useState<Tab>('orders');

  return (
    <div className="shell py-12">
      <Rise>
        <p className="eyebrow">My account</p>
      </Rise>
      <Rise i={1}>
        <h1 className="h-page mt-5">Namaste, {state.details.name.split(' ')[0]}</h1>
      </Rise>

      <div className="mt-14 grid gap-12 lg:grid-cols-[228px_minmax(0,1fr)] lg:gap-16">
        <nav aria-label="Account sections" className="lg:sticky lg:top-[112px] lg:self-start">
          <ul className="flex gap-2 overflow-x-auto lg:block lg:space-y-1 lg:overflow-visible">
            {TABS.map((t) => (
              <li key={t.id}>
                <button
                  onClick={() => setTab(t.id)}
                  aria-current={tab === t.id ? 'page' : undefined}
                  className={cx(
                    'w-full whitespace-nowrap border-l-2 px-4 py-2.5 text-left text-[13.5px] transition-colors duration-200',
                    tab === t.id ? 'border-gold bg-sand font-semibold text-ink' : 'border-transparent text-ink-muted hover:text-ink'
                  )}
                >
                  {t.label}
                </button>
              </li>
            ))}
            <li>
              <Link href="/wishlist/" className="block border-l-2 border-transparent px-4 py-2.5 text-[13.5px] text-ink-muted no-underline hover:text-ink">
                Wishlist ({state.wish.length})
              </Link>
            </li>
          </ul>
        </nav>

        <div>
          {tab === 'orders' && <Orders onTrack={() => setTab('track')} />}
          {tab === 'track' && (
            <Section title="Track an order">
              <TrackForm compact />
            </Section>
          )}
          {tab === 'addresses' && <Addresses />}
          {tab === 'details' && <Details />}
        </div>
      </div>
    </div>
  );
}

function Section({ title, children, action }: { title: string; children: React.ReactNode; action?: React.ReactNode }) {
  return (
    <section>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="font-display text-[clamp(32px,3.6vw,46px)] font-semibold leading-none tracking-[-0.018em]">{title}</h2>
        {action}
      </div>
      <div className="mt-8">{children}</div>
    </section>
  );
}

function Orders({ onTrack }: { onTrack: () => void }) {
  const { state } = useStore();
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <Section title="Orders">
      {state.orders.length === 0 ? (
        <p className="text-[14.5px] text-ink-body">No orders yet.</p>
      ) : (
        <ul className="space-y-6">
          {state.orders.map((o) => (
            <li key={o.no} className="border border-line-strong bg-surface p-6">
              <div className="flex flex-wrap items-baseline justify-between gap-4">
                <div>
                  <p className="tnum font-display text-[26px] font-semibold leading-none tracking-[-0.018em]">{o.no}</p>
                  <p className="mt-1.5 text-[12.5px] text-ink-muted">{o.date}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="tnum text-[15px] font-bold">{inr(o.total)}</span>
                  <span className="rounded-full bg-sand px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-gold-ink">
                    {ORDER_STAGES[o.stage]}
                  </span>
                </div>
              </div>

              <ul className="mt-5 space-y-3 border-t border-line pt-5">
                {o.items.map((it, i) => {
                  const p = getProduct(it.slug);
                  if (!p) return null;
                  return (
                    <li key={i} className="flex items-center gap-3.5">
                      <div className="w-[52px] shrink-0">
                        <ProductFrame inset={3} corners={false}>
                          <Image src={img(p.imgs[0])} alt={p.name} fill sizes="52px" className="object-cover" />
                        </ProductFrame>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-display text-[19px] font-semibold leading-tight">{p.name}</p>
                        <p className="tnum text-[12px] text-ink-muted">
                          Size {it.size} · Qty {it.qty}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ul>

              <div className="mt-5 flex flex-wrap gap-3">
                <button onClick={() => setExpanded(expanded === o.no ? null : o.no)} className="btn-outline !px-5 !py-3">
                  {expanded === o.no ? 'Hide tracking' : 'Track'}
                </button>
                <Link href={`/product/${o.items[0]?.slug ?? 'kiyana'}/`} className="btn-outline !px-5 !py-3 no-underline">
                  Write a review
                </Link>
              </div>

              {expanded === o.no && (
                <div className="mt-8 border-t border-line pt-8">
                  <OrderTimeline order={o} />
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
      <button onClick={onTrack} className="mt-7 text-[12.5px] font-semibold uppercase tracking-[0.14em] text-emerald">
        Track an order by number
      </button>
    </Section>
  );
}

const ADDRESS_FIELDS: { id: keyof Omit<Address, 'id' | 'def'>; label: string; span?: boolean }[] = [
  { id: 'label', label: 'Label (Home, Work…)' },
  { id: 'name', label: 'Full name' },
  { id: 'line', label: 'Address', span: true },
  { id: 'city', label: 'City' },
  { id: 'st', label: 'State' },
  { id: 'pin', label: 'Pincode' },
  { id: 'phone', label: 'Mobile' }
];

const BLANK: Address = { id: '', label: 'Home', name: '', line: '', city: '', st: '', pin: '', phone: '', def: false };

function Addresses() {
  const { state, dispatch } = useStore();
  const [form, setForm] = useState<Address | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form) return;
    const err: Record<string, string> = {};
    if (form.name.trim().length < 2) err.name = 'Enter a full name.';
    if (form.line.trim().length < 6) err.line = 'Enter the street address.';
    if (!form.city.trim()) err.city = 'Enter the city.';
    if (!form.st.trim()) err.st = 'Enter the state.';
    if (!/^\d{6}$/.test(form.pin)) err.pin = 'Enter a 6-digit pincode.';
    if (!/^\d{5}\s?\d{5}$|^\d{10}$/.test(form.phone.replace(/\D/g, '').padStart(10, '0')) && form.phone.replace(/\D/g, '').length !== 10)
      err.phone = 'Enter a 10-digit mobile number.';
    setErrors(err);
    if (Object.keys(err).length) return;
    dispatch({ t: 'saveAddress', a: { ...form, id: form.id || `a${Date.now()}` } });
    setForm(null);
  };

  return (
    <Section
      title="Addresses"
      action={
        !form && (
          <button onClick={() => setForm({ ...BLANK })} className="btn-outline !px-5 !py-3">
            Add address
          </button>
        )
      }
    >
      {form ? (
        <form onSubmit={save} className="max-w-[560px] bg-sand p-7">
          <h3 className="font-display text-[26px] font-semibold leading-none tracking-[-0.018em]">
            {form.id ? 'Edit address' : 'New address'}
          </h3>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {ADDRESS_FIELDS.map((f) => (
              <label key={f.id} className={f.span ? 'sm:col-span-2' : undefined}>
                <span className="field-label">{f.label}</span>
                <input
                  value={form[f.id]}
                  onChange={(e) => {
                    setForm({ ...form, [f.id]: e.target.value });
                    setErrors((x) => ({ ...x, [f.id]: '' }));
                  }}
                  className={cx('field', (f.id === 'pin' || f.id === 'phone') && 'tnum', errors[f.id] && 'border-maroon')}
                />
                {errors[f.id] && (
                  <span role="alert" className="mt-1.5 block text-[12.5px] text-maroon">
                    {errors[f.id]}
                  </span>
                )}
              </label>
            ))}
            <label className="flex items-center gap-2.5 sm:col-span-2">
              <input type="checkbox" checked={form.def} onChange={(e) => setForm({ ...form, def: e.target.checked })} className="h-4 w-4 accent-[#0F4C3A]" />
              <span className="text-[13.5px]">Set as default address</span>
            </label>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <button type="submit" className="btn-primary">
              Save address
            </button>
            <button type="button" onClick={() => setForm(null)} className="btn-outline">
              Cancel
            </button>
          </div>
        </form>
      ) : state.addresses.length === 0 ? (
        <p className="text-[14.5px] text-ink-body">No saved addresses. Add one to check out faster next time.</p>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2">
          {state.addresses.map((a) => (
            <li key={a.id} className="border border-line-strong bg-surface p-6">
              <div className="flex items-center justify-between gap-3">
                <span className="text-[12px] font-semibold uppercase tracking-[0.14em]">{a.label}</span>
                {a.def && <span className="rounded-full bg-sand px-2.5 py-1 text-[10.5px] uppercase tracking-[0.14em] text-gold-ink">Default</span>}
              </div>
              <p className="mt-3 text-[14px] font-semibold">{a.name}</p>
              <p className="mt-1 text-[13.5px] leading-relaxed text-ink-body">{a.line}</p>
              <p className="tnum text-[13.5px] text-ink-body">
                {a.city}, {a.st} {a.pin}
              </p>
              <p className="tnum mt-1 text-[13px] text-ink-muted">+91 {a.phone}</p>
              <div className="mt-5 flex flex-wrap gap-4 text-[12px] uppercase tracking-[0.14em]">
                <button onClick={() => setForm(a)} className="text-emerald underline underline-offset-4">
                  Edit
                </button>
                <button onClick={() => dispatch({ t: 'deleteAddress', id: a.id })} className="text-ink-muted underline underline-offset-4 hover:text-maroon">
                  Delete
                </button>
                {!a.def && (
                  <button onClick={() => dispatch({ t: 'defaultAddress', id: a.id })} className="text-ink-muted underline underline-offset-4 hover:text-ink">
                    Set as default
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </Section>
  );
}

function Details() {
  const { state, dispatch } = useStore();
  const [form, setForm] = useState(state.details);
  const [saved, setSaved] = useState(false);

  return (
    <Section title="Account details">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          dispatch({ t: 'details', v: form });
          setSaved(true);
          window.setTimeout(() => setSaved(false), 2400);
        }}
        className="max-w-[460px] space-y-4"
      >
        {([
          ['name', 'Full name'],
          ['email', 'Email'],
          ['phone', 'Mobile (WhatsApp)']
        ] as const).map(([id, label]) => (
          <label key={id} className="block">
            <span className="field-label">{label}</span>
            <input value={form[id]} onChange={(e) => setForm({ ...form, [id]: e.target.value })} className={cx('field', id === 'phone' && 'tnum')} />
          </label>
        ))}
        <div className="flex items-center gap-4 pt-2">
          <button type="submit" className="btn-primary">
            Save changes
          </button>
          {saved && <span className="text-[13px] font-semibold text-emerald">Saved.</span>}
        </div>
      </form>
    </Section>
  );
}
