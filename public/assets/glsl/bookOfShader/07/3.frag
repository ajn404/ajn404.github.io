#ifdef GL_ES
precision mediump float;
#endif

varying vec2 v_uv;

float borderRect(vec2 uv, vec2 size, float borderWidth) {
  vec2 dist = abs(uv - size * 0.5) - size * 0.5 + vec2(borderWidth * 0.5);
  return max(max(dist.x, dist.y), 0.0) < borderWidth ? 1.0 : 0.0;
}

// Helper functions (same as before)
float smoothBorderRect(vec2 uv, vec2 size, float borderWidth) {
  vec2 dist = abs(uv - size * 0.5) - size * 0.5 + vec2(borderWidth * 0.5);
  float d = max(max(dist.x, dist.y), 0.0);
  return smoothstep(borderWidth - borderWidth * 0.5, borderWidth + borderWidth * 0.5, d);
}


void main() {
  vec2 u_size = vec2(0.5, 0.2); // Constant rectangle size (80% width, 60% height)
  float u_borderWidth = 0.2;   // Constant border width

  vec4 color = vec4(1.0, 0.0, 0.0, 1.0); // Red border color

  // Choose either borderRect or smoothBorderRect
  float border = borderRect(v_uv, u_size, u_borderWidth);

  gl_FragColor = vec4(color.rgb, color.a * border);
}


