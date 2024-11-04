import { useEffect, useRef, useState, useCallback } from "react";
import {
  Viewer,
  Ion,
  ScreenSpaceEventHandler,
  Cartesian3,
  ScreenSpaceEventType,
} from "cesium";
import "cesium/Build/Cesium/Widgets/widgets.css";
import { Button } from "@components/react/shadcn/ui/button";
import { Alert, AlertDescription } from "@components/react/shadcn/ui/alert";
import { RocketIcon } from "@radix-ui/react-icons";
Ion.defaultAccessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIwOWRkMzFlYS0yMDVhLTRkNzYtYWJmMC1hMmE1NjljN2MyNjMiLCJpZCI6NzMzNDQsImlhdCI6MTYzNjgxNDEzNX0.Q2MfD_lkQgsJ-R3NPfYjS9QA9q_j4Py8DktYKsPmZNg";

export default function Control() {
  const cesiumRef = useRef(null);
  const viewerRef = useRef(null);
  const scene = useRef(null);
  let mousePosition = useRef(null);
  let startMousePosition = useRef(null);

  const [cameraControlEnabled, setCameraControlEnabled] = useState(true);
  const flags = useRef({
    looking: false,
    moveForward: false,
    moveBackward: false,
    moveUp: false,
    moveDown: false,
    moveLeft: false,
    moveRight: false,
  });

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
        terrainProvider: undefined,
        baseLayerPicker: false,
        geocoder: false,
        homeButton: false,
        sceneModePicker: false,
        navigationHelpButton: false,
        animation: false,
        timeline: false,
        fullscreenButton: false,
      });
      //@ts-ignore
      viewerRef.current._cesiumWidget._creditContainer.parentNode.removeChild(
        //@ts-ignore
        viewerRef.current._cesiumWidget._creditContainer
      );

      scene.current = viewerRef.current.scene;
      const canvas = viewerRef.current.canvas;
      canvas.setAttribute("tabindex", "0");
      canvas.onclick = () => canvas.focus();

      const handler = new ScreenSpaceEventHandler(canvas);
      handler.setInputAction(movement => {
        flags.current.looking = true;
        mousePosition.current = Cartesian3.clone(movement.position);
        startMousePosition.current = mousePosition.current;
      }, ScreenSpaceEventType.LEFT_DOWN);

      handler.setInputAction(movement => {
        mousePosition.current = movement.endPosition;
      }, ScreenSpaceEventType.MOUSE_MOVE);

      handler.setInputAction(() => {
        flags.current.looking = false;
      }, ScreenSpaceEventType.LEFT_UP);

      const getFlagForKeyCode = code => {
        switch (code) {
          case "KeyW":
            return "moveForward";
          case "KeyS":
            return "moveBackward";
          case "KeyQ":
            return "moveUp";
          case "KeyE":
            return "moveDown";
          case "KeyD":
            return "moveRight";
          case "KeyA":
            return "moveLeft";
          default:
            return undefined;
        }
      };

      document.addEventListener("keydown", e => {
        const flagName = getFlagForKeyCode(e.code);
        if (flagName) {
          flags.current[flagName] = true;
        }
      });

      document.addEventListener("keyup", e => {
        const flagName = getFlagForKeyCode(e.code);
        if (flagName) {
          flags.current[flagName] = false;
        }
      });

      const ellipsoid = scene.current.globe.ellipsoid;
      viewerRef.current.clock.onTick.addEventListener(() => {
        const camera = viewerRef.current.camera;
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;

        if (flags.current.looking) {
          const x =
            (mousePosition.current.x - startMousePosition.current.x) / width;
          const y =
            -(mousePosition.current.y - startMousePosition.current.y) / height;

          const lookFactor = 0.05;
          camera.lookRight(x * lookFactor);
          camera.lookUp(y * lookFactor);
        }

        const cameraHeight = ellipsoid.cartesianToCartographic(
          camera.position
        ).height;
        const moveRate = cameraHeight / 100.0;

        if (flags.current.moveForward) camera.moveForward(moveRate);
        if (flags.current.moveBackward) camera.moveBackward(moveRate);
        if (flags.current.moveUp) camera.moveUp(moveRate);
        if (flags.current.moveDown) camera.moveDown(moveRate);
        if (flags.current.moveLeft) camera.moveLeft(moveRate);
        if (flags.current.moveRight) camera.moveRight(moveRate);
      });

      const handleWheel = event => {
        //阻止冒泡
        event.stopPropagation();
      };
      cesiumRef.current.addEventListener("wheel", handleWheel);

      return () => {
        viewerRef.current.destroy();
        viewerRef.current = null;
        document.removeEventListener("keydown", () => {});
        document.removeEventListener("keyup", () => {});
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
      <Button onClick={toggleCameraControl} className="mt-4">
        {`${cameraControlEnabled ? "关闭" : "打开"}原生相机控制`}
      </Button>
      {!cameraControlEnabled && (
        <Alert className="mt-4">
          <RocketIcon className="h-4 w-4" />
          <AlertDescription>
            <pre>试试使用qwe asd控制相机</pre>
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
