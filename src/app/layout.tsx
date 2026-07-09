import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Cormorant_Garamond } from 'next/font/google';
import './globals.css';
import { AppProvider } from '@/context/AppContext';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800'],
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-cormorant',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
});

export const metadata: Metadata = {
  title: 'ZestyBites – Gourmet Food Delivery in Patan & Unjha, Gujarat',
  description: 'Discover top-rated restaurants and get gourmet food delivered lightning-fast to your doorstep. Premium experience, real flavours.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="light">
      <body className={`${jakarta.variable} ${cormorant.variable} font-sans bg-[#FAF9F6] text-[#1A1714] antialiased`}>
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
