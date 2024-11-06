import { Cartesian3 } from "cesium";
import { useCesium } from "./hooks/useCesium";
import { useEffect } from "react";

export default () => {
  const { cesiumContainerRef, viewer } = useCesium();
  useEffect(() => {
    if (viewer.current)
      viewer.current.camera.flyTo({
        destination: Cartesian3.fromDegrees(-117.16, 32.71, 15000.0),
      });
  }, [viewer]);
  return (
    <>
      <div
        onDoubleClick={() => {
          if (cesiumContainerRef.current) {
            if (document.fullscreenElement) {
              document.exitFullscreen();
            } else {
              cesiumContainerRef.current.requestFullscreen();
            }
          }
        }}
        ref={cesiumContainerRef}
        style={{ width: "100%", height: "500px", userSelect: "none" }}
      />
    </>
  );
};
