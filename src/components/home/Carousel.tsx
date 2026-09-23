'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from '@/components/icons';

/** Scroll-snap row with circular outline controls; scrolls 75% of the viewport width. */
export function Carousel({ children, label }: { children: React.ReactNode; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [edge, setEdge] = useState({ start: true, end: false });

  const measure = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    setEdge({ start: el.scrollLeft < 8, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 8 });
  }, []);

  useEffect(() => {
    measure();
    const el = ref.current;
    el?.addEventListener('scroll', measure, { passive: true });
    window.addEventListener('resize', measure);
    return () => {
      el?.removeEventListener('scroll', measure);
      window.removeEventListener('resize', measure);
    };
  }, [measure]);

  const step = (dir: number) => ref.current?.scrollBy({ left: dir * ref.current.clientWidth * 0.75, behavior: 'smooth' });

  return (
    <div>
      <div
        ref={ref}
        role="region"
        aria-label={label}
        className="up-noscrollbar -mx-1 flex snap-x snap-mandatory gap-6 overflow-x-auto px-1 pb-2"
      >
        {children}
      </div>
      <div className="mt-8 flex gap-3">
        <button onClick={() => step(-1)} disabled={edge.start} aria-label="Previous" className="up-round">
          <ChevronLeft />
        </button>
        <button onClick={() => step(1)} disabled={edge.end} aria-label="Next" className="up-round">
          <ChevronRight />
        </button>
      </div>
    </div>
  );
}
