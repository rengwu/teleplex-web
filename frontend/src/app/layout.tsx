import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { cn } from '@/utils/common';
import './globals.css';

import { strapiRequest } from '@/utils/api';
import { Site_Plain } from '@/types/api/site/content-types/site/site';
import { Menu_Plain } from '@/types/components/components/interfaces/Menu';

import {
  Archivo,
  DM_Sans,
  Encode_Sans,
  Fira_Mono,
  Inter,
} from 'next/font/google';
import {
  GLOBAL_CONTENT_MAX_WIDTH,
  GLOBAL_CONTENT_MAX_WIDTH_PX,
  GLOBAL_HEADER_HEIGHT,
} from './globals';

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

export function SimpleHeader({ navItems = [] }: { navItems?: Menu_Plain[] }) {
  return (
    <Header
      // className="sticky top-0 w-full z-[10] backdrop-blur-[14px] mix-blend-difference"
      className="sticky top-0 w-full z-[10] bg-black/65 backdrop-blur-[14px]"
      style={{
        height: GLOBAL_HEADER_HEIGHT,
        textRendering: 'geometricPrecision',
      }}
      // fullWidth
      navItems={navItems}
    />
  );
}

export function FloatingHeader({ navItems = [] }: { navItems?: Menu_Plain[] }) {
  return (
    <div
      className="sticky w-full z-[10] backdrop-blur-[16px] mix-blend-difference contrast-[1.8] brightness-[0.9] saturate-[0.2] overflow-hidden shadow-2xl shadow-black/10 bg-gray-200 bg-opacity-[0.125]"
      style={{
        maxWidth: `clamp(100px, ${GLOBAL_CONTENT_MAX_WIDTH_PX}px, calc(100vw - 32px))`,
        top: '6px',
        left: '6px',
        right: '6px',
        borderRadius: '8px',
        marginBottom: `6px`,
      }}
    >
      <Header
        // className="bg-gray-200 bg-opacity-[0.125]"
        style={{
          height: `calc(${GLOBAL_HEADER_HEIGHT} - 6px)`,
        }}
        navItems={navItems}
      />
    </div>
  );
}
