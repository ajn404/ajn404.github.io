import Basic from "@components/react/p5/index.tsx";
import { Slider } from "@shadcn/ui/slider";
import { useDebounce } from "@uidotdev/usehooks";
import { cn } from "@utils/utils";
import type p5 from "p5";
import { useCallback, useState } from "react";

class MouseMover {
  position: p5.Vector;
  velocity: p5.Vector;
  circleRadius: number = 20;
  acceleration: p5.Vector;
  p: p5;
  color: p5.Color;
  trend: number = 0.2;
  constructor(p: p5) {
    this.circleRadius = p.random(1, 20);
    //球越大,趋势越小
    this.trend = p.map(this.circleRadius, 1, 20, 1, 0.5);
    this.position = p.createVector(
      p.random(this.circleRadius, p.width - this.circleRadius),
      p.random(this.circleRadius + 1, p.height - this.circleRadius - 1)
    );

    this.velocity = p.createVector(p.random(-2, 2), p.random(-2, 2));
    this.p = p;
    this.color = p.color(p.random(0, 255), p.random(0, 255), p.random(0, 255));
  }

  move() {
    let mouse = this.p.createVector(this.p.mouseX, this.p.mouseY);
    let dir = mouse;
    dir.sub(this.position);
    //靠近的趋势
    dir.setMag(this.trend);

    // this.acceleration = this.p.createVector(this.p.random(-0.01, 0.01), this.p.random(-0.01, 0.01));
    this.acceleration = dir;
    // this.acceleration.mult(this.p.random(2));
    this.velocity.limit(10);

    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
  }

  show() {
    const p = this.p;
    p.stroke(0);
    p.fill(this.color);
    p.strokeWeight(2);
    p.circle(this.position.x, this.position.y, this.circleRadius * 2);
  }

  checkEdges() {
    const p = this.p;
    if (
      this.position.x + this.circleRadius > p.width ||
      this.position.x < this.circleRadius
    ) {
      this.velocity.x *= -1;
    }
    if (
      this.position.y + this.circleRadius > p.height ||
      this.position.y < this.circleRadius
    ) {
      this.velocity.y *= -1;
    }
  }
}

export default () => {
  let [num, setNum] = useState(1000);
  let debounceNum = useDebounce(num, 200);
  const sketch = useCallback(
    (p: p5) => {
      let movers: MouseMover[];
      const setup = () => {
        p.createCanvas(p.windowWidth / 2, 240);
        movers = new Array(debounceNum).fill(0).map(() => new MouseMover(p));
        p.frameRate(120);
      };
      const draw = () => {
        p.background(255);
        movers.forEach(m => {
          if (
            p.mouseX > 0 &&
            p.mouseX < p.width &&
            p.mouseY > 0 &&
            p.mouseY < p.height
          ) {
            m.move();
            m.checkEdges();
            // p.background(255, 0, 0);
          }
          m.show();
        });
      };
      const resize = () => p.setup();
      p.setup = setup;
      p.draw = draw;
      p.windowResized = resize;
    },
    [debounceNum]
  );
  return (
    <>
      slider值num:{num}
      <br />
      小球数量debounceNum:{debounceNum}
      <br />
      <Slider
        defaultValue={[50]}
        max={1000}
        min={1}
        step={1}
        className={cn("w-[100%] m-4")}
        onValueChange={value => {
          setNum(value[0]);
        }}
        value={[num]}
      />
      <Basic sketch={sketch} showControls></Basic>
    </>
  );
};
