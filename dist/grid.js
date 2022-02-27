var grid = function(p) {
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
            p.circle(this.x, this.y, this.r * 2)
        }
    
        onCircle(deg) {
            let rad = p.radians(deg)
            let vec = p.createVector(this.x + p.cos(rad)*this.r, this.y - p.sin(rad)*this.r)
            return vec
        }
    }

    class smallCircle {
        constructor(parent, start, goal, r) {
            this.parent = parent
            this.goal = goal
            this.r = r
            this.currentDeg = start
        }
    
        display() {
            let vecPos = this.parent.onCircle(this.currentDeg)
            p.circle(vecPos.x, vecPos.y, this.r * 2)
        }

        approach() {
            let approachFactor = 0.025
            let stopThreshold = 0.01
            if (this.goal - this.currentDeg > stopThreshold) {
                this.currentDeg = this.currentDeg + p.abs(this.goal - this.currentDeg) * approachFactor
            } else if (this.goal - this.currentDeg < -stopThreshold) {
                this.currentDeg = this.currentDeg - p.abs(this.goal - this.currentDeg) * approachFactor
            }
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
            p.line(this.x1, this.y1, this.x2, this.y2)
        }
    }
    
    let colors = {
        main: "#d3d3d3",
        secondary: "#383232",
        secondary_light: "#aaaaaa"
    }

    p.setup = function() {
        width = p.windowWidth * 0.75
        height = p.windowHeight * 0.5
        c = p.createCanvas(width, height)

        //create the circles
        wireCircles = []
        let minRadius = 250
        let maxRadius = 450
        let startX = width*-0.1
        let endX = width*0.006
        
        wireCircles[0] = new Circle(startX, height/2, minRadius)
        wireCircles[1] = new Circle(endX, height/2, maxRadius)
        wireCircles[2] = new Circle(width*0.01, height/2, 550)
        wireCircles[3] = new Circle(width*0.2, height/2, 1100)
        wireCircles[4] = new Circle(width*0.195, height/2, 125)

        fillCircles = []
        fillCircles[0] = new smallCircle(wireCircles[4], 90, 0, 15)
        fillCircles[1] = new smallCircle(wireCircles[4], -90, -180, 15)
    }
    
    p.draw = function() {
        p.background(colors.main)

        //draw circles n stuff
        p.stroke(colors.secondary_light)
        p.strokeWeight(1)
        drawBackground()

        //draw box
        p.noFill()
        p.stroke(colors.secondary)
        p.strokeWeight(8)
        p.rect(0, 0, width, height)
    }

    function drawBackground() {
        p.noFill()
        for (let i = 0; i < wireCircles.length; i++) {
            wireCircles[i].display()
        }

        p.fill(colors.main)
        for (let i = 0; i < fillCircles.length; i++) {
            fillCircles[i].display()
            fillCircles[i].approach()
        }
    }
}

var p5_02 = new p5(grid)