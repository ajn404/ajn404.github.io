import { useEffect, useRef } from "react";

export default () => {
  const canvas = useRef<HTMLCanvasElement>(null);
  const bRef = useRef(255); // 使用 ref 来存储 b 的值

  useEffect(() => {
    const gl = canvas.current?.getContext("webgl");
    if (!gl) return;
    let id = 0; // 用来记录帧数
    canvas.current?.addEventListener("click", () => {
      cancelAnimationFrame(id); // 取消动画帧
      gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
      gl.clearColor(
        ...(new Array(3).fill(0).map(() => Math.random()) as [
          number,
          number,
          number,
        ]),
        1
      );
      gl.clear(gl.COLOR_BUFFER_BIT);
    });
    return () => {};
  }, []); // 只在组件挂载时执行一次

  return (
    <>
      <canvas ref={canvas} className="bg-black"></canvas>
    </>
  );
};
