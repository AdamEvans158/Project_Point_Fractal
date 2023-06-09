export default class Point{
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.r = 0.5;
    }

    draw(ctx){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, Math.PI * 2, 0, false);
        ctx.fill();
    }
}