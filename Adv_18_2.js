var items = document.getElementsByTagName('pre')[0].innerText

// items = `
// [[[0,[5,8]],[[1,7],[9,6]]],[[4,[1,2]],[[1,4],2]]]
// [[[5,[2,8]],4],[5,[[9,9],0]]]
// [6,[[[6,2],[5,6]],[[7,6],[4,7]]]]
// [[[6,[0,7]],[0,9]],[4,[9,[9,0]]]]
// [[[7,[6,4]],[3,[1,3]]],[[[5,5],1],9]]
// [[6,[[7,3],[3,2]]],[[[3,8],[5,7]],4]]
// [[[[5,4],[7,7]],8],[[8,3],8]]
// [[9,3],[[9,9],[6,[4,9]]]]
// [[2,[[7,7],7]],[[5,8],[[9,3],[0,2]]]]
// [[[[5,2],5],[8,[3,7]]],[[5,[7,5]],[4,4]]]`

// items = '[[[[[9,8],1],2],3],4]'
// items = '[7,[6,[5,[4,[3,2]]]]]'
// items = '[[6,[5,[4,[3,2]]]],1]'
// items = '[[3,[2,[1,[7,3]]]],[6,[5,[4,[3,2]]]]]'
// items = '[[3,[2,[8,0]]],[9,[5,[4,[3,2]]]]]'

// items = '[[[[[4,3],4],4],[7,[[8,4],9]]],[1,1]]'
// items = `
// [[[0,[4,5]],[0,0]],[[[4,5],[2,6]],[9,5]]]
// [7,[[[3,7],[4,3]],[[6,3],[8,8]]]]
// [[2,[[0,8],[3,4]]],[[[6,7],1],[7,[1,6]]]]
// [[[[2,4],7],[6,[0,5]]],[[[6,8],[2,8]],[[2,1],[4,5]]]]
// [7,[5,[[3,8],[1,4]]]]
// [[2,[2,2]],[8,[8,1]]]
// [2,9]
// [1,[[[9,3],9],[[9,0],[0,7]]]]
// [[[5,[7,4]],7],1]
// [[[[4,2],2],6],[8,7]]`

// items = `
// [[[[0,0],[9,9]],[[9,8],[8,1]]],[[[1,4],[0,2]],[1,0]]]
// [[[[8,4],[7,5]],[4,2]],[[[9,4],0],[[9,2],[7,9]]]]
// `
items = items.trim().split("\n").map(el=>JSON.parse(el))

// convertToArrays = ()

explode = (depth,number)=>{

    //     console.log('explode ' + depth + ": " + JSON.stringify(number))
    if (Array.isArray(number)) {
        if (depth >= 4 && Number.isInteger(number[0])) {
            return number
        }
        var result = null
        for (var i = 0; i < number.length && (!result || result[0] != -1 || result[1] != -1); i++) {
            if (!result) {
                result = explode(depth + 1, number[i])
            }
            if (Array.isArray(result)/*&& Number.isInteger(number[i][0])*/
            ) {
                if (result[0] != -1 || result[1] != -1) {

                    if (depth >= 3) {

                        number[i] = 0
                        //                         console.log("Exploding: " + JSON.stringify(result))
                    }
                    if (result[0] != -1 && i > 0) {

                        if (Number.isInteger(number[i - 1])) {
                            number[i - 1] += result[0]
                            result[0] = -1
                        } else if (Array.isArray(number[i - 1])) {
                            var prev = number[i - 1]

                            while (Array.isArray(prev[prev.length - 1])) {
                                prev = prev[prev.length - 1]
                            }
                            if (Number.isInteger(prev[prev.length - 1])) {
                                prev[prev.length - 1] += result[0]
                                result[0] = -1
                            }
                        }
                    }
                    if (result[1] != -1 && i < number.length - 1) {
                        if (Number.isInteger(number[i + 1])) {
                            number[i + 1] += result[1]
                            result[1] = -1
                        } else if (Array.isArray(number[i + 1])) {
                            var next = number[i + 1]

                            while (Array.isArray(next[0])) {
                                next = next[0]
                            }
                            if (Number.isInteger(next[0])) {
                                next[0] += result[1]
                                result[1] = -1
                            }
                        }
                    }
                }
                return result
            }
        }
    }
}

split = (number=>{
    //     console.log("Split: " + JSON.stringify(number))
    if (Array.isArray(number)) {
        for (var i = 0; i < number.length; i++) {
            var splitted = split(number[i])
            if (Array.isArray(splitted)) {
                number[i] = splitted

                return true
            } else if (splitted) {
                return true
            }
        }
    } else {
        if (number >= 10) {
            //             console.log("Splitting: " + number)
            number = [Math.floor(number / 2), Math.ceil(number / 2)]
            return number
        }
    }
}
)

reduce = (number=>{

    var prev = JSON.stringify(number)
    explode(0, number)

    while (JSON.stringify(number) != prev) {
        prev = JSON.stringify(number)
        explode(0, number)

    }
    //     console.log("After explode: " + JSON.stringify(number))
    split(number)
}
)

magnitute = (number)=>{
    if (Array.isArray(number)) {
        if(!Array.isArray(number[0]) && !Array.isArray(number[1])) {
            return (number[0] * 3 + number[1] * 2)
        }
            for (var i = 0; i < number.length; i++) {
                var mg = magnitute(number[i])
                if (mg != -1) {
                    number[i] = mg
                } 
            }
            return (number[0] * 3 + number[1] * 2)
    } else {
        return -1
    }
}

var magnitutes = []
var previousItem = null
for (var i = 0; i < items.length; i++) {
    for (var j = 0; j < items.length; j++) {
        var item = items[i]
        var item2 = items[j]

        var it1 = JSON.stringify(item)
        var it2 = JSON.stringify(item2)

        if (it1 != it2) {
            item3 = [item, item2]
            var previous = ""
            console.log(JSON.stringify(item3))
            while (JSON.stringify(previous) != JSON.stringify(item3)) {
                previous = JSON.parse(JSON.stringify(item3))
                reduce(item3)
            }
            console.log("Reduced: " + JSON.stringify(item3))

            var mg = magnitute(item3)
            magnitutes.push(mg)
            console.log(mg)
            items[i] = JSON.parse(it1)
            items[j] = JSON.parse(it2)

        }
    }

}

// console.log(magnitutes.filter(el => Number.isInteger(el)).sort((a,b) => a-b))
console.log(Math.max(...magnitutes))

// console.log(magnitute(previousItem))
// console.log(previousItem)
// after addition: [[[[[4,3],4],4],[7,[[8,4],9]]],[1,1]]
// after explode:  [[[[0,7],4],[7,[[8,4],9]]],[1,1]]
// after explode:  [[[[0,7],4],[15,[0,13]]],[1,1]]
// after split:    [[[[0,7],4],[[7,8],[0,13]]],[1,1]]
// after split:    [[[[0,7],4],[[7,8],[0,[6,7]]]],[1,1]]
// after explode:  [[[[0,7],4],[[7,8],[6,0]]],[8,1]]

// [[[[4,0],[5,4]],[[7,7],[6,0]]],[[8,[7,7]],[[7,9],[5,0]]]]
// [[[[8,7],[7,7]],[[8,6],[7,7]]],[[[0,7],[6,6]],[8,7]]]
