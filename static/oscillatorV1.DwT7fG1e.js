import{j as s}from"./jsx-runtime.FSheFbns.js";import f from"./index.Bugh9YPH.js";import{O as w}from"./Oscillator.B37OXl6g.js";import{S as h}from"./slider.TEeSUCTg.js";import{S as b}from"./switch.DKjJxFPa.js";import{u as k}from"./index.J0guJX7P.js";import{r as n}from"./index.C_R3-YKG.js";import{c as g}from"./utils.C3_730Cl.js";import{C as x}from"./code.CrsZhoEr.js";import"./_sentry-release-injection-file.DGvnCq9K.js";import"./preload-helper.C1P9jO8s.js";/* empty css                       */import"./react-icons.esm.Bpj49GKg.js";import"./createLucideIcon.D-1ZQDSZ.js";import"./index.B7Tfcwu0.js";import"./index.Bv4g6pFZ.js";import"./_commonjsHelpers.CCocDEcR.js";import"./index.Dp5pie5I.js";import"./index.CK4PwTkQ.js";import"./index.D5zSx_pH.js";import"./index.DlcDr_9B.js";import"./index.DpDUzMex.js";import"./index.BaQq5Sr_.js";import"./index.KL32BjKc.js";(function(){try{var t=typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},o=new t.Error().stack;o&&(t._sentryDebugIds=t._sentryDebugIds||{},t._sentryDebugIds[o]="31cf941d-0ec2-42a7-a709-3d92c4793b5a",t._sentryDebugIdIdentifier="sentry-dbid-31cf941d-0ec2-42a7-a709-3d92c4793b5a")}catch{}})();const L=()=>{let[t,o]=n.useState(1),r=k(t,200),[a,m]=n.useState(!0);const u=n.useCallback(e=>{let c;const d=()=>{e.createCanvas(e.windowWidth/2,240),e.frameRate(120),c=new Array(r).fill(0).map(i=>new w(e))},l=()=>{a&&e.background(255),c.forEach(i=>{i.update(),i.show()})},p=()=>{e.resizeCanvas(e.windowWidth/2,240)};e.setup=d,e.draw=l,e.windowResized=p},[r,a]);return s.jsxs("div",{className:"flex flex-col gap-4 items-center",children:[s.jsx(f,{sketch:u,showControls:!0}),s.jsx("span",{children:"数量"}),s.jsx(h,{defaultValue:[10],max:400,min:1,step:1,className:g("w-[100%] m-4"),onValueChange:e=>{o(e[0])},value:[t]}),s.jsx("span",{children:"背景"}),s.jsx(b,{className:"mx-4",checked:a,onCheckedChange:e=>m(e)}),s.jsx(x,{children:`import type p5 from "p5";
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
//# sourceMappingURL=oscillatorV1.DwT7fG1e.js.map
