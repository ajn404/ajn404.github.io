import type p5 from "p5";
import { useEffect, useRef, memo, useState } from "react";

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
}

const Button = ({
  onClick,
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
}) => (
  <button
    type="button"
    onClick={onClick}
    className="inline-block text-skin-inverted rounded bg-skin-inverted px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal  shadow-[0_4px_9px_-4px_#cbcbcb] transition duration-150 ease-in-out hover:bg-neutral-100 hover:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] focus:bg-neutral-100 focus:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] focus:outline-none focus:ring-0 active:bg-neutral-200 active:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(251,251,251,0.3)] dark:hover:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.1),0_4px_18px_0_rgba(251,251,251,0.05)] dark:focus:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.1),0_4px_18px_0_rgba(251,251,251,0.05)] dark:active:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.1),0_4px_18px_0_rgba(251,251,251,0.05)]"
  >
    {children}
  </button>
);

const P5Canvas = memo(({ sketch, showControls = false }: Props) => {
  console.log("rendering");

  const container = useRef<HTMLDivElement>(null);
  const trueContainer = useRef<HTMLDivElement>(null);

  let [p, setP] = useState<p5>(null);
  let P5;
  let [loading, setLoading] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const start = async () => {
    if (container.current) {
      const p5 = await import("p5");
      P5 = p5.default;
      setP(new P5(sketch || defaultSketch, container.current));
      setLoading(false);
    }
  };

  const remove = () => p && p.remove();
  const stop = () => p && p.isLooping() && p.noLoop();
  const begin = () => p && !p.isLooping() && p.loop();
  const init = async () => {
    console.log("init");

    setLoading(true);
    p && remove();
    await start();
  };

  const toggleFullscreen = async () => {
    console.log("toggle fullscreen");

    if (trueContainer.current && !isFullscreen) {
      if (trueContainer.current.requestFullscreen) {
        trueContainer.current.requestFullscreen();
        trueContainer.current.style.backgroundColor = "black";
      }
      await init();
      setIsFullscreen(true);
    } else if (
      trueContainer.current &&
      isFullscreen &&
      document.fullscreenElement
    ) {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
      await init();
      trueContainer.current.style.backgroundColor = "";
      setIsFullscreen(false);
    } else {
      await init();
      trueContainer.current.style.backgroundColor = "";
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    if (p && isFullscreen) {
      p.resizeCanvas(window.innerWidth, window.innerHeight - 60);
      p.windowResized = async () => {
        await init();
        p.resizeCanvas(window.innerWidth, window.innerHeight - 60);
      };
    }
    const obs = new IntersectionObserver(([entry]) => {
      entry.isIntersecting && !showControls && begin(); //没有按钮自动启动
      !entry.isIntersecting && stop();
    });
    obs.observe(container.current);
    return () => {
      obs.disconnect();
      remove();
    };
  }, [isFullscreen, p]);

  const handleFullscreenChange = () => {
    setIsFullscreen(!!document.fullscreenElement);
  };

  useEffect(() => {
    console.log("useEffect2");
    (async () => {
      await init();
      document.addEventListener("fullscreenchange", handleFullscreenChange);
      container.current.style.minHeight = (p?.height || "0") + "px";
      trueContainer.current.style.backgroundColor = "";
    })();
    return document.removeEventListener(
      "fullscreenchange",
      handleFullscreenChange
    );
  }, []);

  return (
    <>
      <div ref={trueContainer} className="p5_container mt-4">
        <div
          ref={container}
          className="flex w-full max-w-full justify-center"
        ></div>
        {/* 控制按钮 */}
        {showControls && (
          <div className="flex pt-4 select-none justify-around">
            <Button onClick={stop}>stop</Button>
            <Button onClick={begin}>begin</Button>
            <Button onClick={init}>init</Button>
            <Button onClick={toggleFullscreen}>
              {isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
            </Button>
          </div>
        )}
      </div>
    </>
  );
});

export default P5Canvas;
