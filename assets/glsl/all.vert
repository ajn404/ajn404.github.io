    varying vec2 v_uv;
    void main() {
      v_uv = (position.xy+1.0)/2.0;
      gl_Position = vec4(position, 1.0);
    }