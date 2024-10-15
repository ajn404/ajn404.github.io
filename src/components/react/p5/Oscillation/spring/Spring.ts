import type p5 from "p5";
import type { Bob } from "./Bob";

export class Spring {
  p5: p5;
  anchor: p5.Vector;
  restLength: number;
  k: number = 2;
  constructor(p5: p5, x: number, y: number, length: number) {
    this.p5 = p5;
    this.anchor = p5.createVector(x, y);
    this.restLength = length;
  }
  connect(bob: Bob) {
    let force = bob.position.copy().sub(this.anchor);
    let currentLength = force.mag();
    let stretch = currentLength - this.restLength;
    force.setMag(-1 * this.k * stretch);
    bob.applyForce(force);
  }

  constrainLength(bob: Bob, minLen: number, maxLen: number) {
    let direction = bob.position.copy().sub(this.anchor);
    let length = direction.mag();
    if (length < minLen) direction.setMag(minLen);
    else if (length > maxLen) direction.setMag(maxLen);
    let f = this.anchor.copy().add(direction);
    bob.position = f;
    bob.velocity.mult(0);
  }

  show() {
    this.p5.fill(127);
    this.p5.circle(this.anchor.x, this.anchor.y, 10);
  }

  showLine(bob: Bob) {
    this.p5.stroke(0);
    this.p5.line(bob.position.x, bob.position.y, this.anchor.x, this.anchor.y);
    this.p5.stroke(78, 255, 0);

    let restEnd = this.anchor
      .copy()
      .add(
        bob.position.copy().sub(this.anchor).normalize().mult(this.restLength)
      );
    this.p5.line(this.anchor.x, this.anchor.y, restEnd.x, restEnd.y);
  }
}
