import type p5 from "p5";
import { Mover } from "./mouseMover";

export default class MouseLeadingCar extends Mover {
  constructor(p5: p5) {
    super(p5);
    this.showLine = false;
    this.multNum = 0.5;
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
}
