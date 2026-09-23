'use client';

import { BagDrawer } from '@/components/BagDrawer';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { Lightbox } from '@/components/Lightbox';
import { PageTransition } from '@/components/PageTransition';
import { Preloader } from '@/components/Preloader';
import { QuickView } from '@/components/QuickView';
import { SearchOverlay } from '@/components/SearchOverlay';
import { SizeGuide } from '@/components/SizeGuide';
import { StoreProvider } from '@/store/StoreProvider';

/** Everything that persists across routes: chrome, overlays and motion. */
export function Shell({ children }: { children: React.ReactNode }) {
  return (
    <StoreProvider>
      <Preloader />
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[210] focus:bg-ivory focus:px-4 focus:py-2">
        Skip to content
      </a>
      <Header />
      <main id="main" className="min-h-[60vh]">
        <PageTransition>{children}</PageTransition>
      </main>
      <Footer />
      <BagDrawer />
      <SearchOverlay />
      <QuickView />
      <SizeGuide />
      <Lightbox />
    </StoreProvider>
  );
}
