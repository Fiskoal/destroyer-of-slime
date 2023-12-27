//=================================================
// Canvas setup, find way to export it later
//=================================================

//canvas1
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 500;
ctx.msImageSmoothingEnabled = false;
ctx.mozImageSmoothingEnabled = false;
ctx.webkitImageSmoothingEnabled = false;
ctx.imageSmoothingEnabled = false;
ctx.font = "50px monospace";

//canvas2
const canvas2 = document.getElementById("canvas2");
const ctx2 = canvas2.getContext("2d");
canvas2.width = 800;
canvas2.height = 500;
ctx2.msImageSmoothingEnabled = false;
ctx2.mozImageSmoothingEnabled = false;
ctx2.webkitImageSmoothingEnabled = false;
ctx2.imageSmoothingEnabled = false;
ctx2.font = "20px monospace";

//=================================================
// Variables for window / game resizing
//=================================================
let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;
let canvasPosition = canvas.getBoundingClientRect();

//=================================================
// Declaring game variables on pageload
//=================================================
let score = 0;
let hp = 3;
let gameFrame = 0;
//=================================================
// Removes right click from document. Might just remove, because fuck it? Maybe just have game do something .on("blur") instead, so that people can right click
//=================================================
document.addEventListener("contextmenu", (event) => event.preventDefault());

//=================================================
let keys = {
  w: false,
  a: false,
  s: false,
  d: false,
};

document.addEventListener("keydown", function (event) {
  keys[event.key] = true;
});

