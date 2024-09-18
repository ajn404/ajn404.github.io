import gsap from "gsap";
import { useEffect } from "react";
import "./scaleImage.scss";
export default function ScaleImage() {
  useEffect(() => {
    const init = async () => {
      const ScrollTriggerModule = await import("gsap/ScrollTrigger");
      const ScrollTrigger = ScrollTriggerModule.default;
      gsap.registerPlugin(ScrollTrigger);
      gsap
        .timeline({
          scrollTrigger: {
            trigger: ".wrapper",
            start: "top top",
            end: "+=150%",
            scrub: true,
          },
        })
        .to("img", {
          scale: 2,
          z: 350,
          transformOrigin: "center center",
          ease: "power1.inOut",
        })
        .to(
          ".section.hero",
          {
            scale: 1.1,
            transformOrigin: "center center",
            ease: "power1.inOut",
          },
          "<"
        );
    };
    init();
  });
  return (
    <div className="relative px-4 wrapper">
      <div className="content">
        <section className="section hero min-h-[100vh]"></section>
      </div>
      <div className="image-container">
        <img
          src="https://assets-global.website-files.com/63ec206c5542613e2e5aa784/643312a6bc4ac122fc4e3afa_main%20home.webp"
          alt="image"
        />
      </div>
    </div>
  );
}
