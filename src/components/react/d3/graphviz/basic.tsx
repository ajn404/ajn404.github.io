import * as d3 from "d3";
import { graphviz } from "d3-graphviz";
import { useEffect, useRef } from "react";

const Template = () => {
  const ref = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const svgElement = graphviz(ref.current).renderDot("digraph  {a -> b}");
    return () => {
      svgElement.remove();
    };
  });
  return <svg ref={ref}></svg>;
};
export default Template;
