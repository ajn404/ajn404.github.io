import { useEffect, useRef } from "react";
import { Viewer, Entity, Cartesian3, Color } from "cesium";
import { Ion } from "cesium";
import "cesium/Build/Cesium/Widgets/widgets.css";

// Make sure to set your Cesium ion access token
Ion.defaultAccessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIwOWRkMzFlYS0yMDVhLTRkNzYtYWJmMC1hMmE1NjljN2MyNjMiLCJpZCI6NzMzNDQsImlhdCI6MTYzNjgxNDEzNX0.Q2MfD_lkQgsJ-R3NPfYjS9QA9q_j4Py8DktYKsPmZNg";

export default function PersonnelTracker() {
  const cesiumContainer = useRef(null);
  const viewerRef = useRef(null);

  useEffect(() => {
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
      const personnelPosition = Cartesian3.fromDegrees(-75.59777, 40.03883);
      const entity = new Entity({
        position: personnelPosition,
        point: {
          pixelSize: 10,
          color: Color.RED,
        },
        label: {
          text: "Personnel 1",
          font: "14pt sans-serif",
          horizontalOrigin: 0, // LEFT
          verticalOrigin: 1, // BOTTOM
          pixelOffset: new Cartesian3(5, 5, 0),
        },
      });

      viewerRef.current.entities.add(entity);

      // Set the camera to look at the personnel
      viewerRef.current.camera.flyTo({
        destination: Cartesian3.fromDegrees(-75.59777, 40.03883, 1000),
      });
    }

    return () => {
      if (viewerRef.current) {
        viewerRef.current.destroy();
      }
    };
  }, []);

  return (
    <div ref={cesiumContainer} style={{ width: "100%", height: "500px" }} />
  );
}
