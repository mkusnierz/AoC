var items = document.getElementsByTagName('pre')[0].innerText

// items = `6,10
// 0,14
// 9,10
// 0,3
// 10,4
// 4,11
// 6,0
// 6,12
// 4,1
// 0,13
// 10,12
// 3,4
// 3,0
// 8,4
// 1,10
// 2,14
// 8,10
// 9,0

// fold along y=7
// fold along x=5`

items = items.trim().split('\n\n')

var folds = items[1].split('\n')
items = items[0].split('\n')

var paper = []
var maxX = 0
var maxY = 0
items.forEach(item=>{
    var x = parseInt(item.split(',')[0])
    var y = parseInt(item.split(',')[1])

    if (x > maxX) {
        maxX = x
    }
    if (y > maxY) {
        maxY = y
    }
    if (!paper[y]) {
        paper[y] = []
    }
    paper[y][x] = 1
}
)

for (var y = 0; y <= maxY; y++) {
    for (var x = 0; x <= maxX; x++) {
        if (!paper[y]) {
            paper[y] = []
        }
        if (!paper[y][x]) {
            paper[y][x] = 0
        }
    }
}

printPaper = ()=>{
    paper.forEach(line=>{
        var l = ""
        for (var x = 0; x < line.length; x++) {
            l += line[x] ? "#" : "."
        }
        console.log(l)
    }
    )
    console.log("")
}

folds.forEach(fold=>{
    if (fold.includes('y')) {
        var val = parseInt(fold.split('=')[1])
        console.log("Folding y " + val)

        var toFold = paper.slice(val + 1).reverse()

        for (var y = 0; y < val; y++) {
            for (var x = 0; x < paper[y].length; x++) {
                if (toFold[y][x]) {
                    paper[y][x] = toFold[y][x]
                }
            }
        }
        paper = paper.slice(0, val)
    } else {
        var val = parseInt(fold.split('=')[1])
        console.log("Folding x " + val)
        for (var y = 0; y < paper.length; y++) {
            var toFold = paper[y].slice(val + 1).reverse()
            if (toFold.length != val) {
                toFold.unshift(0)
            }
            for (var x = 0; x < val; x++) {
                if (toFold[x]) {
                    paper[y][x] = toFold[x]
                }
            }
            paper[y] = paper[y].slice(0, val)
        }
    }
    //     printPaper()
}
)

var dotsCount = 0
paper.forEach(line=>{
    dotsCount += line.filter(l=>l == 1).length
}
)

console.log("Dots count " + dotsCount)
printPaper()
