export class Sprite {
    constructor(x, y, w, h, src) {
        this.x = x;
        this.y = y;
        this.h = h;
        this.w = w;
        this.speed = 2;
        this.image = new Image();
        this.image.src = src;
    }
}