var snake;
var gameScale = 20;
var food;

function setup() {
    createCanvas(400, 400);
    frameRate(10);
    snake = new Snake();
    food = new Food();
    food.pickLocation();
}

function draw() {
    background(100);

    if (snake.eat(food.location)) {
        food.pickLocation();
    }
    snake.isDead();

    snake.draw();
    snake.move();

    food.draw();
}

function keyPressed() {
    if (keyCode === UP_ARROW) {
        snake.setDirection(0, -1);
    } else if (keyCode === DOWN_ARROW) {
        snake.setDirection(0, 1);
    } else if (keyCode === RIGHT_ARROW) {
        snake.setDirection(1, 0);
    } else if (keyCode === LEFT_ARROW) {
        snake.setDirection(-1, 0);
    }
}

function Snake() {
    this.location = new createVector(0, 0);
    this.xspeed = 1;
    this.yspeed = 0;
    this.total = 0;
    this.tail = [];

    this.draw = function() {
        fill(255, 255, 255);
        for (var i = 0; i < this.tail.length; i++) {
            rect(this.tail[i].x, this.tail[i].y, gameScale, gameScale);
        }

        rect(this.location.x, this.location.y, gameScale, gameScale);
    }

    this.move = function() {
        if (this.total === this.tail.length) {
            for (var i = 0; i < this.tail.length - 1; i++) {
                this.tail[i] = this.tail[i + 1];
            }
        }
        this.tail[this.total - 1] = createVector(this.location.x, this.location.y);

        this.location.x = this.location.x + this.xspeed * gameScale;
        this.location.y = this.location.y + this.yspeed * gameScale;

        this.location.x = constrain(this.location.x, 0, width - gameScale);
        this.location.y = constrain(this.location.y, 0, height - gameScale);
    }

    this.eat = function(food) {
        var d = dist(this.location.x, this.location.y, food.x, food.y);
        if (d < 1) {
            this.total++;
            return true;
        }
        return false;
    }

    this.isDead = function() {
        for (var i = 0; i < this.tail.length; i++) {
            var pos = this.tail[i];
            var d = dist(this.location.x, this.location.y, pos.x, pos.y);
            if (d < 1) {
                console.log('starting over');
                this.total = 0;
                this.tail = [];
            }
        }
    }

    this.setDirection = function(x, y) {
        this.xspeed = x;
        this.yspeed = y;
    }
}

function Food() {
    this.location = new createVector(0, 0);

    this.pickLocation = function() {
        var cols = floor(width / gameScale);
        var rows = floor(height / gameScale);
        this.location.x = floor(random(cols));
        this.location.y = floor(random(rows));
        this.location.mult(gameScale);
    }

    this.draw = function() {
        fill(255, 0, 100);
        rect(this.location.x, this.location.y, gameScale, gameScale);
    }
}
