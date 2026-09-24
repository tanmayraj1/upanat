'use client';

import { useState } from 'react';
import { CloseButton, Modal } from '@/components/ui';
import { SIZE_CHART } from '@/data/products';
import { cx } from '@/lib/utils';
import { useStore } from '@/store/StoreProvider';

const STEPS = [
  'Stand on paper with your heel against a wall, in the evening when feet are largest.',
  'Mark the tip of your longest toe and measure heel to mark in centimetres.',
  'Match the longer foot to the chart. Between two sizes? Choose the larger.'
];

export function SizeGuide() {
  const { ui, setUi } = useStore();
  const [tab, setTab] = useState<'Women' | 'Men'>('Women');
  const close = () => setUi({ sizeGuide: false });
  const rows = SIZE_CHART[tab];
  const heads = tab === 'Women' ? ['EU', 'India / UK'] : ['UK', 'EU'];

  return (
    <Modal open={ui.sizeGuide} onClose={close} label="Size guide" width={760}>
      <div className="max-h-[86vh] overflow-y-auto p-6 md:p-9">
        <div className="flex items-start justify-between gap-6">
          <div>
            <p className="eyebrow">Size guide</p>
            <h2 className="display mt-3 text-[clamp(32px,4vw,50px)]">Finding your jutti size</h2>
          </div>
          <CloseButton onClose={close} className="shrink-0" />
        </div>

        <p className="mt-5 max-w-[62ch] text-[14.5px] leading-relaxed text-ink-body">
          Juttis have no left or right — they fit snug at first and soften to the shape of your foot within a few wears.
          Measure your foot rather than going by your usual shoe size.
        </p>

        <div className="mt-7 inline-flex border border-line-strong p-1">
          {(['Women', 'Men'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              aria-pressed={tab === t}
              className={cx(
                'px-5 py-2 text-[12px] font-semibold uppercase tracking-[0.16em] transition-colors duration-200',
                tab === t ? 'bg-primary text-ivory' : 'text-ink-muted hover:text-ink'
              )}
            >
              {t}
            </button>
          ))}
        </div>

        <table className="mt-6 w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-line-strong">
              {[...heads, 'Foot length'].map((h) => (
                <th key={h} className="py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-gold-ink">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.eu} className="border-b border-line">
                <td className="tnum py-3 text-[15px] font-semibold">{r.eu}</td>
                <td className="tnum py-3 text-[15px]">{r.uk}</td>
                <td className="tnum py-3 text-[15px] text-ink-body">{r.cm} cm</td>
              </tr>
            ))}
          </tbody>
        </table>

        <ol className="mt-8 grid gap-6 sm:grid-cols-3">
          {STEPS.map((s, i) => (
            <li key={i}>
              <span className="font-display text-[30px] font-semibold text-gold-ink tnum">0{i + 1}</span>
              <p className="mt-1.5 text-[13.5px] leading-relaxed text-ink-body">{s}</p>
            </li>
          ))}
        </ol>

        <p className="mt-8 text-[12px] text-ink-muted">
          Conversions are standard; confirm against the studio’s lasts before a large order.
        </p>
      </div>
    </Modal>
  );
}
