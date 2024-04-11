'use client';

import { GLOBAL_CONTENT_MAX_WIDTH } from '@/app/globals';
import { GenericReactHTMLNode } from '@/types';
import { cn } from '@/utils/common';

export const ContentPadding = ({
  children,
  className = '',
  innerClassName = '',
  innerStyle = {},
  affectsHeight = true,
  affectsWidth = true,
  ...rest
}: {
  innerClassName?: string;
  innerStyle?: object;
  affectsHeight?: boolean;
  affectsWidth?: boolean;
} & GenericReactHTMLNode) => {
  return (
    <div className={`w-full flex flex-col items-center ${className}`} {...rest}>
      <div
        className={cn(
          affectsHeight ? 'py-[16px] sm:py-[24px]' : '',
          affectsWidth ? 'px-[16px] sm:px-[24px]' : '',
          `w-full ${innerClassName}`,
        )}
        style={{
          maxWidth: GLOBAL_CONTENT_MAX_WIDTH,
          ...innerStyle,
        }}
      >
        {children}
      </div>
    </div>
  );
};
