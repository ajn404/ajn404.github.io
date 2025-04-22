import type { ReactElement, ReactNode } from "react";
interface Props {
  children: ReactNode;
}

function removeHtmlTags(text) {
  return text.replace(/<[^>]*>/g, "");
}

export default function Text({ children }: Props) {
  let value =
    (children as ReactElement).props.value ||
    (children as ReactElement).props.children;
  if (value && value.length > 0) {
    value = removeHtmlTags(value);
    return (
      <div className="text-container">
        <span className="txt anim-text-flow p-4">
          {value.split("").map((str: string, index: number) => (
            <span key={str + index}>{str}</span>
          ))}
        </span>
      </div>
    );
  }
  return <div className="red">add text</div>;
}
