import { canvas, context, Position, Keys, Velocity } from "./components.js";

let frameCount = 40;
let player1Score = 0;
let player2Score = 0;
let enemies = [];
let bulletDelay1 = 0;
let bulletDelay2 = 0;
let side = 0;

//Game Settings
let playerSpeed = 100;
let player1Color = "Fuchsia";
let player2Color = "DeepSkyBlue";
let shipImage;

class Entity {
  constructor(position) {
    this.position = position;
  }
    draw() {}
    respawn1() {}
    respawn2() {}
}

class Bullets {
  constructor(position, velocity) {
    this.position = position,
    this.velocity = velocity;
    this.radius = 5,
    this.keys = new Keys()
  }

  drawBullet1() {
   context.beginPath();
   context.fillStyle = "Fuchsia";
   context.arc(this.position.x, player1.position.y, this.radius, 0, Math.PI * 2);
   context.fill();
   context.closePath(); 
  }
  
  drawBullet2() {
    context.beginPath();
    context.fillStyle = "DeepSkyBlue";
    context.arc(this.position.x, player2.position.y, this.radius, 0, Math.PI * 2)
    context.fill()
    context.closePath()
  }

  handleBullet1(bullet1, deltaTime) {
    if (bullet1.keys.shoot) {
      //bullet1.position.y =+ 200;
      
      bullet1.position.x += bullet1.velocity.dx * deltaTime
      bullet1.position.y =+ player1.position.y
      bulletDelay1=0;
     
  }
     if (bullet1.position.x > canvas.width && bulletDelay1 === 300) {
     bullet1.position.x = player1.position.x
   
  }
  }

  handleBullet2(bullet2, deltaTime) {
    if (bullet2.keys.shoot) {

      bullet2.position.x -= bullet1.velocity.dx * deltaTime
      bullet2.position.y =+ player2.position.y 
      bulletDelay2 = 0;
    
    }
    if (bullet2.position.x <= 0 && bulletDelay2 === 300) {
      bullet2.position.x = player2.position.x
    }
  }
}


class Players extends Entity {
  constructor(position, speed, radius, color, shipImage) {
    super(position);
    this.speed = speed;
    this.radius = radius;
    this.color = color;
    this.keys = new Keys();
    this.shipImage = document.getElementById("shipImage");
  }

  draw() {
    context.beginPath();
    context.drawImage(this.shipImage, this.position.x - 28, this.position.y - 26);
    context.closePath();
  }

  respawn1() {
      player1 = new Players(new Position(200, 515), playerSpeed, 20, player1Color);
  }

  respawn2() {
      player2 = new Players(new Position(400, 515), playerSpeed, 20, player2Color);
    }
  }


let player1 = new Players(new Position(200, 515), playerSpeed, 20, shipImage);
let player2 = new Players(new Position(400, 515), playerSpeed, 20, shipImage);
let bullet1 = new Bullets(new Position(player1.position.x, player1.position.y), new Velocity(100))
let bullet2 = new Bullets(new Position(player2.position.x, player2.position.y), new Velocity(100) )


class Enemy {
  constructor(position, velocity) {
    this.radius = generateNumberBetween(3, 10);
    this.color = "Wheat";
    this.position = position;
    this.velocity = velocity;
  }

  draw() {
    context.beginPath();
    context.fillStyle = this.color;
    context.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
    context.fill();
    context.closePath();
  }
}

function generateEnemyPosition() {
  
  side = generateNumberBetween(1, 2);
  
  if(side === 1) {                                      
   let enemy = new Enemy(new Position(0, generateNumberBetween(0, canvas.height - 80)), new Velocity(100))
   enemy.draw();  
   enemies.push(enemy);
   
  }
  else if(side === 2) {
   let enemy = new Enemy(new Position(canvas.width, generateNumberBetween(0, canvas.height -80)), new Velocity(-100))
   enemy.draw();
   enemies.push(enemy);
   
  }
}

function handleEnemyMovement(enemy, deltaTime) {
  enemy.position.x += enemy.velocity.dx * deltaTime;
}



function displayPlayer1Score() {
  context.fillStyle = "Fuchsia";
  context.font = "50px serif";
  context.fillText(player1Score, 20, 50);
}
function displayPlayer2Score() {
  context.fillStyle = "DeepSkyBlue";
  context.font = "50px serif";
  context.fillText(player2Score, 540, 50);
}

function generateNumberBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function handlePlayerMovement1(player1, deltaTime) {
  if (player1.keys.up && player1.position.y > 0 - player1.radius) {
    player1.position.y -= player1.speed * deltaTime;
  }

  if (
    player1.keys.down &&
    player1.position.y < canvas.height - player1.radius
  ) {
    player1.position.y += player1.speed * deltaTime;
  }
}

function handlePlayerMovement2(player2, deltaTime) {
  if (player2.keys.up && player2.position.y > 0 - player2.radius) {
    player2.position.y -= player2.speed * deltaTime;
  }

  if ( player2.keys.down && player2.position.y < canvas.height - player2.radius ) {
    player2.position.y += player2.speed * deltaTime;
  }
}

