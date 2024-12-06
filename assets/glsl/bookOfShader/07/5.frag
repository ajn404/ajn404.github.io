varying vec2 v_uv;
uniform float u_time;
void main() {
  vec2 st = v_uv;
  float pct = 0.0;
  float r = abs(sin(u_time) / 4.) + 0.1;
  // pct = step(r,distance(st, vec2(0.5)));
  // pct = smoothstep(r - 0.1, r + 0.1, distance(st, vec2(0.4)) + distance(st, vec2(0.6)));

  pct = smoothstep(r - 0.1, r + 0.1, distance(st, vec2(0.4)) * distance(st, vec2(0.6)));

  // pct = smoothstep(r - 0.1, r + 0.1, pow(distance(st, vec2(0.4)), distance(st, vec2(0.6))));

  vec3 color = vec3(pct);
  gl_FragColor = vec4(color, 1.0);
}
