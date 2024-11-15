import confetti from "canvas-confetti";
import { type MouseEvent } from "react";
export default () => {
  function onMouseMove(e: MouseEvent) {
    confetti({
      particleCount: 100,
      startVelocity: 30,
      spread: 360,
      origin: {
        x: Math.random(),
        // since they fall down, start a bit higher than random
        y: Math.random() - 0.2,
      },
    });
  }
  return (
    <div
      onMouseMove={onMouseMove}
      className="w-full h-56 bg-white grid items-center"
    ></div>
  );
};
