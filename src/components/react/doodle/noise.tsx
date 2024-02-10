import { useRef, useEffect, useState } from "react";

const Noise: React.FunctionComponent = () => {
  const doodle = useRef(null);
  let [show, setShow] = useState(false);

  let [sync] = useState(`@place-cell: center;
    @size: calc(@i * 1.5%);
    :doodle {
        width: 50vmin; 
        height: 50vmin;
    }
    z-index: calc(999 - @i);
    border-radius: 60%;
    border: 1px @p(dashed, solid, double) hsl(@rn(255), 70%, @rn(60, 90%));
    border-bottom-color: transparent;
    border-left-color: transparent;
    transform: 
        rotate(@rn(-720deg, 720deg))
        scale(@rn(.8, 1.2, 3));`);
  const click = () => {
    setShow(show => !show);
  };
  useEffect(() => {
    import("css-doodle").then(() => {
      setShow(true);
    });
  });
  return (
    show && (
      <css-doodle onClick={click} ref={doodle} grid="20x5">
        {sync}
      </css-doodle>
    )
  );
};

export default Noise;
