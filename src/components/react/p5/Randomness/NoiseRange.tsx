import type p5 from "p5";
import Basic from "@components/react/p5/index.tsx";

export default () => {
  const sketch = (p: p5) => {
    const setup = () => {
      p.createCanvas(p.windowWidth / 2, 240);
      p.frameRate(60);
    };
    let time = 0;
    const draw = () => {
      p.background(255);
      time = p.frameCount / 60;
      let noise = p.noise(time);
      let x = p.map(noise, 0, 1, 0, p.width);
      p.text(
        "😊😭😠😑😊😭😠😑😊😭😠😑😊😭😠😑😊😭😠😑😊😭😠😑😊😭😠😑",
        x - 16 * 14,
        p.height / 2
      );
    };
    const resize = () => {
      p.resizeCanvas(p.windowWidth / 2, 240);
    };
    p.setup = setup;
    p.draw = draw;
    p.windowResized = resize;
  };
  return <Basic sketch={sketch} showControls></Basic>;
};
