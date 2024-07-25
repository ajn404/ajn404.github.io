import React from "react";
import SettingPanel from "./drawShanShui/ui/SettingPanel";
import ScrollableCanvas from "./drawShanShui/ui/ScrollableCanvas";
import BackgroundRender from "./drawShanShui/ui/BackgroundRender";
import { PRNG } from "./drawShanShui/render/basic/PRNG";
import { Range } from "./drawShanShui/render/basic/range";
import { PerlinNoise } from "./drawShanShui/render/basic/perlinNoise";
import { ChunkCache } from "./drawShanShui/render/chunkCache";

interface AppState {
  seed: string;
  autoScroll: boolean;
  backgroundImage: string | undefined;
  foregroundImage: string;
  cursx: number;
  windx: number;
  windy: number;
  updateflag: boolean;
  saveRange: Range;
  autoLoad: boolean;
}

class App extends React.Component<{}, AppState> {
  bgrender = React.createRef<BackgroundRender>();
  container = React.createRef<HTMLDivElement>();
  pFrame = 0;
  prng = new PRNG();
  noise = new PerlinNoise();
  chunkCache = new ChunkCache();
  static readonly FPS = 2;

  constructor(props: {}) {
    super(props);

    const urlParams = new URLSearchParams(window.location.search);
    const qseed: string | null = urlParams.get("seed");

    this.state = {
      seed: qseed == null ? new Date().getTime().toString() : qseed,
      autoScroll: false,
      backgroundImage: undefined,
      foregroundImage: "",
      cursx: 0,
      windx: window.innerWidth,
      windy: window.innerHeight,
      updateflag: false,
      saveRange: new Range(0, window.innerWidth),
      autoLoad: false,
    };

    this.prng.seed(this.state.seed);
  }

  componentDidMount() {
    const url = this.bgrender.current?.generate(this.prng, this.noise);
    this.setState({ backgroundImage: url });
    const resizeCallback = () =>
      this.setState({
        windx: this.container.current.clientWidth,
        windy: this.container.current.clientHeight,
      });
    window.addEventListener("resize", resizeCallback);
  }

  xscroll(v: number) {
    const nextx = this.state.cursx + v;

    this.setState({ cursx: nextx });
    this.setState({ updateflag: !this.state.updateflag });

    if (this.state.autoLoad)
      this.setState({
        saveRange: new Range(nextx, nextx + this.state.windx),
      });
  }

  render() {
    const xscroll = (v: number) => this.xscroll(v);

    return (
      <>
        <div className="App" ref={this.container}>
          <ScrollableCanvas
            xscroll={xscroll}
            windy={this.state.windy}
            background={this.state.backgroundImage}
            seed={this.state.seed}
            cursx={this.state.cursx}
            windx={this.state.windx}
            updateflag={this.state.updateflag}
            prng={this.prng}
            chunkCache={this.chunkCache}
          />
        </div>
        <BackgroundRender ref={this.bgrender} />
      </>
    );
  }
}

export default App;
