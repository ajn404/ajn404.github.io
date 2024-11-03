import * as d3 from "d3";
import { useEffect, useRef } from "react";

const Template = () => {
  const ref = useRef<SVGSVGElement | null>(null);
  useEffect(() => {
    const octahedronSize = 100;
    const sphereRadius = 50;
    const width = window.innerWidth;
    const height = 200;
    const svg = d3
      .select(ref.current)
      .attr("width", width)
      .attr("height", height);
    function drawShapes(time) {
      svg.selectAll("*").remove(); // 清空之前的图形

      const d = -Math.sin(time / 1000) * 25 + 50; // 动态调整八面体的位置

      // 绘制八面体
      svg
        .append("polygon")
        .attr(
          "points",
          [
            `${width / 2},${height / 2 - octahedronSize}`,
            `${width / 2 - octahedronSize},${height / 2}`,
            `${width / 2},${height / 2 + octahedronSize}`,
            `${width / 2 + octahedronSize},${height / 2}`,
          ].join(" ")
        )
        .attr("fill", "rgba(0, 0, 255, 0.5)") // 半透明的蓝色
        .attr("stroke", "blue")
        .attr("stroke-width", 2);

      // 绘制球体
      svg
        .append("circle")
        .attr("cx", width / 2 + d)
        .attr("cy", height / 2)
        .attr("r", sphereRadius)
        .attr("fill", "rgba(255, 255, 0, 0.5)") // 半透明的黄色
        .attr("stroke", "yellow")
        .attr("stroke-width", 2);

      // 计算融合效果
      const overlapX = Math.abs(d) < octahedronSize + sphereRadius ? d : 0;
      const overlapY =
        Math.abs(d) < octahedronSize + sphereRadius ? height / 2 : 0;

      // 绘制融合区域
      svg
        .append("circle")
        .attr("cx", width / 2 + overlapX)
        .attr("cy", overlapY)
        .attr("r", Math.min(sphereRadius, octahedronSize) * 0.5) // 融合区域的半径
        .attr("fill", "rgba(128, 128, 255, 0.5)"); // 混合颜色

      requestAnimationFrame(drawShapes);
    }

    drawShapes(0); // 启动动画
    return () => {
      svg.remove();
    };
  });

  return <svg ref={ref}></svg>;
};

export default Template;
