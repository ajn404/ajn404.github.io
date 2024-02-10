import type p5 from "p5";
import Basic from "@components/react/p5/index.tsx";

export default () => {
  const sketchPerlin = (p: p5) => {
    const setup = () => {
      p.createCanvas(p.windowWidth / 4, 240);
    };
    let time = 0;
    const draw = () => {
      p.background(0);
      p.noFill();
      p.strokeWeight(4);
      p.stroke(255);
      p.beginShape();
      let xoff = time;
      for (let i = 0; i < p.width; i++) {
        let noise_height = p.noise(xoff) * p.height;
        xoff += 0.01;
        //不同的增量会影响噪声的平滑度
        p.vertex(i, noise_height);
      }
      p.endShape();

      time += 0.01;
    };
    const resize = () => p.setup();
    p.setup = setup;
    p.draw = draw;
    p.windowResized = resize;
  };

  const sketchRandom = (p: p5) => {
    let list;
    let len = 0;
    const setup = () => {
      p.createCanvas(p.windowWidth / 4, 240);
      len = Math.floor(p.width);
      list = new Array(len).fill(0).map(() => p.random(p.height));
    };
    const draw = () => {
      p.background(255).noFill().stroke(0).strokeWeight(2).beginShape();
      for (let i = 0; i < p.width; i++)
        p.vertex(i, list[(i + p.frameCount) % len]);
      p.endShape();
    };
    p.setup = setup;
    p.draw = draw;
    const resize = () => p.setup();
    p.windowResized = resize;
  };

  return (
    <>
      <div className="flex justify-around gap-4">
        <Basic sketch={sketchPerlin} showControls></Basic>
        <Basic sketch={sketchRandom} showControls></Basic>
      </div>
    </>
  );
};
