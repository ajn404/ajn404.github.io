import * as d3 from "d3";
import { useEffect, useRef } from "react";

export default () => {
  const ref = useRef<SVGSVGElement | null>(null);
  useEffect(() => {
    const svgElement = d3.select(ref.current);
    const g = svgElement
      .attr("width", "100")
      .attr("height", "100")
      .append("path");

    g.attr(
      "d",
      d3.arc()({
        innerRadius: 19,
        outerRadius: 40,
        startAngle: -Math.PI / 2,
        endAngle: Math.PI / 2,
      })
    )
      .attr("fill", "cornflowerblue")
      .attr("style", "transform: translate(50%, 50%)");
  });

  return <svg ref={ref}></svg>;
};
