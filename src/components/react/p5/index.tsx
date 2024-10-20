import "./index.scss";
import type p5 from "p5";
import { useEffect, useRef, memo, useState } from "react";
import { PlayIcon, StopIcon } from "@radix-ui/react-icons";
import { DownloadIcon } from "lucide-react";

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
  className?: string; // Optional custom className
  style?: React.CSSProperties; // Optional inline styles
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
    className="inline-block text-skin-inverted rounded bg-skin-inverted px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal shadow-[0_4px_9px_-4px_#cbcbcb] transition duration-150 ease-in-out hover:bg-neutral-100 hover:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] focus:bg-neutral-100 focus:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] focus:outline-none focus:ring-0 active:bg-neutral-200 active:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(251,251,251,0.3)] dark:hover:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.1),0_4px_18px_0_rgba(251,251,251,0.05)] dark:focus:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.1),0_4px_18px_0_rgba(251,251,251,0.05)] dark:active:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.1),0_4px_18px_0_rgba(251,251,251,0.05)]"
  >
    {children}
  </button>
);

const P5Canvas = memo(
  ({ sketch, showControls = false, className = "", style = {} }: Props) => {
    const container = useRef<HTMLDivElement>(null);
    const trueContainer = useRef<HTMLDivElement>(null);
    const [p, setP] = useState<p5 | null>(null);
    const [loading, setLoading] = useState(false);
    const doOnceRef = useRef(false); // Manage doOnce locally

    const start = async () => {
      if (container.current) {
        const p5Module = await import("p5");
        setP(new p5Module.default(sketch || defaultSketch, container.current));
      }
    };

    const remove = async () => {
      if (p) {
        p.remove();
        setP(null);
      }
    };

    const stop = () => {
      if (p && p.isLooping()) p.noLoop();
    };

    const begin = async () => {
      if (p && !p.isLooping()) p.loop();
    };

    const init = async () => {
      setLoading(true);
      await start();
      setLoading(false);
    };
    const download = async () => p.saveGif("sketch", 5, { delay: 1 });

    useEffect(() => {
      const obs = new IntersectionObserver(async ([entry]) => {
        if (entry.isIntersecting) {
          if (
            !doOnceRef.current &&
            container.current &&
            !container.current.innerHTML
          ) {
            await init();
            doOnceRef.current = true;
          }
          begin(); // 自动启动
        } else {
          stop();
        }
      });

      if (trueContainer.current) obs.observe(trueContainer.current);

      return () => {
        obs.disconnect();
        remove();
      };
    });

    useEffect(() => {
      init();
    }, [sketch]);

    return (
      <div
        ref={trueContainer}
        className={`p5_container mt-4 relative ${className}`}
        style={style}
      >
        <div
          ref={container}
          className="flex w-full max-w-full justify-center"
        ></div>
        {loading && (
          <div className="absolute inset-o w-full h-full flex justify-center items-center text-2xl">
            加载p5.js中...
          </div>
        )}
        {!loading && showControls && (
          <div className={"flex pt-4 select-none justify-around"}>
            <Button onClick={stop}>
              <StopIcon />
            </Button>
            <Button onClick={begin}>
              <PlayIcon />
            </Button>
            <Button onClick={download}>
              <DownloadIcon />
            </Button>
          </div>
        )}
      </div>
    );
  }
);

export default P5Canvas;
