import { useEffect, useRef, useState, useCallback } from "react";
import { Viewer, Ion } from "cesium";
import "cesium/Build/Cesium/Widgets/widgets.css";
import { Button } from "@components/react/shadcn/ui/button";

// Make sure to set your Cesium ion access token
Ion.defaultAccessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIwOWRkMzFlYS0yMDVhLTRkNzYtYWJmMC1hMmE1NjljN2MyNjMiLCJpZCI6NzMzNDQsImlhdCI6MTYzNjgxNDEzNX0.Q2MfD_lkQgsJ-R3NPfYjS9QA9q_j4Py8DktYKsPmZNg";

export default function Template() {
  const cesiumRef = useRef(null);
  const viewerRef = useRef(null);
  const scene = useRef(null);
  const [cameraControlEnabled, setCameraControlEnabled] = useState(true);

  const toggleCameraControl = useCallback(() => {
    if (!scene.current) return;

    const cameraController = scene.current.screenSpaceCameraController;
    cameraController.enableRotate = !cameraControlEnabled;
    cameraController.enableTranslate = !cameraControlEnabled;
    cameraController.enableZoom = !cameraControlEnabled;
    cameraController.enableTilt = !cameraControlEnabled;
    cameraController.enableLook = !cameraControlEnabled;

    setCameraControlEnabled(prev => !prev);
  }, [cameraControlEnabled]);

  useEffect(() => {
    if (cesiumRef.current && !viewerRef.current) {
      viewerRef.current = new Viewer(cesiumRef.current, {
        terrainProvider: undefined, // 使用默认的椭球体
        baseLayerPicker: false,
        geocoder: false,
        homeButton: false,
        sceneModePicker: false,
        navigationHelpButton: false,
        animation: false,
        timeline: false,
        fullscreenButton: false,
      });

      scene.current = viewerRef.current.scene;

      const canvas = viewerRef.current.canvas;
      canvas.setAttribute("tabindex", "0"); // 需要将焦点放在画布上
      canvas.onclick = () => canvas.focus();

      const handleWheel = event => {
        event.stopPropagation(); // 阻止冒泡
      };

      cesiumRef.current.addEventListener("wheel", handleWheel);

      return () => {
        viewerRef.current.destroy();
        viewerRef.current = null;
        cesiumRef.current.removeEventListener("wheel", handleWheel);
      };
    }
  }, []);

  return (
    <div>
      <div
        onDoubleClick={() => {
          if (cesiumRef.current) {
            if (document.fullscreenElement) {
              document.exitFullscreen();
            } else {
              cesiumRef.current.requestFullscreen();
            }
          }
        }}
        ref={cesiumRef}
        style={{ width: "100%", height: "500px", userSelect: "none" }}
      />
      <Button onClick={toggleCameraControl}>
        {`${cameraControlEnabled ? "关闭" : "打开"}相机控制`}
      </Button>
    </div>
  );
}
