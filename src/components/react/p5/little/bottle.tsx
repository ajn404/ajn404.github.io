import type p5 from "p5";
import Basic from "@components/react/p5/index.tsx";
import { useCallback, useRef, useState } from "react";
import ColorThief from "colorthief/dist/color-thief.mjs";

let img;
let bottleModel;
let font;
let canvas;
let button: p5.Element;
const colors = [
  { background: "#FF5733", text: "#FFFFFF" }, // 背景：红色，字体：白色
  { background: "#33FF57", text: "#000000" }, // 背景：绿色，字体：黑色
  { background: "#3357FF", text: "#FFFFFF" }, // 背景：蓝色，字体：白色
  { background: "#F1C40F", text: "#000000" }, // 背景：黄色，字体：黑色
  { background: "#8E44AD", text: "#FFFFFF" }, // 背景：紫色，字体：白色
  { background: "#E67E22", text: "#FFFFFF" }, // 背景：橙色，字体：白色
  { background: "#2ECC71", text: "#FFFFFF" }, // 背景：亮绿色，字体：白色
  { background: "#3498DB", text: "#FFFFFF" }, // 背景：亮蓝色，字体：白色
  { background: "#9B59B6", text: "#FFFFFF" }, // 背景：淡紫色，字体：白色
  { background: "#F39C12", text: "#FFFFFF" }, // 背景：金色，字体：白色
];
export default () => {
  const container = useRef(null);
  const fileInput = useRef(null);
  const [imgUrl, setImgUrl] = useState(8);
  const imgRef = useRef(null);
  let color = null;

  const randomImg = () => {
    let num = ((Math.random() * 11) % 11) + 1;
    num = Number(num.toFixed(0));
    setImgUrl(num);
  };

  const sketch = useCallback(
    (p: p5) => {
      const setup = () => {
        canvas = p.createCanvas(p.windowWidth, p.windowHeight - 200, p.WEBGL);
        canvas.drop(gotFile);
        p.textFont(font);
        button = p
          .createButton("切换背景颜色")
          .position(20, 100)
          .mousePressed(randomColor);
        fileInput.current.addEventListener(
          "change",
          e => {
            let file = e.target.files[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = event => {
              const fileData = event.target.result;
              gotFile({
                type: "image",
                data: fileData,
              });
            };
            reader.onerror = error => {
              console.error("读取文件时出错:", error);
            };
            reader.readAsDataURL(file);
          },
          false
        );
      };

      function randomColor() {
        let c = Math.floor(Math.random() * colors.length);
        color = null;
        button.value(c);
      }

      const getImgColor = url => {
        const colorThief = new ColorThief();
        imgRef.current.src = url;

        if (imgRef.current.complete) {
          let c = colorThief.getColor(imgRef.current);
          let [r, g, b] = c;
          color = `rgb(${r},${g},${b})`;
        } else {
          imgRef.current.addEventListener("load", function () {
            let c = colorThief.getColor(imgRef.current);
            let [r, g, b] = c;
            color = `rgb(${r},${g},${b})`;
          });
        }
      };

      const preload = () => {
        let url = `/assets/bg/${imgUrl}${Math.random() > 0.5 ? ".jpg" : ".png"}`;
        img = p.loadImage(url);
        if (button) getImgColor(url);

        font = p.loadFont("/assets/font/Xingcao.ttf");
        bottleModel = p.loadModel(
          "/assets/models/obj/up_glucose_bottle.obj",
          true,
          () => {},
          () => {},
          ".obj"
        );
      };

      const gotFile = (file: Pick<p5.File, "type" | "data">) => {
        if (file.type === "image") {
          img = p.createImg(file.data, "").hide();
          img.elt.onload = () => {
            randomColor();
            p.redraw();
          };
        }
      };

      const draw = () => {
        p.textureMode(p.IMAGE);
        p.background(
          color || colors[(button.value() as number) || 0].background
        );
        p.orbitControl();
        p.push();
        p.scale(2);
        p.rotateZ(p.PI);
        p.rotateY(-p.PI / 2);
        if (bottleModel) {
          p.texture(img); // 应用贴图
          p.model(bottleModel); // 绘制模型
        } else {
          console.error("Bottle model is not loaded");
        }
        p.push();
        p.translate(-100, 0, 0); // 将文字放置在模型旁边

        p.rotateY(-p.PI / 2);
        p.rotateX(-p.PI);

        p.fill(color || colors[(button.value() as number) || 0].text);
        p.text("尝试拖动图片进场景或者点击上传", 0, 0);
        p.pop();
      };
      const resize = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight - 200);
        p.redraw();
      };
      p.setup = setup;
      p.draw = draw;
      p.preload = preload;
      p.windowResized = resize;
    },
    [imgUrl]
  );

  return (
    <div ref={container} className="absolute inset-0 w-full h-full">
      <Basic
        sketch={sketch}
        className="min-h-[80%] flex justify-center items-center"
      ></Basic>
      <input
        type="file"
        id="input"
        accept="image/*"
        className="hidden"
        ref={fileInput}
      />

      <img ref={imgRef} className="hidden" />

      <label
        htmlFor="input"
        className="block cursor-pointer text-center self-center p-4 m-auto font-semibold text-2xl xing-cao"
      >
        点击上传材质
      </label>

      <p
        onClick={randomImg}
        className="block cursor-pointer text-center self-center p-4 m-auto font-semibold text-2xl xing-cao"
      >
        或者点击使用随机图片
      </p>
    </div>
  );
};
