import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, Public_Sans } from 'next/font/google';
import './globals.css';
import { Shell } from '@/components/Shell';
import { absolute, SITE_ORIGIN } from '@/lib/utils';

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

const TITLE = 'Upanat Studio — Handcrafted juttis, Delhi';
const DESCRIPTION =
  'Premium handcrafted footwear designed for elegance and comfort. Juttis, block heels, mules, wedges and men’s festive loafers, made in Delhi.';

const SHARE_CARD = {
  url: absolute('/og.jpg'),
  width: 1200,
  height: 630,
  alt: 'Upanat Studio — Tradition begins at your feet.'
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_ORIGIN),
  title: { default: TITLE, template: '%s · Upanat Studio' },
  description: DESCRIPTION,
  applicationName: 'Upanat Studio',
  icons: {
    icon: [
      { url: absolute('/favicon.png'), sizes: '32x32', type: 'image/png' },
      { url: absolute('/icon-192.png'), sizes: '192x192', type: 'image/png' },
      { url: absolute('/icon-512.png'), sizes: '512x512', type: 'image/png' }
    ],
    apple: absolute('/apple-touch-icon.png')
  },
  openGraph: {
    type: 'website',
    siteName: 'Upanat Studio',
    title: TITLE,
    description: 'Tradition begins at your feet. Handcrafted footwear from New Delhi.',
    url: absolute('/'),
    locale: 'en_IN',
    images: [SHARE_CARD]
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: 'Tradition begins at your feet. Handcrafted footwear from New Delhi.',
    images: [SHARE_CARD.url]
  }
};

export const viewport: Viewport = {
  themeColor: '#5C1620'
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
