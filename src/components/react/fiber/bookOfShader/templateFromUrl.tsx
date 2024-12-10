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
  const geometry = useMemo(() => new THREE.PlaneGeometry(2, 2), []);
  const material = useMemo(() => {
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

  const { size, gl } = useThree();

  useEffect(() => {
    const pixelRatio = window.devicePixelRatio || 2;
    gl.setPixelRatio(pixelRatio);
    gl.setSize(size.width, size.height);
    material.uniforms.u_resolution.value.set(size.width, size.height);

    return () => {
      material.dispose();
      geometry.dispose();
    };
  }, [size, gl, material, geometry]);

  useFrame(({ clock }) => {
    material.uniforms.u_time.value = clock.getElapsedTime();
    material.uniforms.u_mouse.value.set(mouse.x, mouse.y);
  });

  return <mesh material={material} geometry={geometry}></mesh>;
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
  const [shaders, setShaders] = useState({
    vertexShader: "",
    fragmentShader: "",
  });
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const canvasRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((event: MouseEvent) => {
    setMouse({ x: event.clientX, y: event.clientY });
  }, []);
  const loadShaders = async () => {
    try {
      console.log(vertexShaderPath, fragmentShaderPath);
      const [vertexRes, fragmentRes] = await Promise.all([
        fetch(vertexShaderPath),
        fetch(fragmentShaderPath),
      ]);

      if (!vertexRes.ok || !fragmentRes.ok) {
        throw new Error(
          `Failed to load shaders: ${vertexRes.status}, ${fragmentRes.status}`
        );
      }

      const [vertexShader, fragmentShader] = await Promise.all([
        vertexRes.text(),
        fragmentRes.text(),
      ]);

      setShaders({ vertexShader, fragmentShader });
    } catch (error) {
      console.error("Error fetching shader files:", error);
    }
  };
  useEffect(() => {
    loadShaders();
  }, [vertexShaderPath, fragmentShaderPath]);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );

    if (canvasRef.current) observer.observe(canvasRef.current);

    return () => {
      if (canvasRef.current) observer.unobserve(canvasRef.current);
    };
  }, []);

  return (
    <div
      ref={canvasRef}
      style={{
        width: `${width}vw`,
        height: `${height}vw`,
        margin: "auto",
        boxShadow: "rgba(200, 211, 211, 0.2) 0px 7px 29px 0px",
        marginTop: "2rem",
        cursor: "pointer",
      }}
    >
      {isVisible && shaders.vertexShader && shaders.fragmentShader && (
        <Canvas
          dpr={[1, 2]}
          camera={{
            position: [0, 0, 1],
            fov: 45,
            near: 0.1,
            far: 1000,
          }}
          gl={{
            antialias: false,
            powerPreference: "high-performance",
            preserveDrawingBuffer: true,
            alpha: false,
            stencil: false,
          }}
          onCreated={({ gl }) => gl.setClearColor("black")}
          className="inline margin-auto"
        >
          <CustomShaderCube
            mouse={mouse}
            vertexShader={shaders.vertexShader}
            fragmentShader={shaders.fragmentShader}
          />
        </Canvas>
      )}
    </div>
  );
};

export default App;
