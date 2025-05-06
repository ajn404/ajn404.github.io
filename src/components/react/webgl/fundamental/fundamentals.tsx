import { useEffect, useRef, useState } from "react";

export default () => {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [progress, setProgress] = useState(0); // 进度状态

  useEffect(() => {
    const gl = canvas.current?.getContext("webgl");
    let id;
    if (!gl) {
      console.error("WebGL not supported");
      return;
    }

    // 初始化 WebGL
    const initWebGL = () => {
      gl.clearColor(1.0, 0.0, 0.0, 1.0); // 设置背景颜色为黑色
      gl.clear(gl.COLOR_BUFFER_BIT); // 清除画布
    };
    // 渲染函数
    const render = () => {
      initWebGL();
      setProgress(prev => (prev < 100 ? prev + 1 : 100)); // 模拟进度更新
      gl.clearColor(progress / 100, 0.5, 1 - progress / 100, 1.0); // 设置背景颜色为黑色
      gl.clear(gl.COLOR_BUFFER_BIT); // 清除画布
      if (progress < 100) {
        id = requestAnimationFrame(render); // 循环渲染
      } else {
        console.log("Render complete");
        cancelAnimationFrame(id); // 停止渲染
      }
    };
    console.log("Rendering...");

    render(); // 开始渲染

    return () => {
      console.log("Cleanup");
      cancelAnimationFrame(id); // 清除动画帧
    };
  }, []);

  return (
    <div>
      <canvas ref={canvas} className="bg-black w-full h-64"></canvas>
      <div className="mt-4">
        <progress value={progress} max="100" className="w-full"></progress>
        <p className="text-center text-white">{progress.toFixed(2)}%</p>
      </div>
    </div>
  );
};
