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
            value: 0, // 初始值
            type: Cesium.UniformType.FLOAT,
          },
          u_externalTexture: {
            value: new Cesium.TextureUniform({
              url: "/assets/bg/1.jpeg",
            }),
            type: Cesium.UniformType.SAMPLER_2D,
          },
        },
        varyings: {
          v_customTexCoords: Cesium.VaryingType.VEC2,
          v_selectedColor: Cesium.VaryingType.VEC4,
        },
        mode: Cesium.CustomShaderMode.MODIFY_MATERIAL,
        lightingModel: Cesium.LightingModel.PBR,
        translucencyMode: Cesium.CustomShaderTranslucencyMode.TRANSLUCENT,
        vertexShaderText: `
        void vertexMain(VertexInput vsInput, inout czm_modelVertexOutput vsOutput) {
            // 这里可以添加自定义的顶点着色器代码
            // 计算颜色值
            float r = u_time; // 红色分量
            float b = 1.0 - u_time; // 蓝色分量
            v_selectedColor = vec4(r, r , b, 1.0);
        }
    `,
        fragmentShaderText: `
        void fragmentMain(FragmentInput fsInput, inout czm_modelMaterial material) {
            
            material.diffuse = v_selectedColor.rgb; // 设置漫反射颜色为红色
            material.alpha = 1.0; // 设置透明度
        }
    `,
      });

      // 更新u_time的值
      function updateShaderTime() {
        const currentTime = performance.now() * 0.001; // 获取当前时间（秒）
        customShader.setUniform("u_time", Math.sin(currentTime)); // 使用正弦函数使颜色在0到1之间变化
      }

      // 在渲染循环中更新时间
      viewer.scene.preRender.addEventListener(updateShaderTime);

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
          scale: 1000000,
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
