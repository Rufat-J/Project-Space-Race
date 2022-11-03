import { context } from "./components.js";
import { player1, player2 } from "./player.js";


export function generateNumberBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function isCircleOutside(enemy) {
  return (
    enemy.position.x < -enemy.radius ||
    enemy.position.x > canvas.width + enemy.radius ||
    enemy.position.y < -enemy.radius ||
    enemy.position.y > canvas.height + enemy.radius
  );
}

export function circleCollision(enemy) {

  let dx = player1.position.x - enemy.position.x;
  let dy = player1.position.y - enemy.position.y;
  let distance = Math.sqrt(dx * dx + dy * dy);

  let zx = player2.position.x - enemy.position.x;
  let zy = player2.position.y - enemy.position.y;
  let distance2 = Math.sqrt(zx * zx + zy * zy); 
  if (distance < player1.radius + enemy.radius) {
    player1.respawn1()
    player1.draw();
  }
  else if (distance2 < player2.radius + enemy.radius) {
    player2.respawn2()
    player2.draw();
  }

}
export function startGame(deltaTime) {
  context.clearRect(0, 0, canvas.width, canvas.height);
  player1.handleMovement(player2, deltaTime);

  player1.draw();
  player2.draw();
  player1.displayPlayerScore(player2);
}