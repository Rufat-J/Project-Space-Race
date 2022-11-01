import { Entity, Position, Velocity, canvas, context, Keys } from "./components.js"
import { player1, player2 } from "./player.js"

let bulletDelay1 = 0;
let bulletDelay2 = 0;

export class Bullets extends Entity {
    constructor(position, radius, velocity) {
      super(position, radius)
      this.velocity = velocity
      this.keys = new Keys()
    }
  
    draw1() {
     context.beginPath();
     context.fillStyle = "Fuchsia";
     context.arc(this.position.x, player1.position.y, this.radius, 0, Math.PI * 2);
     context.fill();
     context.closePath(); 
    }
    
    draw2() {
      context.beginPath();
      context.fillStyle = "DeepSkyBlue";
      context.arc(this.position.x, player2.position.y, this.radius, 0, Math.PI * 2)
      context.fill()
      context.closePath()
    }

    handleMovement(bullet1, bullet2, deltaTime) {
      if (bullet1.keys.shoot) {
        
        this.position.x += this.velocity.dx * deltaTime
        this.position.y =+ player1.position.y
        bulletDelay1 = 0;
       
    }
       if (this.position.x > canvas.width && bulletDelay1 === 300) {
       this.position.x = player1.position.x
    }
  
      if (bullet2.keys.shoot) {
  
      bullet2.position.x -= bullet1.velocity.dx * deltaTime
      bullet2.position.y =+ player2.position.y 
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
  
  export function bulletControl(deltaTime, frameCount) {
    for(let i = -10; i < frameCount; i++) {
  
      bullet1.handleMovement(bullet1, bullet2, deltaTime)
      bullet1.draw1()
      bullet2.draw2()
    
      if(bulletCollision1(bullet1, player2)){
        player2.respawn2()  
      }
    
      if(bulletCollision2(bullet2, player1)) {
        player1.respawn1()
      }
      }
  }


  
  export let bullet1 = new Bullets(new Position(player1.position.x, player1.position.y), 5, new Velocity(100))
  export let bullet2 = new Bullets(new Position(player2.position.x, player2.position.y), 5, new Velocity(100))
