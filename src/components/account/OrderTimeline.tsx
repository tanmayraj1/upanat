'use client';

import { motion } from 'framer-motion';
import { ORDER_STAGES } from '@/data/products';
import { cx, deliverBy } from '@/lib/utils';
import type { Order } from '@/store/StoreProvider';

const NOTES = [
  'We have your order and the studio has been notified.',
  'Your pair is checked, wrapped and boxed in Delhi.',
  'Handed to the courier. Tracking is live.',
  'With the delivery partner in your city.',
  'Delivered. We hope they feel like home.'
];

export function OrderTimeline({ order }: { order: Order }) {
  return (
    <div>
      <ol className="relative border-l border-line pl-7">
        {ORDER_STAGES.map((label, i) => {
          const done = i <= order.stage;
          const current = i === order.stage;
          return (
            <motion.li
              key={label}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.44, delay: i * 0.08, ease: [0.22, 0.61, 0.36, 1] }}
              className="relative pb-8 last:pb-0"
            >
              <span
                className={cx(
                  'absolute -left-[35px] top-1 grid h-4 w-4 place-items-center rounded-full border',
                  done ? 'border-emerald bg-emerald' : 'border-line-strong bg-ivory'
                )}
                style={current ? { animation: 'pulseRing 2.2s ease-out infinite' } : undefined}
              />
              <p className={cx('font-display text-[22px] font-semibold leading-none tracking-[-0.01em]', !done && 'text-ink-muted')}>{label}</p>
              <p className="mt-2 max-w-[46ch] text-[13.5px] leading-relaxed text-ink-body">{NOTES[i]}</p>
            </motion.li>
          );
        })}
      </ol>
      <p className="mt-6 text-[13px] text-ink-muted">Estimated delivery by {deliverBy(5)}</p>
    </div>
  );
}
