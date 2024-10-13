// board
let board;
let boardWidth = 1152;
let boardHeight = 648;
let context;

// ninja
let ninjaWidth = 40;
let ninjaHeight = 50;
let ninjaX = boardWidth / 8;
let ninjaY = (boardHeight / 4) * 2.65;
let ninjaImg;
let ninjaMovingImg1, ninjaMovingImg2;
let ninjaLImg;
let ninjaMovingLImg1, ninjaMovingLImg2;

let ninja = {
    x: ninjaX,
    y: ninjaY,
    width: ninjaWidth,
    height: ninjaHeight
};

// Star properties
let starArray = [];
let starWidth = 32;
let starHeight = 32;
let maxStars = 40;
let starImg;

// game physics
let velocityL = -10;
let velocityR = 10;

let ninjaMovingRight = false;
let ninjaMovingLeft = false;
let frameCounter = 0;
let ninjaFacingRight = true;
let gameOver = false;
let score = 0;
let scoreInterval;

// Load images
window.onload = function () {
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext("2d");

    // Load ninja and star images
    ninjaImg = new Image();
    ninjaImg.src = "./stand ninja.png";
    ninjaLImg = new Image();
    ninjaLImg.src = "./stand ninjaL.png";
    ninjaMovingImg1 = new Image();
    ninjaMovingImg1.src = "./run ninja.png";
    ninjaMovingImg2 = new Image();
    ninjaMovingImg2.src = "./run ninja2.png";
    ninjaMovingLImg1 = new Image();
    ninjaMovingLImg1.src = "./run ninjaL.png";
    ninjaMovingLImg2 = new Image();
    ninjaMovingLImg2.src = "./run ninja2L.png";
    starImg = new Image();
    starImg.src = "./star.png";

    ninjaImg.onload = function () {
        drawNinja(ninjaImg);
    };

    // Add event listeners for keyboard and touch controls
    document.addEventListener("keydown", moveNinja);
    document.addEventListener("keyup", stopNinja);

    // Add touch events for the left and right buttons
    document.getElementById("leftButton").addEventListener("touchstart", () => ninjaMovingLeft = true);
    document.getElementById("leftButton").addEventListener("touchend", () => ninjaMovingLeft = false);

    document.getElementById("rightButton").addEventListener("touchstart", () => ninjaMovingRight = true);
    document.getElementById("rightButton").addEventListener("touchend", () => ninjaMovingRight = false);

    // Generate stars
    generateStars();

    // Start score counter
    scoreInterval = setInterval(() => {
        if (!gameOver) {
            score += 10;
        }
    }, 1000);

    // Start game loop
    requestAnimationFrame(updateGame);

    // Restart button event listener
    const restartButton = document.getElementById("restartButton");
    restartButton.addEventListener("click", restartGame);
};

// Function to generate stars
function generateStars() {
    for (let i = 0; i < maxStars; i++) {
        let star = {
            x: Math.random() * boardWidth,
            y: Math.random() * -boardHeight,
            speed: Math.random() * 3 + 2
        };
        starArray.push(star);
    }
}

// Function to draw ninja
function drawNinja(image) {
    context.drawImage(image, ninja.x, ninja.y, ninja.width, ninja.height);
}

// Function to draw stars
function drawStars() {
    for (let i = 0; i < starArray.length; i++) {
        let star = starArray[i];
        context.drawImage(starImg, star.x, star.y, starWidth, starHeight);
        star.y += star.speed;

        let starCenterX = star.x + starWidth / 2;
        let starCenterY = star.y + starHeight / 2;

        if (
            starCenterY > ninja.y &&
            starCenterY < ninja.y + ninja.height &&
            starCenterX > ninja.x &&
            starCenterX < ninja.x + ninja.width
        ) {
            gameOver = true;
        }

        if (star.y > boardHeight) {
            star.y = Math.random() * -boardHeight;
            star.x = Math.random() * boardWidth;
            star.speed = Math.random() * 3 + 2;
        }
    }
}

// Move ninja when key is pressed
function moveNinja(e) {
    if (e.code === "KeyD") {
        ninjaMovingRight = true;
        ninjaFacingRight = true;
    } else if (e.code === "KeyA") {
        ninjaMovingLeft = true;
        ninjaFacingRight = false;
    }
}

// Stop ninja movement when key is released
function stopNinja(e) {
    if (e.code === "KeyD") {
        ninjaMovingRight = false;
    } else if (e.code === "KeyA") {
        ninjaMovingLeft = false;
    }
}

// Update game state and redraw everything
function updateGame() {
    context.clearRect(0, 0, boardWidth, boardHeight);

    frameCounter++;

    if (ninjaMovingRight && ninja.x + ninja.width < boardWidth) {
        ninja.x += velocityR;
        if (frameCounter % 10 < 5) {
            drawNinja(ninjaMovingImg1);
        } else {
            drawNinja(ninjaMovingImg2);
        }
    } else if (ninjaMovingLeft && ninja.x > 0) {
        ninja.x += velocityL;
        if (frameCounter % 10 < 5) {
            drawNinja(ninjaMovingLImg1);
        } else {
            drawNinja(ninjaMovingLImg2);
        }
    } else {
        if (!ninjaMovingRight && !ninjaMovingLeft) {
            if (ninjaFacingRight) {
                drawNinja(ninjaImg);
            } else {
                drawNinja(ninjaLImg);
            }
        }
    }

    drawStars();

    context.fillStyle = "black";
    context.font = "24px Arial";
    context.fillText("Score: " + score, 10, 30);

    if (gameOver) {
        clearInterval(scoreInterval);
        context.fillStyle = "red";
        context.font = "48px Arial";
        context.fillText("Game Over!", boardWidth / 2 - 120, boardHeight / 2 - 50);
        context.font = "24px Arial";
        context.fillText("Final Score: " + score, boardWidth / 2 - 80, boardHeight / 2 + 10);

        const restartButton = document.getElementById("restartButton");
        restartButton.style.display = "block";
        return;
    }

    requestAnimationFrame(updateGame);
}

// Function to restart the game
function restartGame() {
    ninja.x = ninjaX;
    ninja.y = ninjaY;
    score = 0;
    gameOver = false;
    starArray = [];
    generateStars();
    scoreInterval = setInterval(() => {
        if (!gameOver) {
            score += 10;
        }
    }, 1000);

    const restartButton = document.getElementById("restartButton");
    restartButton.style.display = "none";
    requestAnimationFrame(updateGame);
}
