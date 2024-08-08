'use client';

import { GLOBAL_CONTENT_MAX_WIDTH } from '@/app/globals';
import { GenericReactHTMLNode } from '@/types';
import { cn, combine } from '@/utils/common';

export const ContentPadding = ({
  children,
  className = '',
  innerClassName = '',
  innerStyle = {},
  affectsHeight = true,
  affectsWidth = true,
  fullWidth = false,
  ...rest
}: {
  innerClassName?: string;
  innerStyle?: object;
  affectsHeight?: boolean;
  affectsWidth?: boolean;
  fullWidth?: boolean;
} & GenericReactHTMLNode) => {
  return (
    <div className={`w-full flex flex-col items-center ${className}`} {...rest}>
      <div
        className={cn(
          affectsHeight ? `py-[16px] sm:py-[24px]` : '',
          affectsWidth ? `px-[16px] sm:px-[24px]` : '',
          `w-full ${innerClassName}`,
        )}
        style={combine(
          !fullWidth && { maxWidth: GLOBAL_CONTENT_MAX_WIDTH },
          innerStyle,
        )}
      >
        {children}
      </div>
    </div>
  );
};
