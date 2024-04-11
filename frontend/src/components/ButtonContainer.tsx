import { GenericReactHTMLNode } from '@/types';
import { cn } from '@/utils/common';

export function ButtonContainer({
  className,
  children,
  ...rest
}: GenericReactHTMLNode) {
  return (
    <div className={cn('flex flex-row gap-4', className)} {...rest}>
      {children}
    </div>
  );
}
