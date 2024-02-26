// motion 101

import type p5 from "p5";

export class Mover {
  position: p5.Vector;
  velocity: p5.Vector;
  circleRadius: number = 20;
  acceleration: p5.Vector;
  p: p5;
  color: p5.Color;
  name: string = "mover";
  constructor(p: p5) {
    this.position = p.createVector(
      p.random(this.circleRadius, p.width - this.circleRadius),
      p.random(this.circleRadius + 1, p.height - this.circleRadius - 1)
    );
    this.velocity = p.createVector(p.random(-2, 2), p.random(-2, 2));
    // this.acceleration = p.createVector(-0.001, 0.01);
    // this.velocity.limit(10);
    this.p = p;
    this.color = p.color(p.random(0, 255), p.random(0, 255), p.random(0, 255));
  }

  move() {
    this.acceleration = this.p.createVector(
      this.p.random(-0.01, 0.01),
      this.p.random(-0.01, 0.01)
    );
    this.acceleration.mult(this.p.random(2));
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

  showName() {
    const p = this.p;
    const size = this.circleRadius / 2;
    p.textSize(size);
    p.fill(255);
    p.text(
      this.name,
      this.position.x - (size * this.name.length) / 4,
      this.position.y + size / 4
    );
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

    // //motion 101 is so boring
    // if (this.position.x > p.width) {
    //   this.position.x = 0;
    // } else if (this.position.x < 0) {
    //   this.position.x = p.width;
    // }

    // if (this.position.y > p.height) {
    //   this.position.y = 0;
    // } else if (this.position.y < 0) {
    //   this.position.y = p.height;
    // }
  }
}
