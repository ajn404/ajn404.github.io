import{j as e}from"./jsx-runtime.eyAvPMM5.js";import{r as n}from"./index.-CUiy3Z4.js";import{s as c,e as a,V as l,C as p,u as d,b as m}from"./shaderMaterial.huxFqsw4.js";import"./_commonjsHelpers.4gQjN7DL.js";import"./extends.dGVwEr9R.js";const u=` 
    void main() {
        vec4 modelPosition = modelMatrix * vec4(position, 1.0);
        //将模型坐标乘以模型矩阵，得到顶点的世界坐标
        vec4 viewPosition = viewMatrix * modelPosition;
        //将世界坐标乘以视图矩阵，得到顶点在相机坐标系中的坐标
        vec4 projectionPosition = projectionMatrix * viewPosition;
        //将相机坐标乘以投影矩阵，得到顶点在裁剪坐标系中的坐标。
        gl_Position = projectionPosition;
        //将裁剪坐标赋值给内置变量 gl_Position，它表示最终的顶点位置，用于后续的光栅化和片元处理阶段。
}
//这段代码的目的是将顶点从模型坐标系经过模型、视图和投影变换，最终将其转换为裁剪坐标。
`,v=`
      uniform vec2 resolution;
      float sdCircle(in vec2 p,in float r){
        return length(p)-r;
      }

      void main() {
        vec2 p = (2.0*gl_FragCoord.xy-resolution.xy)/resolution.y;
        
	    float d = sdCircle(p,0.5);
        vec3 col = (d>0.0) ? vec3(0.1,0.6,0.9) : vec3(0.2,0.9,1.0);
        col *= 1.0 - exp(-6.0*abs(d));
	    col *= 0.8 + 0.2*cos(150.0*d);
	    col = mix( col, vec3(1.), 1.-smoothstep(0.0,0.01,abs(d)));
	    gl_FragColor = vec4(col,1.0);
      }
`,r=c({resolution:new l},u,v);a({CircleMaterial:r});function x(){const i=n.useRef(),{viewport:o,size:t}=d();return m((h,s)=>{i.current.time+=s}),e.jsxs("mesh",{scale:[o.width,o.height,1],children:[e.jsx("planeGeometry",{}),e.jsx("circleMaterial",{ref:i,resolution:[t.width*o.dpr,t.height*o.dpr]},r.key)]})}function C(){return e.jsx(p,{style:{height:"300px",margin:"auto"},children:e.jsx(x,{})})}export{C as default};
