import {
  Cartesian3,
  JulianDate,
  ClockRange,
  SampledPositionProperty,
  TimeInterval,
  PointGraphics,
  PolylineGlowMaterialProperty,
  VelocityOrientationProperty,
  TimeIntervalCollection,
  Color,
  PathGraphics,
  Cartographic,
  Math,
} from "cesium";
import { useCesium } from "../hooks/useCesium";
import { useEffect, useCallback, useState } from "react";
import "cesium/Build/Cesium/Widgets/widgets.css";
import { generateTrajectory } from "./generateTrackJson";

export default () => {
  const { cesiumContainerRef, viewer } = useCesium();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPosition, setCurrentPosition] = useState<{
    lng: number;
    lat: number;
  }>();
  const trajectoryPoints = generateTrajectory(116.5389, 39.8209);

  // 创建时间驱动的动态位置属性
  const createTimeBasedPosition = useCallback(() => {
    if (!viewer.current) return;

    // 1. 配置场景时钟
    const viewerClock = viewer.current.clock;

    // 1. 配置时钟参数
    viewerClock.startTime = JulianDate.fromDate(
      new Date(trajectoryPoints[0].time)
    );
    viewerClock.stopTime = JulianDate.fromDate(
      new Date(trajectoryPoints[trajectoryPoints.length - 1].time)
    );
    viewerClock.currentTime = JulianDate.clone(viewerClock.startTime);
    viewerClock.clockRange = ClockRange.LOOP_STOP;
    viewerClock.multiplier = 1;

    // 2. 创建采样位置属性
    const positionProperty = new SampledPositionProperty();
    trajectoryPoints.forEach(point => {
      const time = JulianDate.fromDate(new Date(point.time));
      const position = Cartesian3.fromDegrees(point.lng, point.lat);
      positionProperty.addSample(time, position);
    });

    // 3. 创建动态实体
    const movingEntity = viewer.current.entities.add({
      availability: new TimeIntervalCollection([
        new TimeInterval({
          start: viewerClock.startTime,
          stop: viewerClock.stopTime,
        }),
      ]),
      model: {
        uri: "/assets/models/gltf/Cesium_Man.glb",
        scale: 2,
        // 添加以下配置调整模型初始方向
        minimumPixelSize: 64, // 可选：保持模型可见
        maximumScale: 200, // 可选：限制最大缩放
        clampAnimations: false, // 允许动画循环
      },
      position: positionProperty,
      orientation: new VelocityOrientationProperty(positionProperty), // 自动计算朝向
      point: new PointGraphics({
        color: Color.RED,
        pixelSize: 12,
        outlineColor: Color.WHITE,
        outlineWidth: 2,
      }),
      path: new PathGraphics({
        resolution: 1,
        material: new PolylineGlowMaterialProperty({
          glowPower: 0.3,
          color: Color.YELLOW,
        }),
        width: 3,
      }),
    });

    // 配置跟踪参数
    viewer.current.trackedEntity = movingEntity;
    viewer.current.scene.screenSpaceCameraController.enableCollisionDetection =
      false; // 禁用碰撞检测

    // 4. 时间变化监听
    viewer.current.clock.onTick.addEventListener(clock => {
      const currentTime = clock.currentTime;
      const cartesian = positionProperty.getValue(currentTime);
      const cartographic = Cartographic.fromCartesian(cartesian);
      setCurrentPosition({
        lng: Math.toDegrees(cartographic.longitude),
        lat: Math.toDegrees(cartographic.latitude),
      });
    });

    return () => {
      viewer.current?.entities.remove(movingEntity);
      viewer.current?.clock.onTick.removeEventListener();
    };
  }, [viewer.current, trajectoryPoints]);

  // 初始化场景
  useEffect(() => {
    if (!viewer.current) return;

    // 绘制静态轨迹
    const staticPath = viewer.current.entities.add({
      polyline: {
        positions: Cartesian3.fromDegreesArray(
          trajectoryPoints.flatMap(p => [p.lng, p.lat])
        ),
        width: 1,
        material: Color.GRAY.withAlpha(0.5),
      },
    });

    createTimeBasedPosition();

    return () => {
      viewer.current?.entities.remove(staticPath);
    };
  }, []);

  // 控制时钟状态
  const togglePlay = () => {
    if (!viewer.current) return;

    if (isPlaying) {
      viewer.current.clock.shouldAnimate = false;
    } else {
      if (
        JulianDate.compare(
          viewer.current.clock.currentTime,
          viewer.current.clock.stopTime
        ) === 0
      ) {
        viewer.current.clock.currentTime = viewer.current.clock.startTime;
      }
      viewer.current.clock.shouldAnimate = true;
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div style={{ position: "relative" }}>
      <div
        ref={cesiumContainerRef}
        style={{
          width: "100%",
          height: "70vh",
          userSelect: "none",
          position: "relative",
          zIndex: 0,
        }}
      />

      {/* 控制面板 */}
      <div
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          zIndex: 1,
          background: "rgba(40,40,40,0.7)",
          color: "white",
          padding: "10px",
          borderRadius: "8px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
        }}
      >
        <button onClick={togglePlay}>
          {isPlaying ? "⏸️ 暂停" : "▶️ 播放"}
        </button>
        <button
          onClick={() => {
            viewer.current!.clock.currentTime = viewer.current!.clock.startTime;
            viewer.current!.clock.shouldAnimate = false;
            setIsPlaying(false);
          }}
        >
          ⏹️ 重置
        </button>
        <div style={{ marginTop: 10 }}>
          {currentPosition &&
            `经度: ${currentPosition.lng.toFixed(6)}  纬度: ${currentPosition.lat.toFixed(6)}`}
        </div>
      </div>
    </div>
  );
};
