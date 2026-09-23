import { PRODUCTS, MENS_SIZES, WOMENS_SIZES, type Product } from '@/data/products';

/** Static export runs under /<repo> on GitHub Pages; public assets need the prefix. */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || '';

export const asset = (path: string) => `${BASE_PATH}${path}`;
export const img = (file: string) => asset(`/img/${file}`);

export const inr = (n: number) => '₹' + Number(n).toLocaleString('en-IN');

export const getProduct = (slug: string) => PRODUCTS.find((p) => p.slug === slug);

export const sizesFor = (p: Product) => (p.g === 'Men' ? MENS_SIZES : WOMENS_SIZES);
export const sizeSystem = (p: Product) => (p.g === 'Men' ? 'UK' : 'EU');
export const sizeRange = (p: Product) => (p.g === 'Men' ? 'UK 6–11' : '36–41');

export const productImage = (slug: string, i = 0) => {
  const p = getProduct(slug);
  if (!p) return '';
  return img(p.imgs[Math.min(i, p.imgs.length - 1)]);
};

/** Business-day estimate; Delhi pincodes (11xxxx) land two days sooner. */
export const deliveryDays = (pin?: string) => (pin && pin.startsWith('11') ? 5 : 7);

export const deliverBy = (days = 7) => {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
};

export const cx = (...parts: Array<string | false | null | undefined | 0>) => parts.filter(Boolean).join(' ');
