#define AA 1   // make this 2 or 3 for antialiasing
#define ZERO (min(u_frame,0))

uniform vec2 u_resolution;
uniform float u_time;
uniform sampler2D u_texture0;
uniform sampler2D u_texture1;
uniform sampler2D u_texture2;
uniform int u_frame;
uniform vec2 u_mouse;
varying vec2 v_uv;

vec2 hash22(vec2 p) {
    p = mod(p, 4.0); // tile
    p = vec2(dot(p, vec2(175.1, 311.7)), dot(p, vec2(260.5, 752.3)));
    return fract(sin(p + 455.) * 18.5453);
}
vec3 voronoi(in vec2 x, float time) {

    vec2 n = floor(x);
    vec2 f = fract(x);
    vec2 mg, mr;
    float md = 8.0;
    for(int j = -1; j <= 1; j++) for(int i = -1; i <= 1; i++) {
            vec2 g = vec2(float(i), float(j));
            vec2 o = hash22(n + g);

            o = 0.5 + 0.5 * sin(time + 6.2831 * o);

            vec2 r = g + o - f;
            float d = dot(r, r);

            if(d < md) {
                md = d;
                mr = r;
                mg = g;
            }
        }

    //----------------------------------
    // second pass: distance to borders
    //----------------------------------
    md = 8.0;
    for(int j = -2; j <= 2; j++) for(int i = -2; i <= 2; i++) {
            vec2 g = mg + vec2(float(i), float(j));
            vec2 o = hash22(n + g);

            o = 0.5 + 0.5 * sin(time + 6.2831 * o);

            vec2 r = g + o - f;

            if(dot(mr - r, mr - r) > 0.00001)
                md = min(md, dot(0.5 * (mr + r), normalize(r - mr)));
        }
    return vec3(1.1 - pow(md, .1));
    return vec3(md, mr);
}

float sdPlane(vec3 p) {
    return p.y;
}
vec3 pal(in float t, in vec3 a, in vec3 b, in vec3 c, in vec3 d) {
    return a + b * cos(6.28318 * (c * t + d));
}

float box(vec3 position, vec3 halfSize, float cornerRadius) {
    position = abs(position) - halfSize + cornerRadius;
    return length(max(position, 0.0)) + min(max(max(position.x, position.y), position.z), 0.0) - cornerRadius;
}
float sdSphere(vec3 p, float s) {
    return length(p) - s;
}
mat2 rotate2d(float _angle) {
    return mat2(cos(_angle), -sin(_angle), sin(_angle), cos(_angle));
}
float sdBox(vec3 p, vec3 b) {
    vec3 d = abs(p) - b;
    return min(max(d.x, max(d.y, d.z)), 0.0) + length(max(d, 0.0));
}

float sdEllipsoid(in vec3 p, in vec3 r) {
    float k0 = length(p / r);
    float k1 = length(p / (r * r));
    return k0 * (k0 - 1.0) / k1;

}

float sdRoundBox(in vec3 p, in vec3 b, in float r) {
    vec3 q = abs(p) - b;
    return min(max(q.x, max(q.y, q.z)), 0.0) + length(max(q, 0.0)) - r;
}

float sdTorus(vec3 p, vec2 t) {
    return length(vec2(length(p.xz) - t.x, p.y)) - t.y;
}
// Tri-Planar blending function. Based on an old Nvidia writeup:
// GPU Gems 3 - Ryan Geiss: https://developer.nvidia.com/gpugems/GPUGems3/gpugems3_ch01.html
vec3 tex3D(sampler2D t, in vec3 p, in vec3 n) {

    n = max(abs(n), 0.001);
    n /= dot(n, vec3(1));
    vec3 tx = texture(t, p.yz).xyz;
    vec3 ty = texture(t, p.zx).xyz;
    vec3 tz = texture(t, p.xy).xyz;

    // Textures are stored in sRGB (I think), so you have to convert them to linear space 
    // (squaring is a rough approximation) prior to working with them... or something like that. :)
    // Once the final color value is gamma corrected, you should see correct looking colors.
    return (tx * tx * n.x + ty * ty * n.y + tz * tz * n.z);

}

