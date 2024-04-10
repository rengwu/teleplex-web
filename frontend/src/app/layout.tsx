import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { cn } from '@/utils/common';
import './globals.css';

import { Inter } from 'next/font/google';

export const GLOBAL_CONTENT_MAX_WIDTH = '1200px';
export const GLOBAL_HEADER_HEIGHT = '56px';

export const titleFont = Inter({
  // variable: '--font-title',
  // weight: '400',
  subsets: ['latin'],
  fallback: ['Times New Roman'],
});

export const bodyFont = Inter({
  // variable: '--font-body',
  subsets: ['latin'],
  fallback: ['Times New Roman'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          bodyFont.className,
          'relative flex flex-col h-full min-h-screen overflow-auto',
        )}
      >
        <Header className="sticky top-0 z-10" />
        <div
          className="flex flex-col items-center w-full flex-grow"
          id="content-container"
        >
          <div className="w-full">{children}</div>
        </div>
        <Footer
          className="h-[56px]"
          innerStyle={{ maxWidth: GLOBAL_CONTENT_MAX_WIDTH }}
        />
      </body>
    </html>
  );
}
