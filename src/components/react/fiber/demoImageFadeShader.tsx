//@ts-nocheck
import * as THREE from "three";
import { useRef, useState } from "react";
import { Canvas, extend, useFrame, useThree } from "@react-three/fiber";
import { useTexture, shaderMaterial, OrbitControls } from "@react-three/drei";

export const ImageFadeMaterial = shaderMaterial(
  {
    effectFactor: 1.2,
    dispFactor: 0,
    tex: undefined,
    tex2: undefined,
    disp: undefined,
  },
  ` varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
    }`,
  ` varying vec2 vUv;
    uniform sampler2D tex;
    uniform sampler2D tex2;
    uniform sampler2D disp;
    uniform float _rot;
    uniform float dispFactor;
    uniform float effectFactor;
    void main() {
      vec2 uv = vUv;
      vec4 disp = texture2D(disp, uv);
      vec2 distortedPosition = vec2(uv.x + dispFactor * (disp.r*effectFactor), uv.y);
      vec2 distortedPosition2 = vec2(uv.x - (1.0 - dispFactor) * (disp.r*effectFactor), uv.y);
      vec4 _texture = texture2D(tex, distortedPosition);
      vec4 _texture2 = texture2D(tex2, distortedPosition2);
      vec4 finalTexture = mix(_texture, _texture2, dispFactor);
      gl_FragColor = finalTexture;
      #include <tonemapping_fragment>
      #include <colorspace_fragment>
    }`
);

extend({ ImageFadeMaterial });

function FadingImage() {
  const ref = useRef();
  const [texture1, texture2, dispTexture] = useTexture([
    "/assets/xiaoGong.jpg",
    "/assets/xiaoGong.jpg",
    "/assets/xiaoGong.jpg",
  ]);
  const [hovered, setHover] = useState(false);
  useFrame(() => {
    ref.current.dispFactor = THREE.MathUtils.lerp(
      ref.current.dispFactor,
      hovered ? 1 : 0,
      0.05
    );
  });
  const { viewport } = useThree();
  return (
    <mesh
      scale={[viewport.width, viewport.height, 1]}
      onPointerOver={() => setHover(true)}
      onClick={() => {
        setHover(!hovered);
      }}
      onPointerOut={() => setHover(false)}
    >
      <planeGeometry />
      <imageFadeMaterial
        ref={ref}
        tex={texture1}
        tex2={texture2}
        disp={dispTexture}
        toneMapped={false}
      />
      <OrbitControls enablePan={true} zoomSpeed={0.5} />
    </mesh>
  );
}

export default function App() {
  return (
    <Canvas
      className="max-w-[100vw]"
      style={{ width: "250px", height: "208px", margin: "auto" }}
      camera={{ position: [0, 0, 2], fov: 50 }}
    >
      <FadingImage />
    </Canvas>
  );
}
