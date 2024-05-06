'use client';

import { MockUnnamed } from '@/assets/images';
import { GenericReactHTMLNode } from '@/types';
import { DecoratedContent_Plain } from '@/types/components/content-block/interfaces/DecoratedContent';
import { cn, getStrapiImage } from '@/utils/common';
import Image from 'next/image';
import { Button } from '../Button';
import { ButtonContainer } from '../ButtonContainer';
import { ContentPadding } from '../ContentPadding';
import { HypnoferromagnetismCanvas } from '../Shaders/Hypnoferromagnetism';
import { TitleText } from '../TitleText';

export function DecoratedContent({
  data,
  ...props
}: { data?: DecoratedContent_Plain } & GenericReactHTMLNode) {
  const image = getStrapiImage(data?.media) ?? null;

  return (
    <div className="relative">
      <ContentPadding affectsHeight={false} affectsWidth={false} {...props}>
        <div className="relative grid grid-cols-12 overflow-hidden">
          <ContentPadding
            className={cn(
              'col-span-12 py-28 md:py-32 xl:py-48 z-[2] text-center',
              image ? 'lg:col-span-7 lg:text-start' : '',
            )}
            innerClassName={cn(image && '')}
          >
            <TitleText className={cn('mb-8')}>{data?.mainContent}</TitleText>
            <div className="mb-12">{data?.subContent}</div>

            <ButtonContainer
              className={cn('justify-center', image ? 'lg:justify-start' : '')}
            >
              {data?.links.map((link) => (
                <Button href={link.href} key={link.label}>
                  {link.label}
                </Button>
              ))}
            </ButtonContainer>
          </ContentPadding>
          {image && (
            <ContentPadding
              className="lg:col-span-5 items-center w-full h-full ml-[-2rem]"
              innerClassName=" w-full h-full"
            >
              <div className="relative w-full h-full">
                <Image
                  fill
                  src={image}
                  alt="mock"
                  className="object-contain"
                ></Image>
              </div>
            </ContentPadding>
          )}
        </div>
      </ContentPadding>
      <div className="absolute z-[-1] inset-0 flex items-center justify-center pointer-events-none invert brightness-[1.4] mix-blend-soft-light">
        <HypnoferromagnetismCanvas />
      </div>
    </div>
  );
}
