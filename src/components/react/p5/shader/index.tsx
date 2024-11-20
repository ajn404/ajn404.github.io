import type p5 from "p5";
import Basic from "@components/react/p5/index.tsx";
import { useCallback } from "react";

const vertexShaderInit = `
precision highp float;
uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;

attribute vec3 aPosition;
attribute vec2 aTexCoord;
varying vec2 vTexCoord;

void main() {
  vTexCoord = aTexCoord;
  vec4 positionVec4 = vec4(aPosition, 1.0);
  gl_Position = uProjectionMatrix * uModelViewMatrix * positionVec4;
}
        `;

// 定义片段着色器
const fragmentShaderInit = `
            precision highp float;

void main() {
  gl_FragColor = vec4(1.0, 0.5, 0.0, 1.0);
}
        `;

interface ShaderProps {
  vertexShader: string;
  fragmentShader: string;
}

const ShaderComponent = ({
  vertexShader = vertexShaderInit,
  fragmentShader = fragmentShaderInit,
}: ShaderProps) => {
  const sketch = useCallback(
    (p: p5) => {
      let myShader;

      const setup = () => {
        p.createCanvas(p.windowWidth / 2, 240, p.WEBGL);
        myShader = p.createShader(vertexShader, fragmentShader); // 创建 Shader
      };

      const draw = () => {
        p.shader(myShader); // 应用 Shader
        p.rect(-p.width / 2, -p.height / 2, p.width, p.height); // 绘制矩形
      };

      const resize = () => {
        p.resizeCanvas(p.windowWidth / 2, 240);
      };

      p.setup = setup;
      p.draw = draw;
      p.windowResized = resize;
    },
    [vertexShader, fragmentShader]
  );

  return (
    <>
      <Basic sketch={sketch} />
    </>
  );
};

export default ShaderComponent;
