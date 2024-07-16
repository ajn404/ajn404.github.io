import React, { useEffect } from "react";
// import { Cartesian3 } from "cesium";
// import { Viewer, Entity, PointGraphics } from "resium";

import {
  Cartesian3,
  Math as CesiumMath,
  Terrain,
  Viewer,
  createOsmBuildingsAsync,
  Ion,
} from "cesium";

import "cesium/Build/Cesium/Widgets/widgets.css";

const CesiumComponent: React.FC = () => {
  useEffect(() => {
    // import("cesium/Source/Widgets/widgets.css");
    Ion.defaultAccessToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIwOWRkMzFlYS0yMDVhLTRkNzYtYWJmMC1hMmE1NjljN2MyNjMiLCJpZCI6NzMzNDQsImlhdCI6MTYzNjgxNDEzNX0.Q2MfD_lkQgsJ-R3NPfYjS9QA9q_j4Py8DktYKsPmZNg";
    const viewer = new Viewer("cesiumContainer", {
      infoBox: false,
      terrain: Terrain.fromWorldTerrain(),
    });
    viewer.camera.flyTo({
      destination: Cartesian3.fromDegrees(109.177, 29.833, 4100),
      orientation: {
        heading: CesiumMath.toRadians(0.0),
        pitch: CesiumMath.toRadians(-15.0),
      },
    });
    createOsmBuildingsAsync().then(buildingTileset => {
      viewer.scene.primitives.add(buildingTileset);
    });
  }, []);
  //东经109°4′48″～109°58′42″、北纬29°50′33″～30°39′30″
  //   const position = Cartesian3.fromDegrees(109.077, 29.833, 100);
  //   const pointGraphics = { pixelSize: 10 };
  return (
    <>
      {/* <Viewer
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
      </Viewer> */}
      <div id="cesiumContainer"></div>
    </>
  );
};

export default CesiumComponent;
