import { GenericReactHTMLNode } from '@/types';
import { cn, combine } from '@/utils/common';
import { throttle } from 'lodash';
import { RefObject, useLayoutEffect, useRef, useState } from 'react';

export function Cursor({
  externalRef,
  className,
  size = '32px',
  ...props
}: {
  size?: string;
  externalRef: RefObject<HTMLDivElement>;
} & GenericReactHTMLNode) {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [isMoving, setIsMoving] = useState(false);

  let moveDecayTimeout: NodeJS.Timeout;
  const updateMousePosition = throttle((e) => {
    setCursor({ x: e.pageX, y: e.pageY });
    setIsMoving(true);
    clearTimeout(moveDecayTimeout);
    moveDecayTimeout = setTimeout(() => {
      setIsMoving(false);
    }, 1200);
  }, 10);

  useLayoutEffect(() => {
    if (externalRef.current && cursorRef.current) {
      externalRef.current.addEventListener('mousemove', updateMousePosition);
    }
  }, [externalRef, cursorRef]);

  return (
    <div
      ref={cursorRef}
      className={cn(
        'absolute pointer-events-none mix-blend-color-dodge overflow-hidden rounded-full',
        className,
      )}
      style={combine(
        {
          left: 0,
          top: 0,
          transitionDuration: '50ms',
          transitionTimingFunction: 'cubic-bezier(0.33, 1, 0.68, 1)',
        },
        isMoving
          ? {
              opacity: 1,
              transform: `translateX(calc(${cursor.x}px - 50%)) translateY(calc(${cursor.y}px - 50%)) scale(1)`,
              filter: 'blur(0px)',
            }
          : {
              opacity: 0,
              transitionDuration: '1000ms',
              transform: `translateX(calc(${cursor.x}px - 50%)) translateY(calc(${cursor.y}px - 50%)) scale(2)`,
              filter: 'blur(5px)',
            },
      )}
      {...props}
    >
      <div
        className="bg-white flex items-center justify-center hue-rotate-180"
        style={combine({
          width: size,
          height: size,
          transitionTimingFunction: 'cubic-bezier(0.37, 0, 0.63, 1)',
        })}
      ></div>
    </div>
  );
}
