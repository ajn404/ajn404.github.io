import type p5 from "p5";
import * as Tone from "tone";
import Basic from "../index.tsx";
import { Button } from "@shadcn/ui/button";

export default ({ curve }: { curve?: Boolean }) => {
  let fft,
    player: Tone.Player,
    drawMe = false,
    waveform;

  let play = () => {
    player && player.start();
    drawMe = true;
  };
  let pause = () => {
    player && player.stop();
    drawMe = false;
  };
  const sketch = (p: p5) => {
    const setup = async () => {
      await Tone.start();
      player = new Tone.Player("/assets/sorry.mp3").toDestination();
      fft = new Tone.FFT(2048).toDestination();
      waveform = new Tone.Waveform(2048);
      if (curve) player.connect(waveform);
      else player.connect(fft);
      p.createCanvas(p.windowWidth - 100, 240);
      p.frameRate(120); // 设置帧率
    };
    const draw = () => {
      if (drawMe && fft && waveform) {
        p.background(255, 255, 255);
        p.strokeWeight(4);
        p.stroke(255);
        // 绘制频谱
        if (!curve) {
          let spectrum = fft.getValue();
          p.noStroke();
          p.fill(0, 0, 0);
          for (let i = 0; i < spectrum.length; i++) {
            let x = p.map(i, 0, spectrum.length, 0, p.width);
            let h = p.map(spectrum[i], -100, 0, 0, p.height);
            // 绘制频谱条
            p.rect(x, p.height, p.width / spectrum.length, -h);
          }
        } else {
          let wave = waveform.getValue();
          // 绘制正弦曲线
          let colorValue = p.map(wave[0], -1, 1, 0, 255);
          let c = p.noise(p.frameCount);
          p.stroke(colorValue, 255 - colorValue, c * 255);
          p.noFill();
          p.beginShape();
          for (let i = 0; i < wave.length; i++) {
            let x = p.map(i, 0, wave.length, 0, p.width);
            let y = p.map(wave[i], -1, 1, p.height, 0); // 反转 y 轴
            p.vertex(x, y);
          }
          p.endShape();
        }
      }
    };
    const resize = () => p.setup();
    p.setup = setup;
    p.draw = draw;
    p.windowResized = resize;
  };
  return (
    <>
      <Basic sketch={sketch}></Basic>
      <div className="flex gap-10">
        <Button className="m-auto" onClick={play}>
          播放
        </Button>
        <Button className="m-auto" onClick={pause}>
          结束
        </Button>
      </div>
    </>
  );
};
