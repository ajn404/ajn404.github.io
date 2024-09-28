import type p5 from "p5";
import React from "react";
import Basic from "../../index.tsx";
import { SimulationCar } from "./simulationCar.ts";

export default () => {
  const sketch = (p: p5) => {
    let car: SimulationCar;
    const setup = () => {
      p.createCanvas(p.windowWidth * 0.8, 240);
      car = new SimulationCar(p);
    };
    const draw = () => {
      car.update();
      car.show();
    };

    const resize = () => {
      p.resizeCanvas(p.windowWidth / 2, 240);
    };
    p.setup = setup;
    p.draw = draw;
    p.windowResized = resize;
  };
  return <Basic sketch={sketch} showControls></Basic>;
};
