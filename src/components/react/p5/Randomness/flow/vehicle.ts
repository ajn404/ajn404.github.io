// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

import type p5 from "p5";

// The "Vehicle" class

export class Vehicle {
  position: p5.Vector;
  acceleration: p5.Vector;
  velocity: p5.Vector;
  r: number;
  maxspeed: any;
  maxforce: any;
  constructor(x, y, ms, mf, p: p5) {
    this.position = p.createVector(x, y);
    this.acceleration = p.createVector(0, 0);
    this.velocity = p.createVector(0, 0);
    this.r = 4;
    this.maxspeed = ms || 4;
    this.maxforce = mf || 0.1;
  }

  run(p: p5) {
    this.update();
    this.borders(p);
    this.display(p);
  }

  // Implementing Reynolds' flow field following algorithm
  // http://www.red3d.com/cwr/steer/FlowFollow.html
  async follow(flow) {
    // What is the vector at that spot in the flow field?
    let desired = flow.lookup(this.position);
    // Scale it up by maxspeed
    desired.mult(this.maxspeed);
    // Steering is desired minus velocity
    const p5 = await import("p5");

    let steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxforce); // Limit to maximum steering force
    this.applyForce(steer);
  }

  applyForce(force) {
    // We could add mass here if we want A = F / M
    this.acceleration.add(force);
  }

  // Method to update location
  update() {
    // Update velocity
    this.velocity.add(this.acceleration);
    // Limit speed
    this.velocity.limit(this.maxspeed);
    this.position.add(this.velocity);
    // Reset accelerationelertion to 0 each cycle
    this.acceleration.mult(0);
  }

  // Wraparound
  borders(p: p5) {
    if (this.position.x < -this.r) this.position.x = p.width + this.r;
    if (this.position.y < -this.r) this.position.y = p.height + this.r;
    if (this.position.x > p.width + this.r) this.position.x = -this.r;
    if (this.position.y > p.height + this.r) this.position.y = -this.r;
  }

  display(p: p5) {
    // Draw a triangle rotated in the direction of velocity
    let theta = this.velocity.heading() + p.PI / 2;
    p.fill(127);
    p.stroke(0);
    p.strokeWeight(2);
    p.push();
    p.translate(this.position.x, this.position.y);
    p.rotate(theta);
    p.beginShape();
    p.vertex(0, -this.r * 2);
    p.vertex(-this.r, this.r * 2);
    p.vertex(this.r, this.r * 2);
    p.endShape(p.CLOSE);
    p.pop();
  }
}
