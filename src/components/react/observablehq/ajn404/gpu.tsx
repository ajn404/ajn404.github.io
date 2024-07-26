import React, { useRef, useEffect } from "react";
import { Runtime, Inspector } from "@observablehq/runtime";
import "../style.scss";

function Bnbshader() {
  const ref = useRef<HTMLDivElement>(null);
  const open = useRef(false);
  useEffect(() => {
    const runtime = new Runtime();
    const url = "https://api.observablehq.com/d/215f9d2b56c1ade0.js?v=4";
    import(/* @vite-ignore */ url).then(module => {
      const notebook = module.default;
      runtime.module(notebook, Inspector.into(ref.current));
    });

    return () => runtime.dispose();
  }, [ref.current]);

  return (
    <>
      <details
        open={open.current}
        className="max-w-full overflow-auto obs show"
      >
        <summary>
          <a href="https://observablehq.com/d/215f9d2b56c1ade0" target="_blank">
            混沌方程等的gpu可视化
          </a>
        </summary>
        <div ref={ref} />
      </details>
    </>
  );
}

export default Bnbshader;
