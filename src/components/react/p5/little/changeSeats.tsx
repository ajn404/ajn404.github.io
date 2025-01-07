import type p5 from "p5";
import Basic from "@components/react/p5/index.tsx";
import { useCallback } from "react";

export default () => {
  const sketch = useCallback((p: p5) => {
    const ROWS = 6;
    const COLS = 8;
    const TOTAL_STUDENTS = ROWS * COLS;
    let seats: number[] = [];
    let cellWidth: number;
    let cellHeight: number;

    const setup = () => {
      p.createCanvas(p.windowWidth / 2, 240);
      // 初始化座位数组
      seats = Array.from({ length: TOTAL_STUDENTS }, (_, i) => i);
      cellWidth = p.width / COLS;
      cellHeight = p.height / ROWS;
      shuffleSeats();
    };

    const shuffleSeats = () => {
      // Fisher-Yates 洗牌算法
      for (let i = seats.length - 1; i > 0; i--) {
        const j = Math.floor(p.random(i + 1));
        [seats[i], seats[j]] = [seats[j], seats[i]];
      }
    };

    const draw = () => {
      p.background(255);

      // 绘制座位
      for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
          const x = col * cellWidth;
          const y = row * cellHeight;
          const index = row * COLS + col;

          // 绘制座位边框
          p.stroke(0);
          p.noFill();
          p.rect(x, y, cellWidth, cellHeight);

          // 显示学生编号
          p.fill(0);
          p.noStroke();
          p.textAlign(p.CENTER, p.CENTER);
          p.text(seats[index] + 1, x + cellWidth / 2, y + cellHeight / 2);
        }
      }
    };

    const mousePressed = () => {
      shuffleSeats(); // 点击画布时重新随机排列
    };

    const resize = () => {
      p.resizeCanvas(p.windowWidth / 2, 240);
      cellWidth = p.width / COLS;
      cellHeight = p.height / ROWS;
    };

    p.setup = setup;
    p.draw = draw;
    p.mousePressed = mousePressed;
    p.windowResized = resize;
  }, []);

  return (
    <>
      <Basic sketch={sketch} />
    </>
  );
};
