import type p5 from "p5";
import Basic from "@components/react/p5/index.tsx";
import { useCallback, useState, useRef, useEffect } from "react";
import { BobBob } from "./Bob";
import { BobSpring } from "./Spring";
import { useDebounce } from "@uidotdev/usehooks";
import { Slider } from "@shadcn/ui/slider";
import { cn } from "@utils/utils";

interface CanvasConfig {
  width: number;
  height: number;
}

interface SpringV2 {
  showControl: Boolean | String;
}

const springV2: React.FC<SpringV2> = ({ showControl }) => {
  const [k, setK] = useState(0.2);
  const debounceK = useDebounce(k, 500);
  const [num, setNum] = useState(10);
  const debounceNum = useDebounce(num, 500);

  const [canvasConfig, setCanvasConfig] = useState<CanvasConfig>({
    width: 500,
    height: 500,
  });

  const debounceCanvasConfig = useDebounce(canvasConfig, 500);

  // Using refs to persist bobs and springs across renders
  const bobsRef = useRef<BobBob[]>([]);
  const springsRef = useRef<BobSpring[]>([]);

  const sketch = useCallback(
    (p: p5) => {
      const width = !showControl
        ? p.windowWidth / 3
        : Math.max(debounceCanvasConfig.width, p.windowWidth / 2);
      const setup = () => {
        p.createCanvas(width, debounceCanvasConfig.height);
        p.frameRate(120);

        // Initialize bobs
        bobsRef.current = [];
        springsRef.current = [];
        new Array(debounceNum).fill(p.random(5, 20)).forEach(_ => {
          const bob = new BobBob(p, p.random(p.width), p.random(p.height), _);
          bobsRef.current.push(bob);
        });

        // 遍历 bobsRef 中的 Bob 对象,两两连接
        for (let i = 0; i < bobsRef.current.length; i++) {
          for (let j = i + 1; j < bobsRef.current.length; j++) {
            springsRef.current.push(
              new BobSpring(
                p,
                200,
                debounceK,
                bobsRef.current[i],
                bobsRef.current[j]
              )
            );
          }
        }
      };

      const draw = () => {
        p.background(33, 39, 55);
        bobsRef.current.forEach(bob => {
          bob.update();
          bob.handleDrag(p.mouseX, p.mouseY);
        });

        springsRef.current.forEach(spring => {
          spring.connect();
        });

        springsRef.current.forEach(spring => {
          if (spring.bobA && spring.bobB) {
            spring.constrainLength(spring.bobA, spring.bobB, 50, 250);
          } else if (spring.bobA && spring.anchor) {
            spring.constrainLengthToAnchor(spring.bobA, 50, 250);
          }
        });
        springsRef.current.forEach(spring => spring.show());
        bobsRef.current.forEach(bob => bob.show());
      };

      p.mousePressed = () => {
        bobsRef.current.forEach(bob => {
          bob.handleMousePressed(p.mouseX, p.mouseY);
        });
      };

      p.touchStarted = () => {
        bobsRef.current.forEach(bob => {
          bob.handleMousePressed(p.mouseX, p.mouseY);
        });
      };

      p.touchEnded = () => {
        bobsRef.current.forEach(bob => bob.handleMouseReleased());
      };

      p.mouseReleased = () => {
        bobsRef.current.forEach(bob => bob.handleMouseReleased());
      };

      const resize = () => {
        p.resizeCanvas(
          Math.max(debounceCanvasConfig.width, p.windowWidth / 2),
          debounceCanvasConfig.height
        );
      };

      p.setup = setup;
      p.draw = draw;
      p.windowResized = resize;
    },
    [debounceK, debounceNum, debounceCanvasConfig]
  );

  useEffect(() => {
    springsRef.current.forEach(spring => {
      spring.k = debounceK;
    });
  }, [debounceK]);

  return (
    <div className="max-w-[90vw] overflow-auto flex items-center shadow justify-around ">
      <Basic sketch={sketch} showControls={Boolean(showControl)} />
      {showControl && (
        <div className="w-1/5 toolbox">
          <label className="select-none">弹性系数：{debounceK}</label>
          <Slider
            defaultValue={[0.2]}
            max={0.7}
            min={0.1}
            step={0.01}
            className={cn("w-[100%] m-4")}
            onValueChange={value => {
              setK(value[0]);
            }}
            value={[k]}
          />
          <label className="select-none">小球数量：{debounceNum}</label>
          <Slider
            defaultValue={[10]}
            max={20}
            min={2}
            step={1}
            className={cn("w-[100%] m-4")}
            onValueChange={value => {
              setNum(value[0]);
            }}
            value={[num]}
          />

          <label className="select-none">
            canvas width：{canvasConfig.width}
          </label>
          <Slider
            defaultValue={[500]}
            max={1000}
            min={100}
            step={20}
            className={cn("w-[100%] m-4")}
            onValueChange={value => {
              setCanvasConfig({ width: value[0], height: canvasConfig.height });
            }}
            value={[canvasConfig.width]}
          />

          <label className="select-none">
            canvas height:{canvasConfig.height}
          </label>
          <Slider
            defaultValue={[500]}
            max={1000}
            min={100}
            step={20}
            className={cn("w-[100%] m-4")}
            onValueChange={value => {
              setCanvasConfig({ width: canvasConfig.width, height: value[0] });
            }}
            value={[canvasConfig.height]}
          />
        </div>
      )}
    </div>
  );
};

export default springV2;
