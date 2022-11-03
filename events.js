import { player1, player2 } from "./player.js"
import { bullet1, bullet2 } from "./bullets.js"

export function player1KeyDown(event) {
  if (event.repeat) return;

  if (event.key === "w" || event.key === "W") {
    player1.keys.up = true;
  } else if (event.key === "s" || event.key === "S") {
    player1.keys.down = true;
  } else if (event.key === "e" || event.key === "E") {
    bullet1.keys.shoot = true;
  }
}

export function player2KeyDown(event) {
  if (event.repeat) return;
  if (event.key === "p" || event.key === "P") {
    player2.keys.up = true;
  } else if (event.key == "l" || event.key === "L") {
    player2.keys.down = true;
  } else if (event.key === "o" || event.key === "O") {
    bullet2.keys.shoot = true;
  }
}

export function player1KeyUp(event) {
  if (event.key === "w" || event.key === "W") {
    player1.keys.up = false;
  } else if (event.key === "s" || event.key === "S") {
    player1.keys.down = false;
  } else if (event.key === "e" || event.key === "E") {
    bullet1.keys.shoot = false;
  }
}

export function player2KeyUp(event) {
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