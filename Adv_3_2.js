var items = document.getElementsByTagName('pre')[0].innerText.trim().split('\n')

// var items = ["00100",
// "11110",
// "10110",
// "10111",
// "10101",
// "01111",
// "00111",
// "11100",
// "10000",
// "11001",
// "00010",
// "01010"]
var ones = 0
var zeros = 0

var common = ""
var least = ""

var oxy = items.slice()
var co2 = items.slice()



for (i=0; i< items[0].length; i++) {
    ones = 0 //[0,0,0,0,0,0,0,0,0,0,0,0]
    zeros = 0 //[0,0,0,0,0,0,0,0,0,0,0,0]

    for (z =0; z< oxy.length; z++ ) {
        var item = oxy[z]
        if(item[i] == "1") {
            ones++
        } else {
            zeros++
        }
    }
    common = ones >= zeros ? "1" : "0"
    least = ones < zeros ? "1" : "0"

    if(oxy.length > 1)
    oxy = oxy.filter(el => {return el[i] == common})
    
  ones = 0 //[0,0,0,0,0,0,0,0,0,0,0,0]
    zeros = 0 //[0,0,0,0,0,0,0,0,0,0,0,0]


     for (z =0; z< co2.length; z++ ) {

        var item = co2[z]
        if(item[i] == "1") {
            ones++
        } else {
            zeros++
        }
    
    }
    common = ones >= zeros ? "1" : "0"
    least = ones < zeros ? "1" : "0"
    
    if(co2.length > 1)
    co2 = co2.filter(el => {return el[i] == least})

}
console.log(oxy)
console.log(co2)

console.log(parseInt(oxy, 2))
console.log(parseInt(co2, 2))

console.log(parseInt(oxy, 2) * parseInt(co2, 2))
