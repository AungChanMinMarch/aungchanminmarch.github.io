import * as PIXI from 'pixi.js';
import '@pixi/graphics-extras';

import { SVG, extend as SVGextend, Shape, Circle, Line, Container, Rect, Text } from '@svgdotjs/svg.js';

////////////////////////////////////////////////////

// const app = new PIXI.Application({
//     width: 600,
//     height: 400,
// });
const app = new PIXI.Application({
    antialias: true,
    width: 600,
    height: 400,
    background: '#fff'
});

function dotted(startX, startY, endX, endY){
  const segmentLength = 4;
  const gapLength = 4;
  if(startX === endX & startY === endY){
    console.log('single point no dotted line can be produced');
    return;
  }
  const slope = (startX !== endX) ? (endY - startY) / (endX - startX) : NaN;
  const inclinedAngle = Math.atan(slope);
  const SegX = (startX === endX) ? 0 : (startY === endY) ? segmentLength : segmentLength * Math.cos(inclinedAngle);
  const stepSegX = (startX < endX) ? SegX : -SegX;

  const SegY = (startY === endY) ? 0 : (startX === endX) ? segmentLength : segmentLength * Math.sin(inclinedAngle);
  const stepSegY = (startY < endY) ? SegY : -SegY;

  const GapX = (startX === endX) ? 0 : (startY === endY) ? gapLength : gapLength * Math.cos(inclinedAngle);
  const stepGapX = (startX < endX) ? GapX : - GapX;

  const GapY = (startY === endY) ? 0 : (startX === endX) ? gapLength : gapLength * Math.sin(inclinedAngle);
  const stepGapY = (startY < endY) ? GapY : -GapY;
    let currentX = startX;
    let currentY = startY;
      console.log(`SegX: ${SegX} and stepSegX:${stepSegX}`)
      console.log(`SegY: ${SegY} and stepSegY:${stepSegY}`)
      console.log(currentX !== endX)
      console.log(currentY !== endY)
    while (currentX !== endX || currentY !== endY) {
      graphics.moveTo(currentX, currentY);
      currentX += stepSegX;
      currentY += stepSegY;
      if (Math.abs(currentX - startX) > Math.abs(startX - endX)) {
          currentX = endX;
      }
      if (Math.abs(currentY - startY) > Math.abs(startY - endY)) {
          currentY = endY;
      }
      graphics.lineTo(currentX, currentY);
      console.log(`x: ${currentX} and y:${currentY}`)

      currentX += stepGapX;
      currentY += stepGapY;
      if (Math.abs(currentX - startX) > Math.abs(startX - endX)) {
          currentX = endX;
      }
      if (Math.abs(currentY - startY) > Math.abs(startY - endY)) {
          currentY = endY;
      }
      console.log(`x: ${currentX} and y:${currentY}`)
  }
}
document.querySelector('.canvas').appendChild(app.view);

const centerX = 600 / 2;
const centerY = 400  / 2;
const radius = 150;

const graphics = new PIXI.Graphics();

graphics.lineStyle(2, 0x000000, 1);
graphics.beginFill(0xFFFFFF); // Red fill color
graphics.drawCircle(centerX, centerY, radius);
graphics.endFill();


graphics.lineStyle(2, 0x0000FF, 1);
graphics.beginFill(0xFFFFFF); // Red fill color
graphics.arc(centerX, centerY, radius, Math.PI * (1/2 + 1/6), Math.PI * (1 + 1/6));
graphics.endFill();



graphics.lineStyle(2, 0x00FF00, 1);
graphics.beginFill(0xFFFFFF); // Red fill color
graphics.arc(centerX, centerY, radius, Math.PI * (1/6), Math.PI * (1/2 + 1/6));
graphics.endFill();







///////////////////////////////////////////////////////////////
var draw = SVG().addTo('#svg').size(600, 400);
class Point {
  // Constructor method to initialize object properties
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  text(str, x, y){
    return draw.text(str).dx(x).dy(y)
  }

  // Method to make the animal speak
  label(text) {
    return this.text(text, this.x, this.y)
  }
  labelRight(text, right = 5) {
    return this.text(text, this.x + right, this.y + 5)
  }
  labelLeft(text, left = 15) {
    return this.text(text, this.x - left, this.y + 5)
  }
  labelAbove(text, top = 5) {
    return this.text(text, this.x - 5, this.y - top)
  }
  labelBottom(text, bottom = 15){
    return this.text(text, this.x - 5, this.y + bottom)
  }
}
const DEFAULT = {
    stroke: { width: 2, color: '#000' },
}
SVGextend(Shape, {
  dotted: function(dasharray = '4,4') {
    return this.stroke({ dasharray: dasharray })
  },
  label: function(str){
    return this.parent().text(str).dx(this.cx()).dy(this.cy())
  }
});

SVGextend(Circle, {
  getPointOnArc: function(angle) {
    const angleInRadian = (angle * Math.PI) / 180;
    return new Point (
        this.cx() + this.radius() * Math.cos(angleInRadian),
        this.cy() + this.radius() * Math.sin(angleInRadian)
    );
  },
  drawDiameter: function(angle) {
    const start = this.getPointOnArc(angle);
    const end = this.getPointOnArc(angle + 180);

      // Create a Line element for the diameter
    const diameter = this.parent().line(start.x, start.y, end.x, end.y).stroke({ width: 2, color: '#000' });
    return diameter;
  },
  drawRadiusByAngle: function(angle) {
    const start = this.getPointOnArc(angle);
    const end = {
        x: this.cx(),
        y: this.cy()
    };


      // Create a Line element for the diameter
    const diameter = this.parent().line(start.x, start.y, end.x, end.y).stroke({ width: 2, color: '#000' });
    return diameter;
  },
  drawRadiusFromPoint: function(point){
    return this.parent().line(point.x, point.y, this.cx(), this.cy()).stroke({ width: 2, color: '#000' });
  },
  drawArc: function(startAngle, endAngle){
    const semicircle = draw.path();

    const start = this.getPointOnArc(startAngle);
    // const angleInRadian = (endAngle * Math.PI) / 180;
    // const end = {
    //     x: this.cx() + this.radius() * 0.5 * Math.cos(angleInRadian),
    //     y: this.cy() + this.radius() * 0.5 * Math.sin(angleInRadian)
    // }
    const end = this.getPointOnArc(endAngle)

    // Construct the path data for the arc
    var pathData = `M ${start.x} ${start.y} A ${this.radius()} ${this.radius()} 0 0 1 ${end.x} ${end.y}`;
    // Set the path data for the semicircle
    semicircle.plot(pathData);

    // Style the semicircle
    semicircle.fill('none');
    semicircle.stroke({ width: 2, color: '#000' });
    return semicircle;
  }
})

SVGextend(Line, {
    getProjectionFromAPoint : function(point){
        const { x1, y1, x2, y2 } = this.attr();

        if (x1 === x2) { // Check if the original line is vertical
            return new Point(x1, point.y);
        } else if(y1 === y2) { // Check if the original line is horizontal
            return new Point(point.x, y1);
        } else {
          // Calculate the slope (m) of the original line
          const m = (y2 - y1) / (x2 - x1);

          // Calculate the y-intercept (b) of the original line
          const b = y1 - m * x1;

          const perpendicularM = - 1/m ;
          const perpendicularB = point.y - perpendicularM * point.x;

          const perpendicularX = - ( m - perpendicularM ) / (b- perpendicularB);
          const perpendicularY = (b * perpendicularM - perpendicularB * m) / ( perpendicularM - m);

          return new Point(perpendicularX, perpendicularY);
        }
    }
})

///////////////////////////////////////////////////////////////////////////
const {A,B,C, Aprime, Bprime, Cprime, D,M} = drawSVG(draw, DEFAULT);
///////////////////////////////////
    

graphics.lineStyle(2, 0x000000, 1);

graphics.moveTo(A.x, A.y);
graphics.lineTo(C.x, C.y);

graphics.moveTo(centerX, centerY);
graphics.lineTo(B.x, B.y);

dotted(Aprime.x, Aprime.y, A.x, A.y);
dotted(B.x, B.y, Bprime.x, Bprime.y);
// dotted(C.x, C.y, Cprime.x, Cprime.y);
dotted(Cprime.x, Cprime.y, C.x, C.y);
dotted(D.x, D.y, M.x, M.y);
app.stage.addChild(graphics);

app.stage.addChild(graphics);

const label = new PIXI.Text('O', { fontSize: 18, fill: 0x000000 });
// label.anchor.set(0.5);
label.position.set(centerX, centerY - 15);
app.stage.addChild(label);

// const labelA = new PIXI.Text('A', { fontSize: 18, fill: 0x000000 });
// // labelA.anchor.set(0.5);
// labelA.position.set(A.x + 5, A.y -5);
// app.stage.addChild(labelA);

// const labelAprime = new PIXI.Text("A'", { fontSize: 18, fill: 0x000000 });
// labelAprime.anchor.set(0.5);
// labelAprime.position.set(Aprime.x -15, Aprime.y-5);
// app.stage.addChild(labelAprime);

// const labelB = new PIXI.Text('B', { fontSize: 18, fill: 0x000000 });
// // labelB.anchor.set(0.5);
// labelB.position.set(B.x -5, B.y -5);
// app.stage.addChild(labelB);
const pointIndex = ["A", "B", "C", "D", "M", "A'", "B'", "C'"];
[A,B,C,D,M, Aprime, Bprime, Cprime].forEach(function(point, index){
  const pointlabel = new PIXI.Text(pointIndex[index], { fontSize: 18, fill: 0x000000 });
  // labelC.anchor.set(0.5);
  pointlabel.position.set(point.x, point.y);
  app.stage.addChild(pointlabel);

})
