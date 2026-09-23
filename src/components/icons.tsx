/**
 * The house icon set — gold stroke, 1–1.3 weight on a 24 grid. These are the
 * motifs from the handoff (leaf mark, jutti silhouette, paisley seal, pouch,
 * needle & thread, seal-with-check, sequin sparkle). No stock glyphs.
 */
type P = { className?: string; size?: number; stroke?: string; width?: number };

const base = (size: number, stroke: string, width: number) => ({
  width: size, height: size, viewBox: '0 0 24 24', fill: 'none',
  stroke, strokeWidth: width, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const
});

export const LeafMark = ({ size = 22, stroke = '#C9972E', width = 1.3, className }: P) => (
  <svg {...base(size, stroke, width)} className={className} aria-hidden>
    <path d="M4 20C4 11 10 4 20 4c0 10-7 16-16 16z" />
    <path d="M4 20L14 10" />
  </svg>
);

export const SearchIcon = ({ size = 20, stroke = '#221A14', width = 1.3, className }: P) => (
  <svg {...base(size, stroke, width)} className={className} aria-hidden>
    <circle cx="10.5" cy="10.5" r="6.5" />
    <path d="M15.5 15.5L20 20" />
  </svg>
);

export const AccountIcon = ({ size = 20, stroke = '#221A14', width = 1.3, className }: P) => (
  <svg {...base(size, stroke, width)} className={className} aria-hidden>
    <circle cx="12" cy="8.5" r="3.8" />
    <path d="M4.5 20c1.2-3.6 4-5.4 7.5-5.4s6.3 1.8 7.5 5.4" />
  </svg>
);

export const HeartIcon = ({ size = 20, stroke = '#221A14', width = 1.3, className, filled = false }: P & { filled?: boolean }) => (
  <svg {...base(size, stroke, width)} className={className} fill={filled ? '#6B1F2A' : 'none'} stroke={filled ? '#6B1F2A' : stroke} aria-hidden>
    <path d="M12 20s-7.5-4.6-7.5-10.1C4.5 7.2 6.6 5 9.1 5c1.3 0 2.3.6 2.9 1.6.6-1 1.6-1.6 2.9-1.6 2.5 0 4.6 2.2 4.6 4.9C19.5 15.4 12 20 12 20z" />
  </svg>
);

/** Pouch-shaped bag — the header cart. */
export const BagIcon = ({ size = 20, stroke = '#221A14', width = 1.3, className }: P) => (
  <svg {...base(size, stroke, width)} className={className} aria-hidden>
    <path d="M5.6 8.5h12.8l-1.1 10.2a1.6 1.6 0 0 1-1.6 1.4H8.3a1.6 1.6 0 0 1-1.6-1.4L5.6 8.5z" />
    <path d="M8.8 8.5V6.9a3.2 3.2 0 0 1 6.4 0v1.6" />
    <path d="M5.6 8.5c2-1.1 4.2-1.6 6.4-1.6s4.4.5 6.4 1.6" />
  </svg>
);

/** Gift pouch — fast & secure delivery. */
export const PouchIcon = ({ size = 22, stroke = '#C9972E', width = 1.2, className }: P) => (
  <svg {...base(size, stroke, width)} className={className} aria-hidden>
    <path d="M4 9.5h16v9.2a1.3 1.3 0 0 1-1.3 1.3H5.3A1.3 1.3 0 0 1 4 18.7V9.5z" />
    <path d="M3 6.6h18v2.9H3z" />
    <path d="M12 6.6V20" />
    <path d="M12 6.6c-1.5-2.6-5.4-3.4-5.4-1.1 0 1.4 2.6 1.5 5.4 1.1zM12 6.6c1.5-2.6 5.4-3.4 5.4-1.1 0 1.4-2.6 1.5-5.4 1.1z" />
  </svg>
);

/** Jutti silhouette — affordable luxury / comfort. */
export const JuttiIcon = ({ size = 22, stroke = '#C9972E', width = 1.2, className }: P) => (
  <svg {...base(size, stroke, width)} className={className} aria-hidden>
    <path d="M3.2 16.4c0-1.3.6-2.1 1.9-2.4 2.6-.6 4.6-1.9 6.4-3.6 1.5-1.4 3-2.2 4.6-2.2 2.4 0 4.1 1.6 4.1 3.9 0 2.6-2 4.6-5.4 5.2-2.4.4-4.4.5-7.4.5-2.8 0-4.2-.4-4.2-1.4z" />
    <path d="M16.1 8.2c.8-1 1.1-1.9.9-2.7" />
    <path d="M7.4 14.6c1.2.6 2.6.9 4.2.9" />
  </svg>
);

