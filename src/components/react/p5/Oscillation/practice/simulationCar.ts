import type p5 from "p5";

export class SimulationCar {
  p5: p5;
  position: p5.Vector;
  acceleration: p5.Vector;
  velocity: p5.Vector;
  maxVelocity: number;
  constructor(p5: p5) {
    this.p5 = p5;
    this.position = p5.createVector(p5.width / 2, p5.height / 2);
    this.acceleration = p5.createVector();
    this.velocity = p5.createVector();
    this.maxVelocity = 5;
  }

  show() {
    let _ = this.p5;
    let angle = _.atan2(this.velocity.y, this.velocity.x);

    _.push();
    _.rectMode(_.CENTER);
    _.fill(0);
    _.translate(this.position.x, this.position.y);
    _.rotate(angle);
    _.rect(0, 0, 30, 10);
    _.pop();
  }

  update() {
    let p = this.p5;
    if (p.keyIsDown(p.LEFT_ARROW)) {
    }
  }
}
