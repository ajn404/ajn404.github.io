import type p5 from "p5";
import Basic from "@components/react/p5/index.tsx";
import { Switch } from "@components/react/shadcn/ui/switch";
import { Label } from "@components/react/shadcn/ui/label";
import { useCallback, useState } from "react";
let img;

export class Cannon {
  p: p5;
  x: number;
  y: number;
  angle: number;
  constructor(p: p5, x: number, y: number) {
    this.p = p;
    this.x = x;
    this.y = y;
    this.angle = p.PI / 4;
  }

  show() {
    const p = this.p;
    p.push();
    p.fill(0);
    p.translate(this.x, this.y);
    p.rect(-50, 0, 60, 20);
    p.rotate(this.angle);
    //旋转45度
    p.rect(-35, -10, 30, 50);
    p.pop();
  }
}

export class Cannonball {
  p: p5;
  position: p5.Vector;
  velocity: p5.Vector;
  rotation: number;
  angularVelocity: number;
  gravity: p5.Vector;
  circleRadius: number;
  index: number;
  img: p5.Image;
  constructor(p: p5, x: number, y: number, index: number, img: p5.Image) {
    this.p = p;
    let p5 = this.p;
    this.position = p5.createVector(x, y);
    this.velocity = p5.createVector(
      10 * p5.cos(-p5.PI / 4),
      10 * p5.sin(-p5.PI / 4)
    ); // 初始速度
    this.rotation = 0; // 旋转角度
    this.angularVelocity = 0.1; // 旋转速度
    this.gravity = p5.createVector(0, 0.2); // 重力
    this.circleRadius = p5.random(10, 20);
    this.index = index;
    this.img = img;
  }

  update() {
    this.velocity.add(this.gravity); // 应用重力
    this.position.add(this.velocity); // 更新位置
    this.rotation += this.angularVelocity; // 更新旋转
  }

  show() {
    const p = this.p;
    p.push();
    p.translate(this.position.x - 20, this.position.y - 20);
    p.rotate(this.rotation);
    p.fill(255, 0, 0);
    // p.ellipse(0, 0, 20, 20); // 投射物
    p.circle(0, 0, this.circleRadius * 2);
    // p.text("Cannonball", -10, -10);
    if (this.img) {
      p.image(
        this.img,
        -this.circleRadius,
        -this.circleRadius,
        this.circleRadius * 2,
        this.circleRadius * 2
      );
    }
    p.pop();
  }

  isOffScreen() {
    return this.position.y > this.p.height; // 检查是否超出画布
  }

  checkEdges() {
    const p = this.p;
    if (
      this.position.x + this.circleRadius > p.width ||
      this.position.x < this.circleRadius
    ) {
      this.velocity.x *= -1;
    }
    if (
      this.position.y + this.circleRadius > p.height ||
      this.position.y < this.circleRadius
    ) {
      this.velocity.y *= -1;
    }
  }
}

export default () => {
  const [openCheckEdges, setOpenCheckEdges] = useState(false);

  const sketch = useCallback(
    (p: p5) => {
      let cannon: Cannon;
      let cannonballList: Cannonball[] = [];
      const setup = () => {
        let canvas = p.createCanvas(p.windowWidth - 200, 240);
        canvas.drop(gotFile);
        p.background(255);
        cannon = new Cannon(p, 50, p.height - 20);
      };
      const gotFile = file => {
        if (file.type === "image") {
          img = p.createImg(file.data, "").hide();
          p.image(img, 0, 0, p.width, p.height);
        }
      };
      const draw = () => {
        p.background(220);
        cannon.show();

        for (let i = 0; i < cannonballList.length; i++) {
          cannonballList[i].update();
          //边缘碰撞反弹
          if (openCheckEdges) cannonballList[i].checkEdges();
          cannonballList[i].show();
          if (cannonballList[i].isOffScreen()) {
            cannonballList.splice(i, 1);
          }
        }
      };
      const resize = () => {
        p.resizeCanvas(p.windowWidth - 200, 240);
      };

      p.mousePressed = () => {
        if (
          p.mouseX > 0 &&
          p.mouseX < p.width &&
          p.mouseY > 0 &&
          p.mouseY < p.height
        ) {
          let cannonball = new Cannonball(
            p,
            cannon.x,
            cannon.y,
            cannonballList.length,
            img
          );
          cannonballList.push(cannonball);
        }
      };
      p.setup = setup;
      p.draw = draw;
      p.windowResized = resize;
    },
    [openCheckEdges]
  );
  return (
    <>
      <Basic sketch={sketch} showControls></Basic>
      <Label htmlFor="openCheckEdges" className="text-center px-10">
        {" "}
        打开边缘碰撞
      </Label>
      <Switch
        id="openCheckEdges"
        checked={openCheckEdges}
        onCheckedChange={e => {
          console.log(e);
          setOpenCheckEdges(e);
        }}
      ></Switch>
      <p className="text-center brightness-75">
        {" "}
        拖动图片至canvas,会生成大炮的背景
      </p>
    </>
  );
};
