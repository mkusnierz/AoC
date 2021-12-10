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
    ')': 3,
    ']': 57,
    '}': 1197,
    '>': 25137
}
items.forEach(item=>{

    var expectedClosing = []
    var chars = item.split('')
    //     console.log(chars)
    for (var i = 0; i< chars.length; i++) {
        var ch = chars[i]
        //         console.log(ch)
        if (openingChars.includes(ch)) {
            expectedClosing.push(ch)
        } else if (expectedClosing[expectedClosing.length - 1] == openingChars[closingChars.indexOf(ch)]) {
            expectedClosing.pop()
        } else {
            illegalChars.push(ch)
//             console.log(chars)
//             console.log(expectedClosing[expectedClosing.length - 1])
//             console.log("Illegal at " + i)
            break;
        }
    }
}
)
console.log(illegalChars)
console.log("Score: " + illegalChars.reduce((acc,el)=>{
   return acc + scoreMap[el]
}
, 0))
