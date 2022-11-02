import { Entity, Position, canvas, context, Keys  } from "./components.js";
import { playerSpeed } from "./settings.js";


let player1Score = 0;
let player2Score = 0;

export class Players extends Entity {
    constructor(position, speed, radius) {
      super(position, radius);
      this.speed = speed;
      this.keys =  new Keys();
      this.shipImage = document.getElementById("shipImage");
    }
  
    draw() {
      context.beginPath();
      context.drawImage(this.shipImage, this.position.x - 28, this.position.y - 26);
      context.closePath();
    }

    respawn1() {

      player1 = new Players(new Position(200, 515), playerSpeed, 20)
    }

    respawn2() {
      player2 = new Players(new Position(400, 515), playerSpeed, 20);
    }
    
  
    handleMovement(player2, deltaTime) {
        if (this.keys.up && this.position.y > 0 - this.radius) {
          this.position.y -= this.speed * deltaTime;
        }
      
        if (
          this.keys.down &&
          this.position.y < canvas.height - this.radius
        ) {
          this.position.y += this.speed * deltaTime;
        }
        
        if (player2.keys.up && player2.position.y > 0 - player2.radius) {
          player2.position.y -= player2.speed * deltaTime;
        }
      
        if ( player2.keys.down && player2.position.y < canvas.height - player2.radius ) {
          player2.position.y += player2.speed * deltaTime;
        }
      }

        displayPlayerScore(player2) {
     
        context.fillStyle = "Fuchsia";
        context.font = "50px serif";
        context.fillText(player1Score, 20, 50);
      
        context.fillStyle = "DeepSkyBlue";
        context.font = "50px serif";
        context.fillText(player2Score, 540, 50);

        if (this.position.y < -20) {
            this.respawn1();
            player1Score++;
            }
            if(player2.position.y < -20) {
            player2.respawn2();
            player2Score++;
            }
      }
    }

    export let player1 = new Players(new Position(200, 515), playerSpeed, 20, shipImage);
    export let player2 = new Players(new Position(400, 515), playerSpeed, 20, shipImage);