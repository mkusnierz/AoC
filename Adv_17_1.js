var items = document.getElementsByTagName('pre')[0].innerText

// items = 'target area: x=20..30, y=-10..-5'

items = items.trim().split(" ")

var targetX = ""
var targetY = ""
items.forEach(item=>{
    if (item.startsWith("x=")) {
        targetX = item.split('=')[1].split('..').map(el=>Number.parseInt(el))
    } else if (item.startsWith('y=')) {
        targetY = item.split('=')[1].split('..').map(el=>Number.parseInt(el))
    }
}
)
console.log("TargetX: " + targetX)
console.log("TargetY: " + targetY)
var maxY = Math.max(...targetY.map(el=>Math.abs(el)))

var highestY = 0

for (var x = 0; x <= Math.max(...targetX); x++) {
    for (var y = Math.min(...targetY); y <= maxY; y++) {
        //         console.log("Check " + x + "," + y)
        var xVelocity = x
        var yVelocity = y

        var xPos = 0
        var yPos = 0
        var thisRunHighestY = 0
        while (true) {
            if (xPos > Math.max(...targetX)) {
                break
            }
            if (xVelocity <= 0 && (xPos < Math.min(...targetX) || xPos > Math.max(...targetX))) {
                break
            }
            if (yPos < Math.min(...targetY)) {
                break
            }

            xPos += xVelocity
            yPos += yVelocity
            if (yPos > thisRunHighestY) {
                thisRunHighestY = yPos
            }
            if (xVelocity != 0) {
                xVelocity--

            }
            yVelocity--
            //             console.log("xVelocity: " + xVelocity)
            //             console.log("yVelocity: " + yVelocity)
            //             console.log("xPos: " + xPos)
            //             console.log("yPos: " + yPos)

            if (xPos >= Math.min(...targetX) && xPos <= Math.max(...targetX) && yPos >= Math.min(...targetY) && yPos <= Math.max(...targetY)) {
                if (thisRunHighestY > highestY) {
                    highestY = thisRunHighestY
                    console.log("Found: " + x + ", " + y)
                    console.log("Found highest y " + highestY)
                }
                break
            }
        }
    }
}
