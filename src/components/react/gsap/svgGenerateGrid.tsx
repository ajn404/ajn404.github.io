import Random from "@utils/random";
import { SVG } from "@svgdotjs/svg.js";
import { useEffect, useRef } from "react";
import { Button } from "@shadcn/ui/button";

export default () => {
  let draw, squareSize, numRows, numCols, clientWidth;
  const containerRef = useRef<HTMLDivElement>(null);

  function drawBlock(x, y) {
    const group = draw.group().addClass("draw-block");
    group
      .rect(clientWidth / numCols, squareSize)
      .fill("white")
      .stroke("black")
      .move(x, y);
  }

  function generateNewGrid() {
    containerRef.current.innerHTML = "";
    drawGrid();
  }

  async function drawGrid() {
    squareSize = 100;
    numRows = Random(4, 8, true);
    numCols = Random(4, 8, true);
    clientWidth = containerRef.current.clientWidth;
    draw = SVG()
      .addTo(containerRef.current)
      .size("100%", "100%")
      .viewbox(`0 0 ${clientWidth} ${numCols * squareSize}`);

    for (let i = 0; i < numRows; i++) {
      for (let j = 0; j < numCols; j++) {
        generateLittleBlock(i, j);
      }
    }
  }

  function generateLittleBlock(i, j) {
    const xPos = (i * clientWidth) / numCols;
    const yPos = j * squareSize;
    drawBlock(xPos, yPos);
  }
  useEffect(() => {
    generateNewGrid();
  }, [containerRef.current]);

  return (
    <>
      <div>
        <Button onClick={generateNewGrid}>generate</Button>
        <div
          className="grid place-items-center mt-10 container w-full max-h-[50vh]"
          ref={containerRef}
        ></div>
      </div>
    </>
  );
};
