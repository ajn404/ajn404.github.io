import { useEffect } from "react";
export default () => {
  useEffect(() => {
    import("peaks.js").then(modele => {
      const Peaks = modele.default;
      const options = {
        zoomview: {
          container: document.getElementById(
            "zoomview-container"
          ) as HTMLElement,
        },
        overview: {
          container: document.getElementById(
            "overview-container"
          ) as HTMLElement,
          segmentOptions: {
            overlayLabelColor: "#993300",
          },
        },
        mediaElement: document.getElementById("audio") as HTMLElement,
        webAudio: {
          audioContext: new AudioContext(),
        },
      };
      Peaks.init(options, function (err, peaks) {
        if (err) {
          console.error("Failed to initialize Peaks instance: " + err.message);
          return;
        }
      });
    });
  });

  return (
    <div className="peaks w-full">
      <div id="zoomview-container" className=" h-[200px]">
        <div className="load-3 w-full text-center">
          <div
            className="line inline-block h-8 w-8 rounded-full bg-[#4b9cdb]"
            style={{ animation: "loadingC 0.7s 0.1s linear infinite" }}
          >
            a
          </div>
          <div
            className="line inline-block h-8 w-8 rounded-full bg-[#111a21]"
            style={{ animation: "loadingC 0.7s 0.2s linear infinite" }}
          >
            j
          </div>
          <div
            className="line inline-block h-8 w-8 rounded-full bg-[#289749]"
            style={{ animation: "loadingC 0.7s 0.3s linear infinite" }}
          >
            n
          </div>
          <div
            className="line inline-block h-8 w-8 rounded-full bg-[#214377]"
            style={{ animation: "loadingC 0.7s 0.4s linear infinite" }}
          >
            4
          </div>
          <div
            className="line inline-block h-8 w-8 rounded-full bg-[#6466b4]"
            style={{ animation: "loadingC 0.7s 0.5s linear infinite" }}
          >
            0
          </div>
          <div
            className="line inline-block h-8 w-8 rounded-full bg-[#b0b0cf]"
            style={{ animation: "loadingC 0.7s 0.6s linear infinite" }}
          >
            4
          </div>
        </div>
      </div>
      <div id="overview-container" className=" h-[200px]"></div>
      <audio
        id="audio"
        controls
        className="w-full mt-4 h-12 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 [&::-webkit-media-controls-panel]:bg-gray-100 [&::-webkit-media-controls-current-time-display]:text-gray-700 [&::-webkit-media-controls-time-remaining-display]:text-gray-700"
      >
        <source src="/assets/sorry.mp3" type="audio/mpeg" />
      </audio>
    </div>
  );
};
