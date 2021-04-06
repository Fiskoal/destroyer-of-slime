// Canvas Setup
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
const canvas2 = document.getElementById("canvas2");
const ctx2 = canvas.getContext("2d");
let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;
canvas.width = 800;
canvas.height = 500;
canvas2.width = 800;
canvas2.height = 500;
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
  x: canvas.width / 2,
  y: canvas.height / 2,
  click: false,
}

canvas.addEventListener("mousedown", function (event) {
  mouse.click = true;
  mouse.x = event.x - canvasPosition.left;
  mouse.y = event.y - canvasPosition.top;
});

canvas.addEventListener("mouseup", function (event) {
  mouse.click = false;
});

const keys = [];

document.addEventListener("keydown", function (event) {
  keys[event.key] = true;
  console.log("keydown", keys);
})

document.addEventListener("keyup", function (event) {
  delete keys[event.key];
  console.log("keyup", keys);
})

// Player
class Player {
  constructor() {
    this.x = canvas.width / 2;
    this.y = canvas.height / 2;
    this.radius = 50;
    this.angle = 0;
    this.frameX = 0;
    this.frameY = 0;
    this.frame = 0;
    this.spriteWidth = 8;
    this.spriteHeight = 8;
    this.speed = 5;
  }
  update() {
    if (keys["w"] || keys["ArrowUp"]) {
      this.frameY = 2;
      if (this.y != 0) {
        this.y -= this.speed;
      }
      if (gameFrame % 15 === 0) {
        if (this.frameX === 1) {
          this.frameX = 2;
        } else {
          this.frameX = 1;
        }
      }
    }
    if (keys["a"] || keys["ArrowLeft"]) {
      this.frameY = 1;
      if (this.x != 0) {
        this.x -= this.speed;
      }
      if (this.frameX != (3 || 2)) {
        this.frameX = 2;
      }
      if (gameFrame % 15 === 0) {
        if (this.frameX === 2) {
          this.frameX = 3;
        } else {
          this.frameX = 2;
        }
      }
    }
    if (keys["s"] || keys["ArrowDown"]) {
      this.frameY = 0;
      if (this.y != canvas.height - this.radius) {
        this.y += this.speed;
      }
      if (this.frameX != (2 || 1)) {
        this.framex = 1;
      }
      if (gameFrame % 15 === 0) {
        if (this.frameX === 1) {
          this.frameX = 2;
        } else {
          this.frameX = 1;
        }
      }
    }
    if (keys["d"] || keys["ArrowRight"]) {
      this.frameY = 1;
      if (this.x != canvas.width) {
        this.x += this.speed;
      }
      if (this.frameX != (1 || 0)) {
        this.frameX = 0;
      }
      if (gameFrame % 15 === 0) {
        if (this.frameX === 1) {
          this.frameX = 0;
        } else {
          this.frameX = 1;
        }
      }
    }
  }
  draw() {
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
  constructor() {
    this.x = (Math.random() * canvas.width) >> 0;
    this.y = canvas.height + 50;
    this.radius = 45;
    this.speed = (Math.random() * 4 + 1) >> 0;
    this.distance = 0;
    this.alive = true;
    this.frameX = 0;
    this.frameY = 0;
    this.spriteWidth = 8;
    this.spriteHeight = 8;
    this.lifeSpan = 0;
  }
  update() {
    this.y -= this.speed;
    const dx = this.x - player.x;
    const dy = this.y - player.y;
    this.distance = Math.sqrt(dx ** 2 + dy ** 2);
    this.lifeSpan++;
  }
  draw() {
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

let background = new Image();
background.src = "background-image.png";
function handleWindow() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx2.drawImage(background, 0, 0);
  ctx.fillStyle = "black";
  ctx.fillText("score: " + score, 10, 50);
  canvasPosition = canvas.getBoundingClientRect();
  windowWidth = window.innerWidth;
  windowHeight = window.innerHeight;
}

function handlePlayer() {
  player.update();
  player.draw();
};

function handleSlimes() {
  if (gameFrame % 50 == 0) {
    // every 50 game frames, adds new slime
    slimesArray.push(new Slime());
  };
  for (i = 0; i < slimesArray.length; i++) {
    if (gameFrame % 50 == 0) {
      if (slimesArray[i].frameX == 0) {
        slimesArray[i].frameX = 1;
      } else {
        slimesArray[i].frameX = 0;
      }
    }
  }
  for (i = 0; i < slimesArray.length; i++) {
    // iterates thru slime array and updates the slimes every game frame
    slimesArray[i].update();
    slimesArray[i].draw();
  }
  for (i = 0; i < slimesArray.length; i++) {
    // checks if slimes reach end of the screen
    if (slimesArray[i].y < 0 - slimesArray[i].radius * 2) {
      slimesArray.splice(i, 1);
    }
    // checks for collision + if slime is alive
    if (slimesArray[i].distance < slimesArray[i].radius + player.radius && slimesArray[i].alive) {
      console.log("Slime: OW!");
      slimesArray[i].alive = false;
      score++;
      slimesArray.splice(i, 1);
    }
  }
}

// Animation Looping
function animate() {
  handleWindow();
  handlePlayer();
  handleSlimes();
  gameFrame++;
  requestAnimationFrame(animate);
}
animate();