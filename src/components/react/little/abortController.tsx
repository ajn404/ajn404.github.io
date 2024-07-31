import React, { useState, useRef, useEffect } from "react";
// import "@blocksuite/editor/themes/affine.css";

import Editor from "../editor/code";

const FetchWithAbort: React.FC = () => {
  const [status, setStatus] = useState<string>(""); // 状态信息
  const abortControllerRef = useRef<AbortController | null>(null); // 引用 AbortController
  const startFetch = () => {
    setStatus("请求中...");
    abortControllerRef.current = new AbortController(); // 创建新的 AbortController
    const signal = abortControllerRef.current.signal;

    fetch("https://httpbin.org/delay/5", { signal })
      .then(response => {
        if (!response.ok) throw new Error("网络响应错误");
        return response.json();
      })
      .then(data => {
        let str = JSON.stringify(data);
        //没个逗号后插入换行
        str = str.replace(/,/g, ",\n");
        setStatus(str);
      })
      .catch(err => {
        if (err.name === "AbortError") {
          setStatus("请求已中止");
        } else {
          setStatus("请求失败: " + err.message);
        }
      });
  };

  const abortFetch = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort(); // 中止请求
      setStatus("请求已中止");
    }
  };

  return (
    <div>
      <h1>中止 Fetch 请求示例</h1>
      <button
        className="bg-black px-10 text-white mx-20 my-4"
        onClick={startFetch}
      >
        开始请求
      </button>
      <button
        className="bg-white px-10 text-black mx-20 my-4"
        onClick={abortFetch}
      >
        中止请求
      </button>
      <Editor>{status}</Editor>
    </div>
  );
};

export default FetchWithAbort;
