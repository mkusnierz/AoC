var items = document.getElementsByTagName('pre')[0].innerText

// items = `be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe
// edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec | fcgedb cgb dgebacf gc
// fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef | cg cg fdcagb cbg
// fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega | efabcd cedba gadfec cb
// aecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga | gecf egdcabf bgf bfgea
// fgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf | gebdcfa ecba ca fadegcb
// dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf | cefg dcbef fcge gbcadfe
// bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd | ed bcgafe cdgba cbgef
// egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg | gbdfcae bgc cg cgb
// gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc | fgae cfgab fg bagce
// `
// items = 'acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab | cdfeb fcadb cdfeb cdbaf'
items = items.trim().split('\n')

var cn = 0;
items.forEach(it=>{
    var mapping = []
    var mappingR = []
    var entries = it.split('|')
    var signals = entries[0].trim().split(' ')
    //     console.log('signals')
    //     console.log(signals)
    signals.forEach(signal=>{
        switch (signal.length) {
            //      0, 1, 2, 3, 4, 5, 6, 7, 8, 9
        case 2:
            mapping[signal.split('').sort().join('')] = 1
            mappingR[1] = signal.split('').sort().join('')
            break
        case 3:
            mapping[signal.split('').sort().join('')] = 7
            mappingR[7] = signal.split('').sort().join('')

            break
        case 4:
            mapping[signal.split('').sort().join('')] = 4
            mappingR[4] = signal.split('').sort().join('')

            break
        case 7:
            mapping[signal.split('').sort().join('')] = 8
            mappingR[8] = signal.split('').sort().join('')

            break
        default:

        }
    }
    )
    // 0, 2, 3, 5, 6, 9
    signals.forEach(signal=>{
        signal = signal.split('').sort().join('')
        if (!mapping[signal]) {
            var lg = signal.length

            if (lg == 5) {
                // 2, 3, 5, 
                if (signal.split('').filter(value=>mappingR[1].split('').includes(value)).length == 2) {
                    // 3
                    mapping[signal] = 3
                    mappingR[3] = signal

                }
            } else if (lg == 6) {
                // 0, 6, 9
                if (signal.split('').filter(value=>mappingR[4].split('').includes(value)).length == 4) {
                    // 9
                    mapping[signal] = 9
                    mappingR[9] = signal
                }
            }
        }
    }
    )
    //     0, 2, 5, 9
    signals.forEach(signal=>{
        signal = signal.split('').sort().join('')

        if (!mapping[signal]) {
            var lg = signal.length

            if (lg == 5) {
                // 2, 5
                if (signal.split('').filter(value=>mappingR[3].split('').includes(value)).length == 4 && signal.split('').filter(value=>mappingR[4].split('').includes(value)).length == 2) {
                    // 2
                    mapping[signal] = 2
                    mappingR[2] = signal
                } else {
                    // 5
                    mapping[signal] = 5
                    mappingR[5] = signal
                }
            } else if (lg == 6) {
                // 0, 6
                if (signal.split('').filter(value=>mappingR[1].split('').includes(value)).length == 2) {
                    mapping[signal] = 0
                    mappingR[0] = signal
                } else {
                    mapping[signal] = 6
                    mappingR[6] = signal
                }
            }
        }
    }
    )
    //     console.log('mapping')
    //     console.log(mapping)
    var digits = entries[1].trim().split(' ')
    var result = ""
    digits.forEach(digit=>{
        digit = digit.split('').sort().join('')
        result += mapping[digit]

    }
    )
    cn += Number.parseInt(result)

}
)
console.log(cn)
