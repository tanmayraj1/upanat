'use client';

import { Sparkle } from '@/components/icons';

const WORDS = ['Handcrafted', 'Zardozi embroidery', 'Padded leather sole', 'Made in Delhi', 'Leaf motifs', 'Sequin accents'];

/** Tilted band, 46s loop, near-stops on hover. */
export function Marquee() {
  return (
    <div className="marquee-band overflow-hidden py-5" style={{ transform: 'rotate(-2deg)', marginInline: '-3vw', width: '106vw' }}>
      <div className="up-marquee flex w-max">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center" aria-hidden={copy === 1}>
            {WORDS.map((w) => (
              <span key={w} className="flex items-center">
                <span className="whitespace-nowrap px-7 text-[13px] font-semibold uppercase tracking-[0.2em]">{w}</span>
                <Sparkle size={13} />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
