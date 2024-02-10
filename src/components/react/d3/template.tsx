import * as d3 from "d3";
import { useEffect, useRef } from "react";

const Template = () => {
  const ref = useRef<SVGSVGElement | null>(null);
  useEffect(() => {
    const svgElement = d3.select(ref.current);

    return () => {
      svgElement.remove();
    };
  });

  return <svg ref={ref}></svg>;
};

export default Template;
