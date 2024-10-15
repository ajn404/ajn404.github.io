import type p5 from "p5";
import type { Bob } from "./Bob";

export class Spring {
  p5: p5;
  anchor: p5.Vector;
  restLength: number;
  k: number = 0.2;
  constructor(p5: p5, x: number, y: number, length: number) {
    this.p5 = p5;
    this.anchor = p5.createVector(x, y);
    this.restLength = length;
  }

  /**
   * 计算 bob 的位置与锚点之间的向量 force。
   * 计算当前长度 currentLength。
   * 计算弹簧的拉伸量 stretch（当前长度与静止长度的差）。
   * 根据弹簧常数 k 计算施加的力，并将其应用到 bob 上。
   */
  connect(bob: Bob) {
    let force = bob.position.copy().sub(this.anchor);
    let currentLength = force.mag();
    let stretch = currentLength - this.restLength;
    force.setMag(-1 * this.k * stretch);
    bob.applyForce(force);
  }

  /**
   *
   * @param bob
   * @param minLen
   * @param maxLen
   * 计算 bob 到锚点的方向向量 direction。
   * 检查长度是否在限制范围内，如果不在，则调整方向向量的大小。
   * 更新 bob 的位置，并将其速度设置为 0，以防止其穿过锚点。
   */
  constrainLength(bob: Bob, minLen: number, maxLen: number) {
    let direction = bob.position.copy().sub(this.anchor);
    let length = direction.mag();
    const updateBobPosition = () => {
      let f = this.anchor.copy().add(direction);
      bob.position = f;
      bob.velocity.mult(0);
    };

    if (length < minLen) {
      direction.setMag(minLen);
      updateBobPosition();
    } else if (length > maxLen) {
      direction.setMag(maxLen);
      updateBobPosition();
    }
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
