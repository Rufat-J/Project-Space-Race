import {
   bullet1,
   bulletControl
  } from "./bullets.js"

import { 
  enemy, 
  generateEnemyPosition, 
} from "./enemy.js"

import {
  player1KeyDown, 
  player1KeyUp, 
  player2KeyDown, 
  player2KeyUp
} from "./events.js"

import {startGame} from "./utility.js"

let frameCount = 40;

let lastTick = Date.now();

function tick() {

  let currentTick = Date.now();
  let deltaTime = (currentTick - lastTick) / 1000;
  lastTick = currentTick;

  bullet1.bulletDelayLimit();
  startGame(deltaTime)
  frameCount++;
  enemy.respawn(deltaTime)
  bulletControl(deltaTime, frameCount)
 
  // detta är för att resetta framecount så att det inte laggar.
  if (frameCount > 500) {
    frameCount = 0;
    }
  
  if (frameCount % 25 === 0) {
    generateEnemyPosition()
  }

  requestAnimationFrame(tick);
}

tick();
