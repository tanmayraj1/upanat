'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ProductFrame } from '@/components/ProductFrame';
import { Rise } from '@/components/Reveal';
import { deliverBy, getProduct, img, inr } from '@/lib/utils';
import { useStore } from '@/store/StoreProvider';

export function ConfirmView() {
  const { lastOrder, state, ready } = useStore();
  const order = lastOrder ?? state.orders[0];

  if (!ready) return <div className="section" />;

  if (!order) {
    return (
      <div className="shell section flex flex-col items-center text-center">
        <h1 className="h-page">No recent order</h1>
        <p className="mt-6 max-w-[46ch] text-[15px] text-ink-body">
          Once you place an order, the confirmation and tracking appear here.
        </p>
        <Link href="/shop/" className="btn-primary mt-9 no-underline">
          Shop the collection
        </Link>
      </div>
    );
  }

  const eta = deliverBy(7);

  return (
    <div className="shell py-16">
      <div className="mx-auto max-w-[760px] text-center">
        <SuccessSeal />

        <Rise i={0}>
          <p className="eyebrow mt-8">Order {order.no}</p>
        </Rise>
        <Rise i={1}>
          <h1 className="h-page mt-5">Thank you — your pairs are on the workbench</h1>
        </Rise>
        <Rise i={2}>
          <p className="mt-6 text-[15px] leading-relaxed text-ink-body">
            A confirmation is on its way to {order.email}. Total paid <span className="tnum font-semibold">{inr(order.total)}</span>.
          </p>
        </Rise>
      </div>

      <ul className="mx-auto mt-14 max-w-[620px] divide-y divide-line border-y border-line">
        {order.items.map((it, i) => {
          const p = getProduct(it.slug);
          if (!p) return null;
          return (
            <li key={`${it.slug}-${i}`} className="flex items-center gap-4 py-4">
              <div className="w-[62px] shrink-0">
                <ProductFrame inset={3} corners={false}>
                  <Image src={img(p.imgs[0])} alt={p.name} fill sizes="62px" className="object-cover" />
                </ProductFrame>
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-display text-[21px] font-semibold leading-tight tracking-[-0.005em]">{p.name}</p>
                <p className="tnum text-[12.5px] text-ink-muted">
                  Size {it.size} · Qty {it.qty}
                </p>
              </div>
              <span className="tnum shrink-0 text-[14px] font-bold">{inr(p.price * it.qty)}</span>
            </li>
          );
        })}
      </ul>

      <ol className="mx-auto mt-14 grid max-w-[880px] gap-8 md:grid-cols-3">
        {[
          { when: 'Today', note: 'Order confirmation by email, and on WhatsApp if you shared your number.' },
          { when: 'Next few days', note: 'Each pair is checked and carefully packed in Delhi before it ships.' },
          { when: `By ${eta}`, note: 'Estimated delivery. The tracking link arrives the moment it ships.' }
        ].map((s, i) => (
          <li key={s.when} className="border-t-2 pt-5" style={{ borderColor: i === 0 ? '#0F4C3A' : 'rgba(201,151,46,.5)' }}>
            <p className="font-display text-[24px] font-semibold leading-none tracking-[-0.01em]">{s.when}</p>
            <p className="mt-3 text-[13.5px] leading-relaxed text-ink-body">{s.note}</p>
          </li>
        ))}
      </ol>

      <div className="mt-14 flex flex-wrap justify-center gap-3">
        <Link href="/track/" className="btn-primary no-underline">
          Track this order
        </Link>
        <Link href="/shop/" className="btn-outline no-underline">
          Continue shopping
        </Link>
      </div>
    </div>
  );
}

/** Gold circle draws over 900ms, then the emerald check at 720ms. */
function SuccessSeal() {
  return (
    <svg width={96} height={96} viewBox="0 0 96 96" fill="none" strokeLinecap="round" strokeLinejoin="round" className="mx-auto" aria-hidden>
      <circle
        cx="48"
        cy="48"
        r="44"
        stroke="#C9972E"
        strokeWidth="1.3"
        pathLength={1}
        strokeDasharray={1}
        strokeDashoffset={1}
        style={{ animation: 'drawLine 900ms cubic-bezier(.45,0,.2,1) forwards', transform: 'rotate(-90deg)', transformOrigin: 'center' }}
      />
      <path
        d="M31 49.5L43 61 66 35"
        stroke="#0F4C3A"
        strokeWidth="2.2"
        pathLength={1}
        strokeDasharray={1}
        strokeDashoffset={1}
        style={{ animation: 'drawLine 520ms cubic-bezier(.45,0,.2,1) 720ms forwards' }}
      />
    </svg>
  );
}
