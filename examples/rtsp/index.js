const { spawn } = require("child_process");
const { EventEmitter } = require("events");
const express = require("express");
const path = require("path");

const app = express();
const server = require("http").Server(app);
const PORT = 5500;
const RTSP_URL = "";

const emitters = {};
const firstChunks = {};

const initEmitter = feed => {
  if (!emitters[feed]) {
    emitters[feed] = new EventEmitter().setMaxListeners(0);
  }
  return emitters[feed];
};

const initFirstChunk = (feed, firstBuffer) => {
  if (!firstChunks[feed]) {
    firstChunks[feed] = firstBuffer;
  }
  return firstChunks[feed];
};

console.log(`Starting Express Web Server on Port ${PORT}`);
server.listen(PORT);

// Serve static files
app.use("/libs", express.static(path.join(__dirname, "../../web/libs")));
app.use("/", express.static(__dirname));

// Homepage with video element
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// FLV over HTTP
app.get(["/flv", "/flv/:feed/s.flv"], (req, res) => {
  const feed = req.params.feed || "1";
  req.Emitter = initEmitter(feed);

  res.setHeader("Content-Type", "video/x-flv");
  res.setHeader("Access-Control-Allow-Origin", "*");

  res.write(initFirstChunk(feed, Buffer.alloc(0))); // Initialize with empty buffer

  const contentWriter = buffer => res.write(buffer);
  req.Emitter.on("data", contentWriter);

  res.on("close", () => {
    req.Emitter.removeListener("data", contentWriter);
  });
});

// Start FFmpeg
console.log("Starting FFMPEG");
let ffmpegArgs = [
  "-i",
  RTSP_URL,
  "-c:v",
  "libx264",
  "-preset",
  "fast",
  "-crf",
  "23",
  "-an",
  "-f",
  "flv",
  "pipe:1",
];

if (RTSP_URL.includes("rtsp://")) {
  ffmpegArgs.unshift("-rtsp_transport", "tcp");
}

console.log(`Executing: ffmpeg ${ffmpegArgs.join(" ")}`);
const ffmpeg = spawn("ffmpeg", ffmpegArgs, { stdio: ["pipe", "pipe", "pipe"] });

ffmpeg.on("close", () => {
  console.log("FFmpeg process exited");
});

ffmpeg.stderr.on("data", data => {
  console.error(`FFmpeg error: ${data.toString()}`);
});

// Data from FFmpeg output
ffmpeg.stdout.on("data", buffer => {
  initFirstChunk("1", buffer);
  initEmitter("1").emit("data", buffer);
});
