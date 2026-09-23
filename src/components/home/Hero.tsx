'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';
import { LeafMark, PaisleyIcon, Sparkle } from '@/components/icons';
import { Rise } from '@/components/Reveal';
import { asset } from '@/lib/utils';

/** Ambient blooms: vw-sized radial gradients that fade at the edge, so they
 *  read as light rather than as flat discs at any viewport width. */
const BLOOMS = [
  { color: 'rgba(38,122,92,.55)', size: '58vw', max: 820, left: '-10%', top: '-22%', blur: 40, dur: 74 },
  { color: 'rgba(201,151,46,.2)', size: '40vw', max: 600, left: '26%', top: '36%', blur: 50, dur: 88 },
  { color: 'rgba(107,31,42,.5)', size: '46vw', max: 680, left: '-14%', top: '46%', blur: 50, dur: 64 }
];

const FLECKS = [
  { left: '12%', top: '22%' }, { left: '31%', top: '68%' }, { left: '54%', top: '14%' },
  { left: '68%', top: '78%' }, { left: '83%', top: '36%' }, { left: '44%', top: '88%' }
];

export function Hero() {
  const reduce = useReducedMotion();
  const layerRef = useRef<HTMLDivElement>(null);

  // Parallax: ambient layers drift against the scroll, the video and copy hold still.
  useEffect(() => {
    if (reduce) return;
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const y = window.scrollY;
        if (y > 1800) return;
        layerRef.current?.querySelectorAll<HTMLElement>('[data-par]').forEach((el) => {
          el.style.transform = `translate3d(0, ${(y * Number(el.dataset.par)).toFixed(1)}px, 0)`;
        });
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [reduce]);

  return (
    <section className="relative overflow-hidden bg-emerald-deep text-ivory">
      {/* Jaali lattice, 9% */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.09]" aria-hidden>
        <svg width="100%" height="100%">
          <defs>
            <pattern id="jaali" width="64" height="64" patternUnits="userSpaceOnUse">
              <path d="M32 0L64 32 32 64 0 32z" fill="none" stroke="#E8C36B" strokeWidth="1" />
              <circle cx="32" cy="32" r="7" fill="none" stroke="#E8C36B" strokeWidth="1" />
              <path d="M0 0h64M0 64h64" stroke="#E8C36B" strokeWidth=".5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#jaali)" />
        </svg>
      </div>

      <div ref={layerRef} className="pointer-events-none absolute inset-0" aria-hidden>
        {/* Parallax lives on the wrapper so the ambient loop keeps the inner transform. */}
        {BLOOMS.map((b, i) => (
          <div key={i} data-par="0.28" className="absolute" style={{ left: b.left, top: b.top }}>
            <div
              className="rounded-full"
              style={{
                width: b.size, maxWidth: b.max, aspectRatio: '1',
                background: `radial-gradient(closest-side, ${b.color}, transparent)`,
                filter: `blur(${b.blur}px)`,
                animation: reduce ? undefined : `bloom${i} ${b.dur}s ease-in-out infinite`
              }}
            />
          </div>
        ))}
        {FLECKS.map((f, i) => (
          <span key={i} data-par="0.18" className="absolute" style={{ left: f.left, top: f.top }}>
            <span className="block" style={{ animation: reduce ? undefined : `twinkle ${5.2 + i * 1.3}s ease-in-out ${i * 1.9}s infinite` }}>
              <Sparkle size={11} />
            </span>
          </span>
        ))}
      </div>

      {/* The gold thread draws across once. */}
      <svg className="pointer-events-none absolute inset-x-0 top-[34%] h-[160px] w-full" viewBox="0 0 1400 160" preserveAspectRatio="none" fill="none" aria-hidden>
        <path
          d="M-20 96C180 30 330 128 520 96 720 62 820 8 1020 46c150 28 250 92 420 40"
          stroke="rgba(232,195,107,.45)"
          strokeWidth="1"
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={1}
          style={{ animation: 'drawLine 3.2s cubic-bezier(.45,0,.2,1) .4s forwards' }}
        />
      </svg>

      <div className="shell relative grid items-center gap-14 py-[clamp(56px,7vw,96px)] lg:grid-cols-[minmax(0,1.15fr)_minmax(0,.85fr)] lg:gap-16">
        <div>
          <Rise i={0}>
            <p className="eyebrow-foil">Handcrafted juttis · New Delhi</p>
          </Rise>
          <Rise i={1}>
            <h1 className="h-hero mt-6 text-ivory">
              Tradition begins
              <br />
              <span style={{ paddingLeft: '1.1em' }}>at your feet.</span>
            </h1>
          </Rise>
          <Rise i={2}>
            <p className="mt-8 max-w-[52ch] text-[15.5px] leading-relaxed text-ivory/75">
              Named after the earliest recorded footwear of the Indian subcontinent, Upanat Studio is an homage to raw
              materials and ancient craftsmanship.
            </p>
          </Rise>
          <Rise i={3}>
            <div className="mt-10 flex flex-wrap items-center gap-7">
              <Link href="/shop/" className="btn-ivory relative no-underline">
                Shop the collection
                <span className="absolute -left-2 -top-2" style={{ animation: 'twinkle 4.2s ease-in-out infinite' }}>
                  <Sparkle size={13} stroke="#C9972E" />
                </span>
                <span className="absolute -bottom-2 -right-1.5" style={{ animation: 'twinkle 5.3s ease-in-out .7s infinite' }}>
                  <Sparkle size={11} stroke="#C9972E" />
                </span>
              </Link>
              <Link href="/about/" className="text-[12.5px] font-bold uppercase tracking-[0.18em] text-gold-foil no-underline underline-offset-[6px] hover:underline">
                Our craft
              </Link>
            </div>
          </Rise>
        </div>

        <div className="relative">
          {/* Arched frame with an outset gold hairline. */}
          <div className="relative mx-auto w-full max-w-[460px]">
            <div
              className="pointer-events-none absolute -inset-[14px]"
              style={{ border: '1px solid rgba(201,151,46,.55)', borderRadius: '50% 50% 0 0 / 30% 30% 0 0' }}
              aria-hidden
            />
            <div className="relative overflow-hidden" style={{ aspectRatio: '4 / 5', borderRadius: '50% 50% 0 0 / 30% 30% 0 0' }}>
              <video
                className="h-full w-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                poster={asset('/img/hero-poster.webp')}
                aria-label="Upanat Studio juttis, in the workshop"
              >
                <source src={asset('/video/hero.mp4')} type="video/mp4" />
              </video>
            </div>
          </div>

          {/* Floating framed badge. */}
          <div data-par="0.12" className="absolute -left-2 top-[18%] sm:-left-6">
            <div
              className="bg-emerald-deep/85 px-4 py-3 shadow-badge backdrop-blur-sm"
              style={{ border: '1px solid rgba(201,151,46,.6)', animation: reduce ? undefined : 'bob 6.2s ease-in-out infinite' }}
            >
              <span className="flex items-center gap-2.5">
                <LeafMark size={18} />
                <span className="text-[11.5px] font-semibold uppercase leading-[1.35] tracking-[0.14em] text-gold-foil">
                  Handcrafted
                  <br />
                  in Delhi
                </span>
              </span>
            </div>
          </div>

          {/* Rotating paisley seal. */}
          <div data-par="0.10" className="absolute -bottom-6 right-0 sm:right-2" aria-hidden>
            <div style={{ animation: reduce ? undefined : 'spinSlow 80s linear infinite' }}>
              <PaisleyIcon size={86} />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes bloom0 { 0%,100% { transform: translate(0,0) scale(1) } 33% { transform: translate(5vw,4vh) scale(1.08) } 66% { transform: translate(-3vw,9vh) scale(.94) } }
        @keyframes bloom1 { 0%,100% { transform: translate(0,0) scale(1) } 33% { transform: translate(-7vw,-5vh) scale(1.08) } 66% { transform: translate(4vw,-9vh) scale(.94) } }
        @keyframes bloom2 { 0%,100% { transform: translate(0,0) scale(1) } 33% { transform: translate(6vw,-6vh) scale(1.08) } 66% { transform: translate(9vw,3vh) scale(.94) } }
      `}</style>
    </section>
  );
}
