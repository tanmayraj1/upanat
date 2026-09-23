import { TrackForm } from '@/components/account/TrackForm';
import { Breadcrumb } from '@/components/ui';

export const metadata = { title: 'Track your order' };

export default function TrackPage() {
  return (
    <div className="shell py-12">
      <Breadcrumb trail={[{ label: 'Home', href: '/' }, { label: 'Track an order' }]} />
      <div className="mt-6 max-w-[640px]">
        <p className="eyebrow">No account needed</p>
        <h1 className="h-page mt-5">Track your order</h1>
        <p className="mt-6 text-[15px] leading-relaxed text-ink-body">
          Enter the order number from your confirmation and the email you checked out with.
        </p>
      </div>
      <div className="mt-10">
        <TrackForm />
      </div>
    </div>
  );
}
