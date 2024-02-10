import type p5 from "p5";
import { useRef, useState } from "react";

const sketch = (p: p5) => {
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

const Noise = () => {
  const container = useRef(null);
  const [arr] = useState<p5[]>([]);
  let p: p5;

  const start = () => {
    import("p5").then(p5 => {
      if (container.current) {
        p = new p5.default(sketch, container.current);
        arr.push(p);
      }
    });
  };
  const stop = () => {
    if (arr.length > 0) {
      arr.pop()?.remove();
    }
  };
  return (
    <div className="relative flex flex-col  items-center justify-center">
      <button
        className="h-[100px] w-[100px]"
        style={{
          color:
            "rgba(var(--color-text-base), var(--tw-text-opacity)) !important",
        }}
        onClick={stop}
      >
        -1
      </button>
      <button
        className="h-[100px] w-[100px]"
        style={{
          color:
            "rgba(var(--color-text-base), var(--tw-text-opacity)) !important",
        }}
        onClick={start}
      >
        +1
      </button>
      <div
        ref={container}
        id="container"
        className=" min-h-10 flex  w-full cursor-none flex-wrap content-center"
      ></div>
    </div>
  );
};

export default Noise;
