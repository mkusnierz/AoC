var items = document.getElementsByTagName('pre')[0].innerText.trim().split('\n')

var ones = [0,0,0,0,0,0,0,0,0,0,0,0]
var zeros = [0,0,0,0,0,0,0,0,0,0,0,0]

for (i =0; i< items.length; i++ ) {

var item = items[i]
for (j=0; j< item.length; j++) {
    if(item[j] == "1") {
        ones[j]++
    } else {
        zeros[j]++
    }
}

}
var gm = ones.map((e, idx )=> e > zeros[idx] ? '1' : '0').join('')
var eps = zeros.map((e, idx )=> e > ones[idx] ? '1' : '0').join('')

console.log(gm)
console.log(eps)

gm = parseInt(gm, 2)
eps = parseInt(eps, 2)

console.log(gm)
console.log(eps)

var sum = gm * eps
console.log(sum)

