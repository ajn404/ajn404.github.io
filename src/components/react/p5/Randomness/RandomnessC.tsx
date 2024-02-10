import type p5 from "p5";
import Basic from "../index";

export default () => {
  const sketch = (p: p5) => {
    const len = 20;
    const speed = 1;
    let list = new Array(len).fill(0);
    p.setup = () => {
      p.createCanvas(p.windowWidth / 2, 240);
      p.background(255);
    };
    p.windowResized = () => {
      p.setup();
    };
    p.draw = () => {
      list[p.floor(p.random(len))] += speed;
      p.fill(0);
      p.stroke(255);
      let w = p.width / len;
      for (let x = 0; x < len; x++) {
        p.rect(x * w, p.height - list[x], w - 2, list[x]);
      }
    };
  };
  return (
    <>
      <Basic sketch={sketch} showControls={true}></Basic>
    </>
  );
};
