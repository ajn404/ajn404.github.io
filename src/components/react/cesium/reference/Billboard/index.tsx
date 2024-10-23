import { useEffect, useRef } from "react";
import { Viewer, BillboardCollection, Cartesian3 } from "cesium";
import { Ion } from "cesium";
import "cesium/Build/Cesium/Widgets/widgets.css";

// Make sure to set your Cesium ion access token
Ion.defaultAccessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIwOWRkMzFlYS0yMDVhLTRkNzYtYWJmMC1hMmE1NjljN2MyNjMiLCJpZCI6NzMzNDQsImlhdCI6MTYzNjgxNDEzNX0.Q2MfD_lkQgsJ-R3NPfYjS9QA9q_j4Py8DktYKsPmZNg";

export default function Template() {
  const cesiumContainer = useRef(null);
  const viewerRef = useRef(null);

  useEffect(() => {
    let viewer;

    const init = () => {
      if (cesiumContainer.current && !viewerRef.current) {
        viewerRef.current = new Viewer(cesiumContainer.current, {
          terrainProvider: undefined, // We'll use the default ellipsoid
          baseLayerPicker: false,
          geocoder: false,
          homeButton: false,
          sceneModePicker: false,
          navigationHelpButton: false,
          animation: false,
          timeline: false,
          fullscreenButton: false,
        });
        viewer = viewerRef.current;

        // 创建一个BillboardCollection
        const billboards = new BillboardCollection();
        viewer.scene.primitives.add(billboards);

        // 添加几个Billboard
        billboards.add({
          position: Cartesian3.fromDegrees(-75.59777, 40.03883, 0), // 经度, 纬度, 高度
          image: "/assets/bg/1.jpg", // 替换为你的图片URL
          width: 100,
          height: 100,
        });
        //@ts-ignore
        viewer._cesiumWidget._creditContainer.parentNode.removeChild(
          //@ts-ignore
          viewer._cesiumWidget._creditContainer
        );
      }
    };

    const handleWheel = event => {
      //阻止冒泡
      event.stopPropagation();
    };

    init();

    const containerElement = cesiumContainer.current;
    containerElement.addEventListener("wheel", handleWheel);

    return () => {
      if (viewerRef.current) {
        viewerRef.current.destroy();
        viewer = null;
      }
    };
  }, []);

  return (
    <div
      onDoubleClick={() => {
        if (cesiumContainer) {
          if (document.fullscreenElement) document.exitFullscreen();
          else cesiumContainer.current.requestFullscreen();
        }
      }}
      ref={cesiumContainer}
      style={{ width: "100%", height: "500px", userSelect: "none" }}
    />
  );
}
