import type React from "react";
import { useState } from "react";

interface Props extends React.ConsumerProps<string | HTMLElement> {
  type: string;
}

export default ({ type }: Props) => {
  const [x1, setx1] = useState("0");
  const [x2, setx2] = useState("100");
  const [y1, sety1] = useState("0");
  const [y2, sety2] = useState("0");

  const [color1, setColor1] = useState("#e66465");
  const [color2, setColor2] = useState("#001177");

  const linearGradient = (
    <div className="text-white">
      <span>x1:</span>
      <input
        type="range"
        id="volume"
        value={x1}
        onChange={e => {
          setx1(e.target.value);
        }}
        name="volume"
        min="0"
        max="100"
      />
      <br />
      <span>x2:</span>
      <input
        type="range"
        id="volume"
        value={x2}
        onChange={e => {
          setx2(e.target.value);
        }}
        name="volume"
        min="0"
        max="100"
      />
      <br />
      <span>y1:</span>
      <input
        type="range"
        id="volume"
        value={y1}
        onChange={e => {
          sety1(e.target.value);
        }}
        name="volume"
        min="0"
        max="100"
      />
      <br />
      <span>y2:</span>
      <input
        type="range"
        id="volume"
        value={y2}
        onChange={e => {
          sety2(e.target.value);
        }}
        name="volume"
        min="0"
        max="100"
      />
      <br />
      <input
        type="color"
        id="head"
        name="head"
        value={color1}
        onChange={e => {
          setColor1(e.target.value);
        }}
      />
      0%的color
      <br />
      <input
        type="color"
        id="head"
        name="head"
        value={color2}
        onChange={e => {
          setColor2(e.target.value);
        }}
      />
      100%的color
      <br />
      <svg height="200" width="400">
        <defs>
          <linearGradient
            id="grad1"
            x1={x1 + "%"}
            y1={y1 + "%"}
            x2={x2 + "%"}
            y2={y2 + "%"}
          >
            <stop
              offset="0%"
              style={{ stopColor: color1, stopOpacity: 1 }}
            ></stop>
            <stop
              offset="100%"
              style={{ stopColor: color2, stopOpacity: 1 }}
            ></stop>
          </linearGradient>
        </defs>
        <ellipse
          cx="150"
          cy="100"
          rx="150"
          ry="90"
          fill="url(#grad1)"
        ></ellipse>
      </svg>
    </div>
  );
  if (type === "linear") return linearGradient;
  return <div></div>;
};
