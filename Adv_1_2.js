var items = document.getElementsByTagName('pre')[0].innerText.trim().split('\n')
items = items.map(it => Number.parseInt(it))
var count = 0
for (i =3; i< items.length; i++ ) {
    var sumA = items[i-3] + items[i-2] + items[i-1]
    var sumB = items[i-2] + items[i-1] + items[i]
     if(sumB > sumA) { count++ } 
     }
count