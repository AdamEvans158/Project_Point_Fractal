import Point from "./Point.js";

// Takes in 2 colors and draws a gradient from the colors. 
export default function applyGradient(canvas, ctx, color1, color2){
    let gradiantControlPoint1 = new Point(-canvas.width/2, -canvas.height / 2);
    let gradiantControlPoint2 = new Point(canvas.width, canvas.height);

    let gradiant = ctx.createLinearGradient(gradiantControlPoint1.x, gradiantControlPoint1.y, gradiantControlPoint2.x, gradiantControlPoint2.x, gradiantControlPoint2.y);

    gradiant.addColorStop(0, color1);
    gradiant.addColorStop(0.5, color2);
    gradiant.addColorStop(1, color2);

    ctx.fillStyle = gradiant;
    ctx.strokeStyle = gradiant;
}
