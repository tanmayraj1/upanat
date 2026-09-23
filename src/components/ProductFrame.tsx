import { cx } from '@/lib/utils';

const CORNERS = [
  { d: 'M1 19V1h18', pos: 'left-[-5px] top-[-5px]' },
  { d: 'M1 1h18v18', pos: 'right-[-5px] top-[-5px]' },
  { d: 'M19 1v18H1', pos: 'right-[-5px] bottom-[-5px]' },
  { d: 'M19 19H1V1', pos: 'left-[-5px] bottom-[-5px]' }
];

/**
 * The frame every product image sits in: ivory mat, 1px gold hairline that
 * strengthens on hover, and four 20×20 corner "L" marks sitting 5px outside the
 * border. The marks draw themselves in on hover, staggered 0/60/120/180ms; on
 * touch devices they are always drawn (see .up-corner in globals.css).
 */
export function ProductFrame({
  children,
  className,
  inset = 8,
  corners = true,
  ratio = '4 / 5',
  arch = false
}: {
  children: React.ReactNode;
  className?: string;
  inset?: number;
  corners?: boolean;
  ratio?: string;
  arch?: boolean;
}) {
  const radius = arch ? '50% 50% 0 0 / 30% 30% 0 0' : undefined;
  return (
    <div data-frame className={cx('up-frame relative bg-ivory', className)} style={{ aspectRatio: ratio, borderRadius: radius }}>
      <div
        className="relative overflow-hidden"
        style={{
          margin: inset,
          width: `calc(100% - ${inset * 2}px)`,
          height: `calc(100% - ${inset * 2}px)`,
          borderRadius: radius
        }}
      >
        {children}
      </div>
      {corners &&
        CORNERS.map((c, i) => (
          <svg
            key={i}
            className={cx('up-corner pointer-events-none absolute', c.pos)}
            width={20}
            height={20}
            viewBox="0 0 20 20"
            fill="none"
            stroke="#C9972E"
            strokeWidth={1.4}
            strokeLinecap="round"
            style={{ transitionDelay: `${i * 60}ms` }}
            aria-hidden
          >
            <path d={c.d} pathLength={1} strokeDasharray={1} strokeDashoffset={1} />
          </svg>
        ))}
    </div>
  );
}
