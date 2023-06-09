import Point from "./Point.js";

const _2PI = Math.PI * 2;

// Function creates vericies for regular polygons and returns and array of ll vertices with their properties. 
export default function createStartingPoints(amountOfPoints, angleOfRotation, scale){
    const startingPoints = [];

    angleOfRotation *= Math.PI / 180;

    for(let i = 0; i < amountOfPoints; i++){
        const x = Math.cos(i * _2PI/amountOfPoints + angleOfRotation) * scale;
        const y = Math.sin(i * _2PI/amountOfPoints + angleOfRotation) * scale;

        startingPoints.push({
            nextPointIndex: i + 1 > amountOfPoints - 1 ? 0 : i + 1,
            previousPointIndex: i - 1 < 0 ? amountOfPoints - 1 : i - 1,
            id: i,
            x,
            y, 
            timesPicked: 0
        })
    }

    return startingPoints;
}