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

var steps = 10

for (var step = 1; step <= steps; step++) {
    var newInput = ""
    for (var i = 0; i < input.length - 1; i++) {
        var result = input[i] + rules[input[i] + input[i + 1]]
        newInput += result
    }
    input = newInput + input[i]
    console.log("Step " + step)
    console.log(input)
}

var counts = input.split('').reduce((acc, el) => {
    acc[el] = acc[el] ? acc[el] + 1 : 1
    return acc
},[])
var sorted = Object.keys(counts).sort((a,b) => counts[b]-counts[a]);

console.log(sorted)
console.log(counts)
var result = counts[sorted[0]] - counts[sorted[sorted.length-1]]
console.log(result)