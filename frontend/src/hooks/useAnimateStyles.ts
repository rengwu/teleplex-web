import { combine } from '@/utils/common';
import { useEffect, useState } from 'react';

type StylesKeyframe = {
  styles: {
    transform: object;
  };
  duration?: number;
  easing?: string;
};

export function useAnimateStyles(
  keyframes: StylesKeyframe[],
  defaultStyles?: {
    transform: object;
  },
): {
  frameStyles: object;
} {
  const getKeyframeStyles = (keyframe: StylesKeyframe) => {
    const defaultTransformString =
      defaultStyles && 'transform' in defaultStyles
        ? Object.entries(defaultStyles.transform).reduce(
            (a, [key, value]) => `${a}${key}(${value}) `,
            '',
          )
        : '';

    const transformString =
      'transform' in keyframe.styles
        ? Object.entries(keyframe.styles.transform).reduce(
            (a, [key, value]) => `${a}${key}(${value}) `,
            '',
          )
        : '';

    return combine(
      {
        ...defaultStyles,
        ...keyframe.styles,
        transform: defaultTransformString + transformString,
        transitionDuration: `${keyframe.duration ?? 0}ms`,
      },
      'easing' in keyframe && { transitionTimingFunction: keyframe.easing },
    );
  };

  const cachedFrameStyles = keyframes.map(getKeyframeStyles);

  const [keyframeIndex, setKeyframeIndex] = useState(0);
  const [frameStyles, setFrameStyles] = useState(cachedFrameStyles[0]);

  useEffect(() => {
    let timer;
    function animateKeyframe(i: number) {
      setKeyframeIndex(i);
      setFrameStyles(cachedFrameStyles[i]);
    }

    timer = setTimeout(
      () => animateKeyframe((keyframeIndex + 1) % keyframes.length),
      Math.max(keyframes[keyframeIndex].duration ?? 0, 10),
    );

    return () => clearTimeout(timer);
  }, [frameStyles]);

  return { frameStyles };
}