float sdHexPrism(vec3 p, vec2 h) {
    vec3 q = abs(p);

    const vec3 k = vec3(-0.8660254, 0.5, 0.57735);
    p = abs(p);
    p.xy -= 2.0 * min(dot(k.xy, p.xy), 0.0) * k.xy;
    vec2 d = vec2(length(p.xy - vec2(clamp(p.x, -k.z * h.x, k.z * h.x), h.x)) * sign(p.y - h.x), p.z - h.y);
    return min(max(d.x, d.y), 0.0) + length(max(d, 0.0));
}

float sdCapsule(vec3 p, vec3 a, vec3 b, float r) {
    vec3 pa = p - a, ba = b - a;
    float h = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
    return length(pa - ba * h) - r;
}

float sdRoundCone(in vec3 p, in float r1, float r2, float h) {
    vec2 q = vec2(length(p.xz), p.y);

    float b = (r1 - r2) / h;
    float a = sqrt(1.0 - b * b);
    float k = dot(q, vec2(-b, a));

    if(k < 0.0)
        return length(q) - r1;
    if(k > a * h)
        return length(q - vec2(0.0, h)) - r2;

    return dot(q, vec2(a, b)) - r1;
}

float dot2(in vec3 v) {
    return dot(v, v);
}
float sdRoundCone(vec3 p, vec3 a, vec3 b, float r1, float r2) {
    // sampling independent computations (only depend on shape)
    vec3 ba = b - a;
    float l2 = dot(ba, ba);
    float rr = r1 - r2;
    float a2 = l2 - rr * rr;
    float il2 = 1.0 / l2;

    // sampling dependant computations
    vec3 pa = p - a;
    float y = dot(pa, ba);
    float z = y - l2;
    float x2 = dot2(pa * l2 - ba * y);
    float y2 = y * y * l2;
    float z2 = z * z * l2;

    // single square root!
    float k = sign(rr) * rr * rr * x2;
    if(sign(z) * a2 * z2 > k)
        return sqrt(x2 + z2) * il2 - r2;
    if(sign(y) * a2 * y2 < k)
        return sqrt(x2 + y2) * il2 - r1;
    return (sqrt(x2 * a2 * il2) + y * rr) * il2 - r1;
}

float sdEquilateralTriangle(in vec2 p) {
    const float k = 1.73205;//sqrt(3.0);
    p.x = abs(p.x) - 1.0;
    p.y = p.y + 1.0 / k;
    if(p.x + k * p.y > 0.0)
        p = vec2(p.x - k * p.y, -k * p.x - p.y) / 2.0;
    p.x += 2.0 - 2.0 * clamp((p.x + 2.0) / 2.0, 0.0, 1.0);
    return -length(p) * sign(p.y);
}

float sdTriPrism(vec3 p, vec2 h) {
    vec3 q = abs(p);
    float d1 = q.z - h.y;
    h.x *= 0.866025;
    float d2 = sdEquilateralTriangle(p.xy / h.x) * h.x;
    return length(max(vec2(d1, d2), 0.0)) + min(max(d1, d2), 0.);
}

// vertical
float sdCylinder(vec3 p, vec2 h) {
    vec2 d = abs(vec2(length(p.xz), p.y)) - h;
    return min(max(d.x, d.y), 0.0) + length(max(d, 0.0));
}

// arbitrary orientation
float sdCylinder(vec3 p, vec3 a, vec3 b, float r) {
    vec3 pa = p - a;
    vec3 ba = b - a;
    float baba = dot(ba, ba);
    float paba = dot(pa, ba);

    float x = length(pa * baba - ba * paba) - r * baba;
    float y = abs(paba - baba * 0.5) - baba * 0.5;
    float x2 = x * x;
    float y2 = y * y * baba;
    float d = (max(x, y) < 0.0) ? -min(x2, y2) : (((x > 0.0) ? x2 : 0.0) + ((y > 0.0) ? y2 : 0.0));
    return sign(d) * sqrt(abs(d)) / baba;
}

float sdCone(in vec3 p, in vec3 c) {
    vec2 q = vec2(length(p.xz), p.y);
    float d1 = -q.y - c.z;
    float d2 = max(dot(q, c.xy), q.y);
    return length(max(vec2(d1, d2), 0.0)) + min(max(d1, d2), 0.);
}

