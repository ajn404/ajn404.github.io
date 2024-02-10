import { useEffect, useRef } from "react";
import rough from "roughjs";
export default () => {
  const svg = useRef<SVGSVGElement>(null);
  useEffect(() => {
    const rc = rough.svg(svg.current);
    svg.current.appendChild(rc.line(60, 60, 190, 60));
    svg.current.appendChild(rc.rectangle(10, 10, 100, 100));
    svg.current.appendChild(
      rc.rectangle(140, 10, 100, 100, {
        fill: "rgba(255,0,0,0.2)",
        fillStyle: "solid",
        roughness: 2,
      })
    );
  });
  return (
    <>
      <div className="bg-[#fff]">
        <svg ref={svg} className=""></svg>
      </div>
    </>
  );
};
