import React, { useRef, useEffect } from "react";
import { Runtime, Inspector } from "@observablehq/runtime";
import "../style.scss";

function Bnbshader() {
  const ref = useRef<HTMLDivElement>(null);
  const open = useRef(false);
  useEffect(() => {
    const runtime = new Runtime();
    //@ts-ignore
    import("https://api.observablehq.com/@makio135/bnbshader.js?v=4").then(
      module => {
        const notebook = module.default;
        runtime.module(notebook, Inspector.into(ref.current));
      }
    );

    return () => runtime.dispose();
  }, [ref.current]);

  return (
    <>
      <details open={open.current} className="max-w-full overflow-auto obs">
        <summary>
          <a href="https://observablehq.com/@makio135/bnbshader">原文</a>
        </summary>
        <div ref={ref} />
      </details>
    </>
  );
}

export default Bnbshader;