float dot2(in vec2 v) {
    return dot(v, v);
}
float sdCappedCone(in vec3 p, in float h, in float r1, in float r2) {
    vec2 q = vec2(length(p.xz), p.y);

    vec2 k1 = vec2(r2, h);
    vec2 k2 = vec2(r2 - r1, 2.0 * h);
    vec2 ca = vec2(q.x - min(q.x, (q.y < 0.0) ? r1 : r2), abs(q.y) - h);
    vec2 cb = q - k1 + k2 * clamp(dot(k1 - q, k2) / dot2(k2), 0.0, 1.0);
    float s = (cb.x < 0.0 && ca.y < 0.0) ? -1.0 : 1.0;
    return s * sqrt(min(dot2(ca), dot2(cb)));
}

#if 0
// bound, not exact
float sdOctahedron(vec3 p, float s) {
    p = abs(p);
    return (p.x + p.y + p.z - s) * 0.57735027;
}
#else
// exacy distance
float sdOctahedron(vec3 p, float s) {
    p = abs(p);

    float m = p.x + p.y + p.z - s;

    vec3 q;
    if(3.0 * p.x < m)
        q = p.xyz;
    else if(3.0 * p.y < m)
        q = p.yzx;
    else if(3.0 * p.z < m)
        q = p.zxy;
    else
        return m * 0.57735027;

    float k = clamp(0.5 * (q.z - q.y + s), 0.0, s);
    return length(vec3(q.x, q.y - s + k, q.z - k));
}
#endif

float length2(vec2 p) {
    return sqrt(p.x * p.x + p.y * p.y);
}

float length6(vec2 p) {
    p = p * p * p;
    p = p * p;
    return pow(p.x + p.y, 1.0 / 6.0);
}

float length8(vec2 p) {
    p = p * p;
    p = p * p;
    p = p * p;
    return pow(p.x + p.y, 1.0 / 8.0);
}

float sdTorus82(vec3 p, vec2 t) {
    vec2 q = vec2(length2(p.xz) - t.x, p.y);
    return length8(q) - t.y;
}

float sdTorus88(vec3 p, vec2 t) {
    vec2 q = vec2(length8(p.xz) - t.x, p.y);
    return length8(q) - t.y;
}

float sdCylinder6(vec3 p, vec2 h) {
    return max(length6(p.xz) - h.x, abs(p.y) - h.y);
}

//------------------------------------------------------------------

float opS(float d1, float d2) {
    return max(-d2, d1);
}

vec2 opU(vec2 d1, vec2 d2) {
    return (d1.x < d2.x) ? d1 : d2;
}

vec3 opRep(vec3 p, vec3 c) {
    return mod(p, c) - 0.5 * c;
}

vec3 opTwist(vec3 p) {
    float c = cos(10.0 * p.y + 10.0);
    float s = sin(10.0 * p.y + 10.0);
    mat2 m = mat2(c, -s, s, c);
    return vec3(m * p.xz, p.y);
}

//------------------------------------------------------------------
vec2 guv;
vec4 id = vec4(0.);
vec2 map(in vec3 pos) {

    pos = abs(pos);
    pos.xy *= rotate2d(u_time / 5.);
    pos.xy = abs(pos.xy);
    pos.x += 3.1;

    float sh = sin(pos.z / 12. + u_time) * 4.;
    pos.y += sh;

    pos.xy *= rotate2d(-(pos.z) * .1 * .02);
    vec3 p2 = pos;
    vec2 res = vec2(1e10, 0.0);
    pos.z += u_time * 43.5;
    vec2 uv = pos.xz;
    uv.y += step(.0, pos.y) * 200.;
    uv.x += step(.0, pos.y) * 200.;

    guv = uv;

    //pos.y += pos.z / 3.;
    pos.y += .0;

    pos.y = abs(pos.y - .0);
    id.x = pow((pos.y - sh), 1.) / 16.;
   //pos.y*=-1.;
    float d = 35. + 5. * sin(u_time);
    ;
    float dd = 7.;
    id.z = 1. * smoothstep(d - dd, d, pos.y) * smoothstep(d + dd, d, pos.y);

    pos.y -= 0.5;
    float r = 1.3;// + abs(sin(u_time ));
    float s = r / 2.;
    id.y = hash22(floor(pos.xz / r)).x;

    float off = 0.;
    if(mod(floor(id.y * 121.), 32.) == 1.)
        off = 0.2;
    pos.xz = mod(pos.xz, r) - r / 2.;
    float s2 = 2.;

    pos.y -= 33.5 + 5. * sin(u_time);
    //pos.xy /= 4.5;
    //r = 1.;
    float f = 1.;
    float h = 5. * (texture(u_texture0, vec2(u_time / 64., 0.) + f * (floor((uv.xy) / r) * r) / 522. - vec2(.5)).x + .0);
    float h2 = 1.25 * (texture(u_texture2, 1.5 * f * (floor((uv.xy) / r) * r) / 522. - vec2(.5)).x + .0);
    float r2 = 11.;
    vec2 pp = mod(guv, r2) - r2 / 2.;
   // h += 2.*smoothstep(5., 1., .6*length(pp));
    float quant = 15.;
    //h2=pow(h2, 2.) / 4.;

    h = .5 * (h + pow(h / 2., 2.)) + off;
    float beat = pow(abs(sin(u_time / 1.)), 3.);
    h = .1 + 5. * floor(h * quant) / quant + (h2 * 2.) * beat;
    // h = pow(h, 1.05);
    //id.x =h / 8.;//
    if((res.x = box(pos, vec3(s, h, s), .2)) < .0)
        res.y = 1.0;

    return res;
}

