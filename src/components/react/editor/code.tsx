import { useEffect, useRef } from "react";
import { EditorView, basicSetup } from "codemirror";
import { javascript } from "@codemirror/lang-javascript";

export default ({ children }) => {
  const editorRef = useRef(null);

  useEffect(() => {
    if (editorRef.current) {
      const parent = editorRef.current;
      const editor = new EditorView({
        extensions: [basicSetup, javascript()],
        parent: parent || document.body,
      });
      if (children) {
        editor.dispatch({
          changes: { from: 0, to: 0, insert: children },
        });
      }
    }
  }, [children]);

  return <div id="editor" className="bg-[#000]" ref={editorRef}></div>;
};
