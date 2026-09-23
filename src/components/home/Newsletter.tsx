'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { DrawnCheck } from '@/components/icons';
import { cx } from '@/lib/utils';

const MODES = [
  { id: 'email', label: 'Email' },
  { id: 'whatsapp', label: 'WhatsApp' }
] as const;

export function Newsletter() {
  const [mode, setMode] = useState<'email' | 'whatsapp'>('email');
  const [value, setValue] = useState('');
  const [err, setErr] = useState('');
  const [done, setDone] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const v = value.trim();
    if (mode === 'email') {
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/.test(v)) return setErr('Enter a valid email address.');
    } else if (!/^\d{10}$/.test(v.replace(/\D/g, ''))) {
      return setErr('Enter a 10-digit mobile number.');
    }
    setErr('');
    setDone(true);
  };

  return (
    <section className="section bg-emerald text-ivory">
      <div className="shell grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end">
        <div>
          <p className="eyebrow-foil">Stay in the loop</p>
          <h2 className="h-section mt-4 text-ivory">
            First look at
            <br />
            <span style={{ paddingLeft: '1.1em' }}>new pairs</span>
          </h2>
        </div>
        <div>
          <p className="max-w-[52ch] text-[15px] leading-relaxed text-ivory/75">
            Subscribe to receive updates, access to exclusive deals, and more — by email, or on WhatsApp if that’s where
            you’d rather hear from us.
          </p>

          {done ? (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.42 }} className="mt-8">
              <p className="flex items-center gap-2.5 font-display text-[34px] font-semibold leading-none tracking-[-0.018em] text-gold-foil">
                <DrawnCheck size={22} stroke="#E8C36B" /> You&apos;re on the list.
              </p>
              <p className="mt-3 text-[13.5px] text-ivory/70">
                {mode === 'email' ? 'Watch your inbox for the next drop.' : 'We’ll message you from the studio number.'}
              </p>
            </motion.div>
          ) : (
            <form onSubmit={submit} className="mt-8">
              <div className="inline-flex border border-ivory/25 p-1">
                {MODES.map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => {
                      setMode(m.id);
                      setErr('');
                    }}
                    aria-pressed={mode === m.id}
                    className={cx(
                      'px-5 py-2 text-[11.5px] font-semibold uppercase tracking-[0.16em] transition-colors duration-200',
                      mode === m.id ? 'bg-ivory text-emerald' : 'text-ivory/70 hover:text-ivory'
                    )}
                  >
                    {m.label}
                  </button>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap items-end gap-4">
                <label className="flex-1" style={{ minWidth: 220 }}>
                  <span className="sr-only">{mode === 'email' ? 'Email address' : 'Mobile number'}</span>
                  <span className="flex items-center gap-2 border-b border-ivory/35 pb-2.5 transition-colors focus-within:border-gold-foil">
                    {mode === 'whatsapp' && <span className="tnum text-[15px] text-ivory/60">+91</span>}
                    <input
                      value={value}
                      onChange={(e) => {
                        setValue(e.target.value);
                        setErr('');
                      }}
                      inputMode={mode === 'whatsapp' ? 'numeric' : 'email'}
                      placeholder={mode === 'email' ? 'you@example.com' : '98100 00000'}
                      className="w-full bg-transparent text-[16px] text-ivory placeholder:text-ivory/40 outline-none"
                    />
                  </span>
                </label>
                <button type="submit" className="btn-ivory">
                  Subscribe
                </button>
              </div>
              <p className={cx('mt-3 text-[12.5px]', err ? 'text-gold-foil' : 'text-ivory/55')} role={err ? 'alert' : undefined}>
                {err || 'No spam. Unsubscribe whenever you like.'}
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
