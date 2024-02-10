//@ts-nocheck
import { useRef } from "react";
import { Canvas, extend, useFrame, useThree } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";

export const TimeShaderMaterial = shaderMaterial(
  {
    time: 0,
  },
  `varying vec2 vUv;
      void main() {
        vec4 modelPosition = modelMatrix * vec4(position, 1.0);
        vec4 viewPosition = viewMatrix * modelPosition;
        vec4 projectionPosition = projectionMatrix * viewPosition;
        gl_Position = projectionPosition;
        vUv = uv;
      }`,
  `uniform float time;
    varying vec2 vUv;
    void main() {
      vec2 uv = vUv;
      vec4 tl = vec4((cos(time)+1.)/2.,0.,0.,(sin(time)+1.)/2.);
    vec4 tr = vec4(0.,0.,(sin(time)+1.)/2.,(cos(time)+1.)/2.);
    vec4 bl = vec4(0.,(cos(time)+1.)/2.,(sin(time)+1.)/2.,1.);
    vec4 br = vec4((sin(time)+1.)/2.,1.,0.,(cos(time)+1.)/2.);
    vec4 color = mix(mix(tl,tr,uv.x),mix(bl,br,uv.x),uv.y);
    gl_FragColor = color;
    }`
);

extend({ TimeShaderMaterial });

function FadingImage() {
  const ref = useRef();
  useFrame((state, delta, xrFrame) => {
    // ref.current.time = 1;
    ref.current.time += delta;
  });
  const { viewport } = useThree();
  return (
    <mesh scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry />
      <timeShaderMaterial ref={ref} key={TimeShaderMaterial.key} />
    </mesh>
  );
}

export default function App() {
  return (
    <Canvas
      className="max-w-[100%]"
      style={{ width: "500px", height: "416px", margin: "auto" }}
      camera={{ position: [0, 0, 2], fov: 50 }}
    >
      <FadingImage />
    </Canvas>
  );
}
