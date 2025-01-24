import { Cartesian3 } from "cesium";
import { useCesium } from "../hooks/useCesium";
import { useCallback, useEffect, useState } from "react";
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

  type CurrentLocation = {
    latitude?: number;
    longitude?: number;
  };

  const [currentLocation, setCurrentLocation] = useState<CurrentLocation>({});

  const [watchId, setWatchId] = useState<number>(null);

  const getCurrentLocation = useCallback(() => {
    if (!navigator.geolocation) {
      alert("浏览器不支持地理位置功能");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      // 成功回调
      position => {
        setCurrentLocation(prev => ({
          ...prev,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        }));
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
      },
      {
        enableHighAccuracy: true, // 提高精度
        timeout: 10000, // 超时时间 10 秒
        maximumAge: 0, // 不缓存位置
      }
    );
  }, []);

  const watchCurrentLocation = useCallback(() => {
    const id = navigator.geolocation.watchPosition(position => {
      setCurrentLocation(prev => ({
        ...prev,
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      }));
    });
    setWatchId(id);
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
      <Button onClick={getCurrentLocation}>获取当前位置</Button>
      <Button onClick={watchCurrentLocation}>监听当前位置</Button>

      <span className="white">
        经纬度:{currentLocation.latitude},{currentLocation.longitude}
      </span>
    </>
  );
};
