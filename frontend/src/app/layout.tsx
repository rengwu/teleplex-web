import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { cn } from '@/utils/common';
import './globals.css';

import { strapiRequest } from '@/utils/api';
import { GLOBAL_CONTENT_MAX_WIDTH, bodyFont } from './globals';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const response = await strapiRequest(`/api/site`);
  console.log(response);

  return (
    <html lang="en">
      <body
        className={cn(
          bodyFont.className,
          'relative flex flex-col h-full min-h-screen overflow-auto overflow-x-hidden',
        )}
      >
        <Header className="sticky top-0 z-10" />
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
