import * as d3 from "d3";
import { useEffect, useRef } from "react";

const Template = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const divElement = d3.select(ref.current);

    const colorMap = d3.interpolateRgb(d3.rgb("#d6e685"), d3.rgb("#1e6823"));

    divElement
      .selectAll("div")
      .data([0.2, 0.4, 0, 0, 0.13, 0.92, 1])
      .enter()
      .append("div")
      .style("background-color", d => {
        return d == 0 ? "#eee" : colorMap(d);
      });
    return () => {
      divElement.remove();
    };
  });

  return <div id="ContributionChart" ref={ref}></div>;
};

export default Template;
