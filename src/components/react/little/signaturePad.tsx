import { useEffect, useRef } from "react";
import SignaturePad from "signature_pad";
import { Button } from "@shadcn/ui/button";

const signaturePadDemo = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  let signaturePad: SignaturePad | null;
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      signaturePad = new SignaturePad(canvasRef.current!, {
        backgroundColor: "rgb(255, 255, 255)",
      });
      console.log("signaturePad:", signaturePad);
      function resizeCanvas() {
        const ratio = Math.max(window.devicePixelRatio || 1, 1);
        canvas.width = canvas.offsetWidth * ratio;
        canvas.height = canvas.offsetHeight * ratio;
        canvas.getContext("2d").scale(ratio, ratio);
        signaturePad.clear();
      }
      resizeCanvas();
      addEventListener("resize", resizeCanvas);
    }
  });
  const downloadPng = () => {
    const data = signaturePad?.toDataURL();
    if (data) {
      const link = document.createElement("a");
      link.download = "signature.png";
      link.href = data;
      link.click();
    }
  };
  const downloadSvg = () => {
    const data = signaturePad?.toDataURL("image/svg+xml");
    if (data) {
      const link = document.createElement("a");
      link.download = "signature.svg";
      link.href = data;
      link.click();
    }
  };
  return (
    <>
      <canvas ref={canvasRef} className="w-full h-40"></canvas>
      <div className="ope flex gap-5 justify-center pt-2">
        <Button variant="outline" onClick={downloadPng}>
          下载png
        </Button>
        <Button variant="outline" onClick={downloadSvg}>
          下载svg
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            signaturePad?.clear();
          }}
        >
          清空
        </Button>
      </div>
    </>
  );
};

export default signaturePadDemo;
