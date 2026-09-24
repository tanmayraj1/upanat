'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { EmptyState, SectionHeading } from '@/components/ui';
import { cx } from '@/lib/utils';

/**
 * Reviews render only from real data. The studio has no verified reviews yet,
 * so the section shows its honest empty state plus the write-review form that
 * will populate it once orders are matched.
 */
export function Reviews({ name }: { name: string }) {
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [text, setText] = useState('');
  const [err, setErr] = useState('');
  const [done, setDone] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rating) return setErr('Pick a star rating.');
    if (text.trim().length < 12) return setErr('Tell the next buyer a little more — a sentence is plenty.');
    setErr('');
    setDone(true);
  };

  return (
    <section className="section">
      <SectionHeading eyebrow="Reviews" line1="In their words" />

      <div className="mt-10">
        {done ? (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-sand p-8">
            <h3 className="font-display text-[34px] font-semibold leading-none tracking-[-0.018em]">Thank you</h3>
            <p className="mt-3 max-w-[50ch] text-[14.5px] leading-relaxed text-ink-body">
              Your review appears once we&apos;ve matched it to a delivered order.
            </p>
          </motion.div>
        ) : open ? (
          <form onSubmit={submit} className="max-w-[620px] bg-sand p-7 md:p-9">
            <h3 className="font-display text-[30px] font-semibold leading-none tracking-[-0.018em]">Your review of {name}</h3>

            <div className="mt-6 flex items-center gap-1.5" role="radiogroup" aria-label="Rating">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  type="button"
                  role="radio"
                  aria-checked={rating === n}
                  aria-label={`${n} star${n === 1 ? '' : 's'}`}
                  onClick={() => {
                    setRating(n);
                    setErr('');
                  }}
                  className={cx('text-[26px] leading-none transition-transform duration-200 hover:scale-110', n <= rating ? 'text-gold' : 'text-line-strong')}
                >
                  ★
                </button>
              ))}
            </div>

            <label className="mt-6 block">
              <span className="field-label">How did they wear?</span>
              <textarea
                value={text}
                onChange={(e) => {
                  setText(e.target.value);
                  setErr('');
                }}
                rows={4}
                className="field resize-y"
                placeholder="Sizing, comfort after a few hours, how the embroidery held up…"
              />
            </label>

            <div className="mt-4 flex items-center gap-3 border border-dashed border-line-strong px-4 py-3 text-[13px] text-ink-muted">
              Add a photo in daylight — it helps the next buyer most.
            </div>

            {err && (
              <p role="alert" className="mt-3 text-[13px] text-alert">
                {err}
              </p>
            )}

            <div className="mt-6 flex flex-wrap gap-3">
              <button type="submit" className="btn-primary">
                Submit review
              </button>
              <button type="button" onClick={() => setOpen(false)} className="btn-outline">
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <EmptyState
            title={`No reviews for ${name} yet`}
            body="If you've worn this pair, yours will be the first. Photos of the embroidery in daylight help the next buyer most."
            action={
              <button onClick={() => setOpen(true)} className="btn-primary">
                Write a review
              </button>
            }
          />
        )}
      </div>
    </section>
  );
}
