import{j as s}from"./jsx-runtime.Dsjqyfcs.js";import f from"./index.C_fjCuP8.js";import{O as w}from"./Oscillator.D_Ynb1rf.js";import{S as h}from"./slider.D58APs5D.js";import{S as b}from"./switch.VsLSNmZa.js";import{u as k}from"./index.BrLAqlub.js";import{r as n}from"./index.bLcCnRqq.js";import{c as g}from"./utils.C6m2h66M.js";import{C as x}from"./code.B7jvrZCw.js";import"./_sentry-release-injection-file.D-PFEXYZ.js";import"./preload-helper.Cvje_pTD.js";/* empty css                       */import"./react-icons.esm.D9ziZQoK.js";import"./createLucideIcon.Dgx8tUcv.js";import"./index.0OMzCudu.js";import"./index.CxMtizK6.js";import"./_commonjsHelpers.B7IsBRZ7.js";import"./index.DuoTcjnU.js";import"./index.B3cI4amD.js";import"./index.D6Ss7zfY.js";import"./index.CMGGK4qq.js";import"./index.DDAZJYkY.js";import"./index.DZM-Grlp.js";import"./index.CVPxAIlZ.js";(function(){try{var t=typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},o=new t.Error().stack;o&&(t._sentryDebugIds=t._sentryDebugIds||{},t._sentryDebugIds[o]="4502bd22-8275-4363-8377-ddf5058b57de",t._sentryDebugIdIdentifier="sentry-dbid-4502bd22-8275-4363-8377-ddf5058b57de")}catch{}})();const L=()=>{let[t,o]=n.useState(1),r=k(t,200),[a,m]=n.useState(!0);const d=n.useCallback(e=>{let c;const u=()=>{e.createCanvas(e.windowWidth/2,240),e.frameRate(120),c=new Array(r).fill(0).map(i=>new w(e))},l=()=>{a&&e.background(255),c.forEach(i=>{i.update(),i.show()})},p=()=>{e.resizeCanvas(e.windowWidth/2,240)};e.setup=u,e.draw=l,e.windowResized=p},[r,a]);return s.jsxs("div",{className:"flex flex-col gap-4 items-center",children:[s.jsx(f,{sketch:d,showControls:!0}),s.jsx("span",{children:"数量"}),s.jsx(h,{defaultValue:[10],max:400,min:1,step:1,className:g("w-[100%] m-4"),onValueChange:e=>{o(e[0])},value:[t]}),s.jsx("span",{children:"背景"}),s.jsx(b,{className:"mx-4",checked:a,onCheckedChange:e=>m(e)}),s.jsx(x,{children:`import type p5 from "p5";
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
//# sourceMappingURL=oscillatorV1.BVzONApn.js.map
