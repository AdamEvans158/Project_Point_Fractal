import createNextPoint from "./nextPoint.js";

// Loop that generates points to make a fractal. 
export default function generatePointFractal(ctx, startingPoints, radius, iterationMax, spliceRule, eleminationRule){
    const max = 50000; // Loop parameters
    let n = 0;

    let currentPoint = {x: 0, y: 0}; // default point, it doesn't matter what the coordinates are. 

    let availablePoints = startingPoints.slice(); // copies the starting points into new array. I do this to avoid modifying the original array.

    // Recursive point loop
    while (n < max) {
        n++;
        const pointData = createNextPoint(currentPoint, availablePoints, startingPoints, radius, ctx, iterationMax, spliceRule, eleminationRule);
        currentPoint = pointData.nextPoint;
        availablePoints = pointData.availablePoints;
    }
}

// Calculates the radius for self-similar nth-gon sierpinski polygons. 
export function nth_gon_scaler(n){

    let trigSum = 0;
    for(let k = 1; k <= Math.floor(n/4); k++){
        trigSum += Math.cos(2 * Math.PI * k / n);
    }

    const radius = 1/(2 +  2 * trigSum);
    return radius;
}