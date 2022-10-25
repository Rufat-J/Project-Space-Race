'use strict'; 

import {canvas, context, Position, Keys} from "./components.js"

let frameCount = 10;
let player1life = 0
let player2life = 0
let player1score = false;
let player2score = false; 

//Game Settings
let playerSpeed = 200;
let player1Color = 'red'
let player2Color = 'blue'



class Entity {
    constructor(position) {
        this.position = position;
    }

    draw() {}
    respawn() {}
}



class Players extends Entity {
    constructor(position, speed, radius, color) {
        super(position)
        this.speed = speed;
        this.radius = radius;
        this.color = color; 
        this.keys = new Keys();
    }


    draw() {
        context.beginPath()
        context.fillStyle = this.color;
        context.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
        context.fill();
        context.closePath();

    }

    respawn() {
        if (isOutsideTop(this)) {
            player1 = new Players(new Position(150, 520), playerSpeed, 20, player1Color)
            player1life++
            
        }
    } 
    
}
function displayPlayer1lives() {
    context.fillStyle = "white"
    context.font = '40px serif';
    context.fillText(player1life, 20, 50);
}
function displayPlayer2lives() {
    context.fillStyle = "white"
    context.font = '40px serif';
    context.fillText(player2life, 560, 50);
}

function isOutsideTop(player1) {
    return player1.position.y < -20;
}


let player1 = new Players(new Position(200, 520), playerSpeed, 20, player1Color)

let player2 = new Players(new Position(400, 520), playerSpeed, 20, player2Color)



function handlePlayerMovement1(player1, deltaTime) {
    if (player1.keys.up && player1.position.y > 0 - player1.radius ) {
        player1.position.y -= player1.speed * deltaTime;
    }

    if (player1.keys.down && player1.position.y < canvas.height - player1.radius) {
        player1.position.y += player1.speed * deltaTime;
    }

}

function handlePlayerMovement2(player2, deltaTime) {
if (player2.keys.up && player2.position.y > 0 - player2.radius ) {
    player2.position.y -= player2.speed * deltaTime
}

if (player2.keys.down && player2.position.y < canvas.height - player2.radius) {
    player2.position.y += player2.speed * deltaTime;
}
}



/*
function player2life () {
if(player2score) {
   player1.y = 100;
}
}*/

function player1KeyDown(event) {
    if (event.repeat) return;

    if (event.key === 'w' || event.key === 'W') {
        player1.keys.up = true;

    }  else if (event.key === 's' || event.key === 'S') {
        player1.keys.down = true;
    }
}

function player2KeyDown(event) {
    if (event.repeat) return;

    if (event.key === 'ArrowUp') {
        player2.keys.up = true;

    } else if (event.key == 'ArrowDown' /* ||event.key === 'Down' */) {
        player2.keys.down = true;
    }
}
function player1KeyUp(event) {
    if (event.key === 'w' || event.key === 'W') {
        player1.keys.up = false;
       
    }  else if (event.key === 's' || event.key === 'S') {
        player1.keys.down = false;
    }
}

function player2KeyUp(event) {
    if (event.key == 'ArrowUp') {
        player2.keys.up = false;

    }  else if (event.key == 'ArrowDown') {
        player2.keys.down = false;
    }
}

window.addEventListener('keydown', player1KeyDown);
window.addEventListener('keydown', player2KeyDown);
window.addEventListener('keyup', player1KeyUp);
window.addEventListener('keyup', player2KeyUp);


let lastTick = Date.now();

function tick() {

    let currentTick = Date.now();
    let deltaTime = (currentTick - lastTick) / 1000;
    lastTick = currentTick;

    frameCount ++;

    context.clearRect(0, 0, canvas.width, canvas.height);

    player1.draw();
    handlePlayerMovement1(player1, deltaTime);
    handlePlayerMovement2(player2, deltaTime);
    player2.draw();
    player1.respawn();
    displayPlayer1lives();
    displayPlayer2lives();
    //isCircleOutside(player1)
    requestAnimationFrame(tick)
    
}

tick();


/*
function isCircleOutside(player1) {
    return (player1.position.y < -player1.radius || 
        player1.position.y > canvas.height + player1.radius);

    }
*/


    /*
if (player1.position.y<player1.radius) {
    new Player1();
}
else if (player2.position.y<player1.radius) {
    new Player2();
}
*/