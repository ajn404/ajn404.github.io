import type p5 from "p5";
import Basic from "@components/react/p5/index.tsx";
import { useCallback, useEffect, useRef } from "react";

let img;
let bottleModel;
let font;
export default () => {
    const container = useRef(null);

    const sketch = useCallback((p: p5) => {
        const setup = () => {
            let canvas = p.createCanvas(p.windowWidth, p.windowHeight - 200, p.WEBGL);
            canvas.drop(gotFile);
            p.textFont(font);
        };
        const preload = () => {
            img = p.loadImage("/assets/bg/3.jpg");
            font = p.loadFont("/assets/font/Xingcao.ttf")
            bottleModel = p.loadModel(
                "/assets/models/obj/up_glucose_bottle.obj",
                true,
                () => { },
                () => { },
                ".obj"
            );
        };

        const gotFile = file => {
            if (file.type === "image") {
                img = p.createImg(file.data, "").hide();
                img.elt.onload = () => {
                    p.redraw();
                };
            }
        };
        const draw = () => {
            p.textureMode(p.IMAGE);
            p.background(200);
            p.orbitControl();
            p.push();
            if (bottleModel) {
                p.texture(img); // 应用贴图
                p.model(bottleModel); // 绘制模型
            } else {
                console.error("Bottle model is not loaded");
            }
            p.pop();
            p.push();
            p.rotateY(p.frameCount * 0.01); // 根据帧数旋转
            p.translate(100, 0, 0); // 将文字放置在模型旁边
            p.fill(0);
            p.text('ajn404的酒瓶', 0, 0);

            p.pop();

            p.push();
            p.translate(100, 0, 0); // 将文字放置在模型旁边
            p.fill(0);
            p.rotateY(-p.frameCount * 0.01); // 根据帧数旋转
            p.text('尝试拖动图片进canvas', 0, 0);
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
    }, []);

    return (
        <div ref={container} className="absolute inset-0 ">
            <Basic sketch={sketch} showControls></Basic>
        </div>
    );
};