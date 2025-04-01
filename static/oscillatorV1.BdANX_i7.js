import{j as s}from"./jsx-runtime.CuL11LcY.js";import f from"./index.DttEdxAU.js";import{O as w}from"./Oscillator.CqsFolRU.js";import{S as h}from"./slider.C4x8GgoV.js";import{S as b}from"./switch.Br7OSeZE.js";import{u as k}from"./index.C5v3dL1t.js";import{r as n}from"./index.DGhcy5yT.js";import{c as g}from"./utils.DUwhPGmT.js";import{C as x}from"./code.DjHVLxaX.js";import"./_sentry-release-injection-file.LPfR-_S-.js";import"./preload-helper.WXFpHRAT.js";/* empty css                       */import"./react-icons.esm.RKgwLzip.js";import"./createLucideIcon.BAtkgnFI.js";import"./index.Cf1thC6Z.js";import"./index.C7Mxd2Kk.js";import"./_commonjsHelpers.DFB_zks4.js";import"./index.DFmoD254.js";import"./index.CzvXAXhw.js";import"./index.C38bFQrl.js";import"./index.Cnw40_lh.js";import"./index.BAd1NQgN.js";import"./index.BGnZnNPH.js";(function(){try{var t=typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},o=new Error().stack;o&&(t._sentryDebugIds=t._sentryDebugIds||{},t._sentryDebugIds[o]="e96b1653-3ad1-4286-9854-4ed9d608700c",t._sentryDebugIdIdentifier="sentry-dbid-e96b1653-3ad1-4286-9854-4ed9d608700c")}catch{}})();const K=()=>{let[t,o]=n.useState(1),r=k(t,200),[a,m]=n.useState(!0);const u=n.useCallback(e=>{let c;const d=()=>{e.createCanvas(e.windowWidth/2,240),e.frameRate(120),c=new Array(r).fill(0).map(i=>new w(e))},l=()=>{a&&e.background(255),c.forEach(i=>{i.update(),i.show()})},p=()=>{e.resizeCanvas(e.windowWidth/2,240)};e.setup=d,e.draw=l,e.windowResized=p},[r,a]);return s.jsxs("div",{className:"flex flex-col gap-4 items-center",children:[s.jsx(f,{sketch:u,showControls:!0}),s.jsx("span",{children:"数量"}),s.jsx(h,{defaultValue:[10],max:400,min:1,step:1,className:g("w-[100%] m-4"),onValueChange:e=>{o(e[0])},value:[t]}),s.jsx("span",{children:"背景"}),s.jsx(b,{className:"mx-4",checked:a,onCheckedChange:e=>m(e)}),s.jsx(x,{children:`import type p5 from "p5";
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
`})]})};export{K as default};
//# sourceMappingURL=oscillatorV1.BdANX_i7.js.map
