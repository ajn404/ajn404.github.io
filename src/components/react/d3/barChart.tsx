import * as d3 from "d3";
import { useEffect, useRef } from "react";
import "./d3.css";
export default () => {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const divElement = d3.select(ref.current);
    divElement
      .selectAll("div")
      .data([4, 8, 15, 16, 23, 42])
      .enter()
      .append("div")
      .style("height", d => `${d}px`);
    // .text(d => d)
    return () => {
      divElement.remove();
    };
  });

  return <div id="barChart" ref={ref}></div>;
};
