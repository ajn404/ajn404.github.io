import type p5 from "p5";
import Basic from "@components/react/p5/index.tsx";

let centre = [185, 180];
let color_orig = "#798e9a",
  circle_radius = 15,
  draw_radius = 100,
  line_distanceIn = 14,
  dash_gap_from_circles = 10,
  centre_dashes_num = 200,
  centre_dashes_radius = 30,
  dashes_num = 600,
  yTop = 170,
  y2 = 235,
  y3 = 300,
  golden_ratio = 1.618033988749895,
  golden_angle = 2.3999632297286535;

export default () => {
  const sketch = (p: p5) => {
    let pg = p.createGraphics(
      p.windowWidth / 4,
      ((p.windowWidth / 4) * 80) / 37
    );
    pg.fill("rgba(166,54,62, 0.8)");
    pg.ellipse(centre[0], centre[1] + yTop, 30, 30);
    pg.fill("rgba(219,186,83, 0.8)");
    pg.ellipse(centre[0], centre[1] + y2, 30, 30);
    pg.fill("rgba(81,132,123, 0.8)");
    pg.ellipse(centre[0], centre[1] + y3, 30, 30);
    pg.filter(p.BLUR, 30);
    p.draw = function () {
      let delay = 6;
      if (p.frameCount % delay == 0) {
        p.createCanvas(400, 600);
        p.fill("rgba(46,50,43,0)");
        p.image(pg, 0, 0);
        p.stroke("rgb(255,255,255)");
        p.strokeWeight(40);
        p.fill("rgba(46,50,43,0)");
        p.rect(0, 0, centre[0] * 2, 600, 40);
        p.stroke("rgb(202,197,169)");
        p.strokeWeight(4);
        p.rect(30, 30, 310, 540, 10);
        p.strokeWeight(2);
        p.stroke("rgb(196,105,79)");
        p.fill("rgb(196,105,79)");

        for (let i = 0; i < dashes_num; i++) {
          const angle = i * golden_angle;
          const r = Math.sqrt(i / dashes_num);
          const x =
            centre[0] +
            (draw_radius -
              dash_gap_from_circles -
              p.random(dash_gap_from_circles)) *
              Math.cos(angle) *
              r;
          const y =
            centre[1] +
            (draw_radius -
              dash_gap_from_circles -
              p.random(dash_gap_from_circles)) *
              Math.sin(angle) *
              r;
          let dist_ratio = p.random(0.2);
          let [x1, y1] = [
            (1 - dist_ratio) * x + dist_ratio * centre[0],
            (1 - dist_ratio) * y + dist_ratio * centre[1],
          ];
          p.strokeWeight(p.random(2));
          p.line(x, y, x1, y1);
        }

        for (let i = 0; i < centre_dashes_num; i++) {
          let angle = p.random(Math.PI * 2),
            centre_dash_radius = p.random(Math.PI * 2);

          let x = centre[0] + p.random(centre_dashes_radius) * Math.cos(angle),
            y = centre[1] + p.random(centre_dashes_radius) * Math.sin(angle);
          p.strokeWeight(p.random(2));
          p.line(x, y, centre[0], centre[1]);
        }

        let color = color_orig;

        let line_ang = Math.PI * 0.004;
        let circles_num = (2 * Math.PI * draw_radius) / (circle_radius * 1.3);
        for (let i = 0; i < circles_num; i++) {
          p.stroke(color);
          p.fill(color);
          let angle = 2 * Math.PI * (i / circles_num),
            draw_radius_add = p.random(2),
            x = centre[0] + (draw_radius + draw_radius_add) * Math.cos(angle),
            xa =
              centre[0] +
              (draw_radius + draw_radius_add - circle_radius / 2) *
                Math.cos(angle - line_ang),
            xb =
              centre[0] +
              (draw_radius + draw_radius_add - circle_radius / 2) *
                Math.cos(angle + line_ang),
            x1 =
              centre[0] +
              (draw_radius + draw_radius_add - line_distanceIn) *
                Math.cos(angle),
            y = centre[1] + (draw_radius + draw_radius_add) * Math.sin(angle),
            ya =
              centre[1] +
              (draw_radius + draw_radius_add - circle_radius / 2) *
                Math.sin(angle - line_ang),
            yb =
              centre[1] +
              (draw_radius + draw_radius_add - circle_radius / 2) *
                Math.sin(angle + line_ang),
            y1 =
              centre[1] +
              (draw_radius + draw_radius_add - line_distanceIn) *
                Math.sin(angle);
          p.strokeWeight(1);
          p.circle(x, y, circle_radius);

          p.strokeWeight(2);
          p.line(xa, ya, x1, y1);
          p.line(xb, yb, x1, y1);
        }

        function drawStarBelow(color, y_pos) {
          p.stroke(color);
          for (let i = 0; i < 40; i++) {
            let angle = p.random(Math.PI * 2),
              centre_dash_radius = p.random(15, 22);
            let x = centre[0] + centre_dash_radius * Math.cos(angle),
              y = centre[1] + y_pos + centre_dash_radius * Math.sin(angle);
            p.strokeWeight(p.random(2));
            p.line(x, y, centre[0], centre[1] + y_pos);
            for (let i = 0; i <= 1; i++) {
              angle = p.random(Math.PI * 2);
              p.strokeWeight(p.random(1, 1.5));
              centre_dash_radius = p.random(8, 15);
              (x = centre[0] + centre_dash_radius * Math.cos(angle)),
                (y = centre[1] + y_pos + centre_dash_radius * Math.sin(angle));
              p.line(x, y, centre[0], centre[1] + y_pos);
            }
          }
        }

        drawStarBelow("rgb(166,54,62)", yTop);
        drawStarBelow("rgb(219,186,83)", y2);
        drawStarBelow("rgb(81,132,123)", y3);
      }
    };
    const resize = () => {
      p.resizeCanvas(p.windowWidth / 2, 240);
    };
    p.windowResized = resize;
  };
  return <Basic sketch={sketch} showControls></Basic>;
};
