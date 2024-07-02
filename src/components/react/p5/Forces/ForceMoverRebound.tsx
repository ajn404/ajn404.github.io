import type p5 from "p5";
import { ForceMoverC } from "./ForceMoverC";

export class ForceMoverRebound extends ForceMoverC {
  constructor(
    p: p5,
    name?: string,
    circleRadius?: number,
    color?: p5.Color,
    mass?: number
  ) {
    super(p, name, circleRadius, color, mass);
  }

  rebound(force: number = 1) {
    const p = this.p;
    let distanceX = p
      .createVector(p.width, this.position.y)
      .dist(this.position);
    let distanceY = p
      .createVector(this.position.x, p.height)
      .dist(this.position);
    if (distanceX < this.circleRadius || this.position.x > p.width) {
      this.applyForce(p.createVector(-force, 0));
    }
    if (distanceY < this.circleRadius || this.position.y > p.height) {
      this.applyForce(p.createVector(0, -force));
    }
    let distanceXL = p.createVector(0, this.position.y).dist(this.position);
    let distanceYL = p.createVector(this.position.x, 0).dist(this.position);
    if (distanceXL < this.circleRadius || this.position.x < 0) {
      this.applyForce(p.createVector(force, 0));
    }
    if (distanceYL < this.circleRadius || this.position.y < 0) {
      this.applyForce(p.createVector(0, force));
    }
  }
}
