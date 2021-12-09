var items = document.getElementsByTagName('pre')[0].innerText
// items = `2199943210
// 3987894921
// 9856789892
// 8767896789
// 9899965678`
items = items.trim().split('\n')
items = items.map(it=>it.split('').map(i=>Number.parseInt(i)))

var lowPointsCoord = []

for (var i = 0; i < items.length; i++) {
    for (var j = 0; j < items[i].length; j++) {
        var adjacentNumbers = []

        if (i != 0) {
            adjacentNumbers.push(items[i - 1][j])
        }
        if (i < items.length - 1) {
            adjacentNumbers.push(items[i + 1][j])
        }
        if (j != 0) {
            adjacentNumbers.push(items[i][j - 1])

        }
        if (j < items[i].length - 1) {
            adjacentNumbers.push(items[i][j + 1])

        }
        if (items[i][j] < Math.min(...adjacentNumbers)) {
            lowPointsCoord.push([i, j])
        }
        //         console.log(items[i][j])
        //         console.log(adjacentNumbers)
    }
}
// console.log("lowPoints: " + lowPointsCoord)

countAdjacent = (size,processed,i,j)=>{
    var sz = 0
    if (!processed.includes("" + i + j) && i >= 0 && i < items.length && j >= 0 && j < items[i].length && items[i][j] < 9) {
        items[i][j] < 9 ? sz++ : 0
        processed.push("" + i + j)
        sz += countAdjacent(size, processed, i-1, j)
        sz += countAdjacent(size, processed, i+1, j)
        sz += countAdjacent(size, processed, i, j-1)
        sz += countAdjacent(size, processed, i, j+1)

    }
    return sz
}
var sizes = []
lowPointsCoord.forEach(coord=>{
    var i = coord[0]
    var j = coord[1]
    var size = countAdjacent(0, [], i, j)
//     console.log(coord)
//     console.log("Size: " + size)
    sizes.push(size)
}
)


var largestItems = []
for (var i = 0; i < 3; i++) {
    var largest = Math.max(...sizes)
    largestItems.push(largest)
    sizes.splice(sizes.indexOf(largest), 1)
}

console.log(largestItems.reduce((acc, el) => acc*el, 1))