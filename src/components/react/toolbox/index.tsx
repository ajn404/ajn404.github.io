import React from "react";

// 定义一个输入框组件
const ToolBox = React.forwardRef<HTMLDivElement, DivProps>((props, ref) => {
  return (
    <div
      ref={ref} // 将 ref 传递给 input 元素
      {...props} // 传递其他 props
      className="border p-2 rounded"
    />
  );
});

export default ToolBox;
