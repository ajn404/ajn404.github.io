import { useEffect, useRef } from "react";
import { Viewer } from "cesium";
import { Ion } from "cesium";
import * as Cesium from "cesium";
import "cesium/Build/Cesium/Widgets/widgets.css";

// Make sure to set your Cesium ion access token
Ion.defaultAccessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIwOWRkMzFlYS0yMDVhLTRkNzYtYWJmMC1hMmE1NjljN2MyNjMiLCJpZCI6NzMzNDQsImlhdCI6MTYzNjgxNDEzNX0.Q2MfD_lkQgsJ-R3NPfYjS9QA9q_j4Py8DktYKsPmZNg";

export default function template() {
  const cesiumContainer = useRef(null);
  const viewerRef = useRef(null);

  useEffect(() => {
    let viewer: Viewer;

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

    requestIdleCallback(async () => {
      // 创建自定义着色器
      const customShader = new Cesium.CustomShader({
        uniforms: {
          u_time: {
            value: 0,
            type: Cesium.UniformType.FLOAT,
          },
          u_resolution: {
            value: new Cesium.Cartesian2(window.innerWidth, window.innerHeight),
            type: Cesium.UniformType.VEC2,
          },
        },
        varyings: {
          v_uv: Cesium.VaryingType.VEC2,
        },
        mode: Cesium.CustomShaderMode.MODIFY_MATERIAL,
        lightingModel: Cesium.LightingModel.PBR,
        translucencyMode: Cesium.CustomShaderTranslucencyMode.TRANSLUCENT,
        vertexShaderText: `
          void vertexMain(VertexInput vsInput, inout czm_modelVertexOutput vsOutput) {
            v_uv = (vsInput.attributes.positionMC.xy + 1.0) / 2.0;
          }
        `,
        fragmentShaderText: `
          #define PI 3.14159265359

          // 网格平铺
          vec2 tile(vec2 st, float zoom) {
              st *= zoom;
              return fract(st);
          }

          // 棱形图案生成
          float diamondPattern(vec2 st) {
              st = abs(st - 0.5);
              return step(st.x + st.y, 0.5);
          }

          void fragmentMain(FragmentInput fsInput, inout czm_modelMaterial material) {
              vec2 st = v_uv;
              st.x *= u_resolution.x / u_resolution.y;

              float zoom = 4.0;
              st = tile(st, zoom);

              float pattern = diamondPattern(st);
              float checker = mod(floor(gl_FragCoord.x / (u_resolution.x / zoom)) +
                  floor(gl_FragCoord.y / (u_resolution.y / zoom)), 2.0);
              vec3 color = mix(vec3(1.0), vec3(0.0), abs(1.0 - pattern));

              material.diffuse = color;
              material.alpha = 1.0;
          }
        `,
      });

      // 更新uniform值
      function updateShaderUniforms() {
        const currentTime = performance.now() * 0.001;
        customShader.setUniform("u_time", currentTime);
        customShader.setUniform(
          "u_resolution",
          new Cesium.Cartesian2(window.innerWidth, window.innerHeight)
        );
      }

      // 在渲染循环中更新uniform值
      viewer.scene.preRender.addEventListener(updateShaderUniforms);

      const translation = new Cesium.Cartesian3(
        -1571952.1361662298,
        4395241.97876768,
        4332149.3142119665
      );
      const cartographic = Cesium.Cartographic.fromCartesian(translation);
      const longitude = Cesium.Math.toDegrees(cartographic.longitude);
      const latitude = Cesium.Math.toDegrees(cartographic.latitude);
      const height = cartographic.height;

      const entity = (viewer.trackedEntity = viewer.entities.add({
        name: "animate",
        position: Cesium.Cartesian3.fromDegrees(longitude, latitude, height),
        model: {
          uri: "/assets/models/gltf/animate.gltf",
          scale: 100,
          customShader: customShader,
        },
      }));
      viewer.trackedEntity = entity;
    });

    // 创建事件处理器
    const handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);

    // 监听右键点击事件
    handler.setInputAction(movement => {
      const windowPosition = movement.position;

      // 将屏幕坐标转换为地球表面的坐标
      const pickedPosition = viewer.camera.pickEllipsoid(windowPosition);

      if (pickedPosition) {
        // 将笛卡尔坐标转换为经纬度
        const cartographic = Cesium.Cartographic.fromCartesian(pickedPosition);
        const longitude = Cesium.Math.toDegrees(cartographic.longitude);
        const latitude = Cesium.Math.toDegrees(cartographic.latitude);
        // console.log(`经度: ${longitude.toFixed(6)}, 纬度: ${latitude.toFixed(6)}`);
        const position = Cesium.Cartesian3.fromDegrees(
          longitude,
          latitude,
          200
        );

        console.log(position);
      } else {
        console.log("未点击到地球表面");
      }
    }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);

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
