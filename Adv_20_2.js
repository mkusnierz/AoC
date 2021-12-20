var items = document.getElementsByTagName('pre')[0].innerText

// items = `
// ..#.#..#####.#.#.#.###.##.....###.##.#..###.####..#####..#....#..#..##..##
// #..######.###...####..#..#####..##..#.#####...##.#.#..#.##..#.#......#.###
// .######.###.####...#.##.##..#..#..#####.....#.#....###..#.##......#.....#.
// .#..#..##..#...##.######.####.####.#.#...#.......#..#.#.#...####.##.#.....
// .#..#...##.#.##..#...##.#.##..###.#......#.#.......#.#.#.####.###.##...#..
// ...####.#..#..#.##.#....##..#.####....##...##..#...#......#.#.......#.....
// ..##..####..#...#.#.#...##..#.#..###..#####........#..####......#..#

// #..#.
// #....
// ##..#
// ..#..
// ..###`

items = items.trim().split("\n\n")
var algo = items[0].replaceAll('#', 1).replaceAll('.', 0).split('\n').join('').split('').map(el=>parseInt(el))
var image = items[1].replaceAll('#', 1).replaceAll('.', 0).split('\n').map(el=>el.split('').map(e=>parseInt(e)))

printImage = (img)=>{
    console.log(img.map(line=>line.map(char=>char ? "#" : ".").join('')).join('\n'))
}

console.log("ALGO")
console.log(algo)
console.log("IMAGE")

console.log(image)
printImage(image)
const coords = [-1, 0, 1]
var fill = 0

getAdjacentPixel = (img,x,y)=>{
    if (x >= 0 && x < img[0].length && y >= 0 && y < img.length) {
        return img[y][x]
    } else {
        return fill
    }
}

getPixelValue = (img,x,y)=>{
    var binString = ""
    coords.forEach(y1=>{
        coords.forEach(x1=>{
            binString += getAdjacentPixel(img, x + x1, y + y1)
        }
        )
    }
    )
    var dec = parseInt(binString, 2)
    return algo[dec]
}

enhance = (img)=>{
    var outputImage = Array(img.length + 2).fill(null).map(()=>Array(img[0].length + 2).fill(0))
    for (var y = -1; y <= img.length; y++) {
        for (var x = -1; x <= img[0].length; x++) {
            var val = getPixelValue(img, x, y)
            outputImage[y + 1][x + 1] = val
        }
    }
    return outputImage
}

for (var i = 0; i < 50; i++) {
    image = enhance(image)
    if (algo[0]) {
        fill = fill ? 0 : 1
    }
}
printImage(image)

console.log("Pixels " + image.reduce((acc,el)=>acc += el.filter(e=>e).length, 0))
