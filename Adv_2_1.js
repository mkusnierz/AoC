var items = document.getElementsByTagName('pre')[0].innerText.trim().split('\n')

var forward = 0
var depth = 0
for (i =0; i< items.length; i++ ) {
     
    var dir = items[i].split(" ")[0]
    var value = Number.parseInt(items[i].split(" ")[1])

if(dir == 'forward') {
    forward += value
} else if (dir =='down') {
    depth += value
} else {
    depth -= value
}
}

console.log('fwd ' + forward)
console.log('dpth ' + depth)
console.log('mltp ' + (forward*depth))