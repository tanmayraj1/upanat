'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ProductFrame } from '@/components/ProductFrame';
import { Rise } from '@/components/Reveal';
import { COD_FEE } from '@/data/products';
import { cx, deliverBy, deliveryDays, getProduct, img, inr } from '@/lib/utils';
import { useStore, type Order } from '@/store/StoreProvider';

type Guest = { name: string; email: string; phone: string; line: string; city: string; st: string; pin: string };

const GUEST_FIELDS: { id: keyof Guest; label: string; span?: boolean; mode?: 'numeric' | 'email' }[] = [
  { id: 'name', label: 'Full name', span: true },
  { id: 'email', label: 'Email', mode: 'email' },
  { id: 'phone', label: 'Mobile (10 digits)', mode: 'numeric' },
  { id: 'line', label: 'Address', span: true },
  { id: 'city', label: 'City' },
  { id: 'st', label: 'State' },
  { id: 'pin', label: 'Pincode', mode: 'numeric' }
];

const PAYMENTS = [
  { id: 'upi', label: 'UPI', desc: 'Pay with any UPI app — GPay, PhonePe, Paytm' },
  { id: 'card', label: 'Card', desc: 'Visa, Mastercard, RuPay credit and debit' },
  { id: 'netbanking', label: 'Net banking', desc: 'All major Indian banks' },
  { id: 'cod', label: 'Cash on delivery', desc: `Pay the courier at your door · +${inr(COD_FEE)} fee` }
];

export function CheckoutView() {
  const { state, subtotal, shipping, count, dispatch, setLastOrder, ready } = useStore();
  const router = useRouter();

  const [mode, setMode] = useState<'saved' | 'new'>(state.addresses.length ? 'saved' : 'new');
  const [selected, setSelected] = useState(state.addresses.find((a) => a.def)?.id ?? state.addresses[0]?.id ?? '');
  const [shipDiff, setShipDiff] = useState(false);
  const [guest, setGuest] = useState<Guest>({ name: '', email: '', phone: '', line: '', city: '', st: '', pin: '' });
  const [alt, setAlt] = useState({ name: '', line: '', city: '', pin: '' });
  const [pay, setPay] = useState('upi');
  const [errors, setErrors] = useState<Partial<Record<string, string>>>({});
  const [placing, setPlacing] = useState(false);

  const codFee = pay === 'cod' ? COD_FEE : 0;
  const total = subtotal + shipping + codFee;
  const pin = mode === 'saved' ? state.addresses.find((a) => a.id === selected)?.pin : guest.pin;
  const eta = deliverBy(deliveryDays(pin));

  if (ready && state.cart.length === 0) {
    return (
      <div className="shell section flex flex-col items-center text-center">
        <h1 className="h-page">Your bag is empty</h1>
        <Link href="/shop/" className="btn-primary mt-9 no-underline">
          Shop the collection
        </Link>
      </div>
    );
  }

  const validate = () => {
    const e: Record<string, string> = {};
    if (mode === 'new') {
      if (guest.name.trim().length < 2) e.name = 'Enter your full name.';
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/.test(guest.email)) e.email = 'Enter a valid email.';
      if (!/^\d{10}$/.test(guest.phone.replace(/\D/g, ''))) e.phone = 'Enter a 10-digit mobile number.';
      if (guest.line.trim().length < 6) e.line = 'Enter your street address.';
      if (!guest.city.trim()) e.city = 'Enter your city.';
      if (!guest.st.trim()) e.st = 'Enter your state.';
      if (!/^\d{6}$/.test(guest.pin)) e.pin = 'Enter a 6-digit pincode.';
    } else if (!selected) {
      e.address = 'Choose a delivery address.';
    }
    if (shipDiff) {
      if (alt.name.trim().length < 2) e.altname = 'Enter the recipient’s name.';
      if (alt.line.trim().length < 6) e.altline = 'Enter the street address.';
      if (!alt.city.trim()) e.altcity = 'Enter the city.';
      if (!/^\d{6}$/.test(alt.pin)) e.altpin = 'Enter a 6-digit pincode.';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const place = () => {
    if (!validate()) return;
    setPlacing(true);
    const order: Order = {
      no: `UPS-${10000 + Math.floor(Math.random() * 9000)}`,
      date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      email: mode === 'new' ? guest.email : state.details.email,
      items: state.cart.map(({ slug, size, qty }) => ({ slug, size, qty })),
      total,
      stage: 0
    };
    window.setTimeout(() => {
      dispatch({ t: 'order', o: order });
      dispatch({ t: 'clearCart' });
      setLastOrder(order);
      router.push('/order-confirmed/');
    }, 900);
  };

  return (
    <div className="shell py-12">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <Rise>
          <h1 className="h-page">Checkout</h1>
        </Rise>
        <Rise i={1}>
          <p className="pb-3 text-[12.5px] text-ink-muted">Secure checkout</p>
        </Rise>
      </div>

      <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-16">
        <div className="space-y-14">
          {/* 01 — Address */}
          <Step n="01" title="Delivery address">
            <div className="inline-flex border border-line-strong p-1">
              {(['saved', 'new'] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  aria-pressed={mode === m}
                  className={cx(
                    'px-5 py-2 text-[11.5px] font-semibold uppercase tracking-[0.16em] transition-colors duration-200',
                    mode === m ? 'bg-emerald text-ivory' : 'text-ink-muted hover:text-ink'
                  )}
                >
                  {m === 'saved' ? 'Saved addresses' : 'New address'}
                </button>
              ))}
            </div>

            {mode === 'saved' ? (
              <div className="mt-6">
                <p className="text-[13px] text-ink-muted">
                  Signed in as {state.details.name} ·{' '}
                  <Link href="/account/" className="text-emerald">
                    Manage addresses
                  </Link>
                </p>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {state.addresses.map((a) => (
                    <label
                      key={a.id}
                      className={cx(
                        'cursor-pointer bg-surface p-5 transition-[border-color,box-shadow] duration-200',
                        selected === a.id ? 'border border-emerald shadow-[inset_0_0_0_1px_#0F4C3A]' : 'border border-line-strong'
                      )}
                    >
                      <span className="flex items-center justify-between gap-3">
                        <span className="flex items-center gap-2.5">
                          <input type="radio" name="addr" checked={selected === a.id} onChange={() => setSelected(a.id)} className="h-4 w-4 accent-[#0F4C3A]" />
                          <span className="text-[12px] font-semibold uppercase tracking-[0.14em]">{a.label}</span>
                        </span>
                        {a.def && <span className="rounded-full bg-sand px-2.5 py-1 text-[10.5px] uppercase tracking-[0.14em] text-gold-ink">Default</span>}
                      </span>
                      <span className="mt-3 block text-[14px] font-semibold">{a.name}</span>
                      <span className="mt-1 block text-[13.5px] leading-relaxed text-ink-body">{a.line}</span>
                      <span className="tnum mt-0.5 block text-[13.5px] text-ink-body">
                        {a.city}, {a.st} {a.pin}
                      </span>
                      <span className="tnum mt-1 block text-[13px] text-ink-muted">+91 {a.phone}</span>
                    </label>
                  ))}
                </div>
                {errors.address && <FieldError>{errors.address}</FieldError>}
              </div>
            ) : (
              <div className="mt-6">
                <p className="max-w-[58ch] text-[13.5px] leading-relaxed text-ink-muted">
                  No account needed. We&apos;ll send your confirmation and tracking to the email and number below.
                </p>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  {GUEST_FIELDS.map((f) => (
                    <label key={f.id} className={f.span ? 'sm:col-span-2' : undefined}>
                      <span className="field-label">{f.label}</span>
                      <input
                        value={guest[f.id]}
                        inputMode={f.mode}
                        onChange={(e) => {
                          setGuest((g) => ({ ...g, [f.id]: e.target.value }));
                          setErrors((x) => ({ ...x, [f.id]: undefined }));
                        }}
                        className={cx('field', f.mode === 'numeric' && 'tnum', errors[f.id] && 'border-maroon')}
                        aria-invalid={!!errors[f.id]}
                      />
                      {errors[f.id] && <FieldError>{errors[f.id]}</FieldError>}
                    </label>
                  ))}
                </div>
              </div>
            )}

            <label className="mt-7 flex cursor-pointer items-center gap-3">
              <span className={cx('relative h-6 w-11 rounded-full transition-colors duration-300', shipDiff ? 'bg-emerald' : 'bg-line-strong')}>
                <input type="checkbox" checked={shipDiff} onChange={(e) => setShipDiff(e.target.checked)} className="sr-only" />
                <span className={cx('absolute top-0.5 h-5 w-5 rounded-full bg-ivory transition-[left] duration-300 ease-craft', shipDiff ? 'left-[22px]' : 'left-0.5')} />
              </span>
              <span className="text-[13.5px]">Ship to a different address</span>
            </label>

            {shipDiff && (
              <div className="mt-5 grid gap-4 border-l-2 pl-5 sm:grid-cols-2" style={{ borderColor: 'rgba(201,151,46,.6)' }}>
                {([
                  ['name', 'Recipient name', true],
                  ['line', 'Address', true],
                  ['city', 'City', false],
                  ['pin', 'Pincode', false]
                ] as const).map(([id, label, span]) => (
                  <label key={id} className={span ? 'sm:col-span-2' : undefined}>
                    <span className="field-label">{label}</span>
                    <input
                      value={alt[id]}
                      onChange={(e) => {
                        setAlt((a) => ({ ...a, [id]: e.target.value }));
                        setErrors((x) => ({ ...x, [`alt${id}`]: undefined }));
                      }}
                      className={cx('field', id === 'pin' && 'tnum', errors[`alt${id}`] && 'border-maroon')}
                    />
                    {errors[`alt${id}`] && <FieldError>{errors[`alt${id}`]}</FieldError>}
                  </label>
                ))}
              </div>
            )}
          </Step>

          {/* 02 — Recap */}
          <Step n="02" title="What you're ordering">
            <ul className="divide-y divide-line border-y border-line">
              {state.cart.map((l) => {
                const p = getProduct(l.slug);
                if (!p) return null;
                return (
                  <li key={l.key} className="flex items-center gap-4 py-4">
                    <div className="w-[62px] shrink-0">
                      <ProductFrame inset={3} corners={false}>
                        <Image src={img(p.imgs[0])} alt={p.name} fill sizes="62px" className="object-cover" />
                      </ProductFrame>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-display text-[21px] font-semibold leading-tight tracking-[-0.005em]">{p.name}</p>
                      <p className="tnum text-[12.5px] text-ink-muted">
                        <span className="font-semibold text-ink">Size {l.size}</span> · Qty {l.qty} · {p.cat}
                      </p>
                    </div>
                    <span className="tnum shrink-0 text-[14.5px] font-bold">{inr(p.price * l.qty)}</span>
                  </li>
                );
              })}
            </ul>
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
              <p className="text-[12.5px] text-ink-muted">Carefully packed in Delhi and delivered within 5–7 business days · estimated by {eta}</p>
              <Link href="/bag/" className="text-[12.5px] font-semibold uppercase tracking-[0.14em] text-emerald">
                Edit bag
              </Link>
            </div>
          </Step>

          {/* 03 — Payment */}
          <Step n="03" title="Payment">
            <div className="grid gap-3 sm:grid-cols-2">
              {PAYMENTS.map((py) => (
                <label
                  key={py.id}
                  className={cx(
                    'cursor-pointer bg-surface p-5 transition-[border-color,box-shadow] duration-200',
                    pay === py.id ? 'border border-emerald shadow-[inset_0_0_0_1px_#0F4C3A]' : 'border border-line-strong'
                  )}
                >
                  <span className="flex items-center gap-2.5">
                    <input type="radio" name="pay" checked={pay === py.id} onChange={() => setPay(py.id)} className="h-4 w-4 accent-[#0F4C3A]" />
                    <span className="text-[14px] font-semibold">{py.label}</span>
                  </span>
                  <span className="mt-2 block pl-7 text-[12.5px] leading-relaxed text-ink-muted">{py.desc}</span>
                </label>
              ))}
            </div>
          </Step>
        </div>

        <aside className="lg:sticky lg:top-[112px] lg:self-start">
          <div className="bg-sand p-7">
            <h2 className="font-display text-[28px] font-semibold leading-none tracking-[-0.018em]">Order summary</h2>
            <dl className="mt-6 space-y-3 text-[14px]">
              <SumRow label={`Subtotal · ${count} item${count === 1 ? '' : 's'}`} value={inr(subtotal)} />
              <SumRow label="Delivery" value={shipping === 0 ? 'Free' : inr(shipping)} />
              {codFee > 0 && <SumRow label="Cash-on-delivery fee" value={inr(codFee)} />}
              <div className="hairline flex items-baseline justify-between pt-3">
                <dt className="text-[13px] uppercase tracking-[0.14em] text-ink-muted">Total</dt>
                <dd className="tnum font-display text-[32px] font-semibold tracking-[-0.018em]">{inr(total)}</dd>
              </div>
            </dl>

            {Object.keys(errors).length > 0 && (
              <p role="alert" className="mt-4 text-[13px] text-maroon">
                Some address details need attention.
              </p>
            )}

            <button onClick={place} disabled={placing} className="btn-primary mt-6 w-full">
              {placing ? 'Placing order…' : `Place order · ${inr(total)}`}
            </button>

            <div className="mt-5 flex flex-wrap gap-1.5">
              {['UPI', 'RuPay', 'Visa', 'Mastercard', 'COD'].map((c) => (
                <span key={c} className="rounded-full border border-line-strong px-2.5 py-1 text-[10.5px] text-ink-muted">
                  {c}
                </span>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Step({ n, title, children }: { n: string; title: string; children: React.ReactNode }) {
  return (
    <section>
      <div className="flex items-baseline gap-4">
        <span className="tnum font-display text-[34px] font-semibold leading-none text-gold-ink">{n}</span>
        <h2 className="font-display text-[clamp(30px,3.4vw,42px)] font-semibold leading-none tracking-[-0.018em]">{title}</h2>
      </div>
      <div className="mt-7">{children}</div>
    </section>
  );
}

function SumRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <dt className="text-ink-body">{label}</dt>
      <dd className="tnum font-semibold">{value}</dd>
    </div>
  );
}

function FieldError({ children }: { children: React.ReactNode }) {
  return (
    <span role="alert" className="mt-1.5 block text-[12.5px] text-maroon">
      {children}
    </span>
  );
}
