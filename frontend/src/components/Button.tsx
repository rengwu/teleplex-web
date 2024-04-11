import { GenericReactHTMLNode } from '@/types';
import { cn, combine } from '@/utils/common';
import Link from 'next/link';
import { cloneElement } from 'react';

const common = {
  className:
    'px-4 py-2 flex flex-row flex-nowrap items-center justify-center font-semibold rounded text-black/90',
  style: {},
};

const variants: { [key: string]: { className: string; style: object } } = {
  default: {
    className: cn(common.className, 'bg-blue-200'),
    style: combine(common.style, {}),
  },
  naked: {
    className: cn(common.className, ''),
    style: combine(common.style, {}),
  },
};

export function Button({
  href,
  className,
  children,
  style,
  variant = 'default',
  icon,
  ...rest
}: {
  href?: string;
  icon?: React.JSX.Element;
  variant?: keyof typeof variants;
} & GenericReactHTMLNode) {
  const currentVariant = variants[variant];

  const clonedIcon =
    icon && cloneElement(icon, { size: 20, className: 'mr-0.5 -ml-0.5' });

  if (href) {
    return (
      <Link
        className={cn(currentVariant.className, className, '')}
        style={combine(currentVariant.style, style)}
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
      className={cn(currentVariant.className, className)}
      style={combine(currentVariant.style, style)}
      {...rest}
    >
      {clonedIcon}
      {children}
    </button>
  );
}
