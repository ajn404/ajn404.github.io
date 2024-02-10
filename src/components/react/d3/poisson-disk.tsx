//@ts-nocheck

import * as d3 from "d3";
import { useEffect, useRef, useState } from "react";
export default () => {
  const ref = useRef<SVGSVGElement | null>(null);
  let [svg, setSvg] = useState();
  const [width, setWidth] = useState(900);
  const [height, setHeight] = useState(150);

  function* poissonDiscSampler(width, height, radius) {
    const k = 30; // maximum number of samples before rejection
    const radius2 = radius * radius;
    const radius2_3 = 3 * radius2;
    const cellSize = radius * Math.SQRT1_2;
    const gridWidth = Math.ceil(width / cellSize);
    const gridHeight = Math.ceil(height / cellSize);
    const grid = new Array(gridWidth * gridHeight);
    const queue = [];

    // Pick the first sample.
    yield sample(
      width / 2 + Math.random() * radius,
      height / 2 + Math.random() * radius,
      null
    );

    // Pick a random existing sample from the queue.
    pick: while (queue.length) {
      const i = (Math.random() * queue.length) | 0;
      const parent = queue[i];

      // Make a new candidate between [radius, 2 * radius] from the existing sample.
      for (let j = 0; j < k; ++j) {
        const a = 2 * Math.PI * Math.random();
        const r = Math.sqrt(Math.random() * radius2_3 + radius2);
        const x = parent[0] + r * Math.cos(a);
        const y = parent[1] + r * Math.sin(a);

        // Accept candidates that are inside the allowed extent
        // and farther than 2 * radius to all existing samples.
        if (0 <= x && x < width && 0 <= y && y < height && far(x, y)) {
          yield sample(x, y, parent);
          continue pick;
        }
      }

      // If none of k candidates were accepted, remove it from the queue.
      const r = queue.pop();
      if (i < queue.length) queue[i] = r;
    }

    function far(x, y) {
      const i = (x / cellSize) | 0;
      const j = (y / cellSize) | 0;
      const i0 = Math.max(i - 2, 0);
      const j0 = Math.max(j - 2, 0);
      const i1 = Math.min(i + 3, gridWidth);
      const j1 = Math.min(j + 3, gridHeight);
      for (let j = j0; j < j1; ++j) {
        const o = j * gridWidth;
        for (let i = i0; i < i1; ++i) {
          const s = grid[o + i];
          if (s) {
            const dx = s[0] - x;
            const dy = s[1] - y;
            if (dx * dx + dy * dy < radius2) return false;
          }
        }
      }
      return true;
    }

    function sample(x, y, parent) {
      const s = (grid[gridWidth * ((y / cellSize) | 0) + ((x / cellSize) | 0)] =
        [x, y]);
      s.parent = parent;
      s.depth = parent ? parent.depth + 1 : 0;
      queue.push(s);
      return s;
    }
  }

  const randomColor = (): string => {
    const hue = Math.floor(Math.random() * 360);
    const saturation = Math.floor(Math.random() * 30) + 70;
    const lightness = Math.floor(Math.random() * 70);
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  };

  const play = function* () {
    const duration = 150;
    let svg = d3.select(ref.current);
    setSvg(d3.select(ref.current));
    console.log(svg);

    svg.attr("viewBox", [0, 0, width, height]).attr("stroke", "currentColor");
    yield svg.node();
    let i = 0;
    for (const sample of poissonDiscSampler(width, height, 8)) {
      if (sample.parent) {
        svg
          .append("line")
          .attr("x1", sample.parent[0])
          .attr("y1", sample.parent[1])
          .attr("x2", sample.parent[0])
          .attr("y2", sample.parent[1])
          .attr("stroke", randomColor())
          .transition()
          .ease(d3.easeLinear)
          .delay(sample.depth * duration)
          .duration(duration)
          .attr("x2", sample[0])
          .attr("y2", sample[1])
          .attr("stroke", randomColor());
        if (++i % 50 === 0) {
          yield svg.node();
        }
      }
    }
  };
  let x;
  const [started, setStarted] = useState(false);

  const click = function () {
    while (!x.next().done) {
      x?.next();
    }

    setStarted(true);
  };
  const restart = function () {
    svg.selectAll("line").remove();
    click();
  };
  useEffect(() => {
    x = play();
    return () => {};
  });

  return (
    <>
      <svg
        className=" h-min-full pointer-events-none absolute inset-x-0 inset-y-0 w-full opacity-50"
        ref={ref}
      ></svg>
      <button
        type="button"
        onClick={click}
        className="bg-blue-500 text-neutral-50 hover:bg-blue-600 focus:bg-blue-800 active:bg-blue-700 inline-block rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal shadow-[0_4px_9px_-4px_rgba(51,45,45,0.7)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)]"
      >
        start
      </button>
      <button
        type="button"
        onClick={restart}
        className="bg-blue-500 text-neutral-50 hover:bg-blue-600 focus:bg-blue-800 active:bg-blue-700 inline-block rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal shadow-[0_4px_9px_-4px_rgba(51,45,45,0.7)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)]"
      >
        restart
      </button>
      <div>
        <label
          htmlFor="customRange1"
          className="text-neutral-700 dark:text-neutral-200 mb-2 inline-block"
        >
          Width
        </label>
        <input
          type="range"
          value={width.toString()}
          onChange={e => {
            setWidth(Number(e.target.value));
            if (started) restart();
            else click();
          }}
          min="0"
          max="2000"
          className="border-transparent h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-[#95f595]"
          id="customRange1"
        />
      </div>

      <div>
        <label
          htmlFor="customRange1"
          className="text-neutral-700 dark:text-neutral-200 mb-2 inline-block"
        >
          Height
        </label>
        <input
          type="range"
          value={height.toString()}
          onChange={e => {
            setHeight(Number(e.target.value));
            if (started) restart();
            else click();
          }}
          min="0"
          max="2000"
          className="border-transparent h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-[#95f595]"
          id="customRange1"
        />
      </div>
    </>
  );
};
