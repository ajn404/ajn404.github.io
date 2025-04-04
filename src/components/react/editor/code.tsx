import { useEffect, useRef } from "react";
import { EditorView, basicSetup } from "codemirror";
import { javascript } from "@codemirror/lang-javascript";

export default ({ children }) => {
  const editorRef = useRef<HTMLDivElement>(null);
  let editor = useRef<EditorView | null>(null);

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML.length === 0) {
      const parent = editorRef.current;
      editor.current = new EditorView({
        extensions: [basicSetup, javascript()],
        parent: parent || document.body,
      });
    }
    if (children) {
      editor.current.dispatch({
        changes: {
          from: 0,
          to: editor.current.state.doc.length,
          insert: children,
        },
      });
    }
  }, [children]);

  return <div id="editor" className="bg-[#000] w-full" ref={editorRef}></div>;
};
