'use client';

import { GLOBAL_HEADER_HEIGHT, titleFont } from '@/app/globals';
import { GenericReactHTMLNode } from '@/types';
import { Hero_Plain } from '@/types/components/content-block/interfaces/Hero';
import { cn, combine } from '@/utils/common';
import { Button } from '../Button';
import { ContentPadding } from '../ContentPadding';
import { ButtonContainer } from '../ButtonContainer';

export function Hero({
  className,
  style,
  data,
  ...props
}: { data?: Hero_Plain } & GenericReactHTMLNode) {
  return (
    <div
      className={cn(
        'relative flex flex-col justify-center bg-blue-50 invert hue-rotate-180',
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
            titleFont.className,
            'text-5xl font-semibold leading-tight break-words',
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
  );
}
