import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  atomDark,
  vscDarkPlus,
} from "react-syntax-highlighter/dist/cjs/styles/prism";
import { IconCheck, IconCopy } from "@tabler/icons-react";

type CodeBlockProps = {
  language: string;
  filename: string;
  highlightLines?: number[];
  highlightRange?: { start: number; end: number };
} & (
  | {
      code: string;
      tabs?: never;
    }
  | {
      code?: never;
      tabs: Array<{
        name: string;
        code: string;
        language?: string;
        highlightLines?: number[];
        highlightRange?: { start: number; end: number };
      }>;
    }
);

export const CodeBlock = ({
  language,
  filename,
  code,
  highlightLines = [],
  highlightRange,
  tabs = [],
}: CodeBlockProps) => {
  const [copied, setCopied] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState(0);

  const copyToClipboard = async () => {
    const textToCopy = tabs.length > 0 ? tabs[activeTab].code : code;
    if (textToCopy) {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const tabsExist = tabs.length > 0;
  const activeCode = tabsExist ? tabs[activeTab].code : code;
  const activeLanguage = tabsExist
    ? tabs[activeTab].language || language
    : language;
  const activeHighlightLines = tabsExist
    ? tabs[activeTab].highlightLines || []
    : highlightLines;
  const activeHighlightRange = tabsExist
    ? tabs[activeTab].highlightRange || highlightRange
    : highlightRange;

  return (
    <div className="relative w-full rounded-xl bg-slate-900/70 backdrop-blur-sm p-4 font-mono text-sm shadow-xl border border-slate-800">
      <div className="flex flex-col gap-2">
        {tabsExist && (
          <div className="flex overflow-x-auto border-b border-slate-800">
            {tabs.map((tab, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`px-4 py-2 text-xs transition-all font-medium font-sans rounded-t-lg ${
                  activeTab === index
                    ? "text-white bg-slate-800/50 border-b-2 border-blue-500"
                    : "text-zinc-400 hover:text-zinc-200 hover:bg-slate-800/30"
                }`}
              >
                {tab.name}
              </button>
            ))}
          </div>
        )}
        {!tabsExist && filename && (
          <div className="flex justify-between items-center py-2 px-1">
            <div className="text-xs text-zinc-400 flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-zinc-400"></span>
              {filename}
            </div>
            <button
              onClick={copyToClipboard}
              className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-zinc-200 transition-colors font-sans px-2 py-1 rounded-md hover:bg-slate-800/50"
            >
              {copied ? (
                <IconCheck className="w-auto" size={14} />
              ) : (
                <IconCopy size={14} />
              )}
              {copied ? "已复制" : "复制"}
            </button>
          </div>
        )}
      </div>
      <SyntaxHighlighter
        language={activeLanguage}
        style={vscDarkPlus}
        customStyle={{
          margin: 0,
          padding: 0,
          background: "transparent",
        }}
        wrapLines={true}
        showLineNumbers={true}
        lineProps={lineNumber => ({
          style: {
            backgroundColor:
              activeHighlightLines.includes(lineNumber) ||
              (activeHighlightRange &&
                lineNumber >= activeHighlightRange.start &&
                lineNumber <= activeHighlightRange.end)
                ? "rgba(255,255,255,0.1)"
                : "transparent",
            display: "block",
            width: "100%",
          },
        })}
        PreTag="div"
      >
        {String(activeCode)}
      </SyntaxHighlighter>
    </div>
  );
};
