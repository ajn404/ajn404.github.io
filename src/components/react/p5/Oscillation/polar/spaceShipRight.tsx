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
    if (p.keyIsPressed && [37, 38, 40, 39, 90].includes(p.keyCode)) {
      if (p.keyCode === 37) {
        this.acceleration = p.createVector(-0.1, 0);
      } else if (p.keyCode === 39) {
        this.acceleration = p.createVector(0.1, 0);
      } else if (p.keyCode === 38) {
        this.acceleration = p.createVector(0, -0.1);
      } else if (p.keyCode === 40) {
        this.acceleration = p.createVector(0, 0.1);
      } else {
        this.acceleration = this.acceleration.mult(2);
      }
    } else {
      let x = p.map(
        p.noise(this.position.x, this.position.y),
        0,
        1,
        -p.PI,
        p.PI
      );
      let y = p.map(
        p.noise(this.position.y, this.position.x),
        0,
        1,
        p.PI,
        -p.PI
      );
      this.acceleration = p.createVector(x, y);
    }

    this.acceleration.limit(0.1);
    this.velocity.limit(1);
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
  }

  checkEdges() {
    const p = this.p;
    if (this.position.x + 15 > p.width || this.position.x < 15) {
      this.velocity.x *= -1;
    }
    if (this.position.y + 5 > p.height || this.position.y < 5) {
      this.velocity.y *= -1;
    }
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
    _.pop();
  }
}

export default () => {
  let spaceShip: SpaceShip;

  const sketch = useCallback((p: p5) => {
    const setup = () => {
      p.createCanvas(p.windowWidth / 2, p.windowWidth / 3);
      spaceShip = new SpaceShip(p);
      p.background(255);
    };
    const draw = () => {
      spaceShip.move();
      spaceShip.checkEdges();
      spaceShip.show();
    };
    const resize = () => {
      p.resizeCanvas(p.windowWidth / 2, p.windowWidth / 3);
    };

    window.addEventListener("keydown", e => {
      e.preventDefault();
    });

    p.setup = setup;
    p.draw = draw;
    p.windowResized = resize;
  }, []);
  return <Basic sketch={sketch} showControls></Basic>;
};
