'use client';

import { Inter, Raleway, Roboto_Condensed } from 'next/font/google';

export const GLOBAL_CONTENT_MAX_WIDTH: string = '1200px';
export const GLOBAL_HEADER_HEIGHT: string = '56px';

export const titleFont = Raleway({
  // variable: '--font-title',
  // weight: '400',
  subsets: ['latin'],
  fallback: ['Times New Roman'],
});

export const bodyFont = Raleway({
  // variable: '--font-body',
  subsets: ['latin'],
  fallback: ['Times New Roman'],
});
