import { canvas, context, Position, Keys, Velocity } from "./components.js";

let frameCount = 10;
let player1Score = 0;
let player2Score = 0;
let nr = 0;

//Game Settings
let playerSpeed = 220;
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
  constructor(position, color, speed) {
    this.position = position,
    this.speed = speed,
    this.radius = 5, 
    this.color = color
    this.keys = new Keys()
  }

  drawBullet1() {
   context.beginPath();
   context.fillStyle = "Fuchsia";
   context.arc(player1.position.x, player1.position.y, this.radius, 0, Math.PI * 2);
   context.fill();
   context.closePath(); 
  }
  
  drawBullet2() {
    context.beginPath();
    context.fillStyle = "DeepSkyBlue";
    context.arc(player2.position.x, player2.position.y, this.radius, 0, Math.PI * 2)
    context.fill()
    context.closePath()
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
    //context.fillStyle = this.color
    context.drawImage(this.shipImage, this.position.x - 28, this.position.y - 26);
    //context.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
    //context.fill();
    context.closePath();
  }

  // shipDisplay() {
  //   //ImageMode();
  //   image(this.shipImage, this.position.x, this.position.y);
  // }

  respawn1() {
    if (this.position.y < -20) {
      player1 = new Players(
        new Position(200, 515),
        playerSpeed,
        20,
        player1Color,
        this.image
      );
      player1Score++;
    }
  }

  respawn2() {
    if (this.position.y < -20) {
      player2 = new Players(
        new Position(400, 515),
        playerSpeed,
        20,
        player2Color
      );
      player2Score++;
    }
  }
}

let player1 = new Players(new Position(200, 515), playerSpeed, 40, shipImage);
let player2 = new Players(new Position(400, 515), playerSpeed, 40, shipImage);
let bullet1 = new Bullets(new Position(player1.position.x, player1.position.y), 300)
let bullet2 = new Bullets(new Position(player2.position.x, player2.position.y), 20)





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

/* let enemy = new Enemy(generateEnemyPosition(), generateRandomVelocity()); */

let enemies = [];

function generateEnemyPosition() {
  let side = generateNumberBetween(1, 2);

  if (side === 1) {
    // vänster sida
    return new Position(0, generateNumberBetween(0, canvas.height - 80));
  } else if (side === 2) {
    // höger sida
    return new Position(
      canvas.width,
      generateNumberBetween(0, canvas.height - 80)
    );
  } /* else if (side === 3) { // övre sidan
        return new Position(generateNumberBetween(100, canvas.width, false), 0);
    } else { // nedre sidan
        return new Position(generateNumberBetween(100, canvas.width, true));
    }
} */
}
function handleEnemyMovement(enemy, deltaTime) {
  enemy.position.x += enemy.velocity.dx * deltaTime;
}


function newVelocity() {
  let newVel = generateNumberBetween(1,2)
  if ( newVel === 1) {
   nr = -200    
  }  else {
  nr = 200
  }
  return nr;

}

function generateRandomVelocity() {
  return new Velocity(newVelocity());
}

function displayPlayer1Score() {
  context.fillStyle = "Fuchsia";
  context.font = "50px serif";
  context.fillText(player1Score, 20, 50);
}
function displayPlayer2Score() {
  context.fillStyle = "DeepSkyBlue";
  context.font = "50px serif";
  context.fillText(player2Score, 530, 50);
}

function generateNumberBetween(min, max) {
  /*     if (fraction) {
        return Math.random() * (max - min) + min;
    } else { */
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function handleBullet1(bullet1, deltaTime) {
  if (bullet1.keys.shoot) {
    bullet1.position.x += bullet1.speed * deltaTime
}
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

  frameCount++;
  context.clearRect(0, 0, canvas.width, canvas.height);

  handlePlayerMovement1(player1, deltaTime);
  handlePlayerMovement2(player2, deltaTime);
  player1.draw();
  player2.draw();
  player1.respawn1();
  player2.respawn2();
  displayPlayer1Score();
  displayPlayer2Score();
  bullet1.drawBullet1();
  bullet2.drawBullet2();

  for (let i = 0; i < enemies.length; i++) {
    let enemy = enemies[i];
    enemy.draw();
    handleEnemyMovement(enemy, deltaTime);
    handleBullet1(bullet1, deltaTime)
    if (isCircleOutside(enemy)) {
      enemies.splice(i, 1);
      continue;
    }
    if (circleCollision1(enemy, player1)) {
      player1 = new Players(
        new Position(200, 515),
        playerSpeed,
        20
      );
      player1.draw();
    }
    if (circleCollision2(enemy, player2)) {
      player2 = new Players(
        new Position(400, 515),
        playerSpeed,
        20,
        player2Color
      );
      player2.draw();
    }
  }
  if (frameCount % 20 === 0) {
    let enemy = new Enemy(
      generateEnemyPosition(canvas.width, canvas.height),
      generateRandomVelocity()
    );
    enemies.push(enemy);
    enemy.draw();
  }
  requestAnimationFrame(tick);
}

tick();
