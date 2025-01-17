import React, {
  useRef,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ShaderMaterial, TextureLoader, ClampToEdgeWrapping } from "three";
import * as THREE from "three";

// CustomShaderCube 组件
const CustomShaderCube: React.FC<{
  mouse: { x: number; y: number };
  vertexShader: string;
  fragmentShader: string;
  texturePaths: string[];
}> = ({ mouse, vertexShader, fragmentShader, texturePaths }) => {
  const geometry = useMemo(() => new THREE.PlaneGeometry(2, 2), []);
  const material = useMemo(() => {
    const uniforms = {
      u_time: { value: 0 },
      u_resolution: { value: new THREE.Vector2() },
      u_mouse: { value: new THREE.Vector2() },
      u_frame: { value: 0 }, // 添加u_frame
    };

    // 动态创建纹理的 uniform
    texturePaths.forEach((_, index) => {
      uniforms[`u_texture${index}`] = { value: null };
    });

    return new ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
    });
  }, [vertexShader, fragmentShader, texturePaths]);

  const { size, gl } = useThree();
  const frameCountRef = useRef(0);
  useEffect(() => {
    material.uniforms.u_resolution.value.set(size.width, size.height);

    const textureLoader = new TextureLoader();
    texturePaths.forEach((path, index) => {
      textureLoader.load(path, texture => {
        texture.wrapS = ClampToEdgeWrapping;
        texture.wrapT = ClampToEdgeWrapping;
        material.uniforms[`u_texture${index}`].value = texture;
      });
    });

    return () => {
      material.dispose();
      geometry.dispose();
    };
  }, [size, material, texturePaths, geometry]);

  useFrame(({ clock }) => {
    material.uniforms.u_time.value = clock.getElapsedTime();
    material.uniforms.u_mouse.value.set(mouse.x, mouse.y);
    material.uniforms.u_frame.value = frameCountRef.current;
    frameCountRef.current += 1;
  });

  return <mesh geometry={geometry} material={material} />;
};

// App 组件
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
  const [isLoading, setIsLoading] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const canvasRef = useRef<HTMLDivElement>(null);
  const texturePaths = useMemo(
    () => imgPaths.split(",").map(path => path.trim()),
    [imgPaths]
  );

  // 加载 Shader 文件
  const loadShaders = useCallback(async () => {
    try {
      setIsLoading(true);
      const [vertexRes, fragmentRes] = await Promise.all([
        fetch(vertexShaderPath),
        fetch(fragmentShaderPath),
      ]);

      if (!vertexRes.ok || !fragmentRes.ok)
        throw new Error("Failed to load shaders.");

      const [vertexShader, fragmentShader] = await Promise.all([
        vertexRes.text(),
        fragmentRes.text(),
      ]);

      setShaders({ vertexShader, fragmentShader });
    } catch (error) {
      console.error("Error loading shaders:", error);
    } finally {
      setIsLoading(false);
    }
  }, [vertexShaderPath, fragmentShaderPath]);

  useEffect(() => {
    loadShaders();
  }, [loadShaders]);

  // 鼠标移动事件
  const handleMouseMove = useCallback(
    (event: MouseEvent | TouchEvent) => {
      if (!canvasRef.current) return;
      const rect = canvasRef.current.getBoundingClientRect();
      const clientX =
        "clientX" in event ? event.clientX : event.touches[0]?.clientX;
      const clientY =
        "clientY" in event ? event.clientY : event.touches[0]?.clientY;

      setMouse({
        x: (clientX - rect.left) / rect.width,
        y: 1 - (clientY - rect.top) / rect.height,
      });
    },
    [canvasRef]
  );

  useEffect(() => {
    const ref = canvasRef.current;
    if (ref) {
      ref.addEventListener("mousemove", handleMouseMove);
      ref.addEventListener("touchmove", handleMouseMove);
    }
    return () => {
      if (ref) {
        ref.removeEventListener("mousemove", handleMouseMove);
        ref.removeEventListener("touchmove", handleMouseMove);
      }
    };
  }, [handleMouseMove]);

  // 可见性观察
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );

    if (canvasRef.current) observer.observe(canvasRef.current);
    return () => observer.disconnect();
  }, []);

  // 处理全屏切换
  const handleFullscreenToggle = useCallback(async () => {
    if (!canvasRef.current) return;

    if (!document.fullscreenElement) {
      try {
        await canvasRef.current.requestFullscreen();
        setIsFullscreen(true);
      } catch (err) {
        console.error("全屏切换失败:", err);
      }
    } else {
      await document.exitFullscreen();
      setIsFullscreen(false);
    }
  }, []);

  // 监听全屏变化
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  return (
    <div
      ref={canvasRef}
      onClick={handleFullscreenToggle}
      style={{
        width: isFullscreen ? "80vh" : `${width}vw`,
        height: isFullscreen ? "80vh" : `${height}vw`,
        margin: "2rem auto",
        padding: isFullscreen ? "10vh calc(50vw - 40vh)" : "0",
        boxShadow: "rgba(200, 211, 211, 0.2) 0px 7px 29px 0px",
        cursor: "pointer",
      }}
    >
      {isLoading || !isVisible ? (
        <div className="flex justify-center items-center h-full">
          Loading...
        </div>
      ) : (
        <Canvas
          dpr={[1, 2]}
          camera={{ position: [0, 0, 1], fov: 45 }}
          gl={{
            antialias: true,
            powerPreference: "high-performance",
            alpha: false,
          }}
          className="w-full h-full"
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
