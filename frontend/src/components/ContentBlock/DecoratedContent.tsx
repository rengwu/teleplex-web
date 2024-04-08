import { GenericReactHTMLNode } from '@/types';
import { DecoratedContent_Plain } from '@/types/components/content-block/interfaces/DecoratedContent';

export function DecoratedContent({
  data,
  ...props
}: { data?: DecoratedContent_Plain } & GenericReactHTMLNode) {
  return (
    <div {...props}>
      <div>{data?.mainContent}</div>
      <div>{data?.subContent}</div>
      <div>
        {data?.links.map((link) => (
          <a href={link.href} key={link.label}>
            {link.label}
          </a>
        ))}
      </div>
    </div>
  );
}
