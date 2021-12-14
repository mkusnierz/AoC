var items = document.getElementsByTagName('pre')[0].innerText

// items = `NNCB

// CH -> B
// HH -> N
// CB -> H
// NH -> C
// HB -> C
// HC -> B
// HN -> C
// NN -> C
// BH -> H
// NC -> B
// NB -> B
// BN -> B
// BB -> N
// BC -> B
// CC -> N
// CN -> C`

items = items.trim().split('\n\n')

var input = items[0].trim()
var rules = items[1].split('\n').reduce((acc,el)=>{
    acc[el.split(' -> ')[0]] = el.split(' -> ')[1]
    return acc
}
, [])

var steps = 40
var letterCounts = []

var rulesOccurence = []

for (var i = 0; i < input.length - 1; i++) {
    if (!rulesOccurence[input[i] + input[i + 1]]) {
        rulesOccurence[input[i] + input[i + 1]] = 0
    }
    rulesOccurence[input[i] + input[i + 1]]++
    if (!letterCounts[input[i]]) {
        letterCounts[input[i]] = 0
    }
    letterCounts[input[i]]++
}
if (!letterCounts[input[input.length - 1]]) {
    letterCounts[input[input.length - 1]] = 0
}
letterCounts[input[input.length - 1]]++

// console.log("Count ")
// console.log(letterCounts)
// console.log(rulesOccurence)

for (var step = 1; step <= steps; step++) {
    console.log("Step " + step)

    var newRulesOccurence = []

    Object.keys(rulesOccurence).forEach(rule=>{
//         console.log(rule)
        if (rulesOccurence[rule] > 0) {
            var letter1 = rule.split('')[0]
            var letter2 = rule.split('')[1]

            if (!newRulesOccurence[letter1 + rules[rule]]) {
                newRulesOccurence[letter1 + rules[rule]] = 0
            }
            if (!newRulesOccurence[rules[rule] + letter2]) {
                newRulesOccurence[rules[rule] + letter2] = 0
            }
            newRulesOccurence[letter1 + rules[rule]]+=rulesOccurence[rule]
            newRulesOccurence[rules[rule] + letter2]+=rulesOccurence[rule]

            if (!letterCounts[rules[rule]]) {
                letterCounts[rules[rule]] = 0
            }
            letterCounts[rules[rule]]+=rulesOccurence[rule]
            rulesOccurence[rule] = 0
            
        }
    }
    )
    rulesOccurence = newRulesOccurence
//     console.log(newRulesOccurence)
}


var sorted = Object.keys(letterCounts).sort((a,b)=>letterCounts[b] - letterCounts[a]);

console.log(sorted)
console.log(letterCounts)
var result = letterCounts[sorted[0]] - letterCounts[sorted[sorted.length - 1]]
console.log(result)
