'use client';

import { GenericReactHTMLNode } from '@/types';
import { cn, getStrapiImage } from '@/utils/common';

import { Link_Plain } from '@/types/components/primitives/interfaces/Link';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import Link from 'next/link';

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
      dragFree: true,
      loop: true,
    },
    [
      AutoScroll({
        playOnInit: true,
        stopOnMouseEnter: false,
        stopOnInteraction: false,
        startDelay: 0,
      }),
    ],
  );

  return (
    <div
      className={cn(
        'overflow-visible h-full w-full max-h-[80vw] sm:max-h-[600px] shadow-xl',
        className,
      )}
      ref={emblaRef}
      {...props}
    >
      <div className="flex h-full">
        {imageLinks.map((imageLink) => (
          <ImageLinkCard imageLink={imageLink} key={imageLink.image?.id} />
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
      className="shrink-0 h-full min-w-0 ml-12 md:ml-16 relative cursor-grab"
      style={{
        transform: 'translate3d(0, 0, 0)',
      }}
      {...props}
    >
      {/* <div className="absolute inset-0 flex items-center justify-center z-10 opacity-0 hover:opacity-100 bg-black/40 duration-200 cursor-grab">
        <span className="font-title font-bold !leading-normal break-words text-2xl">
          {imageLink.label}
        </span>
      </div> */}
      <div className="relative aspect-square h-full">
        <Image
          fill
          alt={imageLink.label ?? ''}
          src={getStrapiImage(imageLink.image) ?? ''}
          className="object-cover"
        />
      </div>
      <div className="absolute bottom-0 px-2 py-1 bg-black/65 backdrop-blur-[8px]">
        <span className="font-title !leading-normal break-words text-xs">
          {imageLink.label}
        </span>
      </div>
    </Link>
  );
}
