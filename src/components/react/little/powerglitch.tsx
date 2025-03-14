import { PowerGlitch } from "powerglitch";
import { useEffect } from "react";

export default ({ children }) => {
  useEffect(() => {
    PowerGlitch.glitch(".glitch", {
      playMode: "always",
      hideOverflow: true,
      timing: {
        duration: 2000,
        easing: "ease-in-out",
      },
      glitchTimeSpan: {
        start: 0.4,
        end: 0.7,
      },
      shake: {
        velocity: 10,
        amplitudeX: 0.4,
        amplitudeY: 0.4,
      },
      slice: {
        count: 10,
        velocity: 10,
        minHeight: 0.02,
        maxHeight: 0.4,
        hueRotate: true,
      },
    });
  });
  return (
    <>
      <div className="glitch min-h-[50px]">{children}</div>
    </>
  );
};
