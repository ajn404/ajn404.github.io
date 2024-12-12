import React, {
  useRef,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ShaderMaterial, TextureLoader } from "three";
import * as THREE from "three";

const CustomShaderCube: React.FC<{
  mouse: { x: number; y: number };
  vertexShader: string;
  fragmentShader: string;
  texturePaths: string[];
}> = ({ mouse, vertexShader, fragmentShader, texturePaths }) => {
  const geometry = useMemo(() => new THREE.PlaneGeometry(2, 2), []);
  const material = useMemo(() => {
    const uniforms: Record<string, any> = {
      u_time: { value: 0 },
      u_resolution: { value: new THREE.Vector2() },
      u_mouse: { value: new THREE.Vector2() },
    };

    // Initialize uniforms for each texture
    texturePaths.forEach((_, index) => {
      uniforms[`u_texture${index}`] = { value: null };
    });

    return new ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
    });
  }, [vertexShader, fragmentShader]);

  const { size, gl } = useThree();

  useEffect(() => {
    const pixelRatio = window.devicePixelRatio || 2;
    gl.setPixelRatio(pixelRatio);
    gl.setSize(size.width, size.height);
    material.uniforms.u_resolution.value.set(size.width, size.height);

    // Load all textures
    if (texturePaths.length > 0) {
      const textureLoader = new TextureLoader();
      texturePaths.forEach((path, index) => {
        textureLoader.load(path, texture => {
          //禁止重复 repeat
          texture.wrapS = THREE.ClampToEdgeWrapping;
          texture.wrapT = THREE.ClampToEdgeWrapping;
          material.uniforms[`u_texture${index}`].value = texture;
        });
      });
    }
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
  imgPaths?: string;
}> = ({
  vertexShaderPath = "/assets/glsl/all.vert",
  fragmentShaderPath = "/assets/glsl/draft/1.frag",
  width = "45",
  height = "45",
  imgPaths = "",
}) => {
  const [shaders, setShaders] = useState({
    vertexShader: "",
    fragmentShader: "",
  });
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const canvasRef = useRef<HTMLDivElement>(null);
  const texturePaths = imgPaths.split(",").map(path => path.trim());

  const handleMouseMove = useCallback((event: MouseEvent) => {
    setMouse({ x: event.clientX, y: event.clientY });
  }, []);
  const loadShaders = async () => {
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
      { threshold: 0.9 }
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
        minWidth: `${width}vw`,
        minHeight: `${height}vw`,
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
            antialias: true,
            powerPreference: "high-performance",
            preserveDrawingBuffer: true,
            alpha: false,
            stencil: false,
          }}
          onCreated={({ gl }) => {
            const pixelRatio = window.devicePixelRatio || 2;
            gl.setPixelRatio(pixelRatio);
          }}
          className="inline margin-auto"
        >
          <CustomShaderCube
            mouse={mouse}
            vertexShader={shaders.vertexShader}
            fragmentShader={shaders.fragmentShader}
            texturePaths={texturePaths}
          />
        </Canvas>
      )}
    </div>
  );
};

export default App;
