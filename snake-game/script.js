const CELL_SIZE = 20;
// 1. board game
const CANVAS_SIZE = 600;
const REDRAW_INTERVAL = 50;
const WIDTH = CANVAS_SIZE / CELL_SIZE;
const HEIGHT = CANVAS_SIZE / CELL_SIZE;
const DIRECTION = {
  LEFT: 0,
  RIGHT: 1,
  UP: 2,
  DOWN: 3,
};
let MOVE_INTERVAL = 120;
const SPACE_LOVE = 22;
const SPACE_OBSTACLE = 22;

function initPosition() {
  return {
    x: Math.floor(Math.random() * WIDTH),
    y: Math.floor(Math.random() * HEIGHT),
  };
}

function initHeadAndBody() {
  let head = initPosition();
  let body = [{ x: head.x, y: head.y }];
  return {
    head: head,
    body: body,
  };
}

function initDirection() {
  return Math.floor(Math.random() * 4);
}

function initSnake(color) {
  return {
    color: color,
    ...initHeadAndBody(),
    direction: initDirection(),
    score: 0,
    level: 1,
  };
}
let snake1 = initSnake("#DBDBDB");

let apple1 = {
  position: initPosition(),
};

let apple2 = {
  position: initPosition(),
};

let apple3 = {
  position: initPosition(),
};

let apple4 = {
    position: initPosition(),
};

let apple5 = {
    position: initPosition(),
};

let applePrime = {
  position: initPosition(),
}


// the default is 3
let totalLove = 3;

