import React, { useRef, useEffect, useState, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ShaderMaterial } from "three";
import * as THREE from "three";

const CustomShaderCube: React.FC<{
  mouse: { x: number; y: number };
  vertexShader: string;
  fragmentShader: string;
}> = ({ mouse, vertexShader, fragmentShader }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const { size, gl } = useThree();

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
    material.uniforms.u_resolution.value.set(size.width, size.height);
  }, [size]);

  useFrame(({ clock }) => {
    material.uniforms.u_time.value = clock.getElapsedTime();
    material.uniforms.u_mouse.value.set(mouse.x, mouse.y);
    material.uniforms.u_resolution.value.set(size.width, size.height);
  });

  return (
    <mesh ref={meshRef} material={material}>
      <planeGeometry args={[size.width, size.height, 1]} />
    </mesh>
  );
};

type NumericString = `${number}`;

const App: React.FC<{
  vertexShaderPath?: string;
  fragmentShaderPath?: string;
  width?: NumericString;
  height?: NumericString;
}> = ({
  vertexShaderPath = "/assets/glsl/all.vert",
  fragmentShaderPath = "/assets/glsl/draft/1.frag",
  width = 45,
  height = 45,
}) => {
  const [vertexShader, setVertexShader] = useState("");
  const [fragmentShader, setFragmentShader] = useState("");
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const loadShaders = async () => {
      try {
        const vertexShaderRes = await fetch(vertexShaderPath);
        const fragmentShaderRes = await fetch(fragmentShaderPath);

        if (vertexShaderRes.ok && fragmentShaderRes.ok) {
          setVertexShader(await vertexShaderRes.text());
          setFragmentShader(await fragmentShaderRes.text());
        } else {
          console.error("Failed to load shader files.");
        }
      } catch (error) {
        console.error("Error fetching shader files:", error);
      }
    };

    loadShaders();
  }, [vertexShaderPath, fragmentShaderPath]);

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
      className="m-auto my-2"
      gl={{ antialias: false }}
      camera={{ position: [0, 0, 15], fov: 17.5, near: 1, far: 20 }}
      style={{ width: `${width}vw`, height: `${height}vw` }}
      ref={canvas}
    >
      <color attach="background" args={["black"]} />
      {vertexShader && fragmentShader && (
        <CustomShaderCube
          mouse={mouse}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
        />
      )}
    </Canvas>
  );
};

export default App;
