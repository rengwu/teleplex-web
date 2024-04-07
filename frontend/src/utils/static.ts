import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { dirname } from 'path';

// check if directory exists, recursively creates directory otherwise.
export function ensureDirectoryExistence(filePath: string) {
  const dir = dirname(filePath);
  if (existsSync(dir)) {
    return true;
  }
  ensureDirectoryExistence(dir);
  mkdirSync(dir);
}

// sanitizes a given string to a filename-friendly string.
export function sanitizeString(input: string, replacement = '_') {
  if (typeof input !== 'string') {
    throw new Error('Input must be string');
  }

  const illegalRe = /[\/\?<>\\:\*\|"]/g;
  const controlRe = /[\x00-\x1f\x80-\x9f]/g;
  const reservedRe = /^\.+$/;
  const windowsReservedRe = /^(con|prn|aux|nul|com[0-9]|lpt[0-9])(\..*)?$/i;
  const windowsTrailingRe = /[\. ]+$/;

  const sanitized = input
    .replace(illegalRe, replacement)
    .replace(controlRe, replacement)
    .replace(reservedRe, replacement)
    .replace(windowsReservedRe, replacement)
    .replace(windowsTrailingRe, replacement);
  return sanitized;
}

// recursively fetches all strapi CMS images and writes to ./.tmp
export async function fetchAllImages(strapiData: { [key: string]: any }) {
  if (strapiData && 'url' in strapiData && 'mime' in strapiData) {
    const isImage =
      typeof strapiData['mime'] === 'string' &&
      strapiData['mime'].startsWith('image');
    if (isImage) {
      fetch(`${process.env.NEXT_PUBLIC_STRAPI_MEDIA_ORIGIN}${strapiData.url}`)
        .then((res) => res.blob())
        .then(async (blob) => {
          const imageName = sanitizeString(strapiData.name);
          const arrayBuffer = await blob.arrayBuffer();
          const buffer = Buffer.from(arrayBuffer);
          const relativePath = `/static-media/${imageName}`;
          const fullPath = `./.tmp` + relativePath;
          ensureDirectoryExistence(fullPath);
          console.log(`[fetchAllImages] writing to ${fullPath}`);
          writeFileSync(fullPath, buffer);
          strapiData['staticUrl'] = relativePath;
        });
    }
  } else {
    // recursive check all sub-objects
    for (const key in strapiData) {
      if (typeof strapiData[key] == 'object') {
        await fetchAllImages(strapiData[key]);
      }
    }
  }

  return strapiData;
}
