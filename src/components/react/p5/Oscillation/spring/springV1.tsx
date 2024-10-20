import type p5 from "p5";
import Basic from "@components/react/p5/index.tsx";
import { useCallback, useState, useRef, useEffect } from "react";
import { BobBob } from "./Bob";
import { BobSpring } from "./Spring";
import { useDebounce } from "@uidotdev/usehooks";
import { Slider } from "@shadcn/ui/slider";
import { cn } from "@utils/utils";

export default () => {
  const [k, setK] = useState(0.2); // Elastic coefficient
  const debounceK = useDebounce(k, 500);

  // Using refs to persist bobs and springs across renders
  const bobsRef = useRef<BobBob[]>([]);
  const springsRef = useRef<BobSpring[]>([]);

  const sketch = useCallback(
    (p: p5) => {
      const setup = () => {
        p.createCanvas(p.windowWidth / 2, 240);
        p.frameRate(120);

        // Initialize bobs
        const bob1 = new BobBob(p, p.width / 2, 150, 10);
        const bob2 = new BobBob(p, p.width / 2 + 100, 150, 10);
        const bob3 = new BobBob(p, p.width / 2 - 100, 150, 20);
        bobsRef.current.push(bob1, bob2, bob3);

        // Initialize springs connecting bobs to each other
        springsRef.current.push(
          new BobSpring(p, 200, debounceK, bob1, bob2),
          new BobSpring(p, 200, debounceK, bob2, bob3),
          new BobSpring(p, 200, debounceK, bob3, bob1)
        );
      };

      const draw = () => {
        p.background(255);
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
    [debounceK]
  );

  useEffect(() => {
    springsRef.current.forEach(spring => {
      spring.k = debounceK;
    });
  }, [debounceK]);

  return (
    <>
      <Basic sketch={sketch} showControls />
      <div>
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
      </div>
    </>
  );
};
