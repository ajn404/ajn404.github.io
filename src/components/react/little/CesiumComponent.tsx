import React, { useEffect } from "react";
import { Viewer, Entity, EntityDescription, PointGraphics } from "resium";
import { Cartesian3 } from "cesium";

const CesiumComponent: React.FC = () => {
  useEffect(() => {
    import("cesium/Source/Widgets/widgets.css");
  }, []);
  //东经109°4′48″～109°58′42″、北纬29°50′33″～30°39′30″
  const position = Cartesian3.fromDegrees(109.077, 29.833, 100);
  const pointGraphics = { pixelSize: 10 };
  return (
    <>
      <Viewer
        infoBox={false}
        style={{
          position: "relative",
          zIndex: 99999,
        }}
      >
        <Entity
          description="Hello, world."
          name="恩施"
          position={position}
          point={pointGraphics}
        >
          <PointGraphics pixelSize={10} />
        </Entity>
      </Viewer>
    </>
  );
};

export default CesiumComponent;