document.addEventListener("keyup", function (event) {
  keys[event.key] = false;
});

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
    this.speed = 4.85;
    this.diagonalSpeed = Math.sqrt(this.speed ** 2 + this.speed ** 2) / 2;
    this.direction = 3;
  }
  update() {
    keys.w && !keys.a && !keys.d
      ? this.moveUp()
      : keys.a && !keys.w && !keys.s
      ? this.moveLeft()
      : keys.s && !keys.a && !keys.d
      ? this.moveDown()
      : keys.d && !keys.w && !keys.s
      ? this.moveRight()
      : keys.w && keys.a && !keys.d
      ? this.moveUpLeft()
      : keys.w && keys.d && !keys.a
      ? this.moveUpRight()
      : keys.s && keys.a && !keys.d
      ? this.moveDownLeft()
      : keys.s && keys.d && !keys.a
      ? this.moveDownRight()
      : keys.w && keys.a && keys.d && !keys.s
      ? this.moveUp()
      : keys.s && keys.a && keys.d && !keys.w
      ? this.moveDown()
      : this.notMoving();
  }
  moveUp() {
    this.frameY = 2;

    this.y -= (this.y > 0) * this.speed;

    if (this.frameX != 1 && this.frameX != 2) {
      this.frameX = 1;
    }

    if (gameFrame % 15 === 0) {
      this.frameX === 1 ? (this.frameX = 2) : (this.frameX = 1);
    }

    this.direction = 1;
  }
  moveLeft() {
    this.frameY = 1;

    this.x -= (this.x > 0) * this.speed;

    if (this.frameX != 2 && this.frameX != 3) {
      this.frameX = 2;
    }

    if (gameFrame % 15 === 0) {
      this.frameX === 2 ? (this.frameX = 3) : (this.frameX = 2);
    }

    this.direction = 2;
  }
  moveDown() {
    this.frameY = 0;

    this.y += (this.y < canvas.height - this.radius + 10) * this.speed;

    if (this.frameX != 1 && this.frameX != 2) {
      this.frameX = 1;
    }

    if (gameFrame % 15 === 0) {
      this.frameX === 1 ? (this.frameX = 2) : (this.frameX = 1);
    }

    this.direction = 3;
  }
  moveRight() {
    this.frameY = 1;

    this.x += (this.x < canvas.width - this.radius + 10) * this.speed;

    if (this.frameX != 0 && this.frameX != 1) {
      this.frameX = 0;
    }

    if (gameFrame % 15 === 0) {
      this.frameX === 0 ? (this.frameX = 1) : (this.frameX = 0);
    }

    this.direction = 4;
  }
  moveUpLeft() {
    this.frameY = 2;

    this.y -= (this.y > 0) * this.diagonalSpeed;
    this.x -= (this.x > 0) * this.diagonalSpeed;

    if (this.frameX != 1 && this.frameX != 2) {
      this.frameX = 1;
    }

    if (gameFrame % 15 === 0) {
      this.frameX === 1 ? (this.frameX = 2) : (this.frameX = 1);
    }

    this.direction = 1;
  }
  moveUpRight() {
    this.frameY = 2;

    this.y -= (this.y > 0) * this.diagonalSpeed;
    this.x += (this.x < canvas.width - this.radius + 10) * this.diagonalSpeed;

    if (this.frameX != 1 && this.frameX != 2) {
      this.frameX = 1;
    }

    if (gameFrame % 15 === 0) {
      this.frameX === 1 ? (this.frameX = 2) : (this.frameX = 1);
    }

    this.direction = 1;
  }
  moveDownLeft() {
    this.frameY = 0;

    this.y += (this.y < canvas.height - this.radius + 10) * this.diagonalSpeed;
    this.x -= (this.x > 0) * this.diagonalSpeed;

    if (this.frameX != 1 && this.frameX != 2) {
      this.frameX = 1;
    }

    if (gameFrame % 15 === 0) {
      this.frameX === 1 ? (this.frameX = 2) : (this.frameX = 1);
    }

    this.direction = 3;
  }
  moveDownRight() {
    this.frameY = 0;

    this.y += (this.y < canvas.height - this.radius + 10) * this.diagonalSpeed;
    this.x += (this.x < canvas.width - this.radius + 10) * this.diagonalSpeed;

    if (this.frameX != 1 && this.frameX != 2) {
      this.frameX = 1;
    }

    if (gameFrame % 15 === 0) {
      this.frameX === 1 ? (this.frameX = 2) : (this.frameX = 1);
    }

    this.direction = 3;
  }
  notMoving() {
    this.direction === 2 ? (this.frameX = 2) : (this.frameX = 0);
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.closePath();

    let playerSprite = new Image();
    playerSprite.src = "./assets/images/characters/hero-spritesheet.png";
    ctx.drawImage(
      playerSprite,
      this.frameX * this.spriteWidth,
      this.frameY * this.spriteHeight,
      this.spriteWidth,
      this.spriteHeight,
      this.x - 40,
      this.y - 40,
      this.spriteWidth * 10,
      this.spriteHeight * 10
    );
  }
}

const player = new Player();

let slimesArray = [];
let slimeCount = 0;

class Slime {
  constructor() {
    this.x = (Math.random() * canvas.width) >> 0;
    this.y = canvas.height + 50;
    this.radius = 45;
    this.speed = (Math.random() * 4 + 1) >> 0;
    this.distance = Math.sqrt(this.dx ** 2 + this.dy ** 2);
    this.alive = true;
    this.frameX = 0;
    this.frameY = 0;
    this.spriteWidth = 8;
    this.spriteHeight = 8;
    this.redChance = Math.random();
    this.isRed = false;
    this.greenSlimeCount = slimeCount;
    this.dx = this.x - player.x;
    this.dy = this.y - player.y;
    this.isCounted = false;
    this.slide = 0;
  }
  update() {
    if (this.frameX === 0) {
      this.y -= this.speed;
      this.slide = 1;
    } else if (this.frameX === 1) {
      console.log(this.slide)
      this.y -= this.slide;
      if (this.slide > 0) {
        this.slide -= 0.02;
      }
    }
    this.dx = this.x - player.x;
    this.dy = this.y - player.y;
    this.distance = Math.sqrt(this.dx ** 2 + this.dy ** 2);
    if (gameFrame % (96 / (this.speed * 2)) === 0) {
      this.frameX === 0 ? (this.frameX = 1) : (this.frameX = 0);
    }
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.closePath();

    let slimeSprite = new Image();

    if (this.greenSlimeCount > this.redChance * 100 + 1) {
      this.isRed = true;
      this.greenSlimeCount = 0;
      slimeCount = 0;
      this.isCounted = true;
    } else if (!this.isRed && !this.isCounted) {
      slimeCount++;
      this.isCounted = true;
    }

    if (this.isRed) {
      slimeSprite.src = "./assets/images/characters/angryslime-spritesheet.png";
    } else {
      slimeSprite.src = "./assets/images/characters/slime-spritesheet.png";
    }

    ctx.drawImage(
      slimeSprite,
      this.frameX * this.spriteWidth,
      this.frameY * this.spriteHeight,
      this.spriteWidth,
      this.spriteHeight,
      this.x - 40,
      this.y - 50,
      this.spriteWidth * 10,
      this.spriteHeight * 10
    );
  }
}

