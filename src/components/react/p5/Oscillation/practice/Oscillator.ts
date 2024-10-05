import type p5 from "p5";

export class Oscillator {
  p5: p5;
  angle: p5.Vector;
  angleVelocity: p5.Vector;
  amplitude: p5.Vector;
  constructor(p5: p5) {
    this.p5 = p5;
    this.angle = p5.createVector();
    this.angleVelocity = p5.createVector(
      p5.random(-0.05, 0.05),
      p5.random(-0.05, 0.05)
    );
    this.amplitude = p5.createVector(
      p5.random(20, p5.width / 2),
      p5.random(20, p5.width / 2)
    );
  }
  show() {
    // Add your visualization code here
    let _ = this.p5;
    let x = _.sin(this.angle.x) * this.amplitude.x;
    let y = _.sin(this.angle.y) * this.amplitude.y;

    _.push();
    _.translate(_.width / 2, _.height / 2);
    _.stroke(0);
    _.line(0, 0, x, y);
    _.pop();
  }
  update() {
    // Add your update logic here, e.g., changing frequency or amplitude
    this.angle.add(this.angleVelocity);
  }
}
