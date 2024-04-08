import { GenericReactHTMLNode } from '@/types';
import { Hero_Plain } from '@/types/components/content-block/interfaces/Hero';

export function Hero({
  data,
  ...props
}: { data?: Hero_Plain } & GenericReactHTMLNode) {
  return (
    <div {...props}>
      <div>{data?.mainTagline}</div>
      <div>{data?.buttonText}</div>
      <div>
        {data?.animatedText.map((text) => (
          <div key={text.value}>{text.value}</div>
        ))}
      </div>
    </div>
  );
}
