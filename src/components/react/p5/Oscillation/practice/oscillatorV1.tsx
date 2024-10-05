import type p5 from "p5";
import Basic from "@components/react/p5/index.tsx";
import Oscillator from "./Oscillator";
import { Slider } from "@shadcn/ui/slider";
import { useDebounce } from "@uidotdev/usehooks";
import { useCallback, useState } from "react";
import { cn } from "@utils/utils";
import { Switch } from "@components/react/shadcn/ui/switch";
import Code from "@components/react/editor/code";

export default () => {
  let [num, setNum] = useState(1);
  let debounceNum = useDebounce(num, 200);
  let [background, setBackground] = useState(true);

  const sketch = useCallback(
    (p: p5) => {
      let osi: Oscillator[];
      const setup = () => {
        p.createCanvas(p.windowWidth / 2, 240);
        p.frameRate(120);
        osi = new Array(debounceNum).fill(0).map(_ => {
          return new Oscillator(p);
        });
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
    },
    [debounceNum, background]
  );
  return (
    <div className="flex flex-col gap-4 items-center">
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

      <Code>
        {`import type p5 from "p5";
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
`}
      </Code>
    </div>
  );
};
