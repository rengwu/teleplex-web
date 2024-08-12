'use client';

import { GenericReactHTMLNode } from '@/types';
import { DecoratedContent_Plain } from '@/types/components/content-block/interfaces/DecoratedContent';
import { cn, getStrapiImage } from '@/utils/common';
import Image from 'next/image';
import { Button } from '../Button';
import { ButtonContainer } from '../ButtonContainer';
import { ContentPadding } from '../ContentPadding';
import { TitleText } from '../TitleText';

export function DecoratedContent({
  data,
  ...props
}: { data?: DecoratedContent_Plain } & GenericReactHTMLNode) {
  const image = getStrapiImage(data?.media) ?? null;

  return (
    <div className="relative overflow-hidden">
      {image && (
        <div className="absolute inset-[-40px] z-[-1] blur-xl">
          <div className="h-full w-full relative">
            <Image fill src={image} alt="mock" className="object-cover"></Image>
          </div>
        </div>
      )}
      <ContentPadding
        className="py-28 xl:py-40"
        innerClassName="flex flex-col-reverse md:flex-row-reverse invert"
        {...props}
      >
        <div className="flex flex-col mt-8 md:mt-0 md:ml-12">
          <TitleText className={cn('mb-10')}>{data?.mainContent}</TitleText>
          <div className="mb-14 flex-grow lg:text-lg">{data?.subContent}</div>
          <ButtonContainer>
            {data?.links.map((link) => (
              <Button href={link.href} key={link.label}>
                {link.label}
              </Button>
            ))}
          </ButtonContainer>
        </div>
      </ContentPadding>
    </div>
  );
}
