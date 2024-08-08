'use client';

import { GLOBAL_HEADER_HEIGHT } from '@/app/globals';
import { GenericReactHTMLNode } from '@/types';
import { PageHero_Plain } from '@/types/components/content-block/interfaces/PageHero';
import { cn, combine } from '@/utils/common';
import { BiChevronLeft } from 'react-icons/bi';
import { Button } from '../Button';
import { ContentPadding } from '../ContentPadding';
import { ButtonContainer } from '../ButtonContainer';
import { TitleText } from '../TitleText';
import { useRouter } from 'next/navigation';

export function PageHero({
  data,
  style,
  ...props
}: { data?: PageHero_Plain } & GenericReactHTMLNode) {
  const router = useRouter();
  return (
    <div
      className="pb-8 bg-gray-200/40"
      style={combine(
        data?.negativeTopMargin && {
          marginTop: `-${GLOBAL_HEADER_HEIGHT}`,
          paddingTop: GLOBAL_HEADER_HEIGHT,
        },
        style,
      )}
    >
      <ContentPadding className="" {...props}>
        <div className="pt-4">
          {data?.hasBack && (
            <ButtonContainer className="">
              <Button
                onClick={() => router.back()} // todo: graceful back
                icon={<BiChevronLeft />}
                variant="naked"
                className="px-0 text-black"
              >
                Back
              </Button>
            </ButtonContainer>
          )}
          <div className="grid lg:grid-cols-2">
            <TitleText className={cn('mt-4 mb-8', 'lg:col-span-2')}>
              {data?.title}
            </TitleText>
            <div className="mb-4">{data?.caption}</div>
            <div className="flex gap-4">
              {data?.links.map((link) => (
                <Button href={link.href} key={link.label}>
                  {link.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </ContentPadding>
    </div>
  );
}
