'use client';

import { motion, useReducedMotion } from 'framer-motion';

const EASE = [0.22, 0.61, 0.36, 1] as const;

/** Scroll reveal: opacity 0→1 + 12px rise, 640ms, 70ms stagger per batch. */
export function Reveal({
  children,
  i = 0,
  className,
  as = 'div',
  amount = 0.15
}: {
  children: React.ReactNode;
  i?: number;
  className?: string;
  as?: 'div' | 'section' | 'li' | 'article' | 'header';
  amount?: number;
}) {
  const reduce = useReducedMotion();
  const Tag = motion[as];
  if (reduce) return <Tag className={className}>{children}</Tag>;
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount, margin: '0px 0px -6% 0px' }}
      transition={{ duration: 0.64, delay: i * 0.07, ease: EASE }}
    >
      {children}
    </Tag>
  );
}

/** Headings rise on mount with a 90ms step stagger. */
export function Rise({ children, i = 0, className }: { children: React.ReactNode; i?: number; className?: string }) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.68, delay: 0.08 + i * 0.09, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
