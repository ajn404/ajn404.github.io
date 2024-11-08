import {
  useEffect,
  useState,
  type ReactNode,
  type ReactElement,
  useRef,
} from "react";

interface Props {
  children: ReactNode;
  download?: Boolean;
  grid?: string;
}

const Doodle: React.FunctionComponent<Props> = ({
  children,
  download,
  grid,
}) => {
  let value =
    (children as ReactElement).props.value ||
    (children as ReactElement).props.children;
  let doodle = useRef<any>(null);
  let [show, setShow] = useState(false);

  useEffect(() => {
    import("css-doodle").then(() => {
      setShow(true);
    });
  });
  const downloadClick = () => {
    doodle.current &&
      doodle.current.export({
        scale: 8,
        download: true,
      });
  };
  return (
    <div>
      {show && (
        <css-doodle
          style={{ cursor: "none", background: "#fff" }}
          ref={doodle}
          grid={grid?.toString()}
          click-to-update
        >
          {value}
        </css-doodle>
      )}
      {download && (
        <button
          className="text-l w-[50vmin] pt-1 text-skin-base hover:drop-shadow-md"
          onClick={downloadClick}
        >
          下载
        </button>
      )}
    </div>
  );
};

export default Doodle;
