import React, {
  useRef,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from "react";
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

  const material = useMemo<ShaderMaterial>(() => {
    return new ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        u_time: { value: 0 },
        u_resolution: { value: new THREE.Vector2() },
        u_mouse: { value: new THREE.Vector2() },
      },
    });
  }, [vertexShader, fragmentShader]);

  useEffect(() => {
    const updateSize = () => {
      gl.setPixelRatio(window.devicePixelRatio || 2);
      gl.setSize(size.width, size.height);
      material.uniforms.u_resolution.value.set(size.width, size.height);
    };
    updateSize();
  }, [size, gl, material]);

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
  width = "45",
  height = "45",
}) => {
  const [vertexShader, setVertexShader] = useState("");
  const [fragmentShader, setFragmentShader] = useState("");
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const canvas = useRef<HTMLCanvasElement>(null);

  const handleMouseMove = useCallback((event: MouseEvent) => {
    setMouse({ x: event.clientX, y: event.clientY });
  }, []);

  useEffect(() => {
    const canvasElement = canvas.current;
    if (canvasElement) {
      canvasElement.addEventListener("mousemove", handleMouseMove);
      return () =>
        canvasElement.removeEventListener("mousemove", handleMouseMove);
    }
  }, [handleMouseMove]);

  const loadShaders = useMemo(
    () => async () => {
      try {
        const [vertexRes, fragmentRes] = await Promise.all([
          fetch(vertexShaderPath),
          fetch(fragmentShaderPath),
        ]);

        if (vertexRes.ok && fragmentRes.ok) {
          const [vertexText, fragmentText] = await Promise.all([
            vertexRes.text(),
            fragmentRes.text(),
          ]);
          setVertexShader(vertexText);
          setFragmentShader(fragmentText);
        }
      } catch (error) {
        console.error("Error fetching shader files:", error);
      }
    },
    [vertexShaderPath, fragmentShaderPath]
  );

  useEffect(() => {
    loadShaders();
  }, [loadShaders]);

  return (
    <Canvas
      dpr={[1, 2]}
      className="m-auto my-2 border-blue-500 border-solid border-4"
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
