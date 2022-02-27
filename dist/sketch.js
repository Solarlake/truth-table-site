var sketch = function(p) {
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
        constructor(parent, goal, r) {
            this.parent = parent
            this.goal = goal
            this.r = r
            this.currentDeg = p.random(-135, -90)
        }
    
        display() {
            let vecPos = this.parent.onCircle(this.currentDeg)
            p.circle(vecPos.x, vecPos.y, this.r * 2)
        }

        approach() {
            let approachFactor = p.random(0.025, 0.05) //0.05
            let stopThreshold = 0.001
            if (this.goal - this.currentDeg > stopThreshold) {
                this.currentDeg = this.currentDeg + p.abs(this.goal - this.currentDeg) * approachFactor
            } else if (this.goal - this.currentDeg < -stopThreshold) {
                this.currentDeg = this.currentDeg - p.abs(this.goal - this.currentDeg) * approachFactor
            }
        }

        updateGoal() {
            this.goal += (5 * 1/60)
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
        white: "#ffffff"
    }
    
    p.setup = function() {
        width = p.windowWidth
        height = p.windowHeight
        c = p.createCanvas(width, height)
    
        //create the circles
        backgroundCircles = []
        let minRadius = 250
        let maxRadius = 1000
        let startX = width*0.05
        let endX = width*0.4
        let numRings = 4
        for (let i = 0; i <= numRings; i++) {
            backgroundCircles[i] = new Circle()
            backgroundCircles[i].set(
                p.lerp(startX, endX, 1 - i/numRings),
                height/2,
                p.lerp(minRadius, maxRadius, 1 - i/numRings)
            )
        }
    
        //create the lines
        backgroundLines = []
        backgroundLines[0] = new Line(0, height/2, startX + 150, height/2)

        //create small circles
        smallCircles = []
        degs = [65, 35, 10, 80, 60, 70, 20, 50, 30, -65, -35, -10, -80, -60, -70, -20, -50, -30]
        for (let i = 0; i < degs.length; i++) {
            smallCircles[i] = new smallCircle(
                backgroundCircles[p.round(p.random(0, backgroundCircles.length - 1))],
                p.random(-180, 180),
                p.random(10, 30) //15
            )
        }

        img = p.loadImage("assets/background.png")
    }
    
    p.draw = function() {
        drawBackground()
    }
    
    function drawBackground() {
        //draw the circles
        p.background(colors.white)
        p.noFill()
        p.stroke(colors.secondary)
        p.strokeWeight(1)
        for (let i = 0; i < backgroundCircles.length; i++) {
            backgroundCircles[i].display()
        }
    
        //draw the lines
        for (let i = 0; i < backgroundLines.length; i++) {
            backgroundLines[i].display()
        }

        p.fill(colors.white)
        //draw the circles on the circles
        p.circle(backgroundCircles[4].x, backgroundCircles[4].y, 25)
        
        for (let i = 0; i < smallCircles.length; i++) {
            smallCircles[i].display()
            smallCircles[i].approach()
            smallCircles[i].updateGoal()
        }
        
        p.strokeWeight(2)
        p.fill(colors.secondary)
        p.rect(width*0.869, height*0.76, 10, 20)
        p.noFill()
        p.rect(width*0.858, height*0.76, 20, 20)
        p.fill(colors.secondary)
        p.rect(width*0.837, height*0.76, 40, 20)
        p.noFill()
        p.rect(width*0.796, height*0.76, 80, 20)
        p.fill(colors.secondary)
        p.rect(width*0.712, height*0.76, 160, 20)
        p.strokeWeight(1)

        p.blendMode(p.MULTIPLY)
        p.image(img, 0, 0)
        p.blendMode(p.BLEND)

        
    }
}

var p5_01 = new p5(sketch)