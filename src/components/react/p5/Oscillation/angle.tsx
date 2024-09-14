import type p5 from "p5";
import Basic from "@components/react/p5/index.tsx";

export default () => {
  const sketch = (p: p5) => {
    const setup = () => {
      p.createCanvas(p.windowWidth / 2, 240);
      p.angleMode(p.DEGREES);
      p.frameRate(60);
    };
    const draw = () => {
      p.background(250);
      p.push();
      p.translate(p.width / 2, p.height / 2);
      p.rotate(p.frameCount);
      // center
      p.line(-50, 0, 50, 0);
      //线的两端画两个实心圆
      p.fill(255, 0, 0);
      p.ellipse(-50, 0, 10);
      p.text("开始", -60, 20);

      p.ellipse(50, 0, 10);
      p.text("结束", 40, 20);

      p.fill(0);
      p.text(p.frameCount % 360, -5, 20);
      p.pop();
    };
    const resize = () => {
      p.resizeCanvas(p.windowWidth / 2, 240);
    };
    p.setup = () => {
      setup();
    };
    p.draw = draw;
    p.windowResized = resize;
  };
  return <Basic sketch={sketch} showControls key="p5-angle"></Basic>;
};
