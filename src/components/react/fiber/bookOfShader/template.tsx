import React, { useRef, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ShaderMaterial } from "three";
import * as THREE from "three";

const CustomShaderCube: React.FC<{
  mouse: { x: number; y: number };
  vertexShader: string;
  fragmentShader: string;
}> = ({ mouse, vertexShader, fragmentShader }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const { size } = useThree(); // 获取 Canvas 的真实宽高

  const [material] = useState(
    () =>
      new ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
          u_time: { value: 0 },
          u_resolution: { value: new THREE.Vector2(size.width, size.height) },
          u_mouse: { value: new THREE.Vector2(0, 0) },
        },
      })
  );

  useFrame(({ clock }) => {
    material.uniforms.u_time.value = clock.getElapsedTime();
    material.uniforms.u_mouse.value.set(mouse.x, mouse.y);
  });

  return (
    <mesh ref={meshRef} material={material}>
      <boxGeometry args={[1, 1, 1]} />
    </mesh>
  );
};

const App: React.FC<{
  vertexShader?: string;
  fragmentShader?: string;
}> = ({
  vertexShader = `
    uniform vec2 u_resolution;
    varying vec2 v_uv;

    void main() {
      v_uv = (position.xy + 1.0) / 2.0; // 将坐标转换到 [0, 1] 范围
      gl_Position = vec4(position, 1.0);
    }
  `,
  fragmentShader = `
    #ifdef GL_ES
    precision mediump float;
    #endif

    uniform vec2 u_resolution;
    uniform vec2 u_mouse;
    uniform float u_time;

    float plot(vec2 st) {
      return smoothstep(0.02, 0.0, abs(st.y - st.x));
    }

    void main() {
      vec2 st = gl_FragCoord.xy / u_resolution;
      float y = st.x;
      vec3 color = vec3(y);
      float pct = plot(st);
      color = (1.0 - pct) * color + pct * vec3(1.000, 0.895, 0.688);
      gl_FragColor = vec4(color, 1.0);
    }
  `,
}) => {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMouse({ x: event.clientX, y: event.clientY });
    };

    if (canvas.current) {
      canvas.current.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      if (canvas.current) {
        canvas.current.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, []);

  return (
    <Canvas className="w-full h-[500px]" ref={canvas}>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <CustomShaderCube
        mouse={mouse}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
      />
    </Canvas>
  );
};

export default App;
