var items = document.getElementsByTagName('pre')[0].innerText
// items = `[({(<(())[]>[[{[]{<()<>>
// [(()[<>])]({[<{<<[]>>(
// {([(<{}[<>[]}>{[]{[(<()>
// (((({<>}<{<{<>}{[]{[]{}
// [[<[([]))<([[{}[[()]]]
// [{[{({}]{}}([{[{{{}}([]
// {<[[]]>}<{[{[{[]{()[[[]
// [<(<(<(<{}))><([]([]()
// <{([([[(<>()){}]>(<<{{
// <{([{{}}[<[[[<>{}]]]>[]]`
items = items.trim().split('\n')

var illegalChars = []
var openingChars = ['(', '[', '{', '<']
var closingChars = [')', ']', '}', '>']
var scoreMap = {
    ')': 1,
    ']': 2,
    '}': 3,
    '>': 4
}
var scores = []
items.forEach(item=>{

    var expectedClosing = []
    var chars = item.split('')
    //     console.log(chars)
    for (var i = 0; i< chars.length; i++) {
        var ch = chars[i]
        //         console.log(ch)
        if (openingChars.includes(ch)) {
            expectedClosing.push(closingChars[openingChars.indexOf(ch)])
        } else if (expectedClosing[expectedClosing.length - 1] == ch) {
            expectedClosing.pop()
        } else {
            illegalChars.push(ch)
            expectedClosing = []
//             console.log(chars)
//             console.log(expectedClosing[expectedClosing.length - 1])
//             console.log("Illegal at " + i)
            break;
        }
    }
    if(expectedClosing.length) {
    var lineScore = 0

//         console.log(expectedClosing)
        expectedClosing.reverse().forEach(ch => {
            var score = scoreMap[ch]
            lineScore = (lineScore * 5) + score
        })
        scores.push(lineScore)
    }
}
)

// console.log(scores.sort((a,b) => a-b))
console.log(scores.sort((a,b) => a-b)[Math.floor(scores.length/2)])