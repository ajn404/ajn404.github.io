// @ts-nocheck
import { useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { CircleMaterial } from "./2DGraph";

function ShaderPlane() {
  const ref = useRef();
  const { viewport, size } = useThree();
  useFrame((state, delta) => {
    ref.current.time += delta;
  });
  return (
    <mesh scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry />
      <circleMaterial
        ref={ref}
        key={CircleMaterial.key}
        resolution={[size.width * viewport.dpr, size.height * viewport.dpr]}
      />
    </mesh>
  );
}

export default function App() {
  return (
    <Canvas style={{ height: "300px", margin: "auto" }}>
      <ShaderPlane />
    </Canvas>
  );
}
