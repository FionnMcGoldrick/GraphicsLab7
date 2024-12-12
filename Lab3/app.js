// Select the canvas and set up the context
const canvas = document.getElementById("interactionCanvas");
const ctx = canvas.getContext("2d");

// Set canvas dimensions
canvas.width = 800;
canvas.height = 600;

// Variables to track mouse position
let mouseX = 0;
let mouseY = 0;

// Paddle class
class Paddle {
    constructor(x, y, width, height, color, keyUp, keyDown) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.speed = 5;
        this.keyUp = keyUp;
        this.keyDown = keyDown;
        this.keyPressed = {};
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    moveUsingKeys() {
        if (this.keyPressed[this.keyUp]) {
            this.y = Math.max(0, this.y - this.speed); // Move up
        }
        if (this.keyPressed[this.keyDown]) {
            this.y = Math.min(canvas.height - this.height, this.y + this.speed); // Move down
        }
    }

    moveUsingMouse(mouseY) {
        this.y = Math.min(canvas.height - this.height, Math.max(0, mouseY - this.height / 2));
    }
}

// Ball class
class Ball {
    constructor(x, y, radius, velocityX, velocityY, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.velocityX = velocityX;
        this.velocityY = velocityY;
        this.color = color;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }

    move() {
        this.x += this.velocityX;
        this.y += this.velocityY;

        // Bounce off top and bottom
        if (this.y - this.radius <= 0 || this.y + this.radius >= canvas.height) {
            this.velocityY = -this.velocityY;
        }

        // Bounce off paddles
        if (
            this.x - this.radius <= paddle1.x + paddle1.width &&
            this.y >= paddle1.y &&
            this.y <= paddle1.y + paddle1.height
        ) {
            this.velocityX = -this.velocityX;
        }

        if (
            this.x + this.radius >= paddle2.x &&
            this.y >= paddle2.y &&
            this.y <= paddle2.y + paddle2.height
        ) {
            this.velocityX = -this.velocityX;
        }

        // Bounce off left and right
        if (this.x - this.radius <= 0 || this.x + this.radius >= canvas.width) {
            this.velocityX = -this.velocityX;
        }
    }
}

// Create paddles
const paddle1 = new Paddle(50, canvas.height / 2 - 50, 20, 100, "blue", "ArrowUp", "ArrowDown");
const paddle2 = new Paddle(canvas.width - 70, canvas.height / 2 - 50, 20, 100, "red", "KeyW", "KeyS");

// Ball variable
let ball = null;

// Event listeners for keyboard
document.addEventListener("keydown", (event) => {
    paddle1.keyPressed[event.code] = true;
    paddle2.keyPressed[event.code] = true;

    // Spawn ball on spacebar press
    if (event.code === "Space" && !ball) {
        ball = new Ball(canvas.width / 2, canvas.height / 2, 10, 4, 4, "green");
    }
});

document.addEventListener("keyup", (event) => {
    paddle1.keyPressed[event.code] = false;
    paddle2.keyPressed[event.code] = false;
});

// Event listener for mouse
canvas.addEventListener("mousemove", (event) => {
    const rect = canvas.getBoundingClientRect();
    mouseY = event.clientY - rect.top; // Adjust for canvas offset
    paddle1.moveUsingMouse(mouseY); // Control left paddle with mouse
});

// Animation loop
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas

    // Move and draw paddles
    paddle1.moveUsingKeys();
    paddle2.moveUsingKeys();
    paddle1.draw();
    paddle2.draw();

    // Move and draw the ball if it exists
    if (ball) {
        ball.move();
        ball.draw();
    }

    requestAnimationFrame(animate); // Recursive animation
}

// Start animation
animate();
