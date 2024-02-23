import type p5 from "p5";
import { Mover } from "../Vector/Mover";

export class ForceMoverA extends Mover {
  mass: number;
  constructor(p: p5) {
    super(p);
    this.velocity = p.createVector(0, 0);
    this.acceleration = p.createVector(0, 0);
    this.mass = 10;
  }
  applyForce(force: p5.Vector) {
    let f = force.copy(); // 创建一个副本
    f.div(this.mass);
    this.acceleration.add(f);
  }
}
