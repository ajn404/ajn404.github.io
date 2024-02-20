import type p5 from "p5";
import { useEffect, useRef, memo } from "react";

type Sketch = (p: p5) => void;

const defaultSketch: Sketch = (p: p5) => {
  let xoff = 0.0;
  p.setup = () => {
    p.createCanvas(100, 100);
    p.frameRate(60);
  };
  p.draw = () => {
    let noise = p.noise(xoff) * (p.width - 50);
    p.background(255);
    p.noStroke();
    p.fill(34, 39, 54);
    xoff += 0.01;
    p.ellipse(noise, p.height / 2, 25, 25);
  };
};

interface Props {
  sketch: Sketch;
  showControls?: boolean; // defaults to false
  showSetBackground?: boolean; // defaults to false
}

export default memo(({ sketch, showControls }: Props) => {
  const container = useRef(null);
  let p: p5;

  const start = async () => {
    if (container.current) {
      const p5 = await import("p5");
      const P5 = p5.default;
      p = new P5(sketch || defaultSketch, container.current);
      container.current.style.minHeight = p.height + "px";
    }
  };
  const remove = () => p && p.remove();
  const stop = () => p.isLooping() && p.noLoop();
  const begin = () => !p.isLooping() && p.loop();
  const init = async () => {
    p && remove();
    await start();
  };

  useEffect(() => {
    (async () => {
      await init();
      const obs = new IntersectionObserver(tar => {
        !tar[0].isIntersecting && stop();
        tar[0].isIntersecting && !showControls && begin(); //没有按钮自动启动
      });
      obs.observe(container.current);
    })();
    return remove;
  });

  return (
    <>
      <div className="p5_container mt-4">
        <div
          ref={container}
          className={`flex w-full max-w-full justify-center`}
        ></div>
        {/* 控制按钮 */}
        {showControls && (
          <div className="flex pt-4 justify-around">
            <button
              type="button"
              onClick={stop}
              className="inline-block text-skin-inverted rounded bg-skin-inverted px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal  shadow-[0_4px_9px_-4px_#cbcbcb] transition duration-150 ease-in-out hover:bg-neutral-100 hover:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] focus:bg-neutral-100 focus:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] focus:outline-none focus:ring-0 active:bg-neutral-200 active:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(251,251,251,0.3)] dark:hover:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.1),0_4px_18px_0_rgba(251,251,251,0.05)] dark:focus:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.1),0_4px_18px_0_rgba(251,251,251,0.05)] dark:active:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.1),0_4px_18px_0_rgba(251,251,251,0.05)]"
            >
              stop
            </button>

            <button
              type="button"
              onClick={begin}
              className="inline-block text-skin-inverted rounded bg-skin-green  px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal  shadow-[0_4px_9px_-4px_#cbcbcb] transition duration-150 ease-in-out hover:bg-neutral-100 hover:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] focus:bg-neutral-100 focus:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] focus:outline-none focus:ring-0 active:bg-neutral-200 active:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(251,251,251,0.3)] dark:hover:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.1),0_4px_18px_0_rgba(251,251,251,0.05)] dark:focus:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.1),0_4px_18px_0_rgba(251,251,251,0.05)] dark:active:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.1),0_4px_18px_0_rgba(251,251,251,0.05)]"
            >
              begin
            </button>
            <button
              type="button"
              className="inline-block bg-skin-card text-skin-base rounded  px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal  shadow-[0_4px_9px_-4px_rgba(51,45,45,0.7)] transition duration-150 ease-in-out hover:bg-neutral-800 hover:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:bg-neutral-800 focus:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:outline-none focus:ring-0 active:bg-neutral-900 active:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] dark:bg-neutral-900 dark:shadow-[0_4px_9px_-4px_#030202] dark:hover:bg-neutral-900 dark:hover:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)] dark:focus:bg-neutral-900 dark:focus:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)] dark:active:bg-neutral-900 dark:active:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)]"
              onClick={init}
            >
              init
            </button>
          </div>
        )}
      </div>
    </>
  );
});
