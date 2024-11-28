import React, { useRef, useEffect, useState, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ShaderMaterial } from "three";
import code from "@components/react/editor/code";
import { Slider } from "@components/react/shadcn/ui/slider";
import { cn } from "@utils/utils";
import { useDebounce } from "@uidotdev/usehooks";

import * as THREE from "three";
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

  width = 90,
  height = 90,
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
  //设置密度  10
  const [density, setDensity] = useState(`10.`);

  const fragmentShader = `
varying vec2 v_uv;
uniform vec2 u_resolution;

void main(){
    vec2 st = v_uv;
    st.x *= u_resolution.x/u_resolution.y;
    vec3 color = vec3(0.0);
    float d = 0.0;
    st = st*2.-1.;
    d = length(abs(st)-0.3);
    gl_FragColor = vec4(vec3(fract(d*${density})),1.0);
}
  `;
  return (
    <div className="flex flex-col items-center justify-center">
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
      <code>{`gl_FragColor = vec4(vec3(fract(d*${density})),1.0);`}</code>
      <Slider
        defaultValue={[30]}
        max={100}
        min={5}
        step={1}
        className={cn("w-[100%] m-4")}
        onValueChange={value => {
          setDensity(value[0].toString() + ".");
        }}
        value={[Number(density)]}
      />
    </div>
  );
};

export default App;
