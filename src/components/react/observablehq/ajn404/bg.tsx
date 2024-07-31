import React, { useRef, useEffect } from "react";
import { Runtime, Inspector } from "@observablehq/runtime";
import "../style.scss";

function Bnbshader() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const runtime = new Runtime();
    const url =
      "https://api.observablehq.com/@rreusser/aperiodic-monotile@latest.js?v=4";
    import(/* @vite-ignore */ url).then(module => {
      const notebook = module.default;
      runtime.module(notebook, name => {
        if (name === "viewof regl") return new Inspector(ref.current);
        return [
          "drawLoop",
          "drawTris",
          "drawLines",
          "drawHexGrid",
          "tileBorderBuf",
          "tilePositionsBuf",
          "tileTrisBuf",
          "triggerResize",
          "configureLinearScales",
          "configureViewport",
          "applyCameraSkew",
          "panZoom",
          "draw",
        ].includes(name);
      });
    });
    return () => runtime.dispose();
  }, [ref.current]);

  return (
    <>
      <div ref={ref} />
    </>
  );
}

export default Bnbshader;
