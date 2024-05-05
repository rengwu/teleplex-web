'use client';

import { useAnimateStyles } from '@/hooks/useAnimateStyles';

const defaultStyles = {
  transform: {
    perspective: '1000px',
  },
  opacity: '0.5',
};

const keyframes = [
  {
    styles: {
      transform: {
        translateX: '-8%',
        translateZ: '-55px',
        rotateY: '-28deg',
        rotateX: '16deg',
        scale: '0.6',
      },
      filter: 'blur(1px)',
    },
    duration: 0,
  },
  {
    styles: {
      transform: {
        translateX: '-6%',
        translateZ: '55px',
        rotateY: '-12deg',
        scale: '0.8',
      },
      filter: 'blur(5px)',
    },
    duration: 10000,
    easing: 'linear',
  },
];

export default function KeyFrameAnimationPage() {
  const { frameStyles } = useAnimateStyles(keyframes, defaultStyles);
  return (
    <div>
      <h1>Keyframes</h1>
      <div className="relative border bg-gray-800 h-[600px] w-[600px] flex items-center justify-center">
        <div className="bg-white h-52 w-52" style={{ ...frameStyles }}></div>
      </div>
    </div>
  );
}
