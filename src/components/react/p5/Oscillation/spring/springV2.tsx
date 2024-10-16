import type p5 from "p5";
import Basic from "@components/react/p5/index.tsx";
import { useCallback, useState, useRef, useEffect } from "react";
import { BobBob } from "./Bob";
import { BobSpring, Spring } from "./Spring";
import { useDebounce } from "@uidotdev/usehooks";
import { Slider } from "@shadcn/ui/slider";
import { cn } from "@utils/utils";

export default () => {
  const [k, setK] = useState(0.2); // Elastic coefficient
  const debounceK = useDebounce(k, 500);
  const [num, setNum] = useState(10);
  const debounceNum = useDebounce(num, 500);

  // Using refs to persist bobs and springs across renders
  const bobsRef = useRef<BobBob[]>([]);
  const springsRef = useRef<BobSpring[]>([]);

  const sketch = useCallback(
    (p: p5) => {
      const setup = () => {
        p.createCanvas(p.windowWidth / 2, 240);
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
        p.background(255);
        let gravity = p.createVector(0, 0.2);
        bobsRef.current.forEach(bob => {
          // bob.applyForce(gravity);
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
        p.resizeCanvas(p.windowWidth / 2, 240);
      };

      p.setup = setup;
      p.draw = draw;
      p.windowResized = resize;
    },
    [debounceK, debounceNum]
  );

  useEffect(() => {
    springsRef.current.forEach(spring => {
      spring.k = debounceK;
    });
  }, [debounceK]);

  return (
    <div className="flex items-center shadow justify-around ">
      <Basic sketch={sketch} showControls />
      <div className="w-1/5">
        <label>弹性系数：{debounceK}</label>
        <Slider
          defaultValue={[0.2]}
          max={1}
          min={0.1}
          step={0.01}
          className={cn("w-[100%] m-4")}
          onValueChange={value => {
            setK(value[0]);
          }}
          value={[k]}
        />
        <label>小球数量：{debounceNum}</label>
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
      </div>
    </div>
  );
};
