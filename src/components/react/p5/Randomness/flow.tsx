import type p5 from "p5";
import Basic from "@components/react/p5/index.tsx";
import { type FlowField } from "./flow/flowField";
import { Vehicle } from "./flow/vehicle";

export default () => {
  const sketch = (p: p5) => {
    let debug = true;
    let flowfield: FlowField;
    let vehicles = [];

    const setup = async () => {
      p.createCanvas(p.windowWidth / 2, p.windowWidth / 3);
      const { FlowField } = await import("./flow/flowField");
      flowfield = new FlowField(20, p);
      await flowfield.init(p);
      for (let i = 0; i < 120; i++) {
        vehicles.push(
          new Vehicle(
            p.random(p.width),
            p.random(p.height),
            p.random(2, 5),
            p.random(0.1, 0.5),
            p
          )
        );
      }
    };
    const draw = () => {
      p.background(255);
      if (debug) flowfield.display(p);
      for (let i = 0; i < vehicles.length; i++) {
        vehicles[i].follow(flowfield);
        vehicles[i].run(p);
      }
    };
    const resize = () => {
      p.resizeCanvas(p.windowWidth / 2, p.windowWidth / 3);
    };
    p.setup = setup;
    p.draw = draw;
    p.windowResized = resize;
  };
  return <Basic sketch={sketch} showControls></Basic>;
};
