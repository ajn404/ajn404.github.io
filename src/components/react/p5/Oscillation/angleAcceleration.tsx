import type p5 from "p5";
import Basic from "@components/react/p5/index.tsx";
import { Input } from "@shadcn/ui/input";
import { useCallback, useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";

export default () => {
  // State for angle acceleration and debounce it
  const [angleAcceleration, setAngleAcceleration] = useState(0.001);
  const debouncedAngleAcceleration = useDebounce(angleAcceleration, 100); // Debounce with 100ms delay

  let angleVelocity = 0;
  let angle = 0;

  const sketch = useCallback(
    (p: p5) => {
      const setup = () => {
        p.createCanvas(p.windowWidth / 2, 240);
        p.angleMode(p.DEGREES);
        p.frameRate(60);
      };

      const draw = () => {
        p.background(250);
        p.push();
        p.translate(p.width / 2, p.height / 2);
        p.rotate(angle);
        // center
        p.line(-50, 0, 50, 0);
        // Line ends with filled circles
        p.fill(255, 0, 0);

        p.ellipse(-50, 0, 10);
        p.text("开始", -60, 20);

        p.ellipse(50, 0, 10);
        p.text("结束", 40, 20);

        p.fill(0);
        p.text((angle % 360).toFixed(2), -5, 20);
        p.pop();

        angleVelocity += debouncedAngleAcceleration;
        angle += angleVelocity;
      };

      const resize = () => {
        p.resizeCanvas(p.windowWidth / 2, 240);
      };

      p.setup = () => {
        setup();
      };
      p.draw = draw;
      p.windowResized = resize;
    },
    [debouncedAngleAcceleration]
  );

  return (
    <>
      <Basic sketch={sketch} showControls key="p5-angle"></Basic>
      <Input
        type="range"
        min="0"
        max="0.1"
        step="0.001"
        value={angleAcceleration}
        onChange={e => {
          setAngleAcceleration(Number(e.target.value));
        }}
      ></Input>
      <div>
        <label htmlFor="text">加速度</label>
        <span id="text">{debouncedAngleAcceleration}</span>
      </div>
    </>
  );
};