function handleWindow() {
  let background = new Image();
  background.src = "./assets/images/scenes/background-image.png";
  ctx2.drawImage(background, 0, 0, canvas.width, canvas.height);
  ctx2.fillText("alpha v0.4", 690, 490);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "black";
  ctx.fillText("score: " + score + " HP: " + hp, 10, 45);
  canvasPosition = canvas.getBoundingClientRect();
  windowWidth = window.innerWidth;
  windowHeight = window.innerHeight;
}

function handlePlayer() {
  player.update();
  player.draw();
}

function handleSlimes() {
  // every 50 game frames, adds new slime
  if (gameFrame % 50 == 0) {
    slimesArray.push(new Slime());
  }
  // iterates thru slime array and updates the slimes every game frame
  for (i = 0; i < slimesArray.length; i++) {
    slimesArray[i].update();
    slimesArray[i].draw();
  }
  // checks if slimes reach end of the screen
  for (i = 0; i < slimesArray.length; i++) {
    if (slimesArray[i].y < 0 - slimesArray[i].radius * 2 + 30) {
      slimesArray.splice(i, 1);
      hp -= 1;
    }
    // checks for collision + if slime is alive
    if (slimesArray[i].distance < slimesArray[i].radius + player.radius) {
      console.log("Slime: OW!");
      score++;
      if (slimesArray[i].isRed) {
        hp += 1;
        slimesArray.splice(i, 1);
      } else {
        slimesArray.splice(i, 1);
      }
    }
  }
}

function gameOver() {
  handleWindow();
  player.frameX = 0;
  player.frameY = 0;
  player.x = canvas.width / 2;
  player.y = canvas.height / 2;
  player.draw();
  ctx.fillText("GAME OVER", canvas.width / 2 - 130, canvas.height / 2 + 80);
  ctx2.fillText(
    "PRESS SPACE TO TRY AGAIN",
    canvas.width / 2 - 140,
    canvas.height / 2 + 120
  );
  document.addEventListener("keydown", gameOverEvent);
}

function gameOverEvent(e) {
  if (e.key === " ") {
    document.removeEventListener("keydown", gameOverEvent);
    score = 0;
    hp = 3;
    gameFrame = 0;
    greenSlimeCount = 0;
    slimesArray = [];
    animate();
  }
}

function animate() {
  handleWindow();
  handlePlayer();
  handleSlimes();
  gameFrame++;
  hp > 0 ? requestAnimationFrame(animate) : gameOver();
}

window.addEventListener("load", gameMenu);

function gameMenu() {
  let title = new Image();
  title.src = "./assets/images/title-screen.png";
  title.onload = function () {
    ctx.drawImage(title, 0, 0, 800, 500);
  };
  document.addEventListener("keydown", gameMenuEvent);
}

function gameMenuEvent(e) {
  if (e.key === " ") {
    document.removeEventListener("keydown", gameMenuEvent);
    animate();
  }
}

const destroyerOfSlime = { Player, Slime }

module.exports = destroyerOfSlime;