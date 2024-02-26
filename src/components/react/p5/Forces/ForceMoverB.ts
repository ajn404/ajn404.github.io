import type p5 from "p5";
import { Mover } from "../Vector/Mover";

export class ForceMoverB extends Mover {
  mass: number;
  constructor(p: p5, name?: string, circleRadius?: number, color?: p5.Color) {
    super(p);
    this.name = name || this.name;
    this.circleRadius = circleRadius || this.circleRadius;
    this.color = color || this.color;
    this.velocity = p.createVector(0, 0);
    this.acceleration = p.createVector(0, 0);
    this.mass = 10;
  }
  applyForce(force: p5.Vector) {
    let f = force.copy(); // 创建一个副本
    f.div(this.mass);
    this.acceleration.add(f);
  }

  move() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

  checkEdges() {
    const p = this.p;
    if (
      this.position.x + this.circleRadius > p.width ||
      this.position.x < this.circleRadius
    ) {
      this.velocity.x *= -1;
      if (this.position.x + this.circleRadius > p.width) {
        this.position.x = p.width - this.circleRadius;
      }
    }
    if (
      this.position.y + this.circleRadius > p.height ||
      this.position.y < this.circleRadius
    ) {
      this.velocity.y *= -1;
      if (this.position.y + this.circleRadius > p.height) {
        this.position.y = p.height - this.circleRadius;
      }
    }
  }
}
