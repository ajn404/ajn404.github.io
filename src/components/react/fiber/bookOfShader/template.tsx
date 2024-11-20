import React, { useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { ShaderMaterial } from "three";
import * as THREE from "three";

const vertexShader = `
  uniform vec2 u_resolution;
  varying vec2 v_uv;

  void main() {
    v_uv = (position.xy + 1.0) / 2.0; // 将坐标转换到 [0, 1] 范围
    gl_Position = vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float u_time;
  uniform vec2 u_resolution;
  uniform vec2 u_mouse;
  varying vec2 v_uv;

  void main() {
    vec2 st = gl_FragCoord.xy / u_resolution; // 将片段坐标转换到 [0, 1] 范围
    vec3 color = 0.5 + 0.5 * cos(u_time + st.xyx + vec3(0, 2, 4)); // 使用时间和坐标生成颜色
    gl_FragColor = vec4(color, 1.0);
  }
`;

const CustomShaderCube: React.FC<{ mouse: { x: number; y: number } }> = ({
  mouse,
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [material] = useState(
    () =>
      new ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
          u_time: { value: 0 },
          u_resolution: {
            value: new THREE.Vector2(window.innerWidth, window.innerHeight),
          },
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

const App: React.FC = () => {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMouse({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <CustomShaderCube mouse={mouse} />
    </Canvas>
  );
};

export default App;
