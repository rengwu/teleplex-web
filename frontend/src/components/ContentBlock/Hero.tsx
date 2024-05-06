'use client';

import { GLOBAL_CONTENT_MAX_WIDTH, GLOBAL_HEADER_HEIGHT } from '@/app/globals';
import { GenericReactHTMLNode } from '@/types';
import { Hero_Plain } from '@/types/components/content-block/interfaces/Hero';
import { cn, combine } from '@/utils/common';
import { Button } from '../Button';
import { ButtonContainer } from '../ButtonContainer';
import { ContentPadding } from '../ContentPadding';
import { GradientCanvas } from '../Shaders/Gradient';
import { TitleText } from '../TitleText';

export function Hero({
  className,
  style,
  data,
  ...props
}: { data?: Hero_Plain } & GenericReactHTMLNode) {
  return (
    <div
      className={cn(
        'relative flex flex-col h-screen bg-black/90 text-white/95 overflow-hidden',
        className,
      )}
      style={combine(
        {
          background: `
              linear-gradient(0deg, #f5f5f5 0%, #191919 80%),
              url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.25' numOctaves='1' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")
            `,
        },
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
      {/* animation */}

      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none hue-rotate-[120deg] contrast-[1.4]"
        style={{ background: 'black' }}
      >
        <GradientCanvas />
      </div>

      {/* content */}
      <ContentPadding
        className="h-full"
        innerClassName="h-full relative flex flex-col items-center justify-center"
      >
        <TitleText
          larger
          className={cn(
            'break-words max-w-[1200px] text-center',
            'mt-[-56px] mb-12',
          )}
        >
          {data?.mainTagline}
        </TitleText>
        <ButtonContainer>
          {data?.links?.map((link) => (
            <Button href={link.href} key={link.label} mixins={['inverted']}>
              {link.label}
            </Button>
          ))}
        </ButtonContainer>
      </ContentPadding>
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
