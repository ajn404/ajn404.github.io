import * as d3 from "d3";
import type { SimulationNodeDatum, SimulationLinkDatum } from "d3";
import { useEffect, useRef } from "react";
import data from "./graph.json";
const Circle = () => {
  const ref = useRef<SVGSVGElement | null>(null);
  useEffect(() => {
    const svgElement = d3.select(ref.current);
    const width = 928;
    const height = 300;
    let root = d3.hierarchy(data);
    const links = root.links();
    const nodes = root.descendants();
    function dragstarted(event: any, d: any) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }
    function dragged(event: any, d: any) {
      d.fx = event.x;
      d.fy = event.y;
    }
    function dragended(event: any, d: any) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }
    const drag: any = d3
      .drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended);
    const simulation = d3
      .forceSimulation(nodes as SimulationNodeDatum[])
      .force(
        "link",
        d3
          .forceLink(links as SimulationLinkDatum<any>[])
          .id((d: any) => d.id)
          .distance(300)
          .strength(0.5)
      )
      .force("charge", d3.forceManyBody().strength(-50))
      .force("x", d3.forceX())
      .force("y", d3.forceY());
    svgElement
      .attr("viewBox", [-width / 2, -height / 2, width, height])
      .attr(
        "style",
        `width:${100}vw;max-width: 100%; height: calc( 100vh - 100px);pointer-events:none;`
      );
    const link = svgElement
      .append("g")
      .attr("stroke", "#999")
      .attr("stroke-opacity", 0.6)
      .selectAll("line")
      .data(links)
      .join("line");
    const node = svgElement
      .append("g")
      .attr("fill", "#fff")
      .attr("stroke", "#000")
      .attr("style", "pointer-events: auto;")
      .attr("stroke-width", 1.5)
      .selectAll("circle")
      .data(nodes)
      .join("circle")
      .attr("fill", (d: any) => (d.children ? null : "#000 "))
      .attr("stroke", (d: any) => (d.children ? null : "#fff"))
      .attr("r", 5.5)
      .call(drag, simulation);

    const text = svgElement
      .append("g")
      .attr("class", "text")
      .selectAll("text")
      .data(nodes)
      .enter()
      .append("text")
      .text(d => d.data.name)
      .attr("style", "font-size:0.5em");
    simulation.on("tick", () => {
      link
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y);
      node.attr("cx", (d: any) => d.x).attr("cy", (d: any) => d.y);

      text.attr("x", (d: any) => d.x + 6).attr("y", (d: any) => d.y);
    });
    node.append("title").text((d: any) => d.data.name);
  });

  return <svg ref={ref}></svg>;
};

export default Circle;
