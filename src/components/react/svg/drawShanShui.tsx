import React, { useEffect, useRef, useState } from "react";
import ScrollableCanvas from "./drawShanShui/ui/ScrollableCanvas";
import BackgroundRender from "./drawShanShui/ui/BackgroundRender";
import { PRNG } from "./drawShanShui/render/basic/PRNG";
import { Range } from "./drawShanShui/render/basic/range";
import { PerlinNoise } from "./drawShanShui/render/basic/perlinNoise";
import { ChunkCache } from "./drawShanShui/render/chunkCache";

const App: React.FC = () => {
  const bgrender = useRef<BackgroundRender>(null);
  const container = useRef<HTMLDivElement>(null);
  const [seed, setSeed] = useState<string>(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const qseed: string | null = urlParams.get("seed");
    return qseed == null ? new Date().getTime().toString() : qseed;
  });
  const [backgroundImage, setBackgroundImage] = useState<string | undefined>(
    undefined
  );
  const [cursx, setCursx] = useState<number>(0);
  const [windx, setWindx] = useState<number>(window.innerWidth);
  const [windy, setWindy] = useState<number>(window.innerHeight);
  const [updateflag, setUpdateflag] = useState<boolean>(false);
  const [saveRange, setSaveRange] = useState<Range>(
    new Range(0, window.innerWidth)
  );
  const [autoLoad, setAutoLoad] = useState<boolean>(false);

  const prng = new PRNG();
  const noise = new PerlinNoise();
  const chunkCache = new ChunkCache();
  const FPS = 2;

  useEffect(() => {
    prng.seed(seed);
    const url = bgrender.current?.generate(prng, noise);
    setBackgroundImage(url);

    const resizeCallback = () => {
      if (container.current) {
        setWindx(container.current.clientWidth);
        setWindy(container.current.clientHeight);
      }
    };

    window.addEventListener("resize", resizeCallback);
    return () => {
      window.removeEventListener("resize", resizeCallback);
    };
  }, [seed, prng, noise]);

  const xscroll = (v: number) => {
    const nextx = cursx + v;
    setCursx(nextx);
    setUpdateflag(prev => !prev);

    if (autoLoad) {
      setSaveRange(new Range(nextx, nextx + windx));
    }
  };

  return (
    <>
      <div className="App" ref={container}>
        <ScrollableCanvas
          xscroll={xscroll}
          windy={windy}
          background={backgroundImage}
          seed={seed}
          cursx={cursx}
          windx={windx}
          updateflag={updateflag}
          prng={prng}
          chunkCache={chunkCache}
        />
      </div>
      <BackgroundRender ref={bgrender} />
    </>
  );
};

export default App;
