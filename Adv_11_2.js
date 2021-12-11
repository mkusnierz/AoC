var items = document.getElementsByTagName('pre')[0].innerText
// items = `5483143223
// 2745854711
// 5264556173
// 6141336146
// 6357385478
// 4167524645
// 2176841721
// 6882881134
// 4846848554
// 5283751526`

items = items.trim().split('\n')
items = items.map(it=>it.split('').map(i=>Number.parseInt(i)))

var flashCount = 0

flashAdjacent = (alreadyFlashed, x,y)=>{
    if (y >= 0 && y < items.length && x >= 0 && x < items[y].length && !alreadyFlashed.includes("" + x + y)) {
        items[x][y]++
        flash(alreadyFlashed, x, y)
    }
}

flash = (alreadyFlashed, x,y)=>{

    if (y >= 0 && y < items.length && x >= 0 && x < items[y].length && !alreadyFlashed.includes("" + x + y)) {
        if (items[x][y] > 9) {
            //             console.log("Flash: " + x + ", " + y + ": " + items[x][y])
            flashCount++
            alreadyFlashed.push("" + x + y)
            items[x][y] = 0

            flashAdjacent(alreadyFlashed, x - 1, y - 1)
            flashAdjacent(alreadyFlashed, x, y - 1)
            flashAdjacent(alreadyFlashed, x + 1, y - 1)

            flashAdjacent(alreadyFlashed, x - 1, y)
            flashAdjacent(alreadyFlashed, x + 1, y)

            flashAdjacent(alreadyFlashed, x - 1, y + 1)
            flashAdjacent(alreadyFlashed, x, y + 1)
            flashAdjacent(alreadyFlashed, x + 1, y + 1)

        }

    }
}

var steps = 200
var alreadyFlashed = []

for (var i = 1; alreadyFlashed.length < items.length * items[0].length; i++) {
    items = items.map(y=>y.map(x=>x += 1))

    alreadyFlashed = []

    for (var y = 0; y < items.length; y++) {
        for (var x = 0; x < items[y].length; x++) {
            flash(alreadyFlashed, x, y)
        }
    }
    if(alreadyFlashed.length == items.length * items[0].length) {
    console.log("Step " + i)

        console.log("All flashed")
    }
//     console.log(items.reduce((acc, el) => {return acc + el.map(x => "" + x) + '\n'}, ""))
    
}

