import { Board } from "./board.js";
import { CONFIG } from "./config.js";
import { Sprite } from "./sprite.js";

export class Bullet extends Sprite {
    constructor(x,y) {
        super(x, y, 40, 40, './assets/images/stone.png');
        this.speed = 25;
    }

    draw(ctx) {
        ctx.drawImage(this.image, this.x, this.y, this.w, this.h);
        this.move();
        if(this.outOfScreen() == true) {
            Board.bullets.shift();
        }
    }

    move() {
        
        this.x = this.x + this.speed;
    }

    outOfScreen() {
        if((this.x) > CONFIG.BOARD_WIDTH) {
            return true;
        }
        return false;
    }
}