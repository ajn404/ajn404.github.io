let useJavascript;

import { EditorView, basicSetup } from "codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { nextTick } from "vue";

export default useJavascript = () => {
  nextTick(() => {
    const parent = document.querySelector("#editor");
    new EditorView({
      extensions: [basicSetup, javascript()],
      parent: parent || document.body,
    });
  });
};
