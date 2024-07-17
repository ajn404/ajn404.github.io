import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";

const ShaderComponent = () => {
  const canvasRef = useRef(null);
  const [renderer, setRenderer] = useState(null);
  const [scene, setScene] = useState(null);
  const [camera, setCamera] = useState(null);
  const [material, setMaterial] = useState(null);
  const [mesh, setMesh] = useState(null);

  useEffect(() => {
    // 初始化 Three.js 场景
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 1;

    // 创建材质
    const material = new THREE.ShaderMaterial({
      uniforms: {
        iResolution: {
          value: new THREE.Vector2(window.innerWidth, window.innerHeight),
        },
        iTime: { value: 0.0 },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        uniform vec2 iResolution;
        uniform float iTime;

        vec2 rotatedVector(vec2 vector, float angle) {
          float s = sin(angle);
          float c = cos(angle);
          return vec2(vector.x * c - vector.y * s, vector.x * s + vector.y * c);
        }

        bool isInStripe(float coord, float gridStep, float gridStepRatio) {
          float modulo = mod(coord, gridStep);
          return modulo < gridStep * gridStepRatio;
        }

        bool xor(bool a, bool b) {
          return (a || b) && !(a && b);
        }

        vec4 boolToBlackAndWhite(bool isBlack) {
          return isBlack ? vec4(0.0, 0.0, 0.0, 1.0) : vec4(1.0, 1.0, 1.0, 1.0);
        }

        vec4 outColor() {
          vec2 fragCoord = vUv * iResolution;
          vec2 imageResolution = iResolution;
          vec2 imageCenterCoords = imageResolution / 2.0;
          vec2 vectorFromCenterToPixel = fragCoord - imageCenterCoords;
          float rotationSpeed = 10.0;
          float rotationAngle = iTime / rotationSpeed;
          vec2 transformedCoords = rotatedVector(vectorFromCenterToPixel, rotationAngle);
          float gridStep = 100.0;
          float gridStepRatio = 0.3;
          bool isInVerticalStripe = isInStripe(transformedCoords.y, gridStep, gridStepRatio);
          bool isInHorizonalStripe = isInStripe(transformedCoords.x, gridStep, gridStepRatio);
          bool isBlack = xor(isInVerticalStripe, isInHorizonalStripe);
          return boolToBlackAndWhite(isBlack);
        }

        void main() {
          gl_FragColor = outColor();
        }
      `,
    });

    // 创建网格
    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // 渲染循环
    const animate = () => {
      requestAnimationFrame(animate);
      material.uniforms.iTime.value += 0.001;
      renderer.render(scene, camera);
    };
    animate();

    setRenderer(renderer);
    setScene(scene);
    setCamera(camera);
    setMaterial(material);
    setMesh(mesh);
  }, []);

  return (
    <canvas
      className="w-full h-full fixed -z-10 left-0 top-0"
      ref={canvasRef}
    />
  );
};

export default ShaderComponent;
