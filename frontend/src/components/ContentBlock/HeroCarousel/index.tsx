'use client';

import { GenericReactHTMLNode } from '@/types';
import { cn, getStrapiImage } from '@/utils/common';

import { ContentPadding } from '@/components/ContentPadding';
import { ButtonContainer } from '@/components/ButtonContainer';
import { Button } from '@/components/Button';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import Link from 'next/link';
import { Link_Plain } from '@/types/components/primitives/interfaces/Link';

import AutoScroll from 'embla-carousel-auto-scroll';

export function HeroCarousel({
  imageLinks,
  className,
  ...props
}: {
  imageLinks: Link_Plain[];
} & GenericReactHTMLNode) {
  const [emblaRef] = useEmblaCarousel(
    {
      align: 'start',
      loop: true,
    },
    [
      AutoScroll({
        playOnInit: true,
        stopOnMouseEnter: true,
        stopOnInteraction: false,
      }),
    ],
  );

  return (
    <div
      className={cn(
        'overflow-visible h-full w-full max-h-[80vw] sm:max-h-[600px]',
        className,
      )}
      ref={emblaRef}
      {...props}
    >
      <div className="flex h-full">
        {imageLinks.map((imageLink) => (
          <ImageLinkCard imageLink={imageLink} key={imageLink.id} />
        ))}
      </div>
    </div>
  );
}

export function ImageLinkCard({
  imageLink,
  ...props
}: {
  imageLink: Link_Plain;
}) {
  return (
    <Link
      href={imageLink.href ?? '#'}
      className="shrink-0 h-full min-w-0  pl-4 md:pl-6"
      style={{
        transform: 'translate3d(0, 0, 0)',
      }}
      {...props}
    >
      <div className="relative aspect-square h-full">
        <Image
          fill
          alt={imageLink.label ?? ''}
          src={getStrapiImage(imageLink.image) ?? ''}
          className="object-cover"
        />
      </div>
    </Link>
  );
}

{
  /* <div className="flex flex-col h-full overflow-hidden">
        <div className="relative w-full overflow-hidden">
          
        </div>

        <div className="flex flex-col h-0">
          <div className="text-lg font-semibold">{imageLink.title}</div>
          <div className="mt-2">
            {splitContent.slice(0, wordsThreshold).join(' ')}
            {splitContent.length > wordsThreshold ? '...' : ''}
          </div>
        </div>
      </div> */
}