function player1KeyDown(event) {
  if (event.repeat) return;

  if (event.key === "w" || event.key === "W") {
    player1.keys.up = true;
  } else if (event.key === "s" || event.key === "S") {
    player1.keys.down = true;
  } else if (event.key === "e" || event.key === "E") {
    bullet1.keys.shoot = true;
  } 
}

function player2KeyDown(event) {
  if (event.repeat) return;
  if (event.key === "p" || event.key === "P") {
    player2.keys.up = true;
  } else if (event.key == "l" ||event.key === "L") {
    player2.keys.down = true;
  } else if (event.key === "o" || event.key === "O") {
    bullet2.keys.shoot = true;
  }
}

function player1KeyUp(event) {
  if (event.key === "w" || event.key === "W") {
    player1.keys.up = false;
  } else if (event.key === "s" || event.key === "S") {
    player1.keys.down = false;
  } else if (event.key === "e" || event.key === "E") {
    bullet1.keys.shoot = false;
  }
}

function player2KeyUp(event) {
  if (event.key == "p" || event.key === "P") {
    player2.keys.up = false;
  } else if (event.key == "l" || event.key === "L") {
    player2.keys.down = false;
  } else if (event.key === "o" || event.key === "O") {
    bullet2.keys.shoot = false;
  }
}

window.addEventListener("keydown", player1KeyDown);
window.addEventListener("keydown", player2KeyDown);
window.addEventListener("keyup", player1KeyUp);
window.addEventListener("keyup", player2KeyUp);

function bulletCollision1(player2, bullet1) {
  let dx = player2.position.x - bullet1.position.x;
  let dy = player2.position.y - bullet1.position.y;
  let distance = Math.sqrt(dx * dx + dy * dy);
  return distance < player2.radius + bullet1.radius; 
}

function bulletCollision2(player1, bullet2) {
  let dx = player1.position.x - bullet2.position.x;
  let dy = player1.position.y - bullet2.position.y;
  let distance = Math.sqrt(dx * dx + dy * dy);
  return distance < player1.radius + bullet2.radius;
}

function circleCollision1(player1, enemy) {
  
  let dx = player1.position.x - enemy.position.x;
  let dy = player1.position.y - enemy.position.y;
  let distance = Math.sqrt(dx * dx + dy * dy);
  return distance < player1.radius + enemy.radius;
   
}

function circleCollision2(player2, enemy) {
  let dx = player2.position.x - enemy.position.x;
  let dy = player2.position.y - enemy.position.y;
  let distance = Math.sqrt(dx * dx + dy * dy);

  return distance < player2.radius + enemy.radius;
}

function isCircleOutside(enemy) {
  return (
    enemy.position.x < -enemy.radius ||
    enemy.position.x > canvas.width + enemy.radius ||
    enemy.position.y < -enemy.radius ||
    enemy.position.y > canvas.height + enemy.radius
  );
}

let lastTick = Date.now();

function tick() {
  let currentTick = Date.now();
  let deltaTime = (currentTick - lastTick) / 1000;
  lastTick = currentTick;
  bulletDelay1++
  bulletDelay2++

  if (bulletDelay1 > 301) {
    bulletDelay1 = 300
  }
  if (bulletDelay2 > 301) {
    bulletDelay2 = 300
    
  }
  frameCount++;
  context.clearRect(0, 0, canvas.width, canvas.height);
  handlePlayerMovement1(player1, deltaTime);
  handlePlayerMovement2(player2, deltaTime);
  player1.draw();
  player2.draw();

  if (player1.position.y < -20) {
  player1.respawn1();
  player1Score++;
  }
  if(player2.position.y < -20) {
  player2.respawn2();
  player2Score++;
  }
  displayPlayer1Score();
  displayPlayer2Score();
 

  for (let i = 0; i < enemies.length; i++) {
    let enemy = enemies[i];
    enemy.draw();
    handleEnemyMovement(enemy, deltaTime);
    

    if (isCircleOutside(enemy)) {
      enemies.splice(i, 1)
      
    }  
    if (circleCollision1(enemy, player1)) {
      player1.respawn1()
      player1.draw();
    }
    if (circleCollision2(enemy, player2)) {
      player2.respawn2()
      player2.draw();
    }
  }

  for(let i = -10; i < frameCount; i++) {

  bullet1.handleBullet1(bullet1, deltaTime)
  bullet1.handleBullet2(bullet2, deltaTime)
  bullet1.drawBullet1()
  bullet2.drawBullet2()

  if(bulletCollision1(bullet1, player2)){
    player2.respawn2()  
  }

  if(bulletCollision2(bullet2, player1)) {
    player1.respawn1()
  }

  }
  if (frameCount > 2000) {
    frameCount = 0;
    }
  

  if (frameCount % 25 === 0) {
    generateEnemyPosition()
  }



  requestAnimationFrame(tick);
}

tick();
