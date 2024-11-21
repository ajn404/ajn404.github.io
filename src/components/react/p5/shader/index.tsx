import { useCallback, useState, useEffect } from "react";
import type p5 from "p5";
import Basic from "@components/react/p5/index.tsx";

const vertexShaderInit = `
precision highp float;
uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

attribute vec3 aPosition;
attribute vec2 aTexCoord;
varying vec2 vTexCoord;

void main() {
  vTexCoord = aTexCoord;
  vec4 positionVec4 = vec4(aPosition, 1.0);
  gl_Position = uProjectionMatrix * uModelViewMatrix * positionVec4;
}
`;

const fragmentShaderInit = `
precision highp float;

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution;
  float color = 0.5 + 0.5 * sin(u_time + uv.x * 10.0);
  vec3 dynamicColor = vec3(color, 0.5, 1.0 - color);
  gl_FragColor = vec4(dynamicColor, 1.0);
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

      p.preload = () => {};

      const setup = () => {
        p.createCanvas(p.windowWidth / 2, 240, p.WEBGL);
        myShader = p.createShader(vertexShader, fragmentShader);
        p.frameRate(120);
      };

      const draw = () => {
        if (!myShader) {
          myShader = p.createShader(vertexShader, fragmentShader);
          return;
        }
        p.background(0);
        p.shader(myShader);

        // Pass uniforms
        myShader.setUniform("u_resolution", [p.width, p.height]);
        myShader.setUniform("u_mouse", [p.mouseX, p.mouseY]);
        myShader.setUniform("u_time", p.frameCount / 40);
        p.rect(-p.width / 2, -p.height / 2, p.width, p.height); // Draw rectangle
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
