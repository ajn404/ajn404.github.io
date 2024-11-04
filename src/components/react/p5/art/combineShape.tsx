import type p5 from "p5";
import Basic from "@components/react/p5/index.tsx";
import { useCallback } from "react";

const vert = `
#ifdef GL_ES
precision highp float;
precision highp int;
#endif

attribute vec3 aPosition;
uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;
uniform mat3 uNormalMatrix;

void main() {
    gl_Position = uProjectionMatrix * uModelViewMatrix * vec4(aPosition, 1.0);
}`;

const frag = `
#ifdef GL_ES
precision highp float;
#endif

#define PI 3.141592653589793238

uniform vec2 res;
uniform float time;

// Signed distance function for an octahedron


float opSmoothUnion( float d1, float d2, float k )
{
    float h = clamp( 0.5 + 0.5*(d2-d1)/k, 0.0, 1.0 );
    return mix( d2, d1, h ) - k*h*(1.0-h);
}


float sdOctahedron(vec3 p, float s) {
    p = abs(p);
    float m = p.x + p.y + p.z - s;
    vec3 q;
    if (3.0 * p.x < m) q = p.xyz;
    else if (3.0 * p.y < m) q = p.yzx;
    else if (3.0 * p.z < m) q = p.zxy;
    else return m * 0.57735027; // 0.57735027 is approximately 1/sqrt(3)
    
    float k = clamp(0.5 * (q.z - q.y + s), 0.0, s);
    return length(vec3(q.x, q.y - s + k, q.z - k));
}

// Signed distance function for a sphere
float sdSphere(vec3 p, float s) {
    return length(p) - s;
}

float SDF(vec3 p) {
  float d = -sin(time * PI / 3.0) * 0.125 + 0.25; 
  return opSmoothUnion(sdOctahedron(p - vec3(d, 0.0, 0.0), 0.2), sdSphere(p + vec3(d, 0.0, 0.0), 0.1), 0.2);
}

void main(void) {
    float minSide = min(res.x, res.y);
    vec2 crd = (gl_FragCoord.xy - res * 0.5) / minSide;
    
    // Compute distance from the fragment to the shapes
    float d = SDF(vec3(crd, 0.0));
    vec3 color = vec3(d);

    // Mix the color based on the distance to the shapes
    color = mix(color, vec3(1.0, 0.0, 0.0), 1.0 - smoothstep(0.0, 1.0 / minSide, abs(d)));
    
    gl_FragColor = vec4(color, 1.0);
}`;

export default () => {
  const sketch = useCallback((p: p5) => {
    let program: p5.Shader;

    p.setup = () => {
      p.pixelDensity(1);
      p.createCanvas(p.windowWidth / 2, 500, p.WEBGL);
      p.noStroke();
      p.fill(1);
      program = p.createShader(vert, frag);
      p.shader(program);
      p.frameRate(120);
    };

    p.draw = () => {
      p.background(0);
      program.setUniform("res", [p.width, p.height]);
      program.setUniform("time", p.frameCount / 120.0);
      p.translate(-p.width / 2, -p.height / 2);
      p.rect(0, 0, p.width, p.height);
    };

    p.windowResized = () => {
      p.resizeCanvas(p.windowWidth / 2, 500);
    };
  }, []);

  return <Basic sketch={sketch} showControls />;
};