/** Double-ring seal with a check — quality guarantee. */
export const SealIcon = ({ size = 22, stroke = '#C9972E', width = 1.2, className }: P) => (
  <svg {...base(size, stroke, width)} className={className} aria-hidden>
    <circle cx="12" cy="12" r="8.4" />
    <circle cx="12" cy="12" r="6.1" strokeDasharray="1.6 2.2" />
    <path d="M9.1 12.2l2 2 3.8-4.2" />
  </svg>
);

/** Needle & thread — more is less. */
export const NeedleIcon = ({ size = 22, stroke = '#C9972E', width = 1.2, className }: P) => (
  <svg {...base(size, stroke, width)} className={className} aria-hidden>
    <path d="M19.5 4.5L9.2 14.8l-1.4 3.4 3.4-1.4L21.5 6.5" />
    <ellipse cx="19.1" cy="5.9" rx="1.1" ry="1.8" transform="rotate(45 19.1 5.9)" />
    <path d="M7.8 18.2c-2.3.6-4 2-4.6 3.3" />
    <path d="M3.2 21.5c1.9-.4 3.1-1.4 3.6-2.8" />
  </svg>
);

/** Paisley — the rotating seal. */
export const PaisleyIcon = ({ size = 80, stroke = '#C9972E', width = 1, className }: P) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none" stroke={stroke} strokeWidth={width} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
    <circle cx="40" cy="40" r="37" strokeDasharray="2 4" opacity=".7" />
    <circle cx="40" cy="40" r="30" />
    <path d="M40 58c-9 0-14-6-14-13 0-8 7-14 14-19 9 8 13 14 13 20 0 5-3 8-7 8-3 0-5-2-5-5 0-2.5 2-4 4-3.2" />
    <path d="M36 44c1.6-2.6 4-4.4 7-5" />
  </svg>
);

/** 4-point sequin sparkle. */
export const Sparkle = ({ size = 14, stroke = '#E8C36B', width = 1.1, className }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={width} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
    <path d="M12 2.5c.6 5.4 3.6 8.4 9 9-5.4.6-8.4 3.6-9 9-.6-5.4-3.6-8.4-9-9 5.4-.6 8.4-3.6 9-9z" />
  </svg>
);

export const ArrowRight = ({ size = 18, stroke = 'currentColor', width = 1.4, className }: P) => (
  <svg {...base(size, stroke, width)} className={className} aria-hidden>
    <path d="M4 12h15" />
    <path d="M13.5 6.5L20 12l-6.5 5.5" />
  </svg>
);

export const ChevronLeft = ({ size = 18, stroke = 'currentColor', width = 1.4, className }: P) => (
  <svg {...base(size, stroke, width)} className={className} aria-hidden>
    <path d="M14.5 5.5L8 12l6.5 6.5" />
  </svg>
);

export const ChevronRight = ({ size = 18, stroke = 'currentColor', width = 1.4, className }: P) => (
  <svg {...base(size, stroke, width)} className={className} aria-hidden>
    <path d="M9.5 5.5L16 12l-6.5 6.5" />
  </svg>
);

export const CloseIcon = ({ size = 20, stroke = 'currentColor', width = 1.3, className }: P) => (
  <svg {...base(size, stroke, width)} className={className} aria-hidden>
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
);

export const PlusIcon = ({ size = 16, stroke = 'currentColor', width = 1.4, className }: P) => (
  <svg {...base(size, stroke, width)} className={className} aria-hidden>
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export const MinusIcon = ({ size = 16, stroke = 'currentColor', width = 1.4, className }: P) => (
  <svg {...base(size, stroke, width)} className={className} aria-hidden>
    <path d="M5 12h14" />
  </svg>
);

export const ExpandIcon = ({ size = 18, stroke = '#221A14', width = 1.3, className }: P) => (
  <svg {...base(size, stroke, width)} className={className} aria-hidden>
    <path d="M4 9.5V4h5.5M20 14.5V20h-5.5M20 9.5V4h-5.5M4 14.5V20h5.5" />
  </svg>
);

/** The drawn check used by every "Added to bag" confirmation. */
export const DrawnCheck = ({ size = 18, stroke = 'currentColor', width = 1.8, className }: P) => (
  <svg {...base(size, stroke, width)} className={className} aria-hidden>
    <path
      d="M5 12.5l4.2 4.2L19 7"
      pathLength={1}
      strokeDasharray={1}
      style={{ animation: 'drawCheck 420ms cubic-bezier(.45,0,.2,1) forwards' }}
    />
  </svg>
);
