    varying vec3 v_uv;
    void main() {
      v_uv = position.xyz;
      gl_Position = vec4(position, 1.0);
    }