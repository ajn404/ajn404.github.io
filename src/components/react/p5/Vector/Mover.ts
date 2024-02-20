import type p5 from "p5";

export class Mover {
  position: p5.Vector;
  velocity: p5.Vector;
  circleRadius: number = 48;
  acceleration: p5.Vector;
  p: p5;
  constructor(p: p5) {
    this.position = p.createVector(p.random(p.width), p.random(p.height));
    this.velocity = p.createVector(p.random(-2, 2), p.random(-2, 2));
    this.acceleration = p.createVector(-0.001, 0.01);
    // this.velocity.limit(10);
    this.p = p;
  }

  move() {
    this.velocity.limit(5);
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
  }

  show() {
    const p = this.p;
    p.stroke(0);
    p.fill(175);
    p.strokeWeight(2);
    p.circle(this.position.x, this.position.y, this.circleRadius * 2);
  }

  checkEdges() {
    const p = this.p;
    // if (this.position.x + this.circleRadius > p.width || this.position.x < this.circleRadius) {
    //     this.velocity.x *= -1;
    // }
    // if (this.position.y + this.circleRadius > p.height || this.position.y < this.circleRadius) {
    //     this.velocity.y *= -1;
    // }

    // //motion 101 is so boring
    if (this.position.x > p.width) {
      this.position.x = 0;
    } else if (this.position.x < 0) {
      this.position.x = p.width;
    }

    if (this.position.y > p.height) {
      this.position.y = 0;
    } else if (this.position.y < 0) {
      this.position.y = p.height;
    }
  }
}
