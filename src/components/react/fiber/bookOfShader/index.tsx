import React, { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { ShaderMaterial } from "three";

const vertexShader = `
  void main() {
    gl_Position = vec4(position, 1.0);
  }
`;

const fragmentShader = `
  void main() {
    gl_FragColor = vec4(gl_FragCoord.x / 800.0, gl_FragCoord.y / 600.0, 0.5, 1.0);
  }
`;

const CustomShaderCube: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  const material = new ShaderMaterial({
    vertexShader,
    fragmentShader,
  });

  return (
    <mesh ref={meshRef} material={material}>
      <boxGeometry args={[1, 1, 1]} />
    </mesh>
  );
};

const App: React.FC = () => {
  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <CustomShaderCube />
    </Canvas>
  );
};

export default App;
