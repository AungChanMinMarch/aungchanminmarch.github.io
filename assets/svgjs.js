import { SVG, Shape, Circle, Line, Container, Rect, Text, invent } from '@svgdotjs/svg.js';
import { extend as SVGextend } from '@svgdotjs/svg.js';

const DEFAULT = {
  width: 500,
  height: 500,
  stroke: { 
    width: 2, 
    color: '#000'
  }
}

SVGextend(Container, {
  myLine: function(point1, point2, color){

    return this.line(point1.X, point1.Y, point2.X, point2.Y).stroke({
      width: 2,
      color: color ?? 'black'
    })
  },
  point: function(x, y) {
    let p = this.text('').move(x, y);
    p.X = x;
    p.Y = y;
    p.label = function(text, moveX = 0, moveY = 0){
      return p.text(text).attr({
        x: p.X + moveX,
        y: p.Y + moveY
      })
    }
    return p
  },
  arrow: function(x1, y1, x2, y2, options) {
    //options { headSize: px, color }
    const color = options?.color ?? DEFAULT?.color ?? 'black';
    const headSize = options?.headSize ?? 20;

    const group = this.group();
    const shaft = group.line(x1, y1, x2, y2).stroke({ width: 2, color: color});
    
    // Calculate the arrowhead points
    const angle = Math.atan2(y2 - y1, x2 - x1);
    const headAngle1 = angle + Math.PI / 6;
    const headAngle2 = angle - Math.PI / 6;
    
    const x3 = x2 - headSize * Math.cos(headAngle1);
    const y3 = y2 - headSize * Math.sin(headAngle1);
    
    const x4 = x2 - headSize * Math.cos(headAngle2);
    const y4 = y2 - headSize * Math.sin(headAngle2);
    
    // Draw the arrowhead
    const arrowhead = group.polygon(`${x2},${y2} ${x3},${y3} ${x4},${y4}`).fill(color);
    
    return group;
  },
  curvedArrow: function(d, headSize) {
    const group = this.group();
    
    // Draw the curve
    const path = group.path(d).fill('none').stroke({ width: 2, color: 'black' });
    
    // Calculate the end point and direction of the curve for the arrowhead
    const pathLength = path.length();
    const endPoint = path.pointAt(pathLength);
    const tangent = path.pointAt(pathLength * 0.9);
    
    const angle = Math.atan2(endPoint.y - tangent.y, endPoint.x - tangent.x);
    const headAngle1 = angle + Math.PI / 6;
    const headAngle2 = angle - Math.PI / 6;
    
    const x1 = endPoint.x - headSize * Math.cos(headAngle1);
    const y1 = endPoint.y - headSize * Math.sin(headAngle1);
    
    const x2 = endPoint.x - headSize * Math.cos(headAngle2);
    const y2 = endPoint.y - headSize * Math.sin(headAngle2);
    
    // Draw the arrowhead
    const arrowhead = group.polygon(`${endPoint.x},${endPoint.y} ${x1},${y1} ${x2},${y2}`).fill('black');
    
    return group;
  }
});

SVGextend(Shape, {
  dotted: function(dasharray = '4,4') {
    return this.stroke({ dasharray: dasharray })
  },
});

SVGextend(Circle, {
  getPointOnArc: function(angle) {
    const angleInRadian = (angle * Math.PI) / 180;

    return this.parent().point(
        this.cx() + this.radius() * Math.cos(angleInRadian),
        this.cy() - this.radius() * Math.sin(angleInRadian)
    );
  },
  drawDiameter: function(angle) {
    const start = this.getPointOnArc(angle);
    const end = this.getPointOnArc(angle + 180);
    const diameter = this.parent().line(start.X, start.Y, end.X, end.Y).stroke(DEFAULT.stroke);
    return diameter;
  },
  drawRadiusFromPoint: function(point){
    return this.parent().line(point.X, point.Y, this.cx(), this.cy()).stroke(DEFAULT.stroke);
  },
  drawRadiusByAngle: function(angle) {
    const pointOnArc = this.getPointOnArc(angle);
    return this.drawRadiusFromPoint(pointOnArc);
  },

  drawArc: function(startAngle, endAngle, color){
    const start = this.getPointOnArc(startAngle);
    const end = this.getPointOnArc(endAngle);

    // Large arc flag (0 for a quarter arc since it is less than 180 degrees)
    const largeArcFlag = 0;

    // Sweep flag (0 for counterclockwise, 1 for clockwise)
    const sweepFlag = 0; // Changing this to 1 for a clockwise arc

    // Construct the path data for the arc
    const arcPath = `M ${start.X} ${start.Y} A ${this.radius()} ${this.radius()} 0 ${largeArcFlag} ${sweepFlag} ${end.X} ${end.Y}`;

    const semicircle = this.parent().path().plot(arcPath).fill('none').stroke(DEFAULT.stroke);
    if(!!color) semicircle.stroke(color);
    return semicircle;
  }
})

function approximatelyEqual(v1, v2, epsilon = 0.001) {
  return Math.abs(v1 - v2) < epsilon;
}
SVGextend(Line, {
  getDistance: function(){
    const { x1, y1, x2, y2 } = this.attr();
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
  },
  getPoint: function(ratio){
    const { x1, y1, x2, y2 } = this.attr();
     if (approximatelyEqual(x1, x2)) { // Check if the original line is vertical
        return this.parent().point(x1, y1 + (y2 - y1)* ratio);
    } else if(approximatelyEqual(y1, y2)) { // Check if the original line is horizontal
        return this.parent().point(x1 + (x2 - x1)*ratio, y1);
    } else {
      const newX = x1 + (x2 - x1) * ratio;
      const m = (y2 - y1)/(x2 - x1);
      const b = y1 - m * x1;
      const newY = m * newX + b;
      return this.parent().point(newX, newY);
    }
  },
  getProjectionFromAPoint : function(point){
      const { x1, y1, x2, y2 } = this.attr();
      if (approximatelyEqual(x1, x2)) { // Check if the original line is vertical
          return this.parent().point(x1, point.Y);
      } else if(approximatelyEqual(y1, y2)) { // Check if the original line is horizontal
          return this.parent().point(point.X, y1, this.parent());
      } else {
        // Calculate the slope (m) of the original line
        const m = (y2 - y1) / (x2 - x1);

        // Calculate the y-intercept (b) of the original line
        const b = y1 - m * x1;

        const perpendicularM = - 1/m ;
        const perpendicularB = point.Y - perpendicularM * point.X;

        const perpendicularX = - ( m - perpendicularM ) / (b- perpendicularB);
        const perpendicularY = (b * perpendicularM - perpendicularB * m) / ( perpendicularM - m);

        return this.parent().point(perpendicularX, perpendicularY, this.parent());
      }
  },
  labelAtCenter: function(text, x, y){
    const centerPoint = this.getPoint('0.5');
    return centerPoint.label(text, x, y);
  }
})

addEventListener("load", (event) => {
  window.svgs?.forEach(svg => {
    const width = svg.width ?? DEFAULT.width;
    const height = svg.height ?? DEFAULT.height;
    const draw = SVG().addTo(svg.id).size(width, height);

    svg.drawSVG(draw, DEFAULT)
  });
});