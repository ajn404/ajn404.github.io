import { useEffect, useRef } from "react";
import { EditorView, basicSetup } from "codemirror";
import { javascript } from "@codemirror/lang-javascript";

export default () => {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current)
      new EditorView({
        extensions: [basicSetup, javascript()],
        parent: ref.current,
      });
  });

  return (
    <>
      <div ref={ref}>`let x =100`</div>
    </>
  );
};
