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
    <div className="relative overflow-hidden">
      {image && (
        <div className="absolute inset-[-40px] z-[-1] blur-xl">
          <div className="h-full w-full relative">
            {/* <div className=""> */}
            <Image fill src={image} alt="mock" className="object-cover"></Image>
            {/* </div> */}
          </div>
        </div>
      )}
      <ContentPadding
        className="py-24 xl:py-36"
        innerClassName="flex flex-col-reverse md:flex-row-reverse invert"
        {...props}
      >
        {/* <div className="relative grid grid-cols-12 overflow-hidden"> */}
        {/* <ContentPadding
            className={cn(
              'col-span-12 py-28 md:py-32 xl:py-48 z-[2]',
              image ? 'lg:col-span-7 lg:text-start' : '',
              'h-full border border-red-800',
            )}
            innerClassName={cn(image && '', 'h-full border border-red-500')}
          >
            <TitleText className={cn('mb-8')}>{data?.mainContent}</TitleText>
            <div className="mb-12">{data?.subContent}</div>

            <ButtonContainer>
              {data?.links.map((link) => (
                <Button href={link.href} key={link.label}>
                  {link.label}
                </Button>
              ))}
            </ButtonContainer>
          </ContentPadding> */}
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

        {/* {image && (
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
          )} */}
        {/* </div> */}
      </ContentPadding>
      {/* <div className="absolute z-[-1] inset-0 flex items-center justify-center pointer-events-none invert brightness-[1.4] mix-blend-soft-light">
        <HypnoferromagnetismCanvas />
      </div> */}
    </div>
  );
}
