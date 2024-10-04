import type p5 from "p5";
import Basic from "@components/react/p5/index.tsx";
import { useCallback } from "react";

class SpaceShip {
  p: p5;
  position: p5.Vector;
  velocity: p5.Vector;
  acceleration: p5.Vector;
  angle: number = 0;

  constructor(p: p5) {
    this.p = p;
    this.position = p.createVector(p.width / 2, p.height / 2);
    this.velocity = p.createVector(0, 0);
    this.acceleration = p.createVector(0, 0);
    this.angle = 0;
  }

  move() {
    const p = this.p;
    if (p.keyIsPressed) {
      if (p.keyCode === 65) {
        this.acceleration = p.createVector(-0.1, 0);
      } else if (p.keyCode === 68) {
        this.acceleration = p.createVector(0.1, 0);
      } else if (p.keyCode === 87) {
        this.acceleration = p.createVector(0, -0.1);
      } else if (p.keyCode === 83) {
        this.acceleration = p.createVector(0, 0.1);
      } else if (p.keyCode === 90) {
        this.acceleration = this.acceleration.mult(20);
      }
    } else {
      this.acceleration = p.createVector(0, 0);
    }
    this.acceleration.limit(0.1);
    this.velocity.limit(1);
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
  }

  checkEdges() {
    const p = this.p;
    if (this.position.x + 30 > p.width || this.position.x < 15)
      this.velocity.x *= -1;
    if (this.position.y + 30 > p.height || this.position.y < 5)
      this.velocity.y *= -1;
  }

  show() {
    let _ = this.p;
    let angle = _.atan2(this.velocity.y, this.velocity.x);
    _.push();
    _.rectMode(_.CENTER);
    _.fill(0);
    _.stroke(100);
    _.strokeWeight(2);
    _.translate(this.position.x, this.position.y);
    _.rotate(angle);
    _.rect(0, 0, 30, 10);

    _.beginShape();
    _.vertex(0, -10);
    _.vertex(30, 0);
    _.vertex(0, 10);
    _.endShape();

    _.pop();
  }
}

export default () => {
  let spaceShip: SpaceShip;
  const sketch = useCallback((p: p5) => {
    let c = p.random() * 255;
    const setup = () => {
      p.createCanvas(p.windowWidth / 2, p.windowWidth / 3);
      spaceShip = new SpaceShip(p);
    };
    const draw = () => {
      p.background(c);
      spaceShip.move();
      spaceShip.checkEdges();
      spaceShip.show();
    };
    const resize = () => {
      p.resizeCanvas(p.windowWidth / 2, p.windowWidth / 3);
    };
    window.addEventListener("keydown", e => {
      e.stopPropagation();
    });
    p.setup = setup;
    p.draw = draw;
    p.windowResized = resize;
  }, []);
  return (
    <>
      <div id="container">
        <Basic sketch={sketch} showControls></Basic>
      </div>
    </>
  );
};
