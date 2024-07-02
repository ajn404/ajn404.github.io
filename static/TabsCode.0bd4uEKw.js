import{j as i}from"./jsx-runtime.eyAvPMM5.js";import{r}from"./index.-CUiy3Z4.js";import{_ as b}from"./extends.dGVwEr9R.js";import{a as B,d as h,e as v,b as N}from"./index.WyRi3h68.js";import{$ as C,a as I,b as z}from"./index.Z-MfmmJZ.js";import{$ as S}from"./index.t0TSUQ0t.js";import{a as P}from"./index.fJQh6Djz.js";import{$ as D}from"./index.KWPwBCyF.js";import{c as y}from"./utils.aQmm6d3C.js";import{E as G,b as K,j as L}from"./index.TuoKsT2g.js";import R from"./index.Trgf9OPz.js";import{M as E}from"./Mover.DowCe0M0.js";import"./slider.G7fpHbN7.js";import"./_commonjsHelpers.4gQjN7DL.js";import"./extends.xVCzrl0K.js";import"./index.H_lZwl8T.js";import"./index.bhhuXz_A.js";import"./index.KjuS0gPF.js";import"./preload-helper.hlDPvxQM.js";import"./react-icons.esm.To_RoUAc.js";import"./index.XbEcFK9n.js";import"./index.re0CaKVP.js";const M="Tabs",[q,ke]=B(M,[C]),T=C(),[O,F]=q(M),H=r.forwardRef((t,e)=>{const{__scopeTabs:o,value:n,onValueChange:s,defaultValue:a,orientation:c="horizontal",dir:l,activationMode:d="automatic",...u}=t,m=P(l),[f,p]=N({prop:n,onChange:s,defaultProp:a});return r.createElement(O,{scope:o,baseId:D(),value:f,onValueChange:p,orientation:c,dir:m,activationMode:d},r.createElement(h.div,b({dir:m,"data-orientation":c},u,{ref:e})))}),J="TabsList",Q=r.forwardRef((t,e)=>{const{__scopeTabs:o,loop:n=!0,...s}=t,a=F(J,o),c=T(o);return r.createElement(I,b({asChild:!0},c,{orientation:a.orientation,dir:a.dir,loop:n}),r.createElement(h.div,b({role:"tablist","aria-orientation":a.orientation},s,{ref:e})))}),U="TabsTrigger",X=r.forwardRef((t,e)=>{const{__scopeTabs:o,value:n,disabled:s=!1,...a}=t,c=F(U,o),l=T(o),d=W(c.baseId,n),u=k(c.baseId,n),m=n===c.value;return r.createElement(z,b({asChild:!0},l,{focusable:!s,active:m}),r.createElement(h.button,b({type:"button",role:"tab","aria-selected":m,"aria-controls":u,"data-state":m?"active":"inactive","data-disabled":s?"":void 0,disabled:s,id:d},a,{ref:e,onMouseDown:v(t.onMouseDown,f=>{!s&&f.button===0&&f.ctrlKey===!1?c.onValueChange(n):f.preventDefault()}),onKeyDown:v(t.onKeyDown,f=>{[" ","Enter"].includes(f.key)&&c.onValueChange(n)}),onFocus:v(t.onFocus,()=>{const f=c.activationMode!=="manual";!m&&!s&&f&&c.onValueChange(n)})})))}),Y="TabsContent",Z=r.forwardRef((t,e)=>{const{__scopeTabs:o,value:n,forceMount:s,children:a,...c}=t,l=F(Y,o),d=W(l.baseId,n),u=k(l.baseId,n),m=n===l.value,f=r.useRef(m);return r.useEffect(()=>{const p=requestAnimationFrame(()=>f.current=!1);return()=>cancelAnimationFrame(p)},[]),r.createElement(S,{present:s||m},({present:p})=>r.createElement(h.div,b({"data-state":m?"active":"inactive","data-orientation":l.orientation,role:"tabpanel","aria-labelledby":d,hidden:!p,id:u,tabIndex:0},c,{ref:e,style:{...t.style,animationDuration:f.current?"0s":void 0}}),p&&a))});function W(t,e){return`${t}-trigger-${e}`}function k(t,e){return`${t}-content-${e}`}const ee=H,V=Q,_=X,j=Z,te=ee,A=r.forwardRef(({className:t,...e},o)=>i.jsx(V,{ref:o,className:y("inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",t),...e}));A.displayName=V.displayName;const x=r.forwardRef(({className:t,...e},o)=>i.jsx(_,{ref:o,className:y("inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",t),...e}));x.displayName=_.displayName;const g=r.forwardRef(({className:t,...e},o)=>i.jsx(j,{ref:o,className:y("mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",t),...e}));g.displayName=j.displayName;const oe=({children:t})=>{const e=r.useRef(null);return r.useEffect(()=>{if(e.current){const o=e.current,n=new G({extensions:[K,L()],parent:o||document.body});t&&n.dispatch({changes:{from:0,to:0,insert:t}})}},[t]),i.jsx("div",{id:"editor",className:"bg-[#000]",ref:e})};class ne extends E{mass;constructor(e){super(e),this.velocity=e.createVector(0,0),this.acceleration=e.createVector(0,0),this.mass=10}applyForce(e){let o=e.copy();o.div(this.mass),this.acceleration.add(o)}}const re=()=>{const t=e=>{let o;const n=()=>{e.createCanvas(e.windowWidth/2,240),o=new ne(e),e.frameRate(120)},s=()=>{o.move(),o.checkEdges(),o.show()},a=()=>e.setup();e.setup=n,e.draw=s,e.windowResized=a};return i.jsx(R,{sketch:t,showControls:!0})};class $ extends E{mass;constructor(e,o,n,s){super(e),this.name=o||this.name,this.circleRadius=n||this.circleRadius,this.color=s||this.color,this.velocity=e.createVector(0,0),this.acceleration=e.createVector(0,0),this.mass=1}applyForce(e){let o=e.copy();o.div(this.mass),this.acceleration.add(o)}move(){this.velocity.add(this.acceleration),this.position.add(this.velocity),this.acceleration.mult(0)}checkEdges(){const e=this.p;(this.position.x+this.circleRadius>e.width||this.position.x<this.circleRadius)&&(this.velocity.x*=-1,this.position.x+this.circleRadius>e.width&&(this.position.x=e.width-this.circleRadius)),(this.position.y+this.circleRadius>e.height||this.position.y<this.circleRadius)&&(this.velocity.y*=-1,this.position.y+this.circleRadius>e.height&&(this.position.y=e.height-this.circleRadius))}}const se=()=>{const t=e=>{let o,n,s;const a=()=>{e.createCanvas(e.windowWidth/2,240),o=new $(e,"mover",32),n=new $(e,"press mouse",32),n.position=e.createVector(e.width/2,n.circleRadius),s=new Array(3).fill(0).map((d,u)=>new $(e,"mover"+u,e.random(16,32))),e.frameRate(120)},c=()=>{if(e.background(255),o.move(),o.checkEdges(),o.show(),o.showName(),n.applyForce(e.createVector(0,.1)),e.mouseIsPressed){let d=e.createVector(.1,0);n.applyForce(d)}n.move(),n.show(),n.showName(),n.checkEdges(),s.forEach(d=>{d.applyForce(e.createVector(0,e.random(0,1))),d.move(),d.checkEdges(),d.show(),d.showName()})},l=()=>e.setup();e.setup=a,e.draw=c,e.windowResized=l};return i.jsx(i.Fragment,{children:i.jsx(R,{sketch:t,showControls:!0})})},ce=`import type p5 from "p5";
import Basic from "@components/react/p5/index.tsx";
import { ForceMoverA } from "./ForceMoverA";

export default () => {
  const sketch = (p: p5) => {
    let mover: ForceMoverA;
    const setup = () => {
      p.createCanvas(p.windowWidth / 2, 240);
      mover = new ForceMoverA(p);
      p.frameRate(120);
    };
    const draw = () => {
      mover.move();
      mover.checkEdges();
      mover.show();
    };
    const resize = () => p.setup();
    p.setup = setup;
    p.draw = draw;
    p.windowResized = resize;
  };
  return <Basic sketch={sketch} showControls></Basic>;
};
`,ie=`import type p5 from "p5";
import Basic from "@components/react/p5/index.tsx";
import { ForceMoverB } from "./ForceMoverB";
export default () => {
  const sketch = (p: p5) => {
    let mover: ForceMoverB;
    let moverWithWind: ForceMoverB;
    let movers: ForceMoverB[];
    const setup = () => {
      p.createCanvas(p.windowWidth / 2, 240);
      mover = new ForceMoverB(p, "mover", 32);
      moverWithWind = new ForceMoverB(p, "press mouse", 32);
      moverWithWind.position = p.createVector(
        p.width / 2,
        moverWithWind.circleRadius
      );
      movers = new Array(3)
        .fill(0)
        .map(
          (item, index) => new ForceMoverB(p, "mover" + index, p.random(16, 32))
        );
      p.frameRate(120);
    };
    const draw = () => {
      p.background(255);

      mover.move();
      mover.checkEdges();
      mover.show();
      mover.showName();

      moverWithWind.applyForce(p.createVector(0, 0.1));

      if (p.mouseIsPressed) {
        let wind = p.createVector(0.1, 0);
        moverWithWind.applyForce(wind); // 应用风
      }

      moverWithWind.move();
      moverWithWind.show();
      moverWithWind.showName();
      moverWithWind.checkEdges();

      movers.forEach(m => {
        m.applyForce(p.createVector(0, p.random(0, 1)));
        m.move();
        m.checkEdges();
        m.show();
        m.showName();
      });
    };
    const resize = () => p.setup();
    p.setup = setup;
    p.draw = draw;
    p.windowResized = resize;
  };
  return (
    <>
      <Basic sketch={sketch} showControls></Basic>
    </>
  );
};
`,w={ForceA:{component:re,code:ce},ForceB:{component:se,code:ie}};function Ve({componentName:t}){const[e,o]=r.useState(""),[n,s]=r.useState(null),[a,c]=r.useState(null);r.useEffect(()=>((async()=>{try{w[t]?(o(w[t].code),s(w[t].component),c(null)):c(`Component not found: ${t}`)}catch(u){console.error(`Failed to load component: ${t}`,u),c(`Failed to load component: ${t}`)}})(),()=>{}),[t]),r.useState(null);const l=r.useMemo(()=>n||i.jsx("div",{children:"loading..."}),[n]);return i.jsx(i.Fragment,{children:i.jsxs(te,{defaultValue:"demo",className:"w-full",children:[i.jsxs(A,{children:[i.jsx(x,{value:"code",children:"Code"}),i.jsx(x,{value:"demo",children:"Demo"})]}),i.jsx(g,{value:"code",children:a||i.jsx(oe,{children:e})}),i.jsx(g,{value:"demo",children:l})]})})}export{Ve as default};
