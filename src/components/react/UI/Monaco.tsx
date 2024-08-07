import { useEffect } from "react";
import MonacoEditor from "react-monaco-editor";
import "monaco-editor/min/vs/editor/editor.main.css";
// < ! --todo 编辑器组件报错-- >

export default ({ code }) => {
  useEffect(() => {
    // 这里可以进行一些初始化操作
  }, []);
  const editorOptions = {
    selectOnLineNumbers: true,
    automaticLayout: true,
  };
  return (
    <MonacoEditor
      width="800"
      height="600"
      language="javascript"
      value={code}
      options={editorOptions}
      onChange={newValue => console.log("change", newValue)}
    />
  );
};
