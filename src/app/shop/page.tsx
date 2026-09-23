import { Suspense } from 'react';
import { ShopView } from '@/components/shop/ShopView';

export const metadata = { title: 'Shop' };

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="shell section" />}>
      <ShopView />
    </Suspense>
  );
}
