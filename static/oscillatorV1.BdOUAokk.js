import{j as s}from"./jsx-runtime.CxCZCP1r.js";import f from"./index.BZNuYYoA.js";import{O as h}from"./Oscillator.DuR76QEX.js";import{S as w}from"./slider.Bt1HN7rN.js";import{S as b}from"./switch.DrNlYvTh.js";import{u as g}from"./index.Dv_g1W2z.js";import{r as n}from"./index.Dr01XSYZ.js";import{c as k}from"./utils.DeG8MZE1.js";import{C as x}from"./code.Bz4vxCvx.js";import"./_sentry-release-injection-file.DBVj9-TS.js";import"./preload-helper.Cs2hLlus.js";/* empty css                       */import"./react-icons.esm.4jM_gFQj.js";import"./createLucideIcon.C_L2pn5Y.js";import"./index.BrAq6WS8.js";import"./index.D5zcQUOr.js";import"./_commonjsHelpers.CiKuKuYW.js";import"./index.w4mpYoOz.js";import"./index.BZzC9nBD.js";import"./index.D-BprT2S.js";import"./index.CmVezFky.js";import"./index.CQfeQguk.js";import"./index.DY7eviV5.js";(function(){try{var t=typeof window<"u"?window:typeof global<"u"?global:typeof globalThis<"u"?globalThis:typeof self<"u"?self:{},o=new t.Error().stack;o&&(t._sentryDebugIds=t._sentryDebugIds||{},t._sentryDebugIds[o]="2bcae09b-ad4c-49bb-ae1f-72492a39e73a",t._sentryDebugIdIdentifier="sentry-dbid-2bcae09b-ad4c-49bb-ae1f-72492a39e73a")}catch{}})();const J=()=>{let[t,o]=n.useState(1),a=g(t,200),[r,m]=n.useState(!0);const u=n.useCallback(e=>{let c;const d=()=>{e.createCanvas(e.windowWidth/2,240),e.frameRate(120),c=new Array(a).fill(0).map(i=>new h(e))},l=()=>{r&&e.background(255),c.forEach(i=>{i.update(),i.show()})},p=()=>{e.resizeCanvas(e.windowWidth/2,240)};e.setup=d,e.draw=l,e.windowResized=p},[a,r]);return s.jsxs("div",{className:"flex flex-col gap-4 items-center",children:[s.jsx(f,{sketch:u,showControls:!0}),s.jsx("span",{children:"数量"}),s.jsx(w,{defaultValue:[10],max:400,min:1,step:1,className:k("w-[100%] m-4"),onValueChange:e=>{o(e[0])},value:[t]}),s.jsx("span",{children:"背景"}),s.jsx(b,{className:"mx-4",checked:r,onCheckedChange:e=>m(e)}),s.jsx(x,{children:`import type p5 from "p5";
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
//# sourceMappingURL=oscillatorV1.BdOUAokk.js.map
