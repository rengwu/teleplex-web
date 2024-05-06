import { GenericReactHTMLNode } from '@/types';
import { cn } from '@/utils/common';

export function TitleText({
  larger,
  children,
  className,
  ...props
}: { larger?: boolean } & GenericReactHTMLNode) {
  return (
    <h4
      className={cn(
        larger
          ? 'text-3xl md:text-4xl lg:text-5xl'
          : 'text-2xl md:text-3xl lg:text-4xl',
        'font-title font-bold !leading-normal break-words',
        className,
      )}
      {...props}
    >
      {children}
    </h4>
  );
}
