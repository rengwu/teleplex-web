import { Footer } from '@/components/Footer';
import { SimpleHeader } from '@/components/Header';
import { cn } from '@/utils/common';
import './globals.css';

import { Site_Plain } from '@/types/api/site/content-types/site/site';
import { Menu_Plain } from '@/types/components/components/interfaces/Menu';
import { strapiRequest } from '@/utils/api';

import { Encode_Sans, Fira_Mono, Inter } from 'next/font/google';
import { GLOBAL_CONTENT_MAX_WIDTH } from './globals';

const titleFont = Encode_Sans({
  variable: '--font-title',
  weight: ['300', '400', '500', '600', '700', '800'],
  subsets: ['latin'],
  fallback: ['Times'],
});

const bodyFont = Inter({
  variable: '--font-body',
  subsets: ['latin'],
  fallback: ['Arial'],
});

const monoFont = Fira_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
  weight: '400',
  fallback: ['Courier'],
});

const fonts = [titleFont, bodyFont, monoFont];
const fontClass = fonts.reduce((a, c) => `${a} ${c.variable}`, '');

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let headerMenu: Menu_Plain[] = [];

  const response = await strapiRequest<Site_Plain>(
    `/api/site?populate=deep&populate=*`,
  );
  if (response.success) {
    headerMenu = response.data.header_menu;
  }

  return (
    <html lang="en" className={cn(fontClass)}>
      <body
        className={cn(
          'relative flex flex-col items-center h-full min-h-screen overflow-auto overflow-x-hidden font-body',
        )}
      >
        <SimpleHeader navItems={headerMenu} />
        <div
          className="flex flex-col items-center w-full flex-grow text-sm text-wrap"
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
