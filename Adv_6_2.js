var items = document.getElementsByTagName('pre')[0].innerText.trim().split(',')
items = items.map(it=>Number.parseInt(it))

// items = [3, 4, 3, 1, 2]
var days = 256;

var cn = [0, 0, 0, 0, 0, 0, 0, 0, 0]

items.forEach(day=>{
    cn[day]++
})

for (var i = 0; i < days; i++) {

    cn.push(cn[0])
    cn[7] += cn[0]
    cn = cn.slice(1)
}

var sum = 0
cn.forEach(c => sum += c)

console.log(sum)
