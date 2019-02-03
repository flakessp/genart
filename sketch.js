const canvasSketch = require('canvas-sketch');
const { lerp }  = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');
const palettes = require('nice-color-palettes');

const settings = {
  dimensions: [2048, 2048]
};

const sketch = () => {
  const palette = random.shuffle(random.pick(palettes).slice(0,2));
  console.log(palette);

  const createGrid = () => {
    const points = [];
    const count = 60;
    for (let x = 0; x < count; x++) {
      for (let y = 0; y < count; y++) {
        const u = count <= 1 ? 0.5 : x / (count-1);
        const v = count <= 1 ? 0.5 : y / (count-1);
        const radius = Math.abs(random.noise2D(u, v) * 0.01)
        // pallete : ["#30261c", "#403831"]
        points.push({
          color: random.pick(palette),
          radius,
          position: [ u, v ]
        })
      }
    }
    return points;
  }
  // const points = createGrid()
  random.setSeed(110);
  const points = createGrid().filter(() => random.value() > 0.5);
  const margin = 300;

  return ({ context, width, height }) => {
    context.fillStyle = "white";
    context.fillRect(0,0,width,height);

    points.forEach(data => {
      const {
        position, 
        radius,
        color
      } = data;

      const [u, v] = position;

      // линейная интерполяция
      const x = lerp(margin, width - margin, u);
      // const x = u * width;
      
      // линейная интерполяция
      const y = lerp(margin, width - margin, v);
      // const y = v * height;

      context.beginPath();
      context.arc(x, y, radius * width, 0, Math.PI * 2, false);
      // context.strokeStyle = 'black';
      // context.lineWidth = 5;
      // context.stroke();
      context.fillStyle = color;
      context.fill();
      
    })
  };
};

canvasSketch(sketch, settings);
