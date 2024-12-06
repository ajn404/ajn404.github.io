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
    return () => {
      material.dispose(); // 释放材质资源
      meshRef.current?.geometry.dispose(); // 释放几何体资源
    };
  }, [material]);

  useEffect(() => {
    gl.setPixelRatio(window.devicePixelRatio || 2);
    gl.setSize(size.width, size.height);
    material.uniforms.u_resolution.value.set(size.width, size.height);
  }, [size, gl, material]);

  useFrame(({ clock }) => {
    material.uniforms.u_time.value = clock.getElapsedTime();
    material.uniforms.u_mouse.value.set(mouse.x, mouse.y);
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
  const [isVisible, setIsVisible] = useState(false); // 控制可视状态
  const canvasRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((event: MouseEvent) => {
    setMouse({ x: event.clientX, y: event.clientY });
  }, []);

  useEffect(() => {
    const loadShaders = async () => {
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
        } else {
          console.error(
            "Failed to load shaders:",
            vertexRes.status,
            fragmentRes.status
          );
        }
      } catch (error) {
        console.error("Error fetching shader files:", error);
      }
    };

    loadShaders();
  }, [vertexShaderPath, fragmentShaderPath]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 } // 控制在 10% 可见时触发
    );

    if (canvasRef.current) {
      observer.observe(canvasRef.current);
    }

    return () => {
      if (canvasRef.current) {
        observer.unobserve(canvasRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={canvasRef}
      style={{
        width: `${width}vw`,
        height: `${height}vw`,
        border: "4px solid blue",
        margin: "auto",
        marginTop: "2rem",
      }}
    >
      {isVisible && vertexShader && fragmentShader && (
        <Canvas
          dpr={[1, 2]}
          gl={{ antialias: false }}
          camera={{ position: [0, 0, 15], fov: 17.5, near: 1, far: 20 }}
          onCreated={({ gl }) => gl.setClearColor("black")}
        >
          <CustomShaderCube
            mouse={mouse}
            vertexShader={vertexShader}
            fragmentShader={fragmentShader}
          />
        </Canvas>
      )}
    </div>
  );
};

export default App;
