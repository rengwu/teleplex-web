import type { Metadata } from 'next';

import './globals.css';
import { bodyFont } from '@/assets/fonts';
import { cn } from '@/utils/common';

export async function generateMetadata(): Promise<Metadata> {
  // const siteData = await strapiRequest(`/api/site?populate=deep&populate=*`).data;
  return {
    title: 'Site Title',
    description: 'Site Description',
    // icons: getStrapiImage(siteData.icon) ?? '',
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(bodyFont.className, 'min-h-screen h-full')}>
        {children}
      </body>
    </html>
  );
}
