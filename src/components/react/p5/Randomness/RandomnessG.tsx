import type p5 from "p5";
import Basic from "@components/react/p5/index.tsx";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";
import { EditorView, basicSetup } from "codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { oneDark } from "@codemirror/theme-one-dark";
import { defaultKeymap } from "@codemirror/commands";
import { keymap } from "@codemirror/view";

export default () => {
  const [xoffRate, setXoffRate] = useState(0.01);
  const maxRange = useState(0.1);
  const editor = useRef<HTMLDivElement>(null);
  const debouncedXoffRate = useDebounce(xoffRate, 300);
  let editorInstance: EditorView | undefined;

  const sketch = useCallback(
    (p: p5) => {
      const setup = () => {
        p.createCanvas(p.windowWidth / 2, 240);
        p.loadPixels();
      };
      const draw = () => {
        let xoff = 0.0;
        for (let x = 0; x < p.width; x++) {
          let yoff = 0.0;
          for (let y = 0; y < p.height; y++) {
            const bright = p.map(
              p.noise(xoff, yoff, p.frameCount * 0.009),
              0,
              1,
              0,
              255
            );
            const n = p.floor(bright);
            p.set(x, y, [n, n, n, n]);
            yoff += 0.01;
          }
          xoff += debouncedXoffRate;
        }
        p.updatePixels();
      };
      const resize = () => {
        p.resizeCanvas(p.windowWidth / 2, 240);
      };
      p.setup = setup;
      p.draw = draw;
      p.windowResized = resize;
    },
    [debouncedXoffRate]
  );

  useEffect(() => {
    editorInstance?.destroy();
    editor.current.innerHTML = "";

    const doc = ` const draw = () => {
            p.loadPixels();
            let xoff = 0.0;
            for (let x = 0; x < p.width; x++) {
                let yoff = 0.0;
                for (let y = 0; y < p.height; y++) {
                    const bright = p.map(
                        p.noise(xoff, yoff, p.frameCount * 0.009),
                        0,
                        1,
                        0,
                        255
                    );
                    const n = p.floor(bright);
                    p.set(x, y, [n, n, n, n]);
                    yoff += 0.01;
                }
                xoff += ${debouncedXoffRate}; //配置项
            }
            p.updatePixels();
        };`;

    editorInstance = new EditorView({
      doc,
      extensions: [
        basicSetup,
        javascript({ jsx: true, typescript: true }),
        oneDark,
        keymap.of(defaultKeymap),
      ],
      parent: editor.current,
    });
  }, [debouncedXoffRate]);

  const handleSliderChange = (val: string) => {
    setXoffRate(parseFloat(val));
  };

  return (
    <>
      <div className="gap-4 randomG">
        <Basic sketch={sketch} showControls></Basic>

        <div className="flex items-center text-nowrap gap-4">
          <span>xoffRate:{debouncedXoffRate}</span>
          <input
            type="range"
            max={maxRange[0]}
            className="transparent h-[4px] w-full cursor-pointer appearance-none border-transparent bg-neutral-200 dark:bg-neutral-600"
            value={xoffRate}
            title={`${xoffRate}`}
            step={0.01}
            onChange={e => handleSliderChange(e.target.value)}
          />
        </div>

        <div className="editor mt-4" ref={editor}></div>
      </div>
    </>
  );
};
