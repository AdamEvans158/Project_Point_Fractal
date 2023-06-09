import Point from "./Point.js";

export default function createNextPoint(currentPoint, availablePoints, startingPoints, dist, ctx, iteratonMax, spliceRule, eleminationRule){

    const randomAvailablePoint = availablePoints[Math.floor(Math.random() * availablePoints.length)]; // A random vertex point. 

    // gets coordinates from somewhere on the line between the current point and the random available point. 
    const x = (currentPoint.x + randomAvailablePoint.x) * dist;
    const y = (currentPoint.y + randomAvailablePoint.y) * dist;

    const nextPoint = new Point(x, y);

    resetAvailablePoints(randomAvailablePoint, availablePoints);
    
    // Changeing when you splice the available points array changes the fractal. Using a "splice rule" to determine when to splice the array.  
    if(spliceRule === "spliceRule1") availablePoints = startingPoints.slice();
    randomAvailablePoint.timesPicked++;
    if(randomAvailablePoint.timesPicked === iteratonMax){ // Higher iteration max === more detail
        if(spliceRule === "spliceRule2") availablePoints = startingPoints.slice();

        applyEleminationRule(eleminationRule, randomAvailablePoint, startingPoints, availablePoints);

        randomAvailablePoint.timesPicked = 0;
    }  

    nextPoint.draw(ctx);
    
    return {nextPoint, availablePoints}; // returns new point data

}

// Resets the counter on all the vertices that were not selected. 
function resetAvailablePoints(chosenPoint, availablePoints){
    availablePoints.forEach(point => {
        if(point.id !== chosenPoint.id){
            point.timesPicked = 0;
        }
    })
}

// Filters what vertex points are available for the next iteration. 
function applyEleminationRule(eleminationRule, point, startingPoints, availablePoints){
    if(eleminationRule === "eleminationRule1"){
        availablePoints.splice(availablePoints.indexOf(startingPoints[point.id]), 1);
    } else if(eleminationRule === "eleminationRule2"){ 
        availablePoints.splice(availablePoints.indexOf(startingPoints[point.previousPointIndex]), 1);
        availablePoints.splice(availablePoints.indexOf(startingPoints[point.nextPointIndex]), 1);
    } else{
        availablePoints.splice(availablePoints.indexOf(startingPoints[point.id]), 1);
        availablePoints.splice(availablePoints.indexOf(startingPoints[point.previousPointIndex]), 1);
        availablePoints.splice(availablePoints.indexOf(startingPoints[point.nextPointIndex]), 1);
    }
}