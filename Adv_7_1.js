var items = document.getElementsByTagName('pre')[0].innerText.trim().split(',')
items = items.map(it=>Number.parseInt(it))

// items = [16,1,2,0,4,2,7,1,2,14]

items = items.sort((a,b)=>a - b)
var middle = Math.floor(items.length / 2)
var result = 0
if (items.length % 2 === 0) {
    result = (items[middle - 1] + items[middle]) / 2
} else {
    result = items[middle]
}

var fuel = 0;

items.forEach( it => fuel += Math.abs(it-result))
fuel