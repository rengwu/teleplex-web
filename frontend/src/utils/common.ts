import { Media } from '@/types/common/schemas-to-ts/MediaFlattened';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getRandomInt(min: number, max: number) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
}

export function getStrapiImage(imageData: Media | undefined): string | null {
  if (imageData && 'staticUrl' in imageData) {
    return `${imageData.staticUrl}`;
  }
  if (!imageData || !('url' in imageData)) {
    return null;
  }
  return `${process.env.NEXT_PUBLIC_STRAPI_MEDIA_ORIGIN}${imageData.url}`;
}

// combine objects similar to a spread operator
export const combine = (...objects: (object | undefined | null | false)[]) => {
  let result = {};
  for (const key in objects) {
    if (objects[key]) {
      result = { ...result, ...objects[key] };
    }
  }
  return result;
};
