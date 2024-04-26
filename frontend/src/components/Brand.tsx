import { VectorsTELEPLEXBLACK, VectorsTELEPLEXWHITE } from '@/assets/images';
import { GenericReactHTMLNode } from '@/types';
import { cn } from '@/utils/common';
import Image from 'next/image';

export function Brand({
  fill = 'black',
  className,
  ...props
}: { fill?: keyof typeof srcMap } & GenericReactHTMLNode) {
  const srcMap = {
    white: VectorsTELEPLEXWHITE,
    black: VectorsTELEPLEXBLACK,
  };
  return (
    <div className={cn('relative aspect-[432/62]', className)} {...props}>
      <Image alt="Teleplex Logo" src={srcMap[fill]} fill />
    </div>
  );
}
