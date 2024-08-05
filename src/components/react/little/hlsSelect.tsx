import React, { useState, useEffect } from "react";

const HSLColorPicker: React.FC = () => {
  const [hue, setHue] = useState<number>(180);
  const [saturation, setSaturation] = useState<number>(100);
  const [lightness, setLightness] = useState<number>(50);
  const [color, setColor] = useState<string>(
    `hsl(${hue}, ${saturation}%, ${lightness}%)`
  );

  useEffect(() => {
    setColor(`hsl(${hue}, ${saturation}%, ${lightness}%)`);
  }, [hue, saturation, lightness]);

  return (
    <div className="flex mt-10 flex-col text-white">
      <div
        style={{
          width: "200px",
          height: "200px",
          backgroundColor: color,
          border: "1px solid #ccc",
          marginBottom: "20px",
        }}
      />

      <label htmlFor="hue">色相 (0-360°):</label>
      <input
        type="range"
        id="hue"
        min="0"
        max="360"
        value={hue}
        onChange={e => setHue(Number(e.target.value))}
      />

      <label htmlFor="saturation">饱和度 (0-100%):</label>
      <input
        type="range"
        id="saturation"
        min="0"
        max="100"
        value={saturation}
        onChange={e => setSaturation(Number(e.target.value))}
      />

      <label htmlFor="lightness">亮度 (0-100%):</label>
      <input
        type="range"
        id="lightness"
        min="0"
        max="100"
        value={lightness}
        onChange={e => setLightness(Number(e.target.value))}
      />
    </div>
  );
};

export default HSLColorPicker;
