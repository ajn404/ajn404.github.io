import React, { useEffect } from "react";
import {
  Cartesian3,
  Math as CesiumMath,
  Terrain,
  Viewer,
  createOsmBuildingsAsync,
  Ion,
  Math,
} from "cesium";

import * as Cesium from "cesium";

import "cesium/Build/Cesium/Widgets/widgets.css";
const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIwOWRkMzFlYS0yMDVhLTRkNzYtYWJmMC1hMmE1NjljN2MyNjMiLCJpZCI6NzMzNDQsImlhdCI6MTYzNjgxNDEzNX0.Q2MfD_lkQgsJ-R3NPfYjS9QA9q_j4Py8DktYKsPmZNg`;

const CesiumComponent: React.FC = () => {
  useEffect(() => {
    Ion.defaultAccessToken = token;
    const viewer = new Viewer("cesiumContainer", {
      infoBox: false,
      terrain: Terrain.fromWorldTerrain(),
    });
    // 确保场景已加载完成
    viewer.scene.globe.tileLoadProgressEvent.addEventListener(function (event) {
      if (event.tilesLoaded === event.tilesToRender) {
        // 场景已加载完成,可以切换到 2D 模式
        //   viewer.scene.mode = SceneMode.SCENE2D;
        // console.log(viewer.animation?.container);
      }
    });

    viewer.entities.add({
      rectangle: {
        coordinates: Cesium.Rectangle.fromDegrees(
          116.407,
          39.904,
          116.41,
          39.914
        ),
        material: new Cesium.StripeMaterialProperty({
          evenColor: Cesium.Color.BLACK,
          oddColor: Cesium.Color.RED,
          repeat: 5,
        }),
      },
    });

    viewer.camera.flyTo({
      destination: Cartesian3.fromDegrees(116.4085, 39.896, 500),
      orientation: {
        heading: CesiumMath.toRadians(0.0),
        pitch: CesiumMath.toRadians(-15.0),
      },
    });

    viewer.camera.setView({
      destination: Cartesian3.fromDegrees(116.404, 39.915, 1000000),
      orientation: {
        heading: Math.toRadians(0),
        pitch: Math.toRadians(-90),
        roll: Math.toRadians(0),
      },
    });

    createOsmBuildingsAsync().then(buildingTileset => {
      viewer.scene.primitives.add(buildingTileset);
    });
  }, []);

  return (
    <>
      <div id="cesiumContainer"></div>
    </>
  );
};

export default CesiumComponent;
