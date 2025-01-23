import { useCallback } from "react";
import type p5 from "p5";
import Basic from "@components/react/p5/index.tsx";

interface ShaderProps {
  vertexShader: string;
  fragmentShader: string;
}

const ShaderComponent = ({
  vertexShader = "",
  fragmentShader = "",
}: ShaderProps) => {
  const sketch = useCallback(
    (p: p5) => {
      let myShader;
      let myTexture: p5.Image; // 用于存储纹理

      p.preload = () => {
        if (!myShader)
          myShader = p.loadShader(
            "/assets/glsl/all.vert",
            "/assets/glsl/iq-canyon/iq-canyon.frag"
          );
        myTexture = p.loadImage("/assets/glsl/iq-canyon/iChannel0.webp");
      };

      const setup = () => {
        p.createCanvas(p.windowWidth / 2, 240, p.WEBGL);
        p.frameRate(120);
      };

      const draw = () => {
        if (!myShader) return;
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
