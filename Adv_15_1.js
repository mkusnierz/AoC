var items = document.getElementsByTagName('pre')[0].innerText

// items = `
// 1163751742
// 1381373672
// 2136511328
// 3694931569
// 7463417111
// 1319128137
// 1359912421
// 3125421639
// 1293138521
// 2311944581`

items = items.trim().split('\n')
items = items.map(it=>it.split('').map(i=>Number.parseInt(i)))


var distanceMatrix = []
var distanceSet = [];
var adjacentPoints = [[-1, 0], [0, 1], [1, 0], [0, -1]]

for (var i = 0; i < items.length; i++) {
    distanceMatrix[i] = []
    for (var j = 0; j < items[0].length; j++)
        distanceMatrix[i][j] = Number.MAX_VALUE
}
distanceMatrix[0][0] = 0

distanceSet.push([0, 0, 0])

while (distanceSet.length != 0) {
    var currentMinimum = distanceSet.shift()
    var minX = currentMinimum[0]
    var minY = currentMinimum[1]

    for (var point of adjacentPoints) {
        var x = currentMinimum[0] + point[0]
        var y = currentMinimum[1] + point[1]

        if (x < 0 || x >= items.length || y < 0 || y >= items[0].length)
            continue

        if (distanceMatrix[minX][minY] + items[x][y] < distanceMatrix[x][y]) {
            distanceMatrix[x][y] = distanceMatrix[minX][minY] + items[x][y]
            distanceSet.push([x, y, distanceMatrix[x][y]])
        }
    }
    distanceSet.sort((a,b)=>a[2] - b[2])
}
console.log(distanceMatrix[items[0].length - 1][items.length - 1])