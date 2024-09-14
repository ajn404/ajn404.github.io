import type p5 from "p5";

export class Mover {
  position: p5.Vector;
  velocity: p5.Vector;
  circleRadius: number = 20;
  acceleration: p5.Vector;
  p: p5;
  color: p5.Color;
  name: string = "mover";
  angle: number = 0;
  angleAcceleration: number = 0.001;
  angleVelocity: number = 0;

  constructor(p: p5) {
    this.position = p.createVector(
      p.random(this.circleRadius, p.width - this.circleRadius),
      p.random(this.circleRadius + 1, p.height - this.circleRadius - 1)
    );
    this.velocity = p.createVector(p.random(-2, 2), p.random(-2, 2));
    this.p = p;
    this.color = p.color(p.random(0, 255), p.random(0, 255), p.random(0, 255));
  }

  update() {
    this.acceleration = this.p.createVector(
      this.p.random(-0.01, 0.01),
      this.p.random(-0.01, 0.01)
    );
    this.acceleration.mult(this.p.random(2));
    this.velocity.limit(10);
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.angleAcceleration = (this.p.width / 2 - this.position.x) / 100000;
    this.angleVelocity += this.angleAcceleration;
    this.angle += this.angleVelocity;
    this.acceleration.mult(0);
  }

  show() {
    const p = this.p;
    p.stroke(0);
    p.fill(this.color);
    this.p.push();
    p.translate(this.position.x, this.position.y);
    p.rotate(this.angle);

    p.strokeWeight(2);
    p.circle(0, 0, this.circleRadius * 2);
    p.line(-this.circleRadius, 0, this.circleRadius, 0);
    this.p.pop();
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
    p.text(
      `速度x: ${this.velocity.x.toFixed(2)},y: ${this.velocity.y.toFixed(2)}`,
      this.position.x - (size * this.name.length) / 4,
      this.position.y - size
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
  }
}
