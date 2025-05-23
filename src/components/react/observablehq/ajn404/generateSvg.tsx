import React, { useRef, useEffect } from "react";
import { Runtime, Inspector } from "@observablehq/runtime";
import "../style.scss";

function Bnbshader() {
  const ref = useRef<HTMLDivElement>(null);
  const open = useRef(false);
  useEffect(() => {
    const runtime = new Runtime();
    const url =
      "https://api.observablehq.com/@ajn404-ws/generating-svgs@416.js?v=4&api_key=21ccdca7785e2208d1de7207e69c43635468f5b8";
    import(url).then(module => {
      const notebook = module.default;
      runtime.module(notebook, Inspector.into(ref.current));
    });

    return () => runtime.dispose();
  }, [ref.current]);

  return (
    <>
      <details open={open.current} className="max-w-full overflow-auto obs">
        <summary>
          <a
            href="https://observablehq.com/@makio135/bnbshader"
            data-astro-prefetch
          >
            原文
          </a>
        </summary>
        <div ref={ref} />
      </details>
    </>
  );
}

export default Bnbshader;
