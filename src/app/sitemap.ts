import type { MetadataRoute } from 'next';
import { PRODUCTS } from '@/data/products';
import { absolute } from '@/lib/utils';

export const dynamic = 'force-static';

/** Only the pages worth indexing — bag, checkout and account are per-visitor. */
const PAGES = ['/', '/shop/', '/about/', '/contact/', '/track/'];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    ...PAGES.map((path) => ({
      url: absolute(path),
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: path === '/' ? 1 : 0.7
    })),
    ...PRODUCTS.map((p) => ({
      url: absolute(`/product/${p.slug}/`),
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.8
    }))
  ];
}
