import { useEffect, useState } from "react";

const Doodle: React.FunctionComponent = () => {
  let [sync] = useState(` @grid: 18 / 50vmin / #0a0c27;
      --hue: calc(180 + 1.5 * @x * @y);
      background: hsl(var(--hue), 50%, 70%);
      margin: -.5px;
      transition: @r(.5s) ease;
      clip-path: polygon(@pick(
        '0 0, 100% 0, 100% 100%',
        '0 0, 100% 0, 0 100%',
        '0 0, 100% 100%, 0 100%',
        '100% 0, 100% 100%, 0 100%'
      ));
   `);

  let [show, setShow] = useState(false);
  const click = () => {
    setShow(show => !show);
  };
  useEffect(() => {
    import("css-doodle").then(() => {
      setShow(true);
    });
  });
  return show && <css-doodle onClick={click}>{sync}</css-doodle>;
};

export default Doodle;
