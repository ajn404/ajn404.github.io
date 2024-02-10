import type p5 from "p5";
import Basic from "../index";

export default () => {
  const sketch = (p: p5) => {
    class Walker {
      x: number;
      y: number;
      constructor() {
        this.x = p.width / 2;
        this.y = p.height / 2;
      }
      show() {
        p.stroke(0);
        p.point(this.x, this.y);
      }
      step() {
        const choice = p.floor(p.random(4));
        switch (choice) {
          case 0:
            this.x++;
            break;
          case 1:
            this.x--;
            break;
          case 2:
            this.y++;
            break;
          case 3:
            this.y--;
            break;
          default:
            break;
        }
      }
    }
    let walker;
    const setup = () => {
      p.createCanvas(p.windowWidth / 2, 240);
      walker = new Walker();
      p.background(255);
    };
    const draw = () => {
      walker.step();
      walker.show();
    };
    p.windowResized = () => {
      p.setup();
    };
    p.setup = setup;
    p.draw = draw;
  };
  return <Basic sketch={sketch}></Basic>;
};
