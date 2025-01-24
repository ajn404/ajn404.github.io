import { Cartesian3 } from "cesium";
import { useCesium } from "../hooks/useCesium";
import { useCallback, useEffect } from "react";
import "cesium/Build/Cesium/Widgets/widgets.css";
import { Button } from "@components/react/shadcn/ui/button";

export default () => {
  const { cesiumContainerRef, viewer } = useCesium();
  useEffect(() => {
    if (viewer.current)
      viewer.current.camera.flyTo({
        destination: Cartesian3.fromDegrees(-117.16, 32.71, 15000.0),
      });
  }, [viewer]);

  const getCurrentLocation = useCallback(() => {
    navigator.geolocation.getCurrentPosition(
      // 成功回调
      position => {
        const latitude = position.coords.latitude; // 纬度
        const longitude = position.coords.longitude; // 经度
        viewer.current.camera.flyTo({
          destination: Cartesian3.fromDegrees(latitude, longitude, 15000.0),
        });
      },
      // 失败回调
      error => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            alert("用户拒绝了地理位置请求");
            break;
          case error.POSITION_UNAVAILABLE:
            alert("无法获取位置信息");
            break;
          case error.TIMEOUT:
            alert("请求超时");
            break;
          default:
            alert("未知错误");
        }
      }
    );
  }, []);
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
      <Button className="flex items-center" onClick={getCurrentLocation}>
        获取当前位置
      </Button>
    </>
  );
};
