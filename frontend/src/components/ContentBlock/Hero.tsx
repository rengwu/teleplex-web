'use client';

import { GLOBAL_CONTENT_MAX_WIDTH, GLOBAL_HEADER_HEIGHT } from '@/app/globals';
import { GenericReactHTMLNode } from '@/types';
import { Hero_Plain } from '@/types/components/content-block/interfaces/Hero';
import { cn, combine } from '@/utils/common';
import { useRef } from 'react';
import { Button } from '../Button';
import { ButtonContainer } from '../ButtonContainer';
import { ContentPadding } from '../ContentPadding';
import { Brand } from '../Brand';

export function Hero({
  className,
  style,
  data,
  ...props
}: { data?: Hero_Plain } & GenericReactHTMLNode) {
  return (
    <div
      className={cn(
        'relative flex flex-col justify-center h-screen bg-black/90 text-white/95 overflow-hidden',
        className,
      )}
      style={combine(
        data?.negativeTopMargin && {
          marginTop: '-' + GLOBAL_HEADER_HEIGHT,
          paddingTop: GLOBAL_HEADER_HEIGHT,
        },
        data?.fullScreenHeight && {
          minHeight: '100vh',
        },
        style,
      )}
      {...props}
    >
      {/* content */}
      <ContentPadding innerClassName="flex flex-col">
        <div
          className={cn(
            'text-5xl font-title font-semibold leading-tight break-words',
            'mb-8',
          )}
        >
          {data?.mainTagline}
        </div>
        <ButtonContainer>
          {data?.links?.map((link) => (
            <Button href={link.href} key={link.label}>
              {link.label}
            </Button>
          ))}
        </ButtonContainer>
      </ContentPadding>

      {/* animation */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className=""
          style={{
            filter: 'contrast(40)',
          }}
        >
          <div className="opacity-30 blur-[20px]">
            <Brand fill="white" className="w-[100vw] h-full" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function HeroRoundedRectangle({
  className,
  style,
  data,
  ...props
}: { data?: Hero_Plain } & GenericReactHTMLNode) {
  return (
    <div
      className={cn(
        'flex flex-col justify-center items-center h-screen',
        className,
      )}
      style={combine(
        data?.negativeTopMargin && {
          marginTop: '-' + GLOBAL_HEADER_HEIGHT,
          padding: `${GLOBAL_HEADER_HEIGHT} 1rem 1rem 1rem`,
        },
        data?.fullScreenHeight && {
          minHeight: '100vh',
        },
        style,
      )}
      {...props}
    >
      <div
        className="flex flex-col justify-center items-center h-full w-full bg-blue-50 rounded-lg invert hue-rotate-180"
        style={{
          maxWidth: GLOBAL_CONTENT_MAX_WIDTH,
        }}
      >
        {/* content */}
        <ContentPadding innerClassName="flex flex-col">
          <div
            className={cn(
              'text-5xl font-title font-semibold leading-tight break-words',
              'mb-8',
            )}
          >
            {data?.mainTagline}
          </div>
          <ButtonContainer>
            {data?.links?.map((link) => (
              <Button href={link.href} key={link.label}>
                {link.label}
              </Button>
            ))}
          </ButtonContainer>
        </ContentPadding>
      </div>
    </div>
  );
}
