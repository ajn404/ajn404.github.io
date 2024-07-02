import{j as e}from"./jsx-runtime.eyAvPMM5.js";import{r as s}from"./index.-CUiy3Z4.js";import{s as a,e as m,C as n,b as v,u as c}from"./shaderMaterial.huxFqsw4.js";import"./_commonjsHelpers.4gQjN7DL.js";import"./extends.dGVwEr9R.js";const o=a({time:0},`varying vec2 vUv;
      void main() {
        vec4 modelPosition = modelMatrix * vec4(position, 1.0);
        vec4 viewPosition = viewMatrix * modelPosition;
        vec4 projectionPosition = projectionMatrix * viewPosition;
        gl_Position = projectionPosition;
        vUv = uv;
      }`,`uniform float time;
    varying vec2 vUv;
    void main() {
      vec2 uv = vUv;
      vec4 tl = vec4((cos(time)+1.)/2.,0.,0.,(sin(time)+1.)/2.);
    vec4 tr = vec4(0.,0.,(sin(time)+1.)/2.,(cos(time)+1.)/2.);
    vec4 bl = vec4(0.,(cos(time)+1.)/2.,(sin(time)+1.)/2.,1.);
    vec4 br = vec4((sin(time)+1.)/2.,1.,0.,(cos(time)+1.)/2.);
    vec4 color = mix(mix(tl,tr,uv.x),mix(bl,br,uv.x),uv.y);
    gl_FragColor = color;
    }`);m({TimeShaderMaterial:o});function l(){const i=s.useRef();v((x,r,p)=>{i.current.time+=r});const{viewport:t}=c();return e.jsxs("mesh",{scale:[t.width,t.height,1],children:[e.jsx("planeGeometry",{}),e.jsx("timeShaderMaterial",{ref:i},o.key)]})}function j(){return e.jsx(n,{className:"max-w-[100%]",style:{width:"500px",height:"416px",margin:"auto"},camera:{position:[0,0,2],fov:50},children:e.jsx(l,{})})}export{j as default};
