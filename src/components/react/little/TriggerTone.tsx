import * as Tone from "tone";

export default () => {
  console.log(Tone);

  function play(note = "C4") {
    // const sampler = new Tone.Sampler({
    //     urls: {
    //         'C3': 'C3.mp3',
    //         'D#3': 'Ds3.mp3',
    //         'F#3': 'Fs3.mp3',
    //         'A3': 'A3.mp3',
    //         'C4': 'C4.mp3',
    //         'D#4': 'Ds4.mp3',
    //         'F#4': 'Fs4.mp3',
    //         'A4': 'A4.mp3',
    //     },
    //     release: 0.5,
    //     baseUrl: '/assets/piano/',
    // }).toDestination().sync();

    // console.log(sampler);
    Tone.Transport.bpm.value = 96; // 96 BPM instead of 120
    // const synth = new Tone.Synth().toDestination();

    // //play a middle 'C' for the duration of an 8th note
    // synth.triggerAttackRelease("C4", "8n");
    if (Tone.isNote(note)) {
      const synth = new Tone.Synth().toDestination();
      const now = Tone.now();
      // trigger the attack immediately
      synth.triggerAttack(note, now);
      // wait one second before triggering the release
      synth.triggerRelease(now + 10);
    }
  }

  return (
    <>
      <p>Tone.js</p>
      <button onClick={() => play("A3")}>Play A3</button>
    </>
  );
};
