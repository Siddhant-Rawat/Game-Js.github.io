// Trigger the game

import { Board } from "./board.js";
import { CONFIG } from "./config.js";

window.addEventListener("load", bindEvents);
window.addEventListener("keydown", keyPress);
let board;

function bindEvents() {
  const canvas = document.querySelector("#board");
  canvas.width = CONFIG.BOARD_WIDTH;
  canvas.height = CONFIG.BOARD_HEIGHT;
  const context = canvas.getContext("2d");

  board = new Board(context);

  // confirm("Right Arrow = Move Forward. F = Fire. Space = Jump");
}

function keyPress(event) {
  board.keyCapture(event);
}

/*
Playing with Canvas
*/

//Create canvas & context.
// const canvas = document.querySelector("#board");
// canvas.width = 1200;
// canvas.height = 550;
// const context = canvas.getContext('2d');
// context.fillStyle = "green";
// context.fillRect(10, 10, 50, 50);

//Empty Rectangle
// context.strokeRect(100,100,10,10);

//Triangle
// context.fillStyle = 'blue';
// context.beginPath();

// Starting Point
// context.moveTo(10,10);

// Draw a line to this point from starting
// context.lineTo(10,100);
// context.lineTo(150,100);
// context.lineTo(100,150);
// context.fill();

//Draw Text
// context.font = '20px serif';
// context.strokeText("Game Over", 150, 100);

// Draw Image
// const image = new Image();
// image.src = "./assets/images/bg.jpg";
// image.onload = function() {
//     context.drawImage(image, 0, 0);
// };
