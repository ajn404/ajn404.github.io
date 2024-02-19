//e
import { useEditor, EditorRoot } from "novel";
import { useEffect } from "react";

function Child() {
  const { editor } = useEditor();
  console.log(editor);

  useEffect(() => {
    import("novel").then(res => {
      console.log(res);
    });
  });

  return (
    <>
      <h1>Child</h1>
      <code>let x =10</code>
      <p>time passes change will be changed</p>
    </>
  );
}

export default function Parent() {
  return (
    <>
      <EditorRoot>
        <Child />
      </EditorRoot>
    </>
  );
}
