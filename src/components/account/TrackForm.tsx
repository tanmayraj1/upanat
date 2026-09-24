'use client';

import { useState } from 'react';
import { OrderTimeline } from '@/components/account/OrderTimeline';
import { cx } from '@/lib/utils';
import { useStore, type Order } from '@/store/StoreProvider';

export function TrackForm({ compact = false }: { compact?: boolean }) {
  const { state } = useStore();
  const [no, setNo] = useState('');
  const [email, setEmail] = useState('');
  const [res, setRes] = useState<Order | null>(null);
  const [err, setErr] = useState('');

  const find = (e: React.FormEvent) => {
    e.preventDefault();
    const hit = state.orders.find(
      (o) => o.no.toLowerCase() === no.trim().toLowerCase() && o.email.toLowerCase() === email.trim().toLowerCase()
    );
    if (!hit) return setErr('We couldn’t find that order. Check the number and the email you checked out with.');
    setErr('');
    setRes(hit);
  };

  if (res) {
    return (
      <div>
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <p className="tnum font-display text-[30px] font-semibold leading-none tracking-[-0.018em]">
            {res.no} <span className="text-[16px] font-normal text-ink-muted">· {res.date}</span>
          </p>
          <button onClick={() => setRes(null)} className="text-[12.5px] font-semibold uppercase tracking-[0.14em] text-primary">
            Track another
          </button>
        </div>
        <div className="mt-8">
          <OrderTimeline order={res} />
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={find} className={cx('max-w-[520px]', compact && 'max-w-full')}>
      <div className="grid gap-4 sm:grid-cols-2">
        <label>
          <span className="field-label">Order number</span>
          <input value={no} onChange={(e) => { setNo(e.target.value); setErr(''); }} placeholder="UPS-10482" className="field tnum" />
        </label>
        <label>
          <span className="field-label">Email used at checkout</span>
          <input value={email} onChange={(e) => { setEmail(e.target.value); setErr(''); }} inputMode="email" placeholder="you@example.com" className="field" />
        </label>
      </div>
      <button type="submit" className="btn-primary mt-5">
        Find order
      </button>
      {err && (
        <p role="alert" className="mt-3 text-[13px] text-alert">
          {err}
        </p>
      )}
      <p className="mt-3 text-[12.5px] text-ink-muted">
        Demo: try <span className="tnum">UPS-10482</span> with ananya@example.com
      </p>
    </form>
  );
}
