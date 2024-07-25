import * as Tone from "tone";
import { Button } from "@shadcn/ui/button";

export default () => {
  function play(note = "C4") {
    // Tone.Transport.bpm.value = 96; // 96 BPM instead of 120
    if (Tone.isNote(note)) {
      const synth = new Tone.Synth().toDestination();
      const now = Tone.now();
      synth.triggerAttack(note, now);
      synth.triggerRelease(now + 0.1);
    }
  }

  // // 定义旋律
  const melody = [
    { note: "A3", duration: "4n" },
    { note: "C4", duration: "4n" },
    { note: "E4", duration: "4n" },
    { note: "G4", duration: "4n" },
    { note: "A4", duration: "4n" },
    { note: "G4", duration: "4n" },
    { note: "E4", duration: "4n" },
    { note: "C4", duration: "4n" },
  ];

  // 播放旋律的函数
  function playMelody() {
    const synth = new Tone.Synth().toDestination();

    let now = Tone.now();
    melody.forEach(({ note, duration }) => {
      synth.triggerAttackRelease(note, duration, now);
      now += Tone.Time(duration).toSeconds(); // 更新当前时间
    });
  }

  const start = async () => {
    await Tone.start(); // 开始音频上下文
    playMelody(); // 播放旋律
  };

  return (
    <>
      <div>
        <p>Tone.js</p>
        <div className="flex flex-col gap-2">
          <Button onClick={() => play("A3")}>Play A3</Button>
          <Button onClick={() => play("A1")}>Play A1</Button>
          <Button onClick={() => play("A2")}>Play A2</Button>
          <Button onClick={() => play("A4")}>Play A4</Button>
          <Button onClick={() => play("C3")}>Play A3</Button>
        </div>
        <p>自制好听的旋律</p>
        <Button onClick={start}>播放</Button>
      </div>
    </>
  );
};
