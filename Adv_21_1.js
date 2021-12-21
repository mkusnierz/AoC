var items = document.getElementsByTagName('pre')[0].innerText

// items = `
// Player 1 starting position: 4
// Player 2 starting position: 8`

var positions = items.trim().split('\n').map(el=>parseInt(el.split(': ')[1]))
var score = [0, 0]
var dice = [1, 2, 3]
var rolls = 0


movePos = (pos,val)=>{
    pos += val
    if (pos % 10 != 0) {
        pos = (pos % 10)
    } else {
        if (pos > 10) {
            pos = 10
        }
    }
    return pos
}

while (score.filter(s=>s >= 1000).length == 0) {
    var player = rolls % 2
    positions[player] = movePos(positions[player], dice.reduce((acc,el)=>acc + el, 0))
   
    score[player] += positions[player]
    dice = dice.map(e=>{
        var val = e + dice.length
        if (val > 100){
            val = val % 100
        }
        return val
    }
    )

    rolls += 3
}
console.log("Rolls: " + rolls)
console.log("Scores: " + score)
console.log("Result " + (rolls * Math.min(...score)))
