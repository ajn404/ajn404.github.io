const WebSocket = require("ws");
const { spawn } = require("child_process");

const wss = new WebSocket.Server({ port: 8080 });
const rtspStreamUrl = ""; // 替换为你的 RTSP 流地址

wss.on("connection", ws => {
  console.log("Client connected");

  const ffmpeg = spawn("ffmpeg", [
    "-i",
    rtspStreamUrl, // 替换为你的 RTSP 流地址
    "-f",
    "flv",
    "pipe:1",
  ]);

  ffmpeg.stdout.on("data", data => {
    ws.send(data);
  });

  ffmpeg.stderr.on("data", data => {
    console.error(`FFmpeg stderr: ${data}`);
  });

  ffmpeg.on("close", code => {
    console.log(`FFmpeg process exited with code ${code}`);
    ws.close();
  });

  ws.on("close", () => {
    console.log("Client disconnected");
    ffmpeg.kill("SIGINT");
  });
});

console.log("WebSocket server is listening on ws://localhost:8080");
