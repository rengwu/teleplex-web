import { GenericReactHTMLNode } from '@/types';
import { cn, combine } from '@/utils/common';
import Link from 'next/link';
import { cloneElement } from 'react';

const common = {
  className:
    'px-4 py-2 flex flex-row flex-nowrap items-center justify-center font-semibold rounded-full text-white/90 duration-150',
  style: {},
};

const variants: { [key: string]: { className: string; style: object } } = {
  default: {
    className: cn(common.className, 'bg-black hover:bg-gray-600'),
    style: combine(common.style, {}),
  },
  naked: {
    className: cn(common.className, ''),
    style: combine(common.style, {}),
  },
};

const buttonMixins = {
  inverted: {
    className: 'invert',
    style: { textRendering: 'geometricPrecision' },
  },
  blur: {
    className: 'blur',
    style: {},
  },
};

export function Button({
  href,
  className,
  children,
  style,
  variant = 'default',
  mixins = [],
  icon,
  ...rest
}: {
  href?: string;
  icon?: React.JSX.Element;
  variant?: keyof typeof variants;
  mixins?: (keyof typeof buttonMixins)[];
} & GenericReactHTMLNode) {
  const currentVariant = variants[variant];

  const clonedIcon =
    icon && cloneElement(icon, { size: 20, className: 'mr-0.5 -ml-0.5' });
  const mixinStyles = mixins.reduce((a, c) => {
    return { ...a, ...buttonMixins[c].style };
  }, {});

  const mixinClasses = mixins.reduce(
    (a, c) => `${a} ${buttonMixins[c].className} `,
    '',
  );

  if (href) {
    return (
      <Link
        className={cn(currentVariant.className, mixinClasses, className, '')}
        style={combine(currentVariant.style, mixinStyles, style)}
        href={href}
        {...rest}
      >
        {clonedIcon}
        {children}
      </Link>
    );
  }
  return (
    <button
      className={cn(currentVariant.className, mixinClasses, className)}
      style={combine(currentVariant.style, mixinStyles, style)}
      {...rest}
    >
      {clonedIcon}
      {children}
    </button>
  );
}
