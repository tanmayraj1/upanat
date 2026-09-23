import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="section">
      <div className="shell flex flex-col items-center text-center">
        <svg width={220} height={150} viewBox="0 0 220 150" fill="none" stroke="#C9972E" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          {[
            { d: 'M30 104c0-7 3.4-11.4 10.4-13 14-3.4 24.8-10.2 34.6-19.4 8.2-7.8 16.4-12 25-12 13 0 21.8 8.6 21.8 20.4 0 14-10.4 24.8-29 27-13 2.2-23.8 2.6-39.8 2.6-15 0-23-2-23-5.6z', dur: 1500, delay: 0 },
            { d: 'M99 71c4.4-5.4 6-10.2 5-14.6', dur: 520, delay: 1100 },
            { d: 'M52 96c6.6 3.2 14 5 22 5', dur: 620, delay: 1250, w: 0.9 },
            { d: 'M130 84c18 6 34 2 48-12 10-10 22-12 34-6', dur: 1500, delay: 1400, w: 1 }
          ].map((p, i) => (
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
        </svg>

        <p className="eyebrow mt-8">Error 404</p>
        <h1 className="h-page mt-5 max-w-[16ch]">This path has come unstitched</h1>
        <p className="mt-6 max-w-[52ch] text-[15px] leading-relaxed text-ink-body">
          The page you were looking for has moved or never existed. The juttis, happily, are all still here.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn-primary no-underline">
            Back to home
          </Link>
          <Link href="/shop/" className="btn-outline no-underline">
            Search the shop
          </Link>
        </div>
      </div>
    </section>
  );
}
