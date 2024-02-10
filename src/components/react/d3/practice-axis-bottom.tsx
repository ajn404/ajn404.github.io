import * as d3 from "d3";
import { useEffect, useRef } from "react";

const Template = () => {
  const ref = useRef<SVGSVGElement | null>(null);
  useEffect(() => {
    const xScale = d3.scaleLinear().domain([0, 100]).range([10, 290]);
    const svgElement = d3
      .select(ref.current)
      .attr("style", "width:100%;max-height:4em");
    const axisGenerator = d3.axisBottom(xScale);
    svgElement.append("g").call(axisGenerator);
    return () => {
      svgElement.remove();
    };
  });
  return <svg ref={ref}></svg>;
};
export default Template;
