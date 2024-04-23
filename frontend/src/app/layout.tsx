import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { cn } from '@/utils/common';
import './globals.css';

import { strapiRequest } from '@/utils/api';
import { GLOBAL_CONTENT_MAX_WIDTH } from './globals';
import { Site_Plain } from '@/types/api/site/content-types/site/site';
import { Menu_Plain } from '@/types/components/components/interfaces/Menu';

import { DM_Sans, Fira_Mono } from 'next/font/google';

const titleFont = Fira_Mono({
  variable: '--font-title',
  weight: '400',
  subsets: ['latin'],
  fallback: ['Comic Sans'],
});

const bodyFont = DM_Sans({
  variable: '--font-body',
  subsets: ['latin'],
  fallback: ['Comic Sans'],
});

const monoFont = Fira_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
  weight: '400',
  fallback: ['Comic Sans'],
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
          'relative flex flex-col h-full min-h-screen overflow-auto overflow-x-hidden font-body',
        )}
      >
        <Header className="sticky top-0 z-10" navItems={headerMenu} />
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
