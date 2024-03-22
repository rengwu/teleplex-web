import Image, { ImageProps } from 'next/image';
import { useState } from 'react';

export const ImageWithFadeIn = ({
  duration = '1s',
  style,
  ...props
}: { duration?: string } & ImageProps) => {
  const [loaded, setLoaded] = useState(false);
  return (
    <Image
      style={{
        transitionDuration: duration,
        opacity: loaded ? 1 : 0,
        ...style,
      }}
      onLoad={() => setLoaded(true)}
      {...props}
    ></Image>
  );
};
