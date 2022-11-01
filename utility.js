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

  export function circleCollision1(player1, enemy) {
    let dx = player1.position.x - enemy.position.x;
    let dy = player1.position.y - enemy.position.y;
    let distance = Math.sqrt(dx * dx + dy * dy);
    return distance < player1.radius + enemy.radius;
  }
  
  export function circleCollision2(player2, enemy) {
    let dx = player2.position.x - enemy.position.x;
    let dy = player2.position.y - enemy.position.y;
    let distance = Math.sqrt(dx * dx + dy * dy);
    return distance < player2.radius + enemy.radius;
  }
  
  export function startGame(deltaTime){
    context.clearRect(0, 0, canvas.width, canvas.height);
    player1.handleMovement(player2, deltaTime);
   
    player1.draw1();
    player2.draw1();
    player1.displayPlayerScore(player2);
  }