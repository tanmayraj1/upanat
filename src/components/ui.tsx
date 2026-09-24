'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { DrawnCheck, JuttiIcon, MinusIcon, PlusIcon, PouchIcon, SealIcon } from '@/components/icons';
import { FREE_SHIP_AT } from '@/data/products';
import { cx, inr } from '@/lib/utils';

const EASE = [0.22, 0.61, 0.36, 1] as const;

/**
 * Asymmetric section heading: a long line, then a short indented one. The
 * indent is dropped below `sm` — once the first line wraps on a phone, an
 * indented third line reads as an accident rather than a composition.
 */
export function SectionHeading({
  eyebrow, line1, line2, className, foil = false
}: { eyebrow?: string; line1: string; line2?: string; className?: string; foil?: boolean }) {
  return (
    <div className={className}>
      {eyebrow && <p className={cx('mb-3.5 sm:mb-4', foil ? 'eyebrow-foil' : 'eyebrow')}>{eyebrow}</p>}
      <h2 className={cx('h-section', foil ? 'text-ivory' : 'text-ink')}>
        {line1}
        {line2 && (
          <>
            <br />
            <span className="pl-0 sm:pl-[1.1em]">{line2}</span>
          </>
        )}
      </h2>
    </div>
  );
}

/**
 * A six-size run wraps to 5 + 1 when it is free to flow, which leaves an
 * orphan on a phone. Laying it out as an even grid keeps the rows balanced.
 */
export function SizeChips({
  sizes, value, onChange, size = 'md', className
}: { sizes: number[]; value: number | null; onChange: (s: number) => void; size?: 'sm' | 'md'; className?: string }) {
  return (
    <div
      className={cx('grid grid-cols-3 gap-2 sm:flex sm:flex-wrap', className)}
      role="radiogroup"
      aria-label="Size"
    >
      {sizes.map((s) => (
        <button
          key={s}
          role="radio"
          aria-checked={value === s}
          onClick={() => onChange(s)}
          className={cx(
            'tnum border transition-[background,border-color,color,transform] duration-200 ease-craft active:scale-[.96]',
            size === 'md' ? 'h-[50px] text-[15px] sm:w-[58px]' : 'h-[38px] text-[13.5px] sm:min-w-[44px] sm:px-2',
            value === s ? 'border-primary bg-primary text-ivory' : 'border-line-strong text-ink hover:border-ink'
          )}
        >
          {s}
        </button>
      ))}
    </div>
  );
}

export function QtyStepper({ qty, onChange, compact = false }: { qty: number; onChange: (delta: number) => void; compact?: boolean }) {
  const [bounce, setBounce] = useState(0);
  const step = (d: number) => {
    onChange(d);
    setBounce((b) => b + 1);
  };
  return (
    <div className={cx('inline-flex items-center border border-line-strong', compact ? 'h-[34px]' : 'h-[50px]')}>
      <button onClick={() => step(-1)} aria-label="Decrease quantity" className={cx('grid h-full place-items-center transition-colors hover:bg-sand', compact ? 'w-8' : 'w-11')}>
        <MinusIcon size={compact ? 13 : 16} />
      </button>
      <span
        key={bounce}
        className={cx('tnum grid h-full place-items-center text-center font-semibold', compact ? 'w-8 text-[13px]' : 'w-11 text-[15px]')}
        style={{ animation: bounce ? 'qtyBounce 360ms cubic-bezier(.22,.61,.36,1)' : undefined }}
        aria-live="polite"
      >
        {qty}
      </span>
      <button onClick={() => step(1)} aria-label="Increase quantity" className={cx('grid h-full place-items-center transition-colors hover:bg-sand', compact ? 'w-8' : 'w-11')}>
        <PlusIcon size={compact ? 13 : 16} />
      </button>
    </div>
  );
}

/** Primary add-to-bag button that morphs into a drawn check for ~1.2s. */
export function AddToBagButton({
  onAdd, label = 'Add to bag', className, disabled = false
}: { onAdd: (el: HTMLButtonElement) => boolean | void; label?: string; className?: string; disabled?: boolean }) {
  const [done, setDone] = useState(false);
  useEffect(() => {
    if (!done) return;
    const t = window.setTimeout(() => setDone(false), 1200);
    return () => window.clearTimeout(t);
  }, [done]);
  return (
    <button
      className={cx('btn-primary', className)}
      disabled={disabled}
      onClick={(e) => {
        const ok = onAdd(e.currentTarget);
        if (ok !== false) setDone(true);
      }}
    >
      {done ? (
        <span className="flex items-center gap-2">
          <DrawnCheck size={17} stroke="#FBF6EE" /> Added to bag
        </span>
      ) : (
        label
      )}
    </button>
  );
}

