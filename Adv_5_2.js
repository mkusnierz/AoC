var items = document.getElementsByTagName('pre')[0].innerText.trim().split('\n')

// items = `0,9 -> 5,9
// 8,0 -> 0,8
// 9,4 -> 3,4
// 2,2 -> 2,1
// 7,0 -> 7,4
// 6,4 -> 2,0
// 0,9 -> 2,9
// 3,4 -> 1,4
// 0,0 -> 8,8
// 5,5 -> 8,2`.split('\n')

var field = []


for(var i =0; i < items.length; i++ ){

    var start = items[i].split(" -> ")[0]
    var end = items[i].split(" -> ")[1]

    var x1 = Number.parseInt(start.split(",")[0])
    var y1 = Number.parseInt(start.split(",")[1])

    var x2 = Number.parseInt(end.split(",")[0])
    var y2 = Number.parseInt(end.split(",")[1])

    var minX = Math.min(x1,x2)
    var maxX = Math.max(x1,x2)

    var minY = Math.min(y1,y2)
    var maxY = Math.max(y1,y2)

    if(x1 == x2 || y1 == y2){
    for (var x = minX; x <= maxX; x++ ){
        for (var y = minY; y <= maxY; y++) {
            if (field[x] == undefined) {
                field[x] = []
            }
             if (field[x][y] == undefined){
                field[x][y] = 0    
            }
            field[x][y]++
        }
    }
    } else  
     if (maxX - minX == maxY - minY){
         var addrem = (minX == x1 && minY == y1) || (minX == x2 && minY == y2) ? 1 : -1

         var y = (minX == x1 && minY == y1) || (minX == x2 && minY == y2) ? minY : maxY;

        for (var x = minX; x <= maxX; x++ ){
            if (field[x] == undefined) {
                field[x] = []
            }
             if (field[x][y] == undefined){
                field[x][y] = 0    
            }
            field[x][y]++
            y += addrem
    }
    }

}
field
var cn = 0
for (var i = 0; i< field.length; i++ ){
    if(field[i])
    cn += field[i].filter(el => el > 1).length
}
cn