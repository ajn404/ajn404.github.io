import React, { useEffect, useRef } from "react";
import Delatin from "delatin";

interface Props {
  data: number[][];
  width: number;
  height: number;
}

const DelatinComponent: React.FC<Props> = ({ data, width, height }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const context = canvasRef.current.getContext("2d");
      if (context) {
        // Flatten the height data and convert it to a 1D array
        const flattenedData = data.flat();

        // Create a Delatin instance with the flattened height data
        const tin = new Delatin(flattenedData, data[0].length, data.length);

        // Clear the canvas
        context.clearRect(0, 0, width, height);

        // Draw the triangles
        context.strokeStyle = "black";
        context.lineWidth = 1;
        context.fillStyle = "lightblue";

        const { coords, triangles } = tin;

        for (let i = 0; i < triangles.length; i += 3) {
          const p0 = triangles[i];
          const p1 = triangles[i + 1];
          const p2 = triangles[i + 2];

          const x0 = coords[2 * p0];
          const y0 = coords[2 * p0 + 1];
          const x1 = coords[2 * p1];
          const y1 = coords[2 * p1 + 1];
          const x2 = coords[2 * p2];
          const y2 = coords[2 * p2 + 1];

          // Scale coordinates to fit canvas size
          const scaleX = width / (data[0].length - 1);
          const scaleY = height / (data.length - 1);

          context.beginPath();
          context.moveTo(x0 * scaleX, y0 * scaleY);
          context.lineTo(x1 * scaleX, y1 * scaleY);
          context.lineTo(x2 * scaleX, y2 * scaleY);
          context.closePath();
          context.fill();
          context.stroke();
        }
      }
    }
  }, [data, width, height]);

  return <canvas ref={canvasRef} width={width} height={height}></canvas>;
};

// Example height data (simple grid with some height variations)
const heightData = [
  [100, 105, 110],
  [95, 100, 105],
  [90, 95, 100],
];

export default () => (
  <DelatinComponent data={heightData} width={300} height={300} />
);
