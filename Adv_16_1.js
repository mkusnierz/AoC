var items = document.getElementsByTagName('pre')[0].innerText

// items = `D2FE28`
// items = `38006F45291200`
// items = `EE00D40C823060`
// items = `8A004A801A8002F478`
// items = `620080001611562C8802118E34`
// items = 'C0015000016115A2E0802F182340'
// items = 'A0016C880162017C3686B18A3D4780'


items = items.trim()
items = items.split('').map(i=>Number.parseInt(i, 16).toString(2).padStart(4, 0)).join("")
console.log(items)
var offset = 0

var packetVersionSum = 0
readContent = (offset)=>{
    var content = "1"
    var contentArray = []
    var i = 0

    do {
        content = items.slice(offset + (5 * i), offset + (5 * (i + 1)))
        console.log(offset + " content: " + content)
        contentArray.push(content.slice(1, 5))
        i++
    } while (content.startsWith("1"));
    return contentArray
}

readPacket = (offset)=>{
    console.log("\n" + offset + " readPacket IN")

    var readBytes = 0
    var packetVersion = parseInt(items.slice(offset, offset + 3), 2)
    var packetType = parseInt(items.slice(offset + 3, offset + 6), 2)
    var contentArray = []
    console.log(offset + " packetVersion: " + packetVersion)
    console.log(offset + " packetType: " + packetType)

    packetVersionSum += packetVersion
    if (packetType == 4) {
        contentArray = readContent(offset + 6)
        readBytes = 6 + contentArray.length * 5
        console.log(offset + " contentArray: " + contentArray)
        console.log(offset + " Value: " + parseInt(contentArray.join(''), 2))

    } else {
        var lengthTypeId = parseInt(items.slice(offset + 6, offset + 7), 2)
        console.log(offset + " lengthTypeId: " + lengthTypeId)

        if (lengthTypeId == 0) {
            var length = parseInt(items.slice(offset + 7, offset + 22), 2)
            console.log(offset + " length: " + length)
            while (readBytes < length) {
                readBytes += readPacket(offset + 22 + readBytes)
            }
            readBytes += 7 + 15

        } else {
            var length = parseInt(items.slice(offset + 7, offset + 18), 2)
            console.log(offset + " length: " + length)
            for (var i = 0; i < length; i++) {
                readBytes += readPacket(offset + 18 + readBytes)
            }
            readBytes += 7 + 11

        }

    }
    console.log(offset + " readBytes: " + readBytes)
    console.log("")
    return readBytes
}
while (offset < items.length - 7) {
    offset += readPacket(offset)

}

console.log("packetVersionSum : " + packetVersionSum)
