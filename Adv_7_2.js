var items = document.getElementsByTagName('pre')[0].innerText.trim().split(',')
items = items.map(it=>Number.parseInt(it))

// items = [16, 1, 2, 0, 4, 2, 7, 1, 2, 14]

var mx = Math.max(...items);
var minFuel = 99999999999
var pos = -1

for (var i = 0; i < mx; i++) {
    var fuel = 0;
    items.forEach(it=>{
        var val = Math.abs(it - i)
        val = (val * (val + 1)) / 2

        fuel += val
    })
    if(fuel < minFuel) {
        minFuel = fuel
        pos = i
    }
}
pos
minFuel