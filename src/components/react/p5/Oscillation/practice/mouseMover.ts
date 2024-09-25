import type p5 from "p5";

class Mover {
  p5: p5;
  position: p5.Vector;
  acceleration: p5.Vector;
  velocity: p5.Vector;
  maxVelocity: number;
  circleRadius: number;
  showLine: boolean = false;
  multNum: number;
  constructor(p5: p5) {
    this.p5 = p5;
    this.position = p5.createVector(p5.width / 2, p5.height / 2);
    this.acceleration = p5.createVector();
    this.velocity = p5.createVector();
    this.maxVelocity = 5;
    this.circleRadius = 20;
    this.showLine = true;
    this.multNum = 0.1;
  }

  checkEdges() {
    const p = this.p5;
    if (
      this.position.x + this.circleRadius > p.width ||
      this.position.x < this.circleRadius
    ) {
      this.velocity.x *= -1;
      this.position.x = p.width / 2;
    }
    if (
      this.position.y + this.circleRadius > p.height ||
      this.position.y < this.circleRadius
    ) {
      this.velocity.y *= -1;
      this.position.y = p.height / 2;
    }
  }

  update() {
    let _ = this.p5;
    let mouse = _.createVector(_.mouseX, _.mouseY);
    let dir = mouse.sub(this.position).copy();

    if (this.showLine) {
      _.stroke(0);
      _.strokeWeight(2);
      _.stroke(40);
      _.line(0, 0, _.mouseX, _.mouseY);
      _.stroke(80);
      _.line(0, 0, this.position.x, this.position.y);
      _.stroke(120);
      _.line(_.width / 2, _.height / 2, dir.x, dir.y);
    }
    dir.normalize();
    dir.mult(this.multNum);
    this.acceleration = dir;
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxVelocity);
    this.position.add(this.velocity);
  }

  show() {
    let _ = this.p5;

    _.fill(0);
    _.stroke(255);
    _.ellipse(
      this.position.x,
      this.position.y,
      this.circleRadius,
      this.circleRadius
    );
  }
}

export { Mover };
