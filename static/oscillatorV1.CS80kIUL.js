import{j as s}from"./jsx-runtime.BlJElA5X.js";import f from"./index.MQZJjy8e.js";import{O as h}from"./Oscillator.CFUXOUGd.js";import{S as w}from"./slider.Ca9EgSnL.js";import{S as b}from"./switch.D9oPge1U.js";import{u as g}from"./index.BTsA0VWg.js";import{r as n}from"./index.KNIQqnlE.js";import{c as k}from"./utils.DGLjwLc1.js";import{C as x}from"./code.BmvtcjQt.js";import"./_sentry-release-injection-file.b82t1l8g.js";import"./preload-helper.CLGjVpZq.js";/* empty css                       */import"./react-icons.esm.DQLo3Xml.js";import"./createLucideIcon.C5mtGDfT.js";import"./index.BBXd5jpg.js";import"./index.CudXchKt.js";import"./_commonjsHelpers.DWWLd87L.js";import"./index.DS2glMWq.js";import"./index.B2dbCyJN.js";import"./index.lfrod4K5.js";import"./index.PcWGclEp.js";import"./index.D4CWa6yG.js";import"./index.DY7eviV5.js";(function(){try{var t=typeof window<"u"?window:typeof global<"u"?global:typeof globalThis<"u"?globalThis:typeof self<"u"?self:{},o=new t.Error().stack;o&&(t._sentryDebugIds=t._sentryDebugIds||{},t._sentryDebugIds[o]="26e689d5-e05f-4ecc-8cc5-56d332d38d81",t._sentryDebugIdIdentifier="sentry-dbid-26e689d5-e05f-4ecc-8cc5-56d332d38d81")}catch{}})();const J=()=>{let[t,o]=n.useState(1),r=g(t,200),[a,m]=n.useState(!0);const d=n.useCallback(e=>{let c;const u=()=>{e.createCanvas(e.windowWidth/2,240),e.frameRate(120),c=new Array(r).fill(0).map(i=>new h(e))},l=()=>{a&&e.background(255),c.forEach(i=>{i.update(),i.show()})},p=()=>{e.resizeCanvas(e.windowWidth/2,240)};e.setup=u,e.draw=l,e.windowResized=p},[r,a]);return s.jsxs("div",{className:"flex flex-col gap-4 items-center",children:[s.jsx(f,{sketch:d,showControls:!0}),s.jsx("span",{children:"数量"}),s.jsx(w,{defaultValue:[10],max:400,min:1,step:1,className:k("w-[100%] m-4"),onValueChange:e=>{o(e[0])},value:[t]}),s.jsx("span",{children:"背景"}),s.jsx(b,{className:"mx-4",checked:a,onCheckedChange:e=>m(e)}),s.jsx(x,{children:`import type p5 from "p5";
import Basic from "@components/react/p5/index.tsx";
import Oscillator from "./Oscillator"
import { Slider } from "@shadcn/ui/slider";
import { useDebounce } from "@uidotdev/usehooks";
import { useCallback, useState } from "react";
import { cn } from "@utils/utils";
import { Switch } from "@components/react/shadcn/ui/switch";

export default () => {
    let [num, setNum] = useState(1);
    let debounceNum = useDebounce(num, 200);
    let [background, setBackground] = useState(true);

    const sketch = useCallback((p: p5) => {
        let osi: Oscillator[];
        const setup = () => {
            p.createCanvas(p.windowWidth / 2, 240);
            p.frameRate(120);
            osi = new Array(debounceNum).fill(0).map(_ => { return new Oscillator(p) });
        };

        const draw = () => {
            background && p.background(255);
            osi.forEach(item => {
                item.update();
                item.show();
            });

        };
        const resize = () => {
            p.resizeCanvas(p.windowWidth / 2, 240);
        };
        p.setup = setup;
        p.draw = draw;
        p.windowResized = resize;
    }, [debounceNum, background]);
    return <div className="flex flex-col gap-4 items-center">
        <Basic sketch={sketch} showControls></Basic>
        <span>数量</span>
        <Slider
            defaultValue={[10]}
            max={400}
            min={1}
            step={1}
            className={cn("w-[100%] m-4")}
            onValueChange={value => {
                setNum(value[0]);
            }}
            value={[num]}
        />
        <span>背景</span>
        <Switch
            className="mx-4"
            checked={background}
            onCheckedChange={e => setBackground(e)}
        ></Switch>
    </div>;
};
`})]})};export{J as default};
//# sourceMappingURL=oscillatorV1.CS80kIUL.js.map
