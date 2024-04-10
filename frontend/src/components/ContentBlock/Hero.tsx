'use client';

import { GLOBAL_HEADER_HEIGHT, titleFont } from '@/app/layout';
import { GenericReactHTMLNode } from '@/types';
import { Hero_Plain } from '@/types/components/content-block/interfaces/Hero';
import { cn } from '@/utils/common';
import Link from 'next/link';
import { ContentPadding } from '../ContentPadding';
import { VectorsTELEPLEX } from '@/assets/images';
import Image from 'next/image';
import { useEffect } from 'react';
import { useState } from 'react';

export function Hero({
  className,
  style,
  data,
  ...props
}: { data?: Hero_Plain } & GenericReactHTMLNode) {
  // const [animX, setAnimX] = useState(40);
  // useEffect(() => {
  //   setInterval(() => {
  //     setAnimX((prev) => prev - 0.01);
  //   }, 50);
  // }, []);
  return (
    <div
      className={cn(
        'relative flex flex-col justify-center h-screen bg-blue-50 invert hue-rotate-180',
        className,
      )}
      style={{
        ...(data?.negativeTopMargin
          ? { marginTop: `-${GLOBAL_HEADER_HEIGHT}` }
          : {}),
        ...style,
      }}
      {...props}
    >
      {/* content */}
      <ContentPadding className="flex flex-col">
        <div className={cn(titleFont.className, 'text-5xl font-semibold mb-4')}>
          {data?.mainTagline}
        </div>
        <Link href="/">{data?.buttonText}</Link>
      </ContentPadding>

      {/* animation canvas */}
      <div
        className="absolute inset-0 bg-white z-[-1] overflow-hidden"
        style={{
          filter: 'contrast(1.3) opacity(0.3)',
        }}
      >
        <div className="relative flex items-center justify-center w-full h-full">
          <div
            className="absolute"
            style={{
              fontSize: '30vh',
              fontWeight: '800',
              filter: 'blur(24px)',
              transform: `
                translateX(20%)
                translateY(0%)
              `,
            }}
          >
            TELEPLEX
          </div>
        </div>
      </div>
    </div>
  );
}
