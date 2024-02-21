import type p5 from "p5";
import Basic from "@components/react/p5/index.tsx";

export default () => {
  const sketch = (p: p5) => {
    let balloon: Balloon;
    let gravity: p5.Vector;
    p.setup = () => {
      p.createCanvas(600, 400);
      balloon = new Balloon(p.width / 2, p.height, 20);
      gravity = p.createVector(0, -0.01); // Gravity force (upward)
    };

    p.draw = () => {
      p.background(220);

      // Apply gravity
      balloon.applyForce(gravity);

      // Apply wind using Perlin noise
      let windForce = p.createVector(
        p.map(p.random(0.5), 0, 0.5, -0.5, 0.5),
        0
      );
      balloon.applyForce(windForce);

      // Update and display balloon
      balloon.update();
      balloon.checkEdges();
      balloon.display();

      // Bounce off the top of the window
      if (balloon.position.y < balloon.radius) {
        balloon.velocity.y *= -0.5; // Reverse velocity and dampen it
        balloon.position.y = p.height - balloon.radius;
      }
    };

    // Balloon class
    class Balloon {
      position: p5.Vector;
      velocity: p5.Vector;
      acceleration: p5.Vector;
      radius: number;
      lift: p5.Vector;
      damping: number;

      constructor(x: number, y: number, r: number) {
        this.position = p.createVector(x, y);
        this.velocity = p.createVector(0, 0);
        this.acceleration = p.createVector(0, 0);
        this.radius = r;
        this.lift = p.createVector(0, -0.5); // Lift force (upward)
        this.damping = 0.95; // Damping factor
      }

      applyForce(force: p5.Vector) {
        let f = force.copy();
        this.acceleration.add(f);
      }

      update() {
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
        this.acceleration.mult(0); // Reset acceleration

        // Apply damping
        this.velocity.mult(this.damping);

        // Apply lift force (buoyancy)
        this.applyForce(this.lift);
      }

      display() {
        p.fill(255, 0, 0);
        p.ellipse(this.position.x, this.position.y, this.radius * 2);
      }

      checkEdges() {
        if (
          this.position.x + this.radius > p.width ||
          this.position.x < this.radius
        ) {
          this.velocity.x *= -1;
        }
        if (
          this.position.y + this.radius > p.height ||
          this.position.y < this.radius
        ) {
          this.velocity.y *= -1;
        }
      }
    }
  };

  return <Basic sketch={sketch} showControls />;
};
