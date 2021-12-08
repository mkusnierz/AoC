var items = document.getElementsByTagName('pre')[0].innerText.trim().split('\n')
items = items.map(it => Number.parseInt(it))
var count = 0
for (i =1; i< items.length; i++ ) { if(items[i] > items[i-1]) { count++ } }
count