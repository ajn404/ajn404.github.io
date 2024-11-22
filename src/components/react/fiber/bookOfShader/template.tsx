import React, { useRef, useEffect, useState, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ShaderMaterial } from "three";
import * as THREE from "three";
// import { OrbitControls } from "@react-three/drei";

const CustomShaderCube: React.FC<{
  mouse: { x: number; y: number };
  vertexShader: string;
  fragmentShader: string;
}> = ({ mouse, vertexShader, fragmentShader }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const { size, gl } = useThree(); // 获取 Canvas 的真实宽高

  const material = useMemo(() => {
    return new ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        u_time: { value: 0 },
        u_resolution: { value: new THREE.Vector2(size.width, size.height) },
        u_mouse: { value: new THREE.Vector2(mouse.x, mouse.y) },
      },
    });
  }, [vertexShader, fragmentShader, size]);

  useEffect(() => {
    gl.setPixelRatio(window.devicePixelRatio || 2);
    gl.setSize(size.width, size.height);
    material.uniforms.u_resolution.value.set(size.width, size.height); // 更新分辨率
  }, [size]);

  useFrame(({ clock }) => {
    material.uniforms.u_time.value = clock.getElapsedTime();
    material.uniforms.u_mouse.value.set(mouse.x, mouse.y);
    material.uniforms.u_resolution.value.set(size.width, size.height); // 每帧更新分辨率
  });
  return (
    <mesh ref={meshRef} material={material}>
      <planeGeometry args={[size.width, size.height, 1]} />
    </mesh>
  );
};
type NumericString = `${number}`;
const App: React.FC<{
  vertexShader?: string;
  fragmentShader?: string;
  width?: NumericString;
  height?: NumericString;
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
  width = 45,
  height = 45,
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
    <Canvas
      dpr={[1, 2]}
      className="m-auto"
      gl={{ antialias: false }}
      camera={{ position: [0, 0, 15], fov: 17.5, near: 1, far: 20 }}
      style={{ width: `${width}vw`, height: `${height}vw` }}
      ref={canvas}
    >
      <color attach="background" args={["black"]} />
      <CustomShaderCube
        mouse={mouse}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
      />
    </Canvas>
  );
};

export default App;
