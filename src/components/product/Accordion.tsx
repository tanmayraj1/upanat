'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { cx } from '@/lib/utils';

const EASE = [0.22, 0.61, 0.36, 1] as const;

export function Accordion({ items, className }: { items: { id: string; title: string; body: string }[]; className?: string }) {
  const [open, setOpen] = useState(items[0]?.id ?? '');
  return (
    <div className={cx('border-t border-line', className)}>
      {items.map((it) => {
        const isOpen = open === it.id;
        return (
          <div key={it.id} className="border-b border-line">
            <button
              onClick={() => setOpen(isOpen ? '' : it.id)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 py-4 text-left"
            >
              <span className="text-[13.5px] font-semibold uppercase tracking-[0.12em]">{it.title}</span>
              <span className={cx('transition-transform duration-300 ease-craft', isOpen && 'rotate-45')}>
                <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#C9972E" strokeWidth={1.4} strokeLinecap="round" aria-hidden>
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.36, ease: EASE }}
                  className="overflow-hidden"
                >
                  <p className="max-w-[58ch] pb-5 text-[14.5px] leading-relaxed text-ink-body">{it.body}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
