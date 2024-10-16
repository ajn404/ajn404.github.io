import type p5 from "p5";

export class Bob {
  p5: p5;
  position: p5.Vector;
  velocity: p5.Vector;
  acceleration: p5.Vector;
  mass: number = 24;
  damping: number = 0.98;
  dragging: boolean = false;
  draftOffset: p5.Vector;
  constructor(p5: p5, x: number, y: number) {
    this.p5 = p5;
    this.position = p5.createVector(x, y);
    this.velocity = p5.createVector();
    this.acceleration = p5.createVector();
    this.draftOffset = p5.createVector();
    this.dragging = false;
  }
  show() {
    const p = this.p5;
    p.stroke(0);
    p.strokeWeight(2);
    p.fill(this.dragging ? 200 : 128);
    p.circle(this.position.x, this.position.y, this.mass * 2);
  }
  update() {
    this.velocity.add(this.acceleration);
    this.velocity.mult(this.damping);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }
  handleMousePressed(mx: number, my: number) {
    let dist = this.p5.dist(mx, my, this.position.x, this.position.y);
    if (dist < this.mass) {
      this.dragging = true;
      this.draftOffset.x = this.position.x - mx;
      this.draftOffset.y = this.position.y - my;
    }
  }

  handleDrag(mx: number, my: number) {
    if (this.dragging) {
      this.position.x = mx + this.draftOffset.x;
      this.position.y = my + this.draftOffset.y;
    }
  }

  handleMouseReleased() {
    this.dragging = false;
  }

  applyForce(force: p5.Vector) {
    let f = force.copy();
    f.div(this.mass);
    this.acceleration.add(f);
  }
}

export class BobBob {
  p5: p5;
  position: p5.Vector;
  velocity: p5.Vector;
  acceleration: p5.Vector;
  mass: number = 24;
  damping: number = 0.98;
  dragging: boolean = false;
  draftOffset: p5.Vector;

  constructor(p5: p5, x: number, y: number, mass?: number) {
    this.p5 = p5;
    this.position = p5.createVector(x, y);
    this.velocity = p5.createVector();
    this.acceleration = p5.createVector();
    this.draftOffset = p5.createVector();
    this.mass = Math.max(5, mass);
  }

  show() {
    const p = this.p5;
    p.stroke(0);
    p.strokeWeight(2);
    p.fill(this.dragging ? 200 : 128);
    p.circle(this.position.x, this.position.y, this.mass * 2);
  }

  update() {
    this.velocity.add(this.acceleration);
    this.velocity.mult(this.damping);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

  handleMousePressed(mx: number, my: number) {
    let dist = this.p5.dist(mx, my, this.position.x, this.position.y);
    if (dist < this.mass) {
      this.dragging = true;
      this.draftOffset.x = this.position.x - mx;
      this.draftOffset.y = this.position.y - my;
    }
  }

  handleDrag(mx: number, my: number) {
    if (this.dragging) {
      this.position.x = mx + this.draftOffset.x;
      this.position.y = my + this.draftOffset.y;
    }
  }

  handleMouseReleased() {
    this.dragging = false;
  }

  applyForce(force: p5.Vector) {
    let f = force.copy();
    f.div(this.mass);
    this.acceleration.add(f);
  }
}
