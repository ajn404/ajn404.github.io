// Author @patriciogv ( patriciogonzalezvivo.com ) - 2015

#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265358979323846

uniform vec2 u_resolution;
uniform float u_time;
varying vec2 v_uv;

vec2 rotate2D(vec2 _st, float _angle) {
    _st -= 0.5;
    _st = mat2(cos(_angle), -sin(_angle), sin(_angle), cos(_angle)) * _st;
    _st += 0.5;
    return _st;
}

vec2 tile(vec2 _st, float _zoom) {
    _st *= _zoom;
    return fract(_st);
}

vec2 rotateTilePattern(vec2 _st) {

    //  Scale the coordinate system by 2x2
    _st *= 2.0;

    //  Give each cell an index number
    //  according to its position
    float index = 0.0;
    index += step(1., mod(_st.x, 2.0));
    index += step(1., mod(_st.y, 2.0)) * 2.0;

    //      |
    //  2   |   3
    //      |
    //--------------
    //      |
    //  0   |   1
    //      |

    // Make each cell between 0.0 - 1.0
    _st = fract(_st);

    // Rotate each cell according to the index
    if(index == 1.0) {
        //  Rotate cell 1 by 90 degrees
        _st = rotate2D(_st, PI * 0.5);
    } else if(index == 2.0) {
        //  Rotate cell 2 by -90 degrees
        _st = rotate2D(_st, PI * -0.5);
    } else if(index == 3.0) {
        //  Rotate cell 3 by 180 degrees
        _st = rotate2D(_st, PI);
    }

    return _st;
}

float borderRect(vec2 uv, vec2 size, float borderWidth) {
    vec2 dist = abs(uv - size * 0.5) - size * 0.5 + vec2(borderWidth * 0.5);
    return max(max(dist.x, dist.y), 0.0) < borderWidth ? 1.0 : 0.0;
}

void main(void) {
    vec2 st = gl_FragCoord.xy / u_resolution.xy;


    vec2 u_size = vec2(1., 1.); // Constant rectangle size (80% width, 60% height)
    float u_borderWidth = 0.2;
    float border = borderRect(v_uv, u_size, u_borderWidth);

    vec4 color = vec4(1.0, 1.0, 1.0, 1.0); // Red border color

    st = tile(st, 3.0);
    st = rotate2D(st, -PI * sin(u_time * 0.5));
    st = rotateTilePattern(st);

    // Make more interesting combinations
    st = tile(st, 2.0);
    st = rotate2D(st, -PI * u_time * 0.1);
    st = rotateTilePattern(st * 0.5);
    st = rotate2D(st, PI * u_time * 0.1);

    // step(st.x,st.y) just makes a b&w triangles
    // but you can use whatever design you want.
     gl_FragColor = vec4(color.rgb, st.x * border);
}
