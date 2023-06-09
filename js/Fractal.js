import createStartingPoints from "./startingPoints.js";
import generatePointFractal from "./generateLoop.js";
import convertFractalToImage from "./convertFractalToImage.js";
import applyGradient from "./applyGradient.js";

export default class Fractal{
    constructor(properties, canvas, ctx) {
        this.startingPoints = createStartingPoints(properties.sides, 0, properties.scale);
        this.gradientColors = [properties.color1, properties.color2];
        this.x = -canvas.width/2 - properties.x; 
        this.y = -canvas.height/2 - properties.y;
        this.sides = properties.sides;
        this.rotation = properties.rotation;
        this.eleminationRule = properties.eleminationRule;
        this.radius = properties.rValue;
        this.complexity = properties.complexity;
        this.scale = properties.scale;
        this.spliceRule = properties.spliceRule;
        this.name;

        // Quickly draws the fractal with little dots, then is takes a picture and clears the canvas. 
        ctx.clearRect(-canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height)    
        this.drawPointVersion(canvas, ctx);
        this.fractalImage = convertFractalToImage(canvas);
        ctx.clearRect(-canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height)    
    }

    drawPointVersion(canvas, ctx){
        applyGradient(canvas, ctx, this.gradientColors[0], this.gradientColors[1]);
        generatePointFractal(ctx, this.startingPoints, this.radius, this.complexity, this.spliceRule, this.eleminationRule);
    }
    
    drawFractalImage(ctx){
        ctx.save();
        ctx.translate(this.x, this.y)
        ctx.rotate(this.rotation * Math.PI / 180);
        ctx.drawImage(this.fractalImage, 0, 0, this.fractalImage.naturalWidth * (this.scale/250), this.fractalImage.naturalHeight * (this.scale/250));
``
ctx.restore();
    }
}

export function redrawAllFractals(fractals, ctx){
    ctx.clearRect(-canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
    fractals.forEach(fractal => {
        fractal.drawFractalImage(ctx);
    })
}