import { Entity, Position, Velocity, canvas, context, Keys } from "./components.js"
import { player1, player2 } from "./player.js"
import { bullet1Color, bullet2Color } from "./settings.js"

let bulletDelay1 = 0;
let bulletDelay2 = 0;

export class Bullets extends Entity {
  constructor(position, radius, velocity) {
    super(position, radius)
    this.velocity = velocity
    this.keys = new Keys()
  }

  draw() {
    context.beginPath();
    context.fillStyle = bullet1Color;
    context.arc(bullet1.position.x, player1.position.y, this.radius, 0, Math.PI * 2);
    context.fill()
    context.closePath()
    context.beginPath()
    context.fillStyle = bullet2Color;
    context.arc(bullet2.position.x, player2.position.y, this.radius, 0, Math.PI * 2)
    context.fill();
    context.closePath();
  }

  handleMovement(bullet1, bullet2, deltaTime) {
    if (bullet1.keys.shoot) {
      this.position.x += this.velocity.dx * deltaTime
      this.position.y = + player1.position.y
      bulletDelay1 = 0;
    }

    if (this.position.x > canvas.width && bulletDelay1 === 300) {
      this.position.x = player1.position.x
    }

    if (bullet2.keys.shoot) {

      bullet2.position.x -= bullet1.velocity.dx * deltaTime
      bullet2.position.y = + player2.position.y
      bulletDelay2 = 0;
    }

    if (bullet2.position.x <= 0 && bulletDelay2 === 300) {
      bullet2.position.x = player2.position.x
    }
  }

  bulletDelayLimit() {
    bulletDelay1++
    bulletDelay2++

    if (bulletDelay1 > 301) {
      bulletDelay1 = 300
    }

    if (bulletDelay2 > 301) {
      bulletDelay2 = 300
    }
  }
}

function bulletCollision() {
  let dx = player2.position.x - bullet1.position.x;
  let dy = player2.position.y - bullet1.position.y;
  let distance = Math.sqrt(dx * dx + dy * dy);

  let zx = player1.position.x - bullet2.position.x;
  let zy = player1.position.y - bullet2.position.y;
  let distance2 = Math.sqrt(zx * zx + zy * zy);

  if (distance < player2.radius + bullet1.radius) {
    player2.draw()
    player2.respawn2()
  }

  else if (distance2 < player1.radius + bullet2.radius) {
    player1.draw()
    player1.respawn1()
  }
}

export function bulletControl(deltaTime, frameCount) {
  for (let i = -10; i < frameCount; i++) {
    bullet1.draw()
    bullet2.draw()
    bullet1.handleMovement(bullet1, bullet2, deltaTime)
    bulletCollision()
  }
}

export let bullet1 = new Bullets(new Position(player1.position.x, player1.position.y), 5, new Velocity(100))
export let bullet2 = new Bullets(new Position(player2.position.x, player2.position.y), 5, new Velocity(100))
