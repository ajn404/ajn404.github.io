import { useEffect, useRef } from "react";

export default () => {
  const canvas = useRef<HTMLCanvasElement>(null);
  const bRef = useRef(255); // 使用 ref 来存储 b 的值

  useEffect(() => {
    const gl = canvas.current?.getContext("webgl");
    if (!gl) return;
    let id = 0; // 用来记录帧数

    const render = () => {
      // 更新 b 的值,循环变化
      bRef.current = bRef.current <= 0 ? 255 : bRef.current - 5; // 逐渐减小 b 的值
      let g = 255 - bRef.current;
      let r = bRef.current <= 0 ? 255 : bRef.current - 1;
      gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
      gl.clearColor(r / 255, g / 255, bRef.current / 255, 1); // 将 b 的值归一化到 [0, 1]
      gl.clear(gl.COLOR_BUFFER_BIT);
      id = requestAnimationFrame(render); // 请求下一帧
    };
    render(); // 开始渲染
    return () => {
      // 清理工作（如果有需要的话）
      cancelAnimationFrame(id); // 取消动画帧
    };
  }, []); // 只在组件挂载时执行一次

  return (
    <>
      <canvas ref={canvas} className="bg-black"></canvas>
    </>
  );
};
