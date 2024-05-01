import { useEffect, useState } from 'react';

type FrameLoop = {
  /** Elapsed time since the first frame execution. Number in seconds,  */
  time: number;
  /** Index number of the frame */
  tick: number;
};

type Options = {
  /** FPS that the loop should have */
  refreshRate?: number;
};

export const useRenderFrameLoop = (options?: Options) => {
  const { refreshRate = 60 } = options || {};
  const [state, setState] = useState<FrameLoop>({
    time: 0,
    tick: 0,
  });

  useEffect(() => {
    let rafRef: ReturnType<typeof window.requestAnimationFrame>;
    let startTime: number;
    let lastTime: number;
    let interval = 1000 / refreshRate;
    lastTime = -interval;
    const loop: FrameRequestCallback = (t) => {
      rafRef = window.requestAnimationFrame(loop);
      if (!startTime) startTime = t;
      if (t - lastTime > interval) {
        lastTime = t;
        const elapsedTime = t - startTime;
        setState((state) => ({
          time: elapsedTime,
          tick: state.tick + 1,
        }));
      }
    };
    rafRef = window.requestAnimationFrame(loop);

    // cleanup
    return () => {
      if (rafRef) window.cancelAnimationFrame(rafRef);
    };
  }, [refreshRate]);

  return state;
};
