import type p5 from "p5";
import Basic from "@components/react/p5/index.tsx";

export default () => {
  const sketch = (p: p5) => {
    let pos, velocity;
    const setup = () => {
      p.createCanvas(p.windowWidth / 2, p.windowHeight / 2, p.WEBGL); // 创建一个3D画布
      pos = p.createVector(0, 0, 0); // 初始位置
      velocity = p.createVector(1, 1, 4); // 初始速度
    };
    const draw = () => {
      p.background(204);
      p.fill(255, 0, 0);
      p.stroke(88);
      console.log(pos, p.width);

      // 边界检测
      if (pos.x + 16 > p.width / 3 || pos.x - 16 < -p.width / 3) {
        velocity.x = velocity.x * -1;
      }
      if (pos.y + 16 > p.height / 3 || pos.y - 16 < -p.height / 3) {
        velocity.y = velocity.y * -1;
      }
      if (pos.z + 16 > p.width / 3 || pos.z - 16 < -p.width / 3) {
        velocity.z = velocity.z * -1;
      }

      pos.add(velocity);
      // 在3D空间绘制球体
      p.push(); // 保存当前的变换状态
      p.translate(pos.x, pos.y, pos.z); // 将坐标系移动到小球的位置
      p.sphere(16); // 绘制球体
      p.pop(); // 恢复之前的变换状态
    };
    const resize = () => p.setup();
    p.setup = setup;
    p.draw = draw;
    p.windowResized = resize;
  };
  return <Basic sketch={sketch} showControls />;
};
