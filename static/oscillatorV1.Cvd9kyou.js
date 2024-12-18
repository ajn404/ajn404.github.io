import{j as s}from"./jsx-runtime.C6v7sNnU.js";import f from"./index.B0NFdE7O.js";import{O as w}from"./Oscillator.B-Sykbu0.js";import{S as h}from"./slider.DNztCqvC.js";import{S as b}from"./switch.CTItDEU1.js";import{u as k}from"./index.1gP8PJiE.js";import{r as n}from"./index.A1bncjHG.js";import{c as g}from"./utils.ZJ_V-BP8.js";import{C as x}from"./code.DBh-aOGc.js";import"./_sentry-release-injection-file.DwF5PoZy.js";import"./preload-helper.CSvDiOMA.js";/* empty css                       */import"./react-icons.esm.BYAXBCkL.js";import"./createLucideIcon.eeyzEiwb.js";import"./index.CTam5Opi.js";import"./index.BZ012Z6J.js";import"./_commonjsHelpers.g73XWfsI.js";import"./index.BUvKg88E.js";import"./index.B-Olwami.js";import"./index.CXL6VmG4.js";import"./index.BU6eJ7BP.js";import"./index.CVJ2qwYM.js";import"./index.KL32BjKc.js";(function(){try{var t=typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},o=new t.Error().stack;o&&(t._sentryDebugIds=t._sentryDebugIds||{},t._sentryDebugIds[o]="02f2b237-4070-48d4-9d5d-f9e6c5956cff",t._sentryDebugIdIdentifier="sentry-dbid-02f2b237-4070-48d4-9d5d-f9e6c5956cff")}catch{}})();const K=()=>{let[t,o]=n.useState(1),r=k(t,200),[a,m]=n.useState(!0);const u=n.useCallback(e=>{let c;const d=()=>{e.createCanvas(e.windowWidth/2,240),e.frameRate(120),c=new Array(r).fill(0).map(i=>new w(e))},l=()=>{a&&e.background(255),c.forEach(i=>{i.update(),i.show()})},p=()=>{e.resizeCanvas(e.windowWidth/2,240)};e.setup=d,e.draw=l,e.windowResized=p},[r,a]);return s.jsxs("div",{className:"flex flex-col gap-4 items-center",children:[s.jsx(f,{sketch:u,showControls:!0}),s.jsx("span",{children:"数量"}),s.jsx(h,{defaultValue:[10],max:400,min:1,step:1,className:g("w-[100%] m-4"),onValueChange:e=>{o(e[0])},value:[t]}),s.jsx("span",{children:"背景"}),s.jsx(b,{className:"mx-4",checked:a,onCheckedChange:e=>m(e)}),s.jsx(x,{children:`import type p5 from "p5";
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
//# sourceMappingURL=oscillatorV1.Cvd9kyou.js.map
