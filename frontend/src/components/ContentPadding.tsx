import { GenericReactHTMLNode } from '@/types';

export const ContentPadding = ({
  children,
  className = '',
  innerClassName = '',
  ...rest
}: {
  innerClassName?: string;
} & GenericReactHTMLNode) => {
  return (
    <div className={`w-full flex flex-col items-center ${className}`} {...rest}>
      <div
        className={`p-[16px] sm:p-[24px] w-full max-w-[1600px] ${innerClassName}`}
      >
        {children}
      </div>
    </div>
  );
};
