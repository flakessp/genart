const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [2048, 2048]
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'orange';
    context.fillRect(0, 0, width, height);

    context.beginPath();
    context.arc(width/2, height/2, width*0.2, 0, Math.PI*2, false);
    context.fillStyle = 'darkviolet';
    context.fill();

    context.lineWidth = width*0.02;
    context.strokeStyle="darkblue";
    context.stroke();
  };
};

canvasSketch(sketch, settings);
