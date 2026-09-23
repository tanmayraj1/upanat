'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';

const EASE = [0.22, 0.61, 0.36, 1] as const;
const WORD = 'Upanat'.split('');

/**
 * Shown once per session (sessionStorage). A jutti is drawn in gold thread,
 * the wordmark rises letter by letter, a hairline fills, and the ivory ground
 * then splits down a gold seam to reveal the page.
 */
export function Preloader() {
  const [show, setShow] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem('upanat-pre') === '1';
    } catch {
      /* storage blocked — treat as first visit */
    }
    if (seen) return;
    try {
      sessionStorage.setItem('upanat-pre', '1');
    } catch {
      /* ignore */
    }

    setShow(true);
    document.body.style.overflow = 'hidden';

    const hold = reduce ? 400 : 2050;
    const t1 = window.setTimeout(() => setLeaving(true), hold);
    const t2 = window.setTimeout(() => {
      setShow(false);
      document.body.style.overflow = '';
    }, hold + (reduce ? 200 : 1000));

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      document.body.style.overflow = '';
    };
  }, [reduce]);

  return (
    <AnimatePresence>
      {show && (
        <div className="fixed inset-0 z-[200]" aria-hidden={leaving} role="status" aria-label="Loading Upanat Studio">
          {/* Two ivory halves that part along a gold seam. */}
          {(['left', 'right'] as const).map((side) => (
            <motion.div
              key={side}
              className="absolute inset-y-0 w-1/2 bg-ivory"
              style={side === 'left' ? { left: 0 } : { right: 0 }}
              initial={{ x: 0 }}
              animate={leaving ? { x: side === 'left' ? '-100%' : '100%' } : { x: 0 }}
              transition={{ duration: reduce ? 0.2 : 0.95, ease: EASE }}
            />
          ))}

          <motion.div
            className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2"
            style={{ background: 'linear-gradient(180deg, transparent, rgba(201,151,46,.8) 22%, rgba(201,151,46,.8) 78%, transparent)' }}
            initial={{ scaleY: 0, opacity: 0 }}
            animate={leaving ? { scaleY: 1, opacity: [0, 1, 0] } : { scaleY: 0, opacity: 0 }}
            transition={{ duration: 0.95, ease: EASE }}
          />

          <motion.div
            className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-6"
            animate={leaving ? { opacity: 0, y: -14 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.34, ease: EASE }}
          >
            <ThreadMark />

            <div className="flex flex-col items-center gap-1.5">
              <div className="flex font-display text-[34px] font-semibold leading-none tracking-[0.02em] overflow-hidden">
                {WORD.map((ch, i) => (
                  <motion.span
                    key={i}
                    initial={{ y: '110%', opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.62, delay: 0.66 + i * 0.055, ease: EASE }}
                  >
                    {ch}
                  </motion.span>
                ))}
              </div>
              <motion.div
                className="text-[9.5px] uppercase text-ink-muted"
                style={{ letterSpacing: '0.42em', paddingLeft: '0.42em' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.12, ease: EASE }}
              >
                Studio · Delhi
              </motion.div>
            </div>

            {/* Gold thread fills as the mark completes. */}
            <div className="h-px w-[120px] overflow-hidden bg-line">
              <motion.div
                className="h-full bg-gold"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                style={{ originX: 0 }}
                transition={{ duration: 1.6, delay: 0.25, ease: [0.45, 0, 0.2, 1] }}
              />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

/** The jutti silhouette, its embroidery and a leaf, drawn in sequence. */
function ThreadMark() {
  const paths: { d: string; dur: number; delay: number; w?: number }[] = [
    { d: 'M14 78c0-6 3-10 9-11.5 12-3 22-9 30.5-17.5C61 41 68.5 37 76 37c11.5 0 19.5 7.5 19.5 18.5 0 12.5-9.5 22-25.5 25C58.5 82.5 49 83 35 83c-13.5 0-21-2-21-5z', dur: 1400, delay: 100 },
    { d: 'M75 38c4-5 5.5-9.5 4.5-13', dur: 520, delay: 1150 },
    { d: 'M34 70c6 3 12.5 4.5 20 4.5', dur: 620, delay: 1280, w: 0.9 },
    { d: 'M48 62c4.5-6.5 11-11 19-13', dur: 620, delay: 1420, w: 0.9 }
  ];
  return (
    <svg width={116} height={116} viewBox="0 0 110 110" fill="none" stroke="#C9972E" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      {paths.map((p, i) => (
        <path
          key={i}
          d={p.d}
          strokeWidth={p.w ?? 1.3}
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={1}
          style={{ animation: `drawLine ${p.dur}ms cubic-bezier(.45,0,.2,1) ${p.delay}ms forwards` }}
        />
      ))}
      {/* Sequin accents settle in after the thread. */}
      {[
        [84, 30],
        [26, 88],
        [95, 72]
      ].map(([cx, cy], i) => (
        <path
          key={`s-${i}`}
          d="M0 -5c.3 2.7 1.8 4.2 4.5 4.5C1.8 -.2.3 1.3 0 4c-.3-2.7-1.8-4.2-4.5-4.5C-1.8 -.8-.3-2.3 0-5z"
          transform={`translate(${cx} ${cy})`}
          strokeWidth={0.9}
          stroke="#E8C36B"
          style={{ animation: `twinkle ${2600 + i * 700}ms ease-in-out ${1500 + i * 220}ms infinite` }}
        />
      ))}
    </svg>
  );
}
