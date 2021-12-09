var items = document.getElementsByTagName('pre')[0].innerText
// items = `2199943210
// 3987894921
// 9856789892
// 8767896789
// 9899965678`
items = items.trim().split('\n')
items = items.map(it=>it.split('').map(i=>Number.parseInt(i)))

var lowPoints = []

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
            lowPoints.push(items[i][j])
        }
        //         console.log(items[i][j])
        //         console.log(adjacentNumbers)
    }
}
var risk = lowPoints.map(point=>point + 1).reduce((acc,el)=>acc + el, 0)
console.log("Risk: " + risk)
