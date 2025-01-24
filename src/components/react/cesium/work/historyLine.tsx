import { Cartesian3, Color, Entity, PointGraphics } from "cesium";
import { useCesium } from "../hooks/useCesium";
import { useCallback, useEffect, useState } from "react";
import "cesium/Build/Cesium/Widgets/widgets.css";
import { Button } from "@components/react/shadcn/ui/button";

export default () => {
  const { cesiumContainerRef, viewer } = useCesium();
  const [currentEntity, setCurrentEntity] = useState<Entity>(); // 存储位置实体
  const [watchId, setWatchId] = useState<number>(null);

  type CurrentLocation = {
    latitude?: number;
    longitude?: number;
  };

  const [currentLocation, setCurrentLocation] = useState<CurrentLocation>({});

  // 初始化时检查地理位置权限
  useEffect(() => {
    if (!navigator.geolocation) {
      alert("浏览器不支持地理位置功能");
      return;
    }

    navigator.permissions
      .query({ name: "geolocation" })
      .then(permissionStatus => {
        if (permissionStatus.state === "denied") {
          alert("请允许地理位置权限以使用此功能");
        }
      });
  }, []);

  // 更新地图上的位置标记
  const updatePositionMarker = useCallback(
    (longitude: number, latitude: number) => {
      if (!viewer.current) return;

      // 移除旧实体
      if (currentEntity) {
        viewer.current.entities.remove(currentEntity);
      }

      // 创建新实体
      const newEntity = viewer.current.entities.add({
        position: Cartesian3.fromDegrees(longitude, latitude),
        point: new PointGraphics({
          color: Color.RED,
          pixelSize: 10,
          outlineColor: Color.WHITE,
          outlineWidth: 2,
        }),
      });

      setCurrentEntity(newEntity);

      // 移动视角到当前位置
      viewer.current.camera.flyTo({
        destination: Cartesian3.fromDegrees(longitude, latitude, 1000),
        orientation: {
          heading: 0,
          pitch: -Math.PI / 4,
          roll: 0,
        },
      });
    },
    [viewer.current, currentEntity]
  );

  // 监听位置变化
  const watchCurrentLocation = useCallback(() => {
    const id = navigator.geolocation.watchPosition(
      position => {
        const { latitude, longitude } = position.coords;
        setCurrentLocation({ latitude, longitude });
        updatePositionMarker(longitude, latitude);
      },
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
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
    setWatchId(id);
  }, [updatePositionMarker]);

  // 清理
  useEffect(() => {
    return () => {
      if (watchId) navigator.geolocation.clearWatch(watchId);
      if (currentEntity && viewer.current) {
        viewer.current.entities.remove(currentEntity);
      }
    };
  }, [watchId, currentEntity]);

  return (
    <>
      <div
        ref={cesiumContainerRef}
        style={{
          width: "100%",
          height: "500px",
          userSelect: "none",
          position: "relative",
          zIndex: 0,
        }}
      />
      <Button onClick={watchCurrentLocation}>开始实时定位</Button>

      <div className="position-info">
        当前坐标: {currentLocation.latitude?.toFixed(5)},{" "}
        {currentLocation.longitude?.toFixed(5)}
      </div>
    </>
  );
};
