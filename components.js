export const canvas = document.getElementById("canvas");
export const context = canvas.getContext("2d");


export class Position {
    constructor (x, y) {
        this.x = x;
        this.y = y;
    }
}

export class Velocity {
    constructor () {
        this.dx = dx;
        this.dy = dy;
    }
}

export class Keys {
    constructor() {
        this.up = false;
        this.down = false;
    }
}