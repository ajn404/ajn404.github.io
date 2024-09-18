import type p5 from "p5";
import { Mover } from "../Mover";

class AttractMover extends Mover {
  mass: number = 0;

  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.angleAcceleration = this.acceleration.x / 10.0;
    this.angleVelocity += this.angleAcceleration;
    this.angleVelocity = this.p.constrain(this.angleVelocity, -0.1, 0.1);
    this.angle += this.angleVelocity;
    this.acceleration.mult(0);
  }

  constructor(p: p5) {
    super(p);
    this.mass = p.random(0.5, 2);
    this.circleRadius = this.mass * 8;
    this.color = p.color(
      p.random(0, 255),
      p.random(0, 255),
      p.random(0, 255),
      p.random(0, 100)
    );
  }

  applyForce(force: p5.Vector) {
    let f = force.copy(); // 创建一个副本
    f.div(this.mass);
    this.acceleration.add(f);
  }
}
let p5_dynamic;

export class Attractor {
  G: number = 1;
  mass: number = 1;
  position: p5.Vector;
  p: p5;

  constructor(p: p5, x: number, y: number) {
    this.position = p.createVector(x, y);
    this.mass = 20;
    this.G = 1; //引力常数
    this.p = p;
  }

  async attract(mover: AttractMover): Promise<p5.Vector> {
    if (!p5_dynamic) p5_dynamic = await import("p5");
    let force = p5_dynamic.Vector.sub(this.position, mover.position);
    let distance = force.mag();
    distance = this.p.constrain(distance, 5.0, 25.0);
    //如果距离小于5，则将其设置为5；如果距离大于25，则将其设置为25。
    let strength = (this.G * this.mass * mover.mass) / (distance * distance);
    //计算引力的大小
    force.setMag(strength);
    //将力的大小设置为引力的大小
    return new Promise(resolve => {
      resolve(force);
    });
  }

  display() {
    const p = this.p;
    p.ellipseMode(p.CENTER);
    p.stroke(10);
    p.fill(255, 0, 0);
    p.ellipse(this.position.x, this.position.y, this.mass * 2);
  }
}

export default AttractMover;
