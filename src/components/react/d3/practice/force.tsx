import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import data from "./force.json";
import type { SimulationNodeDatum } from "d3";

interface Node {
  id: string;
  group: number;
}

interface Link {
  source: string;
  target: string;
  value: number;
}

interface ForceGraphProps {
  nodes: Node[];
  links: Link[];
}

const ForceGraph: React.FC<ForceGraphProps> = ({ nodes, links }) => {
  const ref = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const svgElement = d3.select(ref.current);
    const width = 928;
    const height = 680;

    const color = d3.scaleOrdinal(d3.schemeCategory10);

    const linkData = data.links.map(d => ({ ...d }));
    const nodeData = data.nodes.map(d => ({ ...d }));

    const simulation = d3
      .forceSimulation(nodeData as SimulationNodeDatum[])
      .force(
        "link",
        d3.forceLink(linkData).id((d: any) => d.id)
      )
      .force("charge", d3.forceManyBody())
      .force("x", d3.forceX())
      .force("y", d3.forceY());

    svgElement
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [-width / 2, -height / 2, width, height])
      .attr("style", "max-width: 100%; height: auto;");

    const link = svgElement
      .append("g")
      .attr("stroke", "#999")
      .attr("stroke-opacity", 0.6)
      .selectAll("line")
      .data(linkData)
      .join("line")
      .attr("stroke-width", d => Math.sqrt(d.value));

    const node = svgElement
      .append("g")
      .attr("stroke", "#fff")
      .attr("stroke-width", 1.5)
      .selectAll("circle")
      .data(nodeData)
      .join("circle")
      .attr("r", 5)
      .attr("fill", d => color(d.group.toString()));

    node.append("title").text(d => d.id);

    const drag = d3
      .drag()
      .on("start", (event: any) => {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        event.subject.fx = event.subject.x;
        event.subject.fy = event.subject.y;
      })
      .on("drag", (event: any) => {
        event.subject.fx = event.x;
        event.subject.fy = event.y;
      })
      .on("end", (event: any) => {
        if (!event.active) simulation.alphaTarget(0);
        event.subject.fx = null;
        event.subject.fy = null;
      });

    node.call(drag as any);
    simulation.on("tick", () => {
      link
        .attr("x1", d => (d.source as any).x)
        .attr("y1", d => (d.source as any).y)
        .attr("x2", d => (d.target as any).x)
        .attr("y2", d => (d.target as any).y);

      node.attr("cx", d => (d as any).x).attr("cy", d => (d as any).y);
    });
    return () => {
      svgElement.selectAll("*").remove();
      simulation.stop();
    };
  }, [nodes, links]);

  return <svg ref={ref}></svg>;
};

export default ForceGraph;
