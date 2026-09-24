import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ProductView } from '@/components/product/ProductView';
import { PRODUCTS } from '@/data/products';
import { absolute, getProduct, inr } from '@/lib/utils';

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const p = getProduct(params.slug);
  if (!p) return { title: 'Not found' };

  const description = `${p.short}. ${inr(p.price)}, handcrafted in Delhi.`;
  const card = {
    url: absolute(`/og/${p.slug}.jpg`),
    width: 1200,
    height: 630,
    alt: `${p.name} — ${p.cat} by Upanat Studio`
  };

  return {
    title: p.name,
    description,
    openGraph: {
      type: 'website',
      title: `${p.name} — Upanat Studio`,
      description,
      url: absolute(`/product/${p.slug}/`),
      images: [card]
    },
    twitter: { card: 'summary_large_image', title: `${p.name} — Upanat Studio`, description, images: [card.url] }
  };
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const p = getProduct(params.slug);
  if (!p) notFound();
  return <ProductView slug={p.slug} />;
}
