// src/components/ParticleSimulation.tsx

import type p5 from "p5";
import Basic from "@components/react/p5/index.tsx";
import { useCallback } from "react";

const ParticleSimulation: React.FC = () => {
  const sketch = useCallback((p: p5) => {
    // Initialize particle properties arrays
    const mass: number[] = [];
    const positionX: number[] = [];
    const positionY: number[] = [];
    const velocityX: number[] = [];
    const velocityY: number[] = [];

    // p5.js setup function
    p.setup = () => {
      p.createCanvas(p.windowWidth - 200, 240);
      p.noStroke();
      p.fill(64, 255, 255, 192);
    };

    // p5.js draw function
    p.draw = () => {
      p.background(32);

      for (let particleA = 0; particleA < mass.length; particleA++) {
        let accelerationX = 0;
        let accelerationY = 0;

        for (let particleB = 0; particleB < mass.length; particleB++) {
          if (particleA !== particleB) {
            const distanceX = positionX[particleB] - positionX[particleA];
            const distanceY = positionY[particleB] - positionY[particleA];

            let distance = p.sqrt(
              distanceX * distanceX + distanceY * distanceY
            );
            if (distance < 1) distance = 1;

            const force = ((distance - 320) * mass[particleB]) / distance;
            accelerationX += force * distanceX;
            accelerationY += force * distanceY;
          }
        }

        // Apply friction and acceleration
        velocityX[particleA] =
          velocityX[particleA] * 0.99 + accelerationX * mass[particleA];
        velocityY[particleA] =
          velocityY[particleA] * 0.99 + accelerationY * mass[particleA];
      }

      for (let particle = 0; particle < mass.length; particle++) {
        positionX[particle] += velocityX[particle];
        positionY[particle] += velocityY[particle];

        p.ellipse(
          positionX[particle],
          positionY[particle],
          mass[particle] * 1000,
          mass[particle] * 1000
        );
      }
    };

    p.windowResized = () => {
      p.resizeCanvas(p.windowWidth - 200, 240);
    };

    const addNewParticle = () => {
      mass.push(p.random(0.003, 0.03));
      positionX.push(p.mouseX);
      positionY.push(p.mouseY);
      velocityX.push(0);
      velocityY.push(0);
    };

    p.mouseClicked = () => {
      addNewParticle();
    };

    p.mouseDragged = () => {
      addNewParticle();
    };
  }, []);

  return <Basic sketch={sketch} />;
};

export default ParticleSimulation;
