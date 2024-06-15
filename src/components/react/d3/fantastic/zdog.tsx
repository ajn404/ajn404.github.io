import React, { useEffect, useRef } from "react";
import Zdog from "zdog";

export default () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const illo = new Zdog.Illustration({
        element: canvasRef.current,
        dragRotate: true,
      });

      const polygon = new Zdog.Polygon({
        addTo: illo,
        radius: 60,
        sides: 5,
        stroke: 20,
        color: "#EA0",
      });

      const animate = () => {
        polygon.rotate.y += 0.03;
        illo.updateRenderGraph();
        requestAnimationFrame(animate);
      };

      animate();
    }
  }, []);

  return <canvas ref={canvasRef} width={300} height={300}></canvas>;
};
