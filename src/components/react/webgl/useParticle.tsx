import { useEffect } from "react";

export const useParticle = (
  canvasId: string = "canvas1",
  imgId: string = "image1",
  buttonId: string = "wrapButton",
  startId: string = "start"
) => {
  useEffect(() => {
    let aId = 0;
    const init = () => {
      const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
      const wrapButton = document.getElementById(buttonId) as HTMLButtonElement;
      const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

      const width = canvas.clientWidth as number;
      const height = canvas.clientHeight as number;
      class Particle {
        x: number;
        y: number;
        size: number;
        effect: Effect;
        vx: number;
        vy: number;
        originY: number;
        originX: number;
        color: string;
        ease: number = 0.1;
        constructor(effect: Effect, color: string, j: number, i: number) {
          this.effect = effect;
          this.x = Math.random() * this.effect.width;
          this.y = Math.random() * this.effect.height;
          this.originX = Math.floor(j);
          this.originY = i;
          // this.x =this.originX;
          // this.y = this.originY;
          this.color = color;
          this.size = this.effect.gap;
          this.ease = 0.1;
          // this.vx = Math.random()  - 0.5;
          // this.vy = Math.random()  - 0.5;

          this.vx = 0;
          this.vy = 0;
        }

        draw(contex: CanvasRenderingContext2D) {
          contex.fillStyle = this.color;
          contex.fillRect(this.x, this.y, this.size, this.size);
        }
        update() {
          //妙
          this.x += (this.originX - this.x) * this.ease;
          this.y += (this.originY - this.y) * this.ease;
          // this.y += this.vy;
        }

        wrap() {
          this.x = Math.random() * this.effect.width;
          this.y = Math.random() * this.effect.height;
          this.ease = 0.05;
        }
      }

      class Effect {
        width: number;
        height: number;
        particles: Array<Particle>;
        imgae: HTMLImageElement;
        centerX: number;
        centerY: number;
        x: number;
        y: number;
        gap: number;
        constructor(width: number, height: number) {
          this.width = width;
          this.height = height;
          this.particles = [];
          this.imgae = document.getElementById(imgId) as HTMLImageElement;
          this.centerX = this.width * 0.5;
          this.centerY = this.height * 0.5;
          this.x = this.centerX - this.imgae.width * 0.5;
          this.y = this.centerY - this.imgae.height * 0.5;
          this.gap = 1;
        }

        init(context: CanvasRenderingContext2D) {
          context.drawImage(this.imgae, this.x, this.y);
          const pixels = context.getImageData(
            0,
            0,
            this.width,
            this.height
          ).data;
          for (let i = 0; i < this.height; i += this.gap) {
            for (let j = 0; j < this.width; j += this.gap) {
              const index = (i * this.width + j) * 4;
              const red = pixels[index];
              const green = pixels[index + 1];
              const blue = pixels[index + 2];
              const alpha = pixels[index + 3];

              let color = `rgb(${red},${green},${blue})`;
              if (alpha > 0) {
                this.particles.push(new Particle(this, color, j, i));
              }
            }
          }
        }
        draw(context: CanvasRenderingContext2D) {
          this.particles.forEach(item => item.draw(context));
        }
        update() {
          this.particles.forEach(item => item.update());
        }

        wrap() {
          this.particles.forEach(item => item.wrap());
        }
      }

      const effect = new Effect(width, height);
      effect.init(ctx);
      const animate = () => {
        ctx.clearRect(0, 0, width, height);
        effect.draw(ctx);
        effect.update();
        aId = requestAnimationFrame(animate);
      };
      animate();
      wrapButton.addEventListener("click", () => {
        effect.wrap();
      });
    };

    init();
  });
};
