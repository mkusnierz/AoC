var items = document.getElementsByTagName('pre')[0].innerText

// items = `
// Player 1 starting position: 4
// Player 2 starting position: 8
// `

var positions = items.trim().split('\n').map(el=>parseInt(el.split(': ')[1]))
var score = [0, 0]
var dice = [1, 2, 3].map(e=>[1, 2, 3].map(e1=>[1, 2, 3].map(e2=>e + e1 + e2)).flat()).flat().reduce((acc, el) => {
    if(!acc[el]) {
        acc[el] = 0
    }
    acc[el]++
    return acc
},[])

var wins = [0, 0]
const targetScore = 21

movePos = (pos,val)=>{
    pos += val
    if (pos % 10 != 0) {
        pos = (pos % 10)
    } else if (pos > 10) {
        pos = 10
    }
    return pos
}

rollDice = (player,ps,sc)=>{

    if (sc[0] >= targetScore) {
        return 1
    } else if (sc[1] >= targetScore) {
        return 0
    }

    var p1wins = 0
    dice.forEach((count, value)=>{

        var pos = [ps[0], ps[1]]
        var sco = [sc[0], sc[1]]
        pos[player] = movePos(pos[player], value)
        sco[player] += pos[player]

        p1wins += count * rollDice(player ? 0 : 1, pos, sco)
    }
    )
    return p1wins
}
console.log(rollDice(0, positions, score))
