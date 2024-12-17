import { useRef, useEffect } from "react";
import { Runtime, Inspector } from "@observablehq/runtime";
import "../style.scss";

function Bnbshader() {
  const ref = useRef<HTMLDivElement>(null);
  const open = useRef(false);
  useEffect(() => {
    const runtime = new Runtime();
    const url = "https://api.observablehq.com/@ajn404-ws/voronoidemo.js?v=4";
    import(/* @vite-ignore */ url).then(module => {
      const notebook = module.default;
      runtime.module(notebook, Inspector.into(ref.current));
    });

    return () => runtime.dispose();
  }, [ref.current]);

  return (
    <>
      <details open={open.current}>
        <summary>Voronoi</summary>
        <div ref={ref} />
      </details>
    </>
  );
}

export default Bnbshader;
