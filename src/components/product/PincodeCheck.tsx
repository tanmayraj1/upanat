'use client';

import { useState } from 'react';
import { cx, deliverBy, deliveryDays } from '@/lib/utils';

export function PincodeCheck({ className }: { className?: string }) {
  const [pin, setPin] = useState('');
  const [res, setRes] = useState<{ ok: boolean; text: string; sub?: string } | null>(null);

  const check = () => {
    if (!/^\d{6}$/.test(pin)) return setRes({ ok: false, text: 'Enter a valid 6-digit pincode.' });
    const days = deliveryDays(pin);
    setRes({ ok: true, text: `Delivers in ${days} business days`, sub: `estimated by ${deliverBy(days)}` });
  };

  return (
    <div className={className}>
      <p className="field-label">Delivery</p>
      <div className="flex gap-2.5">
        <input
          value={pin}
          onChange={(e) => {
            setPin(e.target.value.replace(/\D/g, '').slice(0, 6));
            setRes(null);
          }}
          onKeyDown={(e) => e.key === 'Enter' && check()}
          inputMode="numeric"
          placeholder="Pincode"
          aria-label="Delivery pincode"
          className="field tnum max-w-[170px]"
        />
        <button onClick={check} className="btn-outline">
          Check
        </button>
      </div>
      {res && (
        <p className={cx('mt-2.5 text-[13px]', res.ok ? 'text-gold-ink' : 'text-alert')} role="status">
          {res.text}
          {res.sub && <span className="text-ink-muted"> · {res.sub}</span>}
        </p>
      )}
    </div>
  );
}
