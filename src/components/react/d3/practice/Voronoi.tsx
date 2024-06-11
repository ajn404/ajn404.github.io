import * as d3 from "d3";
import { useEffect, useRef } from "react";

const Template = () => {
  const ref = useRef<SVGSVGElement | null>(null);
  useEffect(() => {
    const width = 600;
    const height = 200;
    const radius = 32;
    const svgElement = d3
      .select(ref.current)
      .attr("viewBox", [0, 0, width, height])
      .attr("stroke-width", 2);

    const circles = d3.range(20).map(i => ({
      x: Math.random() * (width - radius * 2) + radius,
      y: Math.random() * (height - radius * 2) + radius,
    }));

    let voronoi = d3.Delaunay.from(
      circles,
      d => d.x,
      d => d.y
    ).voronoi([0, 0, width, height]);

    const circle = svgElement
      .append("g")
      .selectAll("circle")
      .data(circles)
      .join("circle")
      .attr("cx", d => d.x)
      .attr("cy", d => d.y)
      .attr("r", radius)
      .attr("fill", (d, i) => d3.schemeCategory10[i % 10]);

    const mesh = svgElement
      .append("path")
      .attr("fill", "none")
      .attr("stroke", "#ccc")
      .attr("stroke-width", 1)
      .attr("d", voronoi.render());

    const cell = svgElement
      .append("g")
      .attr("fill", "none")
      .attr("pointer-events", "all")
      .selectAll("path")
      .data(circles)
      .join("path")
      .attr("d", (d, i) => voronoi.renderCell(i))
      .call(
        d3
          .drag()
          .on("start", (event, d) =>
            circle
              .filter(p => p === d)
              .raise()
              .attr("stroke", "black")
          )
          .on(
            "drag",
            (event, d) => (((d as any).x = event.x), ((d as any).y = event.y))
          )
          .on("end", (event, d) =>
            circle.filter(p => p === d).attr("stroke", null)
          )
          .on("start.update drag.update end.update", update) as any
      );

    function update() {
      voronoi = d3.Delaunay.from(
        circles,
        d => d.x,
        d => d.y
      ).voronoi([0, 0, width, height]);
      circle.attr("cx", d => d.x).attr("cy", d => d.y);
      cell.attr("d", (d, i) => voronoi.renderCell(i));
      mesh.attr("d", voronoi.render());
    }

    return () => {
      svgElement.selectAll("*").remove();
    };
  });

  return <svg ref={ref}></svg>;
};

export default Template;