const float maxHei = 0.8;
float hit = 0.;
float hidist = .1;

vec2 castRay(in vec3 ro, in vec3 rd) {
    vec2 res = vec2(-1.0, -1.0);

    float tmin = 1.0;
    float tmax = 2000.0;
    float lastid = -1.;
   // float id;
    // raymarch primitives   
    {

        float t = tmin;
        for(int i = 0; i < 100 && t < tmax; i++) {
            vec2 h = map(ro + rd * t);

            if(abs(h.x) < (0.0001 * t)) {
                res = vec2(t, h.y);
                break;
            } else if(abs(h.x) < (0.002 * t) && id.y != lastid) { 

///                hit =1.;
            }
            t += h.x * .5;
            lastid = id.y;
        }
    }

    return res;
}

// https://iquilezles.org/articles/rmshadows
float calcSoftshadow(in vec3 ro, in vec3 rd, in float mint, in float tmax) {
    // bounding volume
    float tp = (maxHei - ro.y) / rd.y;
    if(tp > 0.0)
        tmax = min(tmax, tp);

    float res = 1.0;
    float t = mint;
    for(int i = ZERO; i < 16; i++) {
        float h = map(ro + rd * t).x;
        res = min(res, 8.0 * h / t);
        t += clamp(h, 0.02, 0.10);
        if(res < 0.005 || t > tmax)
            break;
    }
    return clamp(res, 0.0, 1.0);
}

vec3 calcNormal(in vec3 pos) {
    vec2 e = vec2(1.0, -1.0) * 0.5773 * 0.0005;
    return normalize(e.xyy * map(pos + e.xyy).x +
        e.yyx * map(pos + e.yyx).x +
        e.yxy * map(pos + e.yxy).x +
        e.xxx * map(pos + e.xxx).x);

}

float calcAO(in vec3 pos, in vec3 nor) {
    float occ = 0.0;
    float sca = 1.0;
    for(int i = ZERO; i < 5; i++) {
        float hr = 0.01 + 0.12 * float(i) / 4.0;
        vec3 aopos = nor * hr + pos;
        float dd = map(aopos).x;
        occ += -(dd - hr) * sca;
        sca *= 0.95;
    }
    return clamp(1.0 - 3.0 * occ, 0.0, 1.0) * (0.5 + 0.5 * nor.y);
}

mat3 setCamera(in vec3 ro, in vec3 ta, float cr) {
    vec3 cw = normalize(ta - ro);
    vec3 cp = vec3(sin(cr), cos(cr), 0.0);
    vec3 cu = normalize(cross(cw, cp));
    vec3 cv = (cross(cu, cw));
    return mat3(cu, cv, cw);
}
vec3 getLight(vec3 p) {
    float r = 30.;
   return vec3(mod(p.x, 12.), 0., 90. + cos(u_time / 2.) * 172.);
    return vec3(floor((p.x + r / 2.) / r) * r + sin(u_time), 0., 120. + cos(u_time / 2.) * 122.);
}

vec3 light(vec3 p, vec3 rd, vec3 n, vec3 lightPos, vec3 lightCol) {

    float radius = .003;
    float l = length(lightPos - p);
    float ndotl = max(0., dot(n, normalize(lightPos - p)));
    return lightCol * ndotl / max(1., l * l * radius);
}

vec3 lights(vec3 p, vec3 rd, vec3 n) {
    return light(p, rd, n, getLight(p), 1. * vec3(.9, .1, .84));
}

