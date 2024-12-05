uniform vec2 u_resolution;
uniform float u_time;

//#define 指令会在编译时进行文本替换。也就是说，当你在代码中使用 ss(x) 时，编译器会将其替换为 smoothstep(unit, 0.0, x)
#define ss(x) smoothstep(unit, 0.0, x)
void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    vec2 uv = (fragCoord - 0.5 * u_resolution.xy) / u_resolution.y * 4.0;
    float unit = 8.0 / u_resolution.y;
    vec3 color = vec3(0.75, 0.0, 0.0);

    float w = 15.0 / u_resolution.y, hw = 0.5 * w;
    float stripeMask = ss(abs(mod(dot(uv, vec2(0.71, -0.71)) + hw, w) - hw));

    vec2 stripeUv1 = mod(vec2(uv.x, uv.y + 2.0), 4.0) - 2.0;
    vec2 stripeUv2 = abs(stripeUv1) - 0.75;
    vec2 stripeUv3 = abs(stripeUv1) - 0.55;
    vec2 stripeUv4 = abs(stripeUv1) - 0.9;

    float vertBlueStripes = abs(stripeUv2.x) - 0.35;
    color = mix(color, vec3(0.0, 0.0, 0.6), ss(vertBlueStripes) * stripeMask);

    float horiBlueStripes = abs(stripeUv2.y) - 0.35;
    color = mix(color, vec3(0.0, 0.0, 0.6), ss(horiBlueStripes) * stripeMask);

    color = mix(color, vec3(0.0, 0.0, 0.5), ss(max(vertBlueStripes, horiBlueStripes)));

    float vertGreenStripes = abs(stripeUv3.x) - 0.15;
    color = mix(color, vec3(0.0, 0.45, 0.0), ss(vertGreenStripes) * stripeMask);

    float horiGreenStripes = abs(stripeUv3.y) - 0.15;
    color = mix(color, vec3(0.0, 0.45, 0.0), ss(horiGreenStripes) * stripeMask);

    color = mix(color, vec3(0.0, 0.375, 0.0), ss(max(vertGreenStripes, horiGreenStripes)));

    float vertBlackStripes = abs(stripeUv4.x) - 0.075;
    color = mix(color, vec3(0.0), ss(vertBlackStripes) * stripeMask);

    float horiBlackStripes = abs(stripeUv4.y) - 0.075;
    color = mix(color, vec3(0.0), ss(horiBlackStripes) * stripeMask);

    color = mix(color, vec3(0.0), ss(max(vertBlackStripes, horiBlackStripes)));

    float whiteStripes = min(abs(stripeUv1.x), abs(stripeUv1.y));
    color = mix(color, vec3(1.0), ss(whiteStripes) * stripeMask);

    float blackStripes = min(abs(abs(stripeUv1.x) - 0.1), abs(abs(stripeUv1.y) - 0.1));
    color = mix(color, vec3(0.0), ss(blackStripes) * stripeMask);

    float yellowStripes = min(abs(abs(stripeUv2.x) - 0.05), abs(abs(stripeUv2.y) - 0.05));

    color = mix(color, vec3(abs(sin(u_time)), abs(cos(u_time)), 0.0), ss(yellowStripes) * stripeMask);

    fragColor = vec4(color, 1.0);
}

void main() {
    mainImage(gl_FragColor, gl_FragCoord.xy);
}