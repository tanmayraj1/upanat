'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

const EASE = [0.22, 0.61, 0.36, 1] as const;
const PANELS = 5;

/**
 * Route change choreography. The new page is already mounted when the pathname
 * changes, so the curtain starts closed and wipes upward — five jaali-width
 * panels leaving on a 55ms stagger, each trailing a gold hairline — while the
 * page content itself fades and rises behind them.
 *
 * The very first render is skipped: the preloader owns that moment.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  // Tracking the pathname itself (rather than a "first render" flag) keeps the
  // curtain from firing on mount, including under StrictMode's double effect.
  const seen = useRef(pathname);
  const [key, setKey] = useState(0);

  useEffect(() => {
    if (seen.current === pathname) return;
    seen.current = pathname;
    setKey((k) => k + 1);
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [pathname]);

  const animating = key > 0;

  return (
    <>
      {animating && !reduce && (
        <div key={key} className="pointer-events-none fixed inset-0 z-[150] flex" aria-hidden>
          {Array.from({ length: PANELS }).map((_, i) => (
            <motion.div
              key={i}
              className="relative h-full flex-1 bg-emerald-deep"
              initial={{ y: 0 }}
              animate={{ y: '-101%' }}
              transition={{ duration: 0.72, delay: i * 0.055, ease: EASE }}
            >
              <span className="absolute inset-x-0 bottom-0 h-px" style={{ background: 'rgba(201,151,46,.75)' }} />
            </motion.div>
          ))}
        </div>
      )}

      <motion.div
        key={`page-${key}`}
        initial={reduce ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.42, delay: animating && !reduce ? 0.22 : 0, ease: EASE }}
      >
        {children}
      </motion.div>
    </>
  );
}
