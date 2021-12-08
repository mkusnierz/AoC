var items = document.getElementsByTagName('pre')[0].innerText.trim().split(',')
items = items.map(it=>Number.parseInt(it))

// items = [3,4,3,1,2]

for (var i = 0; i < 80; i++) {

    var itLength = items.length

    for (var j = 0; j < itLength; j++) {
        items[j]--

        if (items[j] < 0) {
            items[j] = 6
            items.push(8)
        }
    }
}

items.length