vec3 render(in vec3 ro, in vec3 rd) {
    float bloom = 0.;
    vec3 col = vec3(.0);
    vec2 res = castRay(ro, rd);
    float t = res.x;
    float m = res.y;
    vec3 p = ro + res.x * rd;
    vec3 n = calcNormal(p);
    float ao = calcAO(p, n);
    vec3 albedo = texture(u_texture2, guv / 2. + p.y).xyz;
    vec3 pminusl = normalize(-p - normalize(vec3(11.0, 11.0, 0.0)));
    vec3 bg = 1. * vec3(1.13, .54, 2.3);
    float shadow = 1.;//.5+.5*calcSoftshadow(p, normalize(vec3(.0f, .0f, -1.0f)), .1, 5.);
    vec3 ref = reflect(normalize(p - ro), n);
    float spec = pow(max(0., dot(ref, vec3(.0, .0, -1.0))), 5.) * .5;
    albedo = vec3(.5);

    float v = .8 * voronoi(.01 * guv.xy + vec2(0. + -u_time / 8., 0.), u_time / 2.).y * 1.1;
    albedo = .5 * pal(id.x + u_time / 12. + guv.y / 200., vec3(0.5, 0.5, .5), vec3(0.5, 0.5, 0.5), vec3(.5, .5, .5), vec3(0.0, 0.33, 0.67));
    vec3 albedo2 = .5 * pal(id.x - u_time / 6., vec3(0.5, 0.51, 0.5), vec3(0.1, 0.5, 0.2), vec3(.2, 1., .2), vec3(0.0, 0.33, 0.67));
    vec3 reff = reflect(rd, n);

    vec3 refcol = texture(u_texture1, reff.xz / 2.).xyz;

    if(mod(floor(id.y * 121.), 32.) == 1.) {

        albedo *= 5.;
        bloom = 10.;

    }

//    ao=.1;

    col = bg;
    if(res.x > .0) {
        col = vec3(ao / 5.) + 1. * shadow * albedo * max(.1, dot(pminusl, calcNormal(ro + rd * t)));
        col *= vec3(0.5);
        col += lights(p, rd, n);
        col += bg * spec;
        col += albedo2 * id.z / 1.2;
        col *= 1.5 + (v * v * v / .01) * albedo;
        col = pow(refcol * vec3(.2, .2, .7), vec3(2.)) * 2.;
        col += vec3(pow(id.w, .5)) * vec3(0., 1., 0.);
        col = mix(col, bg, min(1., pow(res.x / 450., 1.5)));

        bloom += id.z * 10.;
        col *= 1. + smoothstep(1.2, 2.5, abs(p.y - .1));

    }    
    return vec3(col);
}

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    vec2 mo = u_mouse.xy / u_resolution.xy;
    float time = u_mouse.x*u_mouse.y + u_time;
    // camera	
    vec3 ro = vec3(4.6 * cos(0.1 * time + 6.0 * mo.x), 1.0 + 2.0 * mo.y, 0.5 + 4.6 * sin(0.1 * time + 6.0 * mo.x));
    vec3 ta = vec3(0., 0.5, .5);
    mat3 ca = setCamera(ro, ta, 0.0);
    vec3 tot = vec3(0.0);
#if AA>1
    for(int m = ZERO; m < AA; m++) for(int n = ZERO; n < AA; n++) {
        // pixel coordinates
            vec2 o = vec2(float(m), float(n)) / float(AA) - 0.5;
            vec2 p = (-u_resolution.xy + 2.0 * (fragCoord + o)) / u_resolution.y;
#else    
            vec2 p = (-u_resolution.xy + 2.0 * fragCoord) / u_resolution.y;
#endif

        // ray direction
            vec3 rd = normalize(vec3(p.xy, .5)) * ca;

        // render	
            vec3 col = render(ro, rd);

		// gamma
            col = pow(col / 1., vec3(.8545));

            tot += col;
#if AA>1
        }
    tot /= float(AA * AA);
#endif
    vec2 q = v_uv;
    tot *= 0.2 + 0.8 * pow(16.0 * q.x * q.y * (1.0 - q.x) * (1.0 - q.y), 1.5);
    fragColor = vec4(tot, 1.0);
}

void main() {
    mainImage(gl_FragColor, gl_FragCoord.xy);
}