// Canvas Setup
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 500;
ctx.msImageSmoothingEnabled = false;
ctx.mozImageSmoothingEnabled = false;
ctx.webkitImageSmoothingEnabled = false;
ctx.imageSmoothingEnabled = false;

let score = 0;
let hp = 3;
let gameFrame = 0;
ctx.font = "50px Monospace"

// Mouse Interactivity
let canvasPosition = canvas.getBoundingClientRect();

const mouse = {
  x: canvas.width/2,
  y: canvas.height/2,
  click: false,
}

canvas.addEventListener("mousedown", function(event) {
  mouse.click = true;
  mouse.x = event.x - canvasPosition.left;
  mouse.y = event.y - canvasPosition.top;
});

canvas.addEventListener("mouseup", function (event) {
  mouse.click = false;
});

// Player
class Player {
  constructor () {
    this.x = canvas.width/2;
    this.y = canvas.height/2;
    this.radius = 50;
    this.angle = 0;
    this.frameX = 0;
    this.frameY = 0;
    this.frame = 0;
    this.spriteWidth = 8;
    this.spriteHeight = 8;
  }
  update () {
    const dx = this.x - mouse.x;
    const dy = this.y - mouse.y;
    if (mouse.x != this.x) {
      this.x -= dx/30;
    }
    if (mouse.y != this.y) {
      this.y -= dy/30;
    }
  }
  draw () {
    if (mouse.click) {
      ctx.lineWidth = 0.2;
      ctx.beginPath();
      ctx.moveTo(this.x, this.y);
      ctx.lineTo(mouse.x, mouse.y);
      ctx.stroke();
    }
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.closePath();

    let playerSprite = new Image();
    playerSprite.src = "./hero-spritesheet.png";
    ctx.drawImage(
      playerSprite, 
      this.frameX * this.spriteWidth, 
      this.frameY * this.spriteHeight, 
      this.spriteWidth, 
      this.spriteHeight, 
      this.x - 40, 
      this.y - 40, 
      this.spriteWidth * 10, 
      this.spriteHeight * 10);
  }
}

const player = new Player;

// Bubbles
const slimesArray = [];
class Slime {
  constructor () {
    this.x = Math.random() * canvas.width;
    this.y = canvas.height + 50;
    this.radius = 45;
    this.speed = Math.random() * 4 + 1;
    this.distance;
    this.alive = true;
    this.frameX = 0;
    this.frameY = 0;
    this.spriteWidth = 8;
    this.spriteHeight = 8;
  }
  update () {
    this.y -= this.speed
    const dx = this.x - player.x;
    const dy = this.y - player.y;
    this.distance = Math.sqrt(dx*dx - dy*dy)
  }
  draw () {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.closePath();
    
    let slimeSprite = new Image();
    slimeSprite.src = "./slime-spritesheet.png";
    ctx.drawImage(
      slimeSprite, 
      this.frameX * this.spriteWidth, 
      this.frameY * this.spriteHeight, 
      this.spriteWidth, 
      this.spriteHeight, 
      this.x - 40, 
      this.y - 50, 
      this.spriteWidth * 10, 
      this.spriteHeight * 10);
  }
}

function handleSlimes () {
  if (gameFrame % 50 == 0) {
    slimesArray.push(new Slime());
  };
  for (i = 0; i < slimesArray.length; i++) {
    slimesArray[i].update();
    slimesArray[i].draw();
  }
  for (i = 0; i < slimesArray.length; i++) {
    if (slimesArray[i].y < 0 - this.radius * 2){
      slimesArray.splice(i, 1);
    }
    if (slimesArray[i].distance < (slimesArray[i].radius + player.radius)) {
      if (slimesArray[i].alive) {
        score++;
        slimesArray[i].alive = false;
        slimesArray.splice(i, 1);
      }
    }
  }
}

// Animation Looping
function animate () {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  handleSlimes();
  player.update();
  player.draw();
  ctx.fillStyle = "black";
  ctx.fillText("score: " + score, 10, 50);
  gameFrame++;
  requestAnimationFrame(animate);
}
animate();

// backdrop

let background = new Image();
background.src = "background-image.png";
background.onload = function(){
  ctx.drawImage(background, 500, 800);
};