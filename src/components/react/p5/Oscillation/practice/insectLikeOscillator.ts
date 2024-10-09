import type p5 from "p5";

export class InsectLikeOscillator {
  p5: p5;
  angle: number;
  angleVelocity: number;
  amplitude: number;
  offset: number; // 新增：腿部偏移量

  constructor(p5: p5, index: number, numLegs: number) {
    this.p5 = p5;
    this.angle = 0;
    this.angleVelocity = 0.05 + index * 0.01; // 不同的腿有不同的速度
    this.amplitude = 50; // 不同的腿有不同的振幅
    this.offset = (index / numLegs) * Math.PI; // 腿部角度偏移
  }

  show() {
    const _ = this.p5;
    const x = _.cos(this.angle + this.offset) * this.amplitude;
    const y = _.sin(this.angle + this.offset) * this.amplitude;
    const r = _.map(_.sin(this.angle), -1, 1, 0, 255);
    const g = _.map(_.cos(this.angle), -1, 1, 0, 255);
    const b = _.map(_.sin(this.angle), -1, 1, 100, 200);
    _.push();
    _.translate(_.width / 2, _.height / 2);
    _.stroke(r, g, b);
    _.fill(r, g, b);
    _.line(0, 0, x, y);
    _.circle(x, y, 10); // 减小圆圈大小
    _.pop();
  }

  update() {
    this.angle += this.angleVelocity;
  }
}

export class Insect {
  p5: p5;
  oscillators: InsectLikeOscillator[];
  numLegs: number;

  constructor(p5: p5, numLegs: number = 60) {
    this.p5 = p5;
    this.numLegs = numLegs;
    this.oscillators = Array.from(
      { length: numLegs },
      (_, i) => new InsectLikeOscillator(p5, i, numLegs)
    );
  }

  show() {
    this.oscillators.forEach(oscillator => oscillator.show());
  }

  update() {
    this.oscillators.forEach(oscillator => oscillator.update());
  }
}
