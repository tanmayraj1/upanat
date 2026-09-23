'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from '@/components/icons';
import { CloseButton, Modal } from '@/components/ui';
import { getProduct, img } from '@/lib/utils';
import { useStore } from '@/store/StoreProvider';

export function Lightbox() {
  const { ui, setUi } = useStore();
  const slug = ui.lightbox?.slug;
  const p = slug ? getProduct(slug) : undefined;
  const [i, setI] = useState(0);

  useEffect(() => setI(ui.lightbox?.index ?? 0), [ui.lightbox?.slug, ui.lightbox?.index]);

  const close = () => setUi({ lightbox: null });
  const total = p?.imgs.length ?? 0;
  const step = (d: number) => setI((n) => (n + d + total) % total);

  useEffect(() => {
    if (!p) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [p, total]);

  if (!p) return null;

  return (
    <Modal open={!!ui.lightbox} onClose={close} label={`${p.name} photographs`} width={1000}>
      <div className="relative bg-sand p-4 md:p-6">
        <CloseButton onClose={close} className="absolute right-4 top-4 z-10" />
        <div className="relative mx-auto max-h-[78vh] w-full" style={{ aspectRatio: '4 / 5', maxWidth: 620 }}>
          <Image key={i} src={img(p.imgs[i])} alt={`${p.name} — photograph ${i + 1}`} fill sizes="(max-width: 768px) 92vw, 620px" className="up-fade object-cover" />
        </div>
        <div className="mt-4 flex items-center justify-center gap-5">
          <button onClick={() => step(-1)} aria-label="Previous photograph" className="up-round">
            <ChevronLeft />
          </button>
          <span className="tnum text-[12.5px] text-ink-muted">
            {i + 1} / {total}
          </span>
          <button onClick={() => step(1)} aria-label="Next photograph" className="up-round">
            <ChevronRight />
          </button>
        </div>
      </div>
    </Modal>
  );
}
