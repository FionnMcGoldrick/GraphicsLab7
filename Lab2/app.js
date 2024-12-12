// Select the canvas and set up the context
const canvas = document.getElementById("animationCanvas");
const ctx = canvas.getContext("2d");

// Set canvas dimensions
canvas.width = 500;
canvas.height = 400;

// Ball class
class Ball {
    constructor(x, y, radius, velocityX, velocityY, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.velocityX = velocityX;
        this.velocityY = velocityY;
        this.color = color;
        this.rotation = 0; // Rotation angle for advanced exercise
    }

    //draw the ball
    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.beginPath();
        ctx.arc(0, 0, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.restore();
    }

    //move the ball
    move() {
        this.x += this.velocityX;
        this.y += this.velocityY;

        // Bounce off walls
        if (this.x - this.radius <= 0 || this.x + this.radius >= canvas.width) {
            this.velocityX = -this.velocityX;
            this.reverseRotation();
        }

        // Bounce off top and bottom
        if (this.y - this.radius <= 0 || this.y + this.radius >= canvas.height) {
            this.velocityY = -this.velocityY;
            this.reverseRotation();
        }
    }

    // Reverse the rotation of the ball
    reverseRotation() {
        this.rotation = -this.rotation;
    }
}

// Create the ball instance
const ball = new Ball(100, 100, 20, 2, 2, "blue");

// Animation loop
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas
    ball.move(); // Update ball position
    ball.draw(); // Draw ball
    requestAnimationFrame(animate); // Recursive animation
}

// Start animation
animate();
