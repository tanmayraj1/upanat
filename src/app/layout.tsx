import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, Public_Sans } from 'next/font/google';
import './globals.css';
import { Shell } from '@/components/Shell';

const display = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-display',
  display: 'swap'
});

const sans = Public_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap'
});

export const metadata: Metadata = {
  title: {
    default: 'Upanat Studio — Handcrafted juttis, Delhi',
    template: '%s · Upanat Studio'
  },
  description:
    'Premium handcrafted footwear designed for elegance and comfort. Juttis, block heels, mules, wedges and men’s festive loafers, made in Delhi.',
  openGraph: {
    title: 'Upanat Studio — Handcrafted juttis, Delhi',
    description: 'Tradition begins at your feet. Handcrafted footwear from New Delhi.',
    type: 'website'
  }
};

export const viewport: Viewport = {
  themeColor: '#0A362A'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body>
        <Shell>{children}</Shell>
      </body>
    </html>
  );
}
