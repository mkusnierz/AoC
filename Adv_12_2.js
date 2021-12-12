var items = document.getElementsByTagName('pre')[0].innerText

// items = `start-A
// start-b
// A-c
// A-b
// b-d
// A-end
// b-end`

items = items.trim().split('\n')

var paths = []
items.forEach(item=>{
    var caves = item.split('-')
    if (!paths[caves[0]]) {
        paths[caves[0]] = []
    }
    paths[caves[0]].push(caves[1])

    if (!paths[caves[1]]) {
        paths[caves[1]] = []
    }
    paths[caves[1]].push(caves[0])
}
)

goToNextCave = (alreadyVisited,currCave)=>{
    var anyCaveAlreadyVisitedTwice = new Set(alreadyVisited).size != alreadyVisited.length
    if (currCave == currCave.toLowerCase() && alreadyVisited.filter(c=>c == currCave).length >= (anyCaveAlreadyVisitedTwice ? 1 : 2) || (['start', 'end'].indexOf(currCave) > -1 && alreadyVisited.includes(currCave))) {
        return
    }
    var foundPaths = []
    if (currCave == 'end') {
        foundPaths.push(currCave)
        return foundPaths
    }

    var thisAlreadyVisited = []
    thisAlreadyVisited.push(...alreadyVisited)
    if (currCave == currCave.toLowerCase()) {
        thisAlreadyVisited.push(currCave)
    }

    paths[currCave].forEach(cave=>{
        nextCave = goToNextCave(thisAlreadyVisited, cave)
        if (nextCave) {
            nextCave.forEach(it=>{
                foundPaths.push(currCave + "," + it)
            }
            )

        } else {
            foundPaths.push(currCave)

        }
    }
    )
    return foundPaths
}
console.log(paths)
var cn = 0
paths['start'].forEach(p=>{
    var alreadyVisited = ['start']
    var fPaths = goToNextCave(alreadyVisited, p)
    console.log(fPaths)
    fPaths = fPaths.filter(p=>p.endsWith('end'))
    cn += fPaths.length
    fPaths.forEach(e=>console.log('start,' + e))
}
)

console.log(cn)
