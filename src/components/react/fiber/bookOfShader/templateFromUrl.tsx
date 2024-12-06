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
      material.dispose();
      geometry.dispose();
    };
  }, [material, geometry]);

  useEffect(() => {
    const pixelRatio = window.devicePixelRatio || 2;
    gl.setPixelRatio(pixelRatio);
    gl.setSize(size.width, size.height);
    material.uniforms.u_resolution.value.set(size.width, size.height);
  }, [size.width, size.height, gl, material]);

  useFrame(({ clock }) => {
    material.uniforms.u_time.value = clock.getElapsedTime();
    material.uniforms.u_mouse.value.set(mouse.x, mouse.y);
  });

  useEffect(() => {
    const canvas = gl.domElement;

    const handleContextLost = (event: Event) => {
      event.preventDefault();
      console.log("WebGL context lost. Attempting to restore...");
    };

    const handleContextRestored = () => {
      console.log("WebGL context restored");
      // 重新初始化必要的 WebGL 资源
      gl.setPixelRatio(window.devicePixelRatio || 2);
      gl.setSize(size.width, size.height);
      material.uniforms.u_resolution.value.set(size.width, size.height);
    };

    canvas.addEventListener("webglcontextlost", handleContextLost);
    canvas.addEventListener("webglcontextrestored", handleContextRestored);

    return () => {
      canvas.removeEventListener("webglcontextlost", handleContextLost);
      canvas.removeEventListener("webglcontextrestored", handleContextRestored);
    };
  }, [gl, size, material]);

  useEffect(() => {
    if (meshRef.current) {
      meshRef.current.position.z = 0;
    }
  }, []);

  return <mesh ref={meshRef} material={material} geometry={geometry}></mesh>;
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
    const { clientX, clientY } = event;
    setMouse({ x: clientX, y: clientY });
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  const loadShaders = useCallback(async () => {
    try {
      const [vertexRes, fragmentRes] = await Promise.all([
        fetch(vertexShaderPath),
        fetch(fragmentShaderPath),
      ]);

      if (!vertexRes.ok || !fragmentRes.ok) {
        throw new Error(
          `Failed to load shaders: ${vertexRes.status}, ${fragmentRes.status}`
        );
      }

      const [vertexText, fragmentText] = await Promise.all([
        vertexRes.text(),
        fragmentRes.text(),
      ]);

      setVertexShader(vertexText);
      setFragmentShader(fragmentText);
    } catch (error) {
      console.error("Error fetching shader files:", error);
    }
  }, [vertexShaderPath, fragmentShaderPath]);

  useEffect(() => {
    loadShaders();
  }, [loadShaders]);

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
          onCreated={({ gl }) => {
            gl.setClearColor("black");
          }}
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
