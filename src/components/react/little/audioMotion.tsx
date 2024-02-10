import { useEffect } from "react";
import AudioMotionAnalyzer from "audiomotion-analyzer";

export default () => {
  useEffect(() => {
    const audioMotion = new AudioMotionAnalyzer(
      document.getElementById("container") as HTMLElement,
      {
        source: document.getElementById("audio_motion") as HTMLAudioElement,
      }
    );

    return () => {
      audioMotion.destroy();
    };
  });
  return (
    <>
      <div id="container" className="min-h-[70vh]"></div>
      <audio id="audio_motion" controls>
        <source src="/notes_astro3/assets/sorry.mp3" type="audio/mpeg" />
      </audio>
    </>
  );
};
