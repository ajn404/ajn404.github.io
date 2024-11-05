import { useEffect, useRef, useReducer } from "react";
import { Viewer, Ion, IonWorldImageryStyle, ImageryLayer } from "cesium";
import "cesium/Build/Cesium/Widgets/widgets.css";
Ion.defaultAccessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIwOWRkMzFlYS0yMDVhLTRkNzYtYWJmMC1hMmE1NjljN2MyNjMiLCJpZCI6NzMzNDQsImlhdCI6MTYzNjgxNDEzNX0.Q2MfD_lkQgsJ-R3NPfYjS9QA9q_j4Py8DktYKsPmZNg";

// 定义状态类型
type State = {
  viewer: Viewer | null;
  scene: any | null;
};

// 定义action类型
type Action =
  | { type: "INIT_VIEWER"; payload: { viewer: Viewer; scene: any } }
  | { type: "DESTROY_VIEWER" };

// 创建reducer函数
function cesiumReducer(state: State, action: Action): State {
  switch (action.type) {
    case "INIT_VIEWER":
      return {
        ...state,
        viewer: action.payload.viewer,
        scene: action.payload.scene,
      };
    case "DESTROY_VIEWER":
      return {
        ...state,
        viewer: null,
        scene: null,
      };
    default:
      return state;
  }
}

export default function Control() {
  const cesiumRef = useRef(null);
  const [state, dispatch] = useReducer(cesiumReducer, {
    viewer: null,
    scene: null,
  });

  useEffect(() => {
    if (cesiumRef.current && !state.viewer) {
      const viewer = new Viewer(cesiumRef.current, {
        terrainProvider: undefined,
        baseLayerPicker: false,
        geocoder: false,
        homeButton: false,
        sceneModePicker: false,
        navigationHelpButton: false,
        animation: false,
        timeline: false,
        fullscreenButton: false,
        baseLayer: ImageryLayer.fromWorldImagery({}),
      });

      //@ts-ignore
      viewer._cesiumWidget._creditContainer.parentNode.removeChild(
        //@ts-ignore
        viewer._cesiumWidget._creditContainer
      );

      const scene = viewer.scene;
      const canvas = viewer.canvas;
      canvas.setAttribute("tabindex", "0");
      canvas.onclick = () => canvas.focus();

      dispatch({ type: "INIT_VIEWER", payload: { viewer, scene } });

      const handleWheel = (event: WheelEvent) => {
        event.stopPropagation();
      };
      cesiumRef.current.addEventListener("wheel", handleWheel);

      return () => {
        viewer.destroy();
        dispatch({ type: "DESTROY_VIEWER" });
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
    </div>
  );
}
