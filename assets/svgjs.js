import { SVG } from '@svgdotjs/svg.js'
const width = 500;
const height = 500;
var draw = SVG().addTo('.svgjs').size(width, height);
var rect = draw.rect(100, 100).attr({ fill: '#f06' })

// Draw x-axis
//draw.line(50, 350, 350, 350).stroke({ width: 2, color: '#000' });

// Draw y-axis




// Define the number of grid lines
const gridWidth = 50;
var gridSize = width / gridWidth;

// Draw horizontal grid lines
for (let i = 1; i <= gridSize; i++) {
  var y = gridWidth * i;
  draw.line(0, y, width, y).stroke({ width: 1, color: '#ccc' });
}

// Draw vertical grid lines
for (let i = 1; i < gridSize; i++) {
  var x =  gridWidth * i;
  draw.line(x, 0, x, height).stroke({ width: 1, color: '#ccc' });
}
// Create an SVG container

const xAxis = 7 * gridWidth;
const yAxis = 2 * gridWidth;
draw.line(0, 7 * gridWidth, width, 7*gridWidth).stroke({ width: 2, color: '#000' });
draw.line(2 * gridWidth, 0, 2*gridWidth, height).stroke({ width: 2, color: '#000' });
// Define the range of x-values
var xValues = Array.from({ length: 100 }, (_, i) => i / 20 + 0.1);

// Calculate corresponding y-values for y = 1/x
var yValues = xValues.map(x => 1 / x);

// Normalize values to fit within the SVG canvas
var normalize = (value, min, max) => (value - min) / (max - min);

// Function to map x and y values to SVG coordinates
var mapCoordinates = (x, y) => ({
  x: normalize(x, Math.min(...xValues), Math.max(...xValues)) * 300 + 50,
  y: 350 - normalize(y, Math.min(...yValues), Math.max(...yValues)) * 300
});

// Create a path string for the graph
var pathString = 'M';
for (let i = 0; i < xValues.length; i++) {
  const { x, y } = mapCoordinates(xValues[i], yValues[i]);
  pathString += `${x} ${y} `;
}

// Draw the path
draw.path(pathString).fill('none').stroke({ width: 2, color: '#0074d9' });

