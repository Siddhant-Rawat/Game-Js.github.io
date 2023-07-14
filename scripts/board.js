import { Bullet } from "./bullet.js";
import { CONFIG } from "./config.js";
import { Enemy } from "./enemy.js";
import { Player } from "./player.js";

export class Board {
    static bullets = []; //Bind with the class as it is static
    constructor(context) {
        this.ctx = context;
        this.image = new Image();
        this.image.src = './assets/images/bg.jpg';
        this.player = new Player();
        this.enemies = this.loadEnemies() ;
        this.gameMessage = "";
        this.gameLoop();
        this.interval = undefined;
        this.isGameOn = true;
        // this.drawBackground();
    }
    // drawBackground() {
    //     // Arrow function does not have a 'this' of it's own. It picks up the super 'this'
    //     // In this case, arrow function picks up the 'this' of Board class and not of image(which is also an object)
    //     this.image.onload = ()=> {
    //         this.context.drawImage(this.image, 0, 0);
    //     }
    // }

    isCollide(firstObject, secondObject) {
        let distanceX = Math.abs(firstObject.x - secondObject.x);
        let distanceY = Math.abs(firstObject.y - secondObject.y);
        let maxWidth = Math.max(firstObject.w, secondObject.w);
        let maxHeight = Math.max(firstObject.h, secondObject.h);

        return distanceX <= maxWidth - 40 && distanceY <= maxHeight - 20;
    }


    // LOGIC?????????????

    // stopGame() {
    //     clearInterval(this.interval);
    //     let count = 1;
    //     const anim = setInterval(()=>{
    //         if(count > 8) {
    //             clearInterval(anim);
    //         }
    //         this.ctx.fillStyle = 'yellow';
    //         this.ctx.font = '50px serif';
    //         if(count % 2 != 0) {
    //             this.gameMessage = "GAME OVER";
    //         }
    //         else {
    //             this.gameMessage = "";
    //         }
    //         count++;
    //         this.draw();
    //     }, 400);
    // }

    collisionBulletAndEnemy() {
        for(let bullet of Board.bullets) {
            for(let enemy of this.enemies) {
                if(this.isCollide(bullet, enemy)) {
                    enemy.isDead = true;
                }
            }
        }
    }

    collision() {
        for(let enemy of this.enemies) {
            if(this.isCollide(this.player, enemy)) {
                this.gameMessage = "GAME LOST";
                this.isGameOn = false;
                return;
            }
        }
    }

    gameOver() {
        this.gameMessage = "GAME WON";
        // this.ctx.fillStyle = 'yellow';
        // this.ctx.font = '50px serif';
    }

    drawMessage() {
        if(this.gameMessage.length > 0) {
            this.ctx.font = '100px serif';
            this.ctx.fillStyle = 'blue';
            this.ctx.fillText(this.gameMessage, CONFIG.BOARD_WIDTH/2 - 300, CONFIG.BOARD_HEIGHT/2);
            setTimeout(()=> {
                
                //  reload() is responsible for page reloading
                //  location is an interface that represents the actual location (URL) of the object it is linked to – 
                //  in this case the URL of the page we want to reload.
                //  It can be accessed via either document.location or window.location.
                document.location.reload();
            }, 3000);
        }
    }

    fireBullets() {
        let bullet = new Bullet((this.player.x + this.player.w - 50),
        (this.player.y + this.player.h/2 - 10));
        Board.bullets.push(bullet);
    }

    drawBullets() {
        for(let bullet of Board.bullets) {
            bullet.draw(this.ctx);
        }
    }

    keyCapture(event) {
        if(event.keyCode == CONFIG.RIGHT_ARROW) {
            if(this.isGameOn) {
                this.player.move();
            }
            if(this.player.outOfScreen()) {
                this.gameOver();
                this.isGameOn = false;
            }
        }
        else if(event.keyCode == CONFIG.SPACE) {
            if(this.isGameOn){
                this.fireBullets();
            }
        }
        else if(event.keyCode == CONFIG.ENTER_KEY) {
            if(this.isGameOn) {
                this.player.jump();
            }
        }
    }

    loadEnemies() {
        const GAP = 250;
        let currentX = 50;
        let speed = 5;
        const enemies = [];
        let lastX = 0;

        for(let i = 0;i < CONFIG.MAX_ENEMY;i++) {
            let enemy = new Enemy();
            enemy.x = lastX + currentX + GAP;
            lastX = enemy.x;
            enemy.speed = speed;
            speed = speed + 3;
            enemies.push(enemy);
        }
        return enemies;
    }

    gameLoop() {
        this.interval = setInterval(()=>{
            this.draw();
            this.player.fall();
            this.collision();
            if(!this.isGameOn) {
                this.draw();
                this.stopGame();
            }
            this.collisionBulletAndEnemy();
        },50);
    }

    draw() {
        this.ctx.clearRect(0,0, CONFIG.BOARD_WIDTH, CONFIG.BOARD_HEIGHT);
        this.ctx.drawImage(this.image, 0, 0);
        this.player.draw(this.ctx);
        this.drawEnemies();
        this.drawBullets();
        this.drawMessage();
    }

    drawEnemies() {
        for(let enemy of this.enemies) {
            enemy.draw(this.ctx, this.isGameOn);
        }
    }
}