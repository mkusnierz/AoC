var items = document.getElementsByTagName('pre')[0].innerText.trim().split('\n')

var numbers = items[0].split(',')

var boards = []
var boardIdx = -1;
for (var i = 1; i < items.length; i++) {

    if (items[i] == '') {

        boardIdx++
        boards[boardIdx] = []
    } else {
        boards[boardIdx].push(items[i].trim().replaceAll('  ', ' ').split(' '))
    }

}
var finalBoardIdx = -1
var finalNumberIdx = -1

for (var i = 0; i < numbers.length; i++) {

    for (boardIdx = 0; boardIdx < boards.length; boardIdx++) {
        var board = boards[boardIdx]

        for (var rowIdx = 0; rowIdx < board.length; rowIdx++) {
            var row = board[rowIdx]
            for (var column = 0; column < row.length; column++) {
                if (row[column] == numbers[i]) {
                    boards[boardIdx][rowIdx][column] = '-1'
                }
            }
            if (row.filter(vl=>vl != '-1').length == 0 || board.map(el=>el[column]).filter(vl=>vl != '-1').length == 0) {
                console.log("Found row: " + rowIdx + " in board " + boardIdx + " for number " + numbers[i])
                finalBoardIdx = boardIdx
                finalNumberIdx = i
                i = numbers.length
                break
            }
        }
    }
}

boards
var fBoard = boards[finalBoardIdx]
console.log(fBoard)
var result = fBoard.reduce((acc,el)=>{
    var sum = 0
    el.map(e => Number.parseInt(e)).filter(e => e > 0).forEach(e=>sum += e)
    console.log(sum)
    return acc + sum
}
, 0)
console.log("result: " + (result * Number.parseInt(numbers[finalNumberIdx])))
