import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export interface ModelViewerProps {
  url?: string;
  className?: string;
}

const ModelViewer: React.FC = ({
  url = "/assets/models/gltf/model.glb",
  className = "",
}: ModelViewerProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const loadingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Canvas and Scene setup
    const canvas = canvasRef.current;
    if (!canvas) return;

    const scene = new THREE.Scene();
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    });
    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      10,
      canvas.clientWidth / canvas.clientHeight,
      0.1,
      100
    );
    camera.position.set(8, 4, 15);

    // Controls setup
    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;
    controls.enableZoom = true;
    controls.enablePan = true;
    controls.minPolarAngle = Math.PI / 5;
    controls.maxPolarAngle = Math.PI / 2;
    const minPan = new THREE.Vector3(-2, -0.5, -2);
    const maxPan = new THREE.Vector3(2, 0.5, 2);

    // Materials and Textures
    const textureLoader = new THREE.TextureLoader();
    const bakedTexture = textureLoader.load("/assets/bg/2.webp");
    const bakedMaterial = new THREE.MeshBasicMaterial({ map: bakedTexture });

    // Model Loading
    const loader = new GLTFLoader();
    loader.load(
      url,
      gltf => {
        const model = gltf.scene;
        model.traverse(child => {
          if (child instanceof THREE.Mesh) {
            //  确保child是Mesh对象
            child.material = bakedMaterial;
          }
        });
        scene.add(model);
        scene.position.set(0, 0.2, 0);
        if (loadingRef.current) loadingRef.current.style.display = "none";
      },
      xhr => {
        console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
      }
    );

    // Resize handling
    const handleResize = () => {
      if (!canvas || !renderer || !camera) return;
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // initial call

    // Animation loop
    const animate = () => {
      controls.update();
      controls.target.clamp(minPan, maxPan);
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();

    // 禁用鼠标滚动事件
    const handleWheel = (event: WheelEvent) => {
      // event.preventDefault(); // 阻止默认的滚动行为
      event.stopPropagation();
    };
    canvas.addEventListener("wheel", handleWheel);

    return () => {
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("wheel", handleWheel);
      renderer.dispose(); // 清理资源
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className={`webgl w-1/2 m-auto touch-none ${className}`}
      />
      <div id="loader" ref={loadingRef}>
        <h1>Loading</h1>
      </div>
    </>
  );
};

export default ModelViewer;
