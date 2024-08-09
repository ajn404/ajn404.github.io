import{j as t}from"./jsx-runtime.d_4F0lZz.js";import{r as n}from"./index.BmQ8WQjo.js";import{e as a,C as c,u as l,b as d}from"./react-three-fiber.esm.DUKo7TOm.js";import{V as p}from"./three.module.CHyI7wyT.js";import"./_sentry-release-injection-file.CYwqXcG7.js";import{s as f}from"./shaderMaterial.CH6iz-vc.js";import"./_commonjsHelpers.B3ooHNLg.js";(function(){try{var e=typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},o=new Error().stack;o&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[o]="40659fe1-b2b3-441e-9d56-f3abcd04b7a0",e._sentryDebugIdIdentifier="sentry-dbid-40659fe1-b2b3-441e-9d56-f3abcd04b7a0")}catch{}})();const m=` 
    void main() {
        vec4 modelPosition = modelMatrix * vec4(position, 1.0);
        //将模型坐标乘以模型矩阵,得到顶点的世界坐标
        vec4 viewPosition = viewMatrix * modelPosition;
        //将世界坐标乘以视图矩阵,得到顶点在相机坐标系中的坐标
        vec4 projectionPosition = projectionMatrix * viewPosition;
        //将相机坐标乘以投影矩阵,得到顶点在裁剪坐标系中的坐标.
        gl_Position = projectionPosition;
        //将裁剪坐标赋值给内置变量 gl_Position,它表示最终的顶点位置,用于后续的光栅化和片元处理阶段.
}
//这段代码的目的是将顶点从模型坐标系经过模型、视图和投影变换,最终将其转换为裁剪坐标.
`,u=`
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
`,r=f({resolution:new p},m,u);a({CircleMaterial:r});function v(){const e=n.useRef(),{viewport:o,size:i}=l();return d((b,s)=>{e.current.time+=s}),t.jsxs("mesh",{scale:[o.width,o.height,1],children:[t.jsx("planeGeometry",{}),t.jsx("circleMaterial",{ref:e,resolution:[i.width*o.dpr,i.height*o.dpr]},r.key)]})}function _(){return t.jsx(c,{style:{height:"300px",margin:"auto"},children:t.jsx(v,{})})}export{_ as default};
//# sourceMappingURL=graph.C2dig-rx.js.map
