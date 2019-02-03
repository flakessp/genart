const canvasSketch = require('canvas-sketch');
const { lerp }  = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');

const settings = {
  dimensions: [2048, 2048]
};

const sketch = () => {
  const createGrid = () => {
    const points = [];
    const count = 20;
    for (let x = 0; x < count; x++) {
      for (let y = 0; y < count; y++) {
        const u = x / (count-1);
        const v = y / (count-1);
        points.push([u,v])
      }
    }
    return points;
  }
  // const points = createGrid()
  const points = createGrid().filter(() => random.value() > 0.5);
  const margin = 300;

  return ({ context, width, height }) => {
    context.fillStyle = "white";
    context.fillRect(0,0,width,height);

    points.forEach(([u, v]) => {
      // линейная интерполяция
      const x = lerp(margin, width - margin, u);
      // const x = u * width;
      
      // линейная интерполяция
      const y = lerp(margin, width - margin, v);
      // const y = v * height;

      context.beginPath();
      context.arc(x, y, 15, 0, Math.PI * 2, false);
      context.strokeStyle = 'black';
      context.lineWidth = 5;
      context.stroke();
    })
  };
};

canvasSketch(sketch, settings);
