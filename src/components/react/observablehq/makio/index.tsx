import React, { useRef, useEffect } from "react";
import { Runtime, Inspector } from "@observablehq/runtime";

function Bnbshader() {
  const ref = useRef();
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
  }, []);

  return (
    <>
      <details open>
        <summary>
          {" "}
          <a href="https://observablehq.com/@makio135/bnbshader">yuan wen</a>
        </summary>

        <div ref={ref} />
      </details>
    </>
  );
}

export default Bnbshader;
