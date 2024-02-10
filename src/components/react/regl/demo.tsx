import { useEffect } from "react";
import wrapREGL from "regl";

export default () => {
  useEffect(() => {
    const regl = wrapREGL("#demo");
    const drawTriangle = regl({
      frag: `
  void main() {
    // mainImage(gl_FragColor,vUv*u_resolution.xy);
    gl_FragColor = vec4(1, 0, 0, 1);
  }`,
      vert: `

uniform float time;
  attribute vec2 v_position;
  varying vec2 vUv;
  uniform vec2 u_resolution;
  void main() {
    gl_Position = vec4(v_position, 0, 1);
  }`,

      uniforms: {
        time: ({ time }) => time,
        u_resolution: [0, 0],
      },
      attributes: {
        v_position: [
          [0, -1],
          [-1, 0],
          [1, 1],
        ],
      },

      count: 3,
    });
    regl.frame(() => {
      regl.clear({
        color: [0, 0, 0, 1],
      });
      drawTriangle();
    });
    const destroy = () => {
      regl.destroy();
    };
    return () => {
      destroy();
    };
  });
  return <canvas className="w-full" id="demo"></canvas>;
};