const PILLS = [
  { Icon: PouchIcon, label: '5–7 day delivery' },
  { Icon: JuttiIcon, label: 'Affordable luxury' },
  { Icon: SealIcon, label: 'Quality guarantee' }
];

export function TrustPills({ className, labels }: { className?: string; labels?: string[] }) {
  return (
    <div className={cx('flex flex-wrap gap-3', className)}>
      {PILLS.map(({ Icon, label }, i) => (
        <div key={label} className="up-pill">
          <Icon size={20} />
          <span className="text-[12.5px] font-bold">{labels?.[i] ?? label}</span>
        </div>
      ))}
    </div>
  );
}

/** Free-shipping meter with the gold progress hairline. */
export function FreeShipBar({ subtotal, className }: { subtotal: number; className?: string }) {
  const remaining = Math.max(0, FREE_SHIP_AT - subtotal);
  const pct = Math.min(100, (subtotal / FREE_SHIP_AT) * 100);
  return (
    <div className={className}>
      <p className="text-[12.5px] text-ink-body">
        {remaining > 0 ? (
          <>
            <span className="tnum font-semibold">{inr(remaining)}</span> away from free delivery
          </>
        ) : (
          <span className="font-semibold text-gold-ink">Free delivery unlocked</span>
        )}
      </p>
      <div className="mt-2 h-[3px] w-full bg-line">
        <div
          className="h-full bg-gold transition-[width] duration-[600ms] ease-craft"
          style={{ width: `${pct}%` }}
          role="progressbar"
          aria-valuenow={Math.round(pct)}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Progress toward free delivery"
        />
      </div>
    </div>
  );
}

/** Backdrop + pop-in shell shared by Quick View, Size Guide and the Lightbox. */
export function Modal({
  open, onClose, children, label, width = 1080, padded = true
}: { open: boolean; onClose: () => void; children: React.ReactNode; label: string; width?: number; padded?: boolean }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[110] grid place-items-center overflow-y-auto"
          style={{ padding: padded ? 'clamp(12px,3vw,40px)' : 0 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.24 }}
        >
          <div className="absolute inset-0 bg-ink/45 backdrop-blur-[6px]" onClick={onClose} />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={label}
            className="relative w-full overflow-hidden bg-ivory"
            style={{ maxWidth: width, borderRadius: 12 }}
            initial={{ opacity: 0, y: 12, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.99 }}
            transition={{ duration: 0.32, ease: EASE }}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function CloseButton({ onClose, className }: { onClose: () => void; className?: string }) {
  return (
    <button
      onClick={onClose}
      aria-label="Close"
      className={cx(
        'grid h-10 w-10 place-items-center rounded-full border border-line-strong bg-ivory transition-transform duration-300 ease-craft hover:rotate-90',
        className
      )}
    >
      <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#221A14" strokeWidth={1.3} strokeLinecap="round" aria-hidden>
        <path d="M6 6l12 12M18 6L6 18" />
      </svg>
    </button>
  );
}

export function Breadcrumb({ trail }: { trail: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-[12px] text-ink-muted">
      {trail.map((t, i) => (
        <span key={t.label} className="flex items-center gap-2">
          {t.href ? (
            <a href={t.href} className="text-ink-muted no-underline transition-colors hover:text-primary">
              {t.label}
            </a>
          ) : (
            <span className="text-ink">{t.label}</span>
          )}
          {i < trail.length - 1 && <span className="text-line-strong">/</span>}
        </span>
      ))}
    </nav>
  );
}

export function EmptyState({
  title, body, action, className
}: { title: string; body: string; action?: React.ReactNode; className?: string }) {
  return (
    <div className={cx('px-8 py-14 text-center', className)} style={{ border: '1px dashed rgba(201,151,46,.55)' }}>
      <h3 className="font-display text-[clamp(28px,3.4vw,40px)] font-semibold leading-[1.02] tracking-[-0.018em]">{title}</h3>
      <p className="mx-auto mt-4 max-w-[46ch] text-[14.5px] leading-relaxed text-ink-body">{body}</p>
      {action && <div className="mt-7 flex justify-center">{action}</div>}
    </div>
  );
}