function drawCell(ctx, x, y, snakeId) {
  let img = document.getElementById(snakeId);
  ctx.drawImage(img, x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
}

function drawSnake(ctx, snake) {
  switch (snake.direction) {
    case DIRECTION.LEFT:
      drawCell(ctx, snake.head.x, snake.head.y, "snake-head-left");
      break;
    case DIRECTION.RIGHT:
      drawCell(ctx, snake.head.x, snake.head.y, "snake-head-right");
      break;
    case DIRECTION.DOWN:
      drawCell(ctx, snake.head.x, snake.head.y, "snake-head-down");
      break;
    case DIRECTION.UP:
      drawCell(ctx, snake.head.x, snake.head.y, "snake-head-top");
      break;
  }

  for (let i = 1; i < snake.body.length; i++) {
    let part = snake.body[i];
    drawCell(ctx, part.x, part.y, "snake-body");
  }
}

function drawApple(ctx, apple) {
  let img = document.getElementById("apple");

  ctx.drawImage(img, apple.position.x * CELL_SIZE, apple.position.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
}

function drawWall(ctx, wall) {
  let wl = document.getElementById("wall");
  ctx.drawImage(wl, wall.position.x, wall.position.y , 300, 20);
}

function drawScore(snake) {
  let scoreCanvas;
  if (snake.color == snake1.color) {
    scoreCanvas = document.getElementById("score1Board");
  }

  let scoreCtx = scoreCanvas.getContext("2d");

  scoreCtx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  scoreCtx.font = "30px Arial";
  // scoreCtx.fillStyle = snake.color;
  scoreCtx.fillText(snake.score, 10, scoreCanvas.scrollHeight / 2);
}

function drawLove(ctx,totalLove) {
  let img = document.getElementById("love");
  let space = CELL_SIZE;
  for (let i=0; i<totalLove; i++) {
    ctx.drawImage(img, space, CELL_SIZE, CELL_SIZE, CELL_SIZE);
    space = space + SPACE_LOVE;
  }
}

function drawLevel(level) {
  if (level <= 5) {
    let lvl = document.getElementById("level");
    lvl.textContent = `Level ${level}`
  }
}



function drawObstacle(ctx, level) {
  ctx.color = 'black';

  switch (level) {
    case 2:
      for (let i=5; i<=25; i++) {
        for (let j=15; j<=15; j++) {
          ctx.fillRect(i * CELL_SIZE, CELL_SIZE*j, CELL_SIZE, CELL_SIZE);
        }
      }
    
      if (snake1.head.x >= 5 && snake1.head.x <= 25 &&
        snake1.head.y >= 15 && snake1.head.y <= 15) {
          dead();
      }
      break;
    case 3:
      for (let i=5; i<=25; i++) {
        for (let j=10; j<=10; j++) {
          ctx.fillRect(i * CELL_SIZE, CELL_SIZE*j, CELL_SIZE, CELL_SIZE);
        }
      }
    
      if (snake1.head.x >= 5 && snake1.head.x <= 25 &&
        snake1.head.y >= 10 && snake1.head.y <= 10) {
          dead();
      }
    
      for (let i=5; i<=25; i++) {
        for (let j=20; j<=20; j++) {
          ctx.fillRect(i * CELL_SIZE, CELL_SIZE*j, CELL_SIZE, CELL_SIZE);
        }
      }
    
      if (snake1.head.x >= 5 && snake1.head.x <= 25 &&
        snake1.head.y >= 20 && snake1.head.y <= 20) {
          dead();
      }
      break;
    case 4:
      for (let i=5; i<=25; i++) {
        for (let j=10; j<=10; j++) {
          ctx.fillRect(i * CELL_SIZE, CELL_SIZE*j, CELL_SIZE, CELL_SIZE);
        }
      }
    
      if (snake1.head.x >= 5 && snake1.head.x <= 25 &&
        snake1.head.y >= 10 && snake1.head.y <= 10) {
          dead();
      }
    
      for (let i=5; i<=25; i++) {
        for (let j=15; j<=15; j++) {
          ctx.fillRect(i * CELL_SIZE, CELL_SIZE*j, CELL_SIZE, CELL_SIZE);
        }
      }
    
      if (snake1.head.x >= 5 && snake1.head.x <= 25 &&
        snake1.head.y >= 15 && snake1.head.y <= 15) {
          dead();
      }
    
      for (let i=5; i<=25; i++) {
        for (let j=20; j<=20; j++) {
          ctx.fillRect(i * CELL_SIZE, CELL_SIZE*j, CELL_SIZE, CELL_SIZE);
        }
      }
    
      if (snake1.head.x >= 5 && snake1.head.x <= 25 &&
        snake1.head.y >= 20 && snake1.head.y <= 20) {
          dead();
      }
      break;
    case 5:
      ctx.fillRect(WIDTH*16, HEIGHT*5 , 20, 300);
      ctx.fillRect(WIDTH*3, HEIGHT*5 , 20, 300);

      if (snake1.head.x >= 16 && snake1.head.x <= WIDTH*16 &&
        snake1.head.y >= 20 && snake1.head.y <= 20) {

      }
      break;
  }
}

function drawSpeed(level) {
  let speed = document.getElementById("speed");
  let showSpeed = '';
  switch (level) {
    case 1:
      showSpeed = 120;
      MOVE_INTERVAL = 120;
      break;
    case 2:
      showSpeed = 140;
      MOVE_INTERVAL = 100;
      break;
    case 3:
      showSpeed = 160;
      MOVE_INTERVAL = 80;
      break;
    case 4:
      showSpeed = 180;
      MOVE_INTERVAL = 60;
      break;
    case 5:
      showSpeed = 200;
      MOVE_INTERVAL = 40;
      break;
    default:
      showSpeed = 200;
      MOVE_INTERVAL = 40;
      break;
  }

  speed.textContent = `Speed: ${showSpeed} .ms`;
}

function dead() {
  let lastScore = snake1.score;
  let lastLevel = snake1.level;

  if (totalLove <= 0) {
    alert("Game over, play again?");
    snake1 = initSnake("#DBDBDB");
    snake1.score = 0;
    snake1.level = 1;
    totalLove = 3;
    MOVE_INTERVAL = 120;
    initGame();
    drawLevel(snake1.level);
  } else {
    snake1 = initSnake("#DBDBDB");
    snake1.score = lastScore;
    snake1.level = lastLevel;
    totalLove -= 1;
    move(snake1);
  } 
}

function clearScreen(ctx) {
  ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
}

function draw() {
  setInterval(function () {
    let snakeCanvas = document.getElementById("snakeBoard");
    let ctx = snakeCanvas.getContext("2d");

    clearScreen(ctx);

    // snake 1
    drawSnake(ctx, snake1);

    // apple 1
    drawApple(ctx, apple1);

    // apple 2
    drawApple(ctx, apple2);

    // apple 3
    drawApple(ctx, apple3);

    // apple 4
    drawApple(ctx, apple4);

    // apple 5
    drawApple(ctx, apple5);

    // love
    drawLove(ctx, totalLove);

    // score
    drawScore(snake1);

    // // obstacle
    drawObstacle(ctx, snake1.level);

    // drawSpeed
    drawSpeed(snake1.level);

  }, REDRAW_INTERVAL);
}

function teleport(snake) {
  if (snake.head.x < 0) {
    snake.head.x = CANVAS_SIZE / CELL_SIZE - 1;
  }
  if (snake.head.x >= WIDTH) {
    snake.head.x = 0;
  }
  if (snake.head.y < 0) {
    snake.head.y = CANVAS_SIZE / CELL_SIZE - 1;
  }
  if (snake.head.y >= HEIGHT) {
    snake.head.y = 0;
  }
}

function eat(snake, apple) {
  if (snake.head.x == apple.position.x && snake.head.y == apple.position.y) {
    apple.position = initPosition();
    snake.score++;
    snake.body.push({ x: snake.head.x, y: snake.head.y });
    
    if (snake.score !== 0 && snake.score % 5 === 0 && snake.level <= 5) {
      alert(`Level ${snake.level} Complete!`);
      snake.level++
      drawLevel(snake.level);
    }
  }
}
function eats(snake) {
  eat(snake, apple1);
  eat(snake, apple2);
  eat(snake, apple3);
  eat(snake, apple4);
  eat(snake, apple5);
}

function moveLeft(snake) {
  snake.head.x--;
  teleport(snake);
  eats(snake);
}

function moveRight(snake) {
  snake.head.x++;
  teleport(snake);
  eats(snake);
}

function moveDown(snake) {
  snake.head.y++;
  teleport(snake);
  eats(snake);
}

function moveUp(snake) {
  snake.head.y--;
  teleport(snake);
  eats(snake);
}

function checkCollision(snakes) {
  let isCollide = false;

  for (let i = 0; i < snakes.length; i++) {
    for (let j = 0; j < snakes.length; j++) {
      for (let k = 1; k < snakes[j].body.length; k++) {
        if (
          snakes[i].head.x == snakes[j].body[k].x && snakes[i].head.y == snakes[j].body[k].y
        ) {
          isCollide = true;
        }
      }
    }
  }

  if (isCollide) {
    dead();
  }

  return isCollide;
}

function move(snake) {
  switch (snake.direction) {
    case DIRECTION.LEFT:
      moveLeft(snake);
      break;
    case DIRECTION.RIGHT:
      moveRight(snake);
      break;
    case DIRECTION.DOWN:
      moveDown(snake);
      break;
    case DIRECTION.UP:
      moveUp(snake);
      break;
  }
  moveBody(snake);
  if (!checkCollision([snake1])) {
    setTimeout(function () {
      move(snake);
    }, MOVE_INTERVAL);
  } else {
    initGame();
  }
}

function moveBody(snake) {
  snake.body.unshift({ x: snake.head.x, y: snake.head.y });
  snake.body.pop();
}

function turn(snake, direction) {
  const oppositeDirections = {
    [DIRECTION.LEFT]: DIRECTION.RIGHT,
    [DIRECTION.RIGHT]: DIRECTION.LEFT,
    [DIRECTION.DOWN]: DIRECTION.UP,
    [DIRECTION.UP]: DIRECTION.DOWN,
  };

  if (direction !== oppositeDirections[snake.direction]) {
    snake.direction = direction;
  }
}

document.addEventListener("keydown", function (event) {
  if (event.key === "ArrowLeft") {
    turn(snake1, DIRECTION.LEFT);
  } else if (event.key === "ArrowRight") {
    turn(snake1, DIRECTION.RIGHT);
  } else if (event.key === "ArrowUp") {
    turn(snake1, DIRECTION.UP);
  } else if (event.key === "ArrowDown") {
    turn(snake1, DIRECTION.DOWN);
  }
});

function initGame() {
  move(snake1);
}
initGame();
