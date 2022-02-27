class Circle {
    constructor(x, y, r) {
        this.x = x
        this.y = y
        this.r = r
    }

    set(x, y, r) {
        this.x = x
        this.y = y
        this.r = r
    }

    display() {
        circle(this.x, this.y, this.r * 2)
    }

    onCircle(deg) {
        let rad = radians(deg)
        let vec = createVector(this.x + cos(rad)*this.r, this.y - sin(rad)*this.r)
        return vec
    }
}

class Line {
    constructor(x1, y1, x2, y2) {
        this.x1 = x1
        this.y1 = y1
        this.x2 = x2
        this.y2 = y2
    }

    set(x1, y1, x2, y2) {
        this.x1 = x1
        this.y1 = y1
        this.x2 = x2
        this.y2 = y2
    }

    display() {
        line(this.x1, this.y1, this.x2, this.y2)
    }
}

let colors = {
    main: "#d3d3d3",
    secondary: "#000000"
}

function setup() {
    width = windowWidth
    height = windowHeight
    c = createCanvas(windowWidth, windowHeight)

    //create the circles
    backgroundCircles = []
    let minRadius = 300
    let maxRadius = 1000
    let startX = width*0.05
    let endX = width*0.4
    let numRings = 4
    for (let i = 0; i <= numRings; i++) {
        backgroundCircles[i] = new Circle()
        backgroundCircles[i].set(
            lerp(startX, endX, 1 - i/numRings),
            height/2,
            lerp(minRadius, maxRadius, 1 - i/numRings)
        )
    }

    //create the lines
    backgroundLines = []
    backgroundLines[0] = new Line(startX - 50, height/2, startX + 50, height/2)
}

function draw() {
    drawBackground()
}

function drawBackground() {
    //draw the circles
    background(colors.main)
    fill(colors.main)
    stroke(colors.secondary)
    strokeWeight(1)
    for (let i = 0; i < backgroundCircles.length; i++) {
        backgroundCircles[i].display()
    }

    for (let i = 0; i < backgroundLines.length; i++) {
        backgroundLines[i].display()
    }

    //draw the circles on the circles
    circle(backgroundCircles[4].x, backgroundCircles[4].y, 50)
    let vecPos = backgroundCircles[3].onCircle(45)
    circle(vecPos.x, vecPos.y, 50)

    //draw the lines
    
    
}