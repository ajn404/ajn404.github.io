import{j as s}from"./jsx-runtime.OHnxCjeH.js";import f from"./index.DbuaHHgw.js";import{O as w}from"./Oscillator.Bu2VyStz.js";import{S as h}from"./slider.DrdG3pt9.js";import{S as b}from"./switch.Djz7DX5s.js";import{u as k}from"./index.C9ZdDd0_.js";import{r as i}from"./index.xZRu5XGr.js";import{c as g}from"./utils.DXttUQxt.js";import{C as x}from"./code.DvEwlmoG.js";import"./_sentry-release-injection-file.CB6rd3Pg.js";import"./preload-helper.BkXzNX4V.js";/* empty css                       */import"./react-icons.esm.ByhgPhmG.js";import"./createLucideIcon.oerCvLoW.js";import"./index.D9gXCmys.js";import"./index.CAezFPau.js";import"./_commonjsHelpers.CapIYjSr.js";import"./index.30G3EI3G.js";import"./index.C0h5QjsP.js";import"./index.DQ1PkKZg.js";import"./index.7Ns-6obq.js";import"./index.a1OkDNUE.js";import"./index.B7tTZuYN.js";import"./index.KL32BjKc.js";(function(){try{var t=typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},o=new t.Error().stack;o&&(t._sentryDebugIds=t._sentryDebugIds||{},t._sentryDebugIds[o]="8d4e5cce-523d-4cc9-a00c-337ce5c451c9",t._sentryDebugIdIdentifier="sentry-dbid-8d4e5cce-523d-4cc9-a00c-337ce5c451c9")}catch{}})();const L=()=>{let[t,o]=i.useState(1),r=k(t,200),[a,m]=i.useState(!0);const u=i.useCallback(e=>{let n;const d=()=>{e.createCanvas(e.windowWidth/2,240),e.frameRate(120),n=new Array(r).fill(0).map(c=>new w(e))},l=()=>{a&&e.background(255),n.forEach(c=>{c.update(),c.show()})},p=()=>{e.resizeCanvas(e.windowWidth/2,240)};e.setup=d,e.draw=l,e.windowResized=p},[r,a]);return s.jsxs("div",{className:"flex flex-col gap-4 items-center",children:[s.jsx(f,{sketch:u,showControls:!0}),s.jsx("span",{children:"数量"}),s.jsx(h,{defaultValue:[10],max:400,min:1,step:1,className:g("w-[100%] m-4"),onValueChange:e=>{o(e[0])},value:[t]}),s.jsx("span",{children:"背景"}),s.jsx(b,{className:"mx-4",checked:a,onCheckedChange:e=>m(e)}),s.jsx(x,{children:`import type p5 from "p5";
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
`})]})};export{L as default};
//# sourceMappingURL=oscillatorV1.v28Fmot8.js.map
