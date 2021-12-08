var items = document.getElementsByTagName('pre')[0].innerText.trim().split('\n')

var numbers = items[0].split(',')

var boards = []
var boardIdx = -1;
for(var i = 1; i< items.length; i++) {

    if(items[i] == '') {

        boardIdx++
        boards[boardIdx] = []
    } else {
    boards[boardIdx].push(items[i].trim().replaceAll('  ', ' ').split(' '))    
    }
    
}
var finalNumberIdx = -1
for (var i = 0; i < numbers.length; i++) {


    for(boardIdx = 0; boardIdx < boards.length; boardIdx++) {
        var board = boards[boardIdx]

        for (var rowIdx = 0; rowIdx < board.length; rowIdx++) {
            var row = board[rowIdx]
            
            for (var column = 0; column < row.length; column++) {
                if (row[column] == numbers[i]) {
                    board[rowIdx][column] = '-1'
                    if(row.filter(vl => vl != '-1').length == 0 || board.map(el => el[column]).filter(vl => vl != '-1').length == 0) {
                        if(boards.filter(vl => vl.length > 0).length > 1) {
                            boards[boardIdx] = []
                        } else {
                            console.log("number " + numbers[i])
                            finalNumberIdx = i
                            i = numbers.length
                        }
                       
                        break
                    }
                }
            }
            
        }
       
    }
}


var result = boards.filter(b => b.length)[0].reduce((acc,el)=>{
    var sum = 0
    el.map(e => Number.parseInt(e)).filter(e => e > 0).forEach(e=>sum += e)
    console.log(sum)
    return acc + sum
}
, 0)

console.log("result: " + (result * Number.parseInt(numbers[finalNumberIdx])))
