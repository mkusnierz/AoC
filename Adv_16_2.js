var items = document.getElementsByTagName('pre')[0].innerText

// items = `C200B40A82`
// items = `04005AC33890`
// items = `880086C3E88112`
// items = `CE00C43D881120`
// items = `D8005AC2A8F0`
// items = 'F600BC2D8F'
// items = '9C005AC2F8F0'
// items = '9C0141080250320F1802104A08'

items = items.trim()
items = items.split('').map(i=>Number.parseInt(i, 16).toString(2).padStart(4, 0)).join("")
console.log(items)
var offset = 0

// var packetVersionSum = 0
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
    var packetValue = 0
    //     packetVersionSum += packetVersion
    if (packetType == 4) {
        contentArray = readContent(offset + 6)
        readBytes = 6 + contentArray.length * 5
        console.log(offset + " contentArray: " + contentArray)
        console.log(offset + " Value: " + parseInt(contentArray.join(''), 2))
        packetValue = parseInt(contentArray.join(''), 2)
    } else {
        var lengthTypeId = parseInt(items.slice(offset + 6, offset + 7), 2)
        console.log(offset + " lengthTypeId: " + lengthTypeId)

        if (lengthTypeId == 0) {
            var length = parseInt(items.slice(offset + 7, offset + 22), 2)
            console.log(offset + " length: " + length)

            var packetValues = []

            while (readBytes < length) {
                var packetResult = readPacket(offset + 22 + readBytes)
                readBytes += packetResult[0]
                console.log(packetResult[1])
                packetValues.push(packetResult[1])

            }
            if (packetType == 0) {
                packetValue = packetValues.reduce((acc,el)=>acc + el, 0)
            } else if (packetType == 1) {
                packetValue = packetValues.reduce((acc,el)=>acc * el, 1)
            } else if (packetType == 2) {
                packetValue = Math.min(...packetValues)
            } else if (packetType == 3) {
                packetValue = Math.max(...packetValues)
            } else if (packetType == 5) {
                packetValue = packetValues[0] > packetValues[1] ? 1 : 0
            } else if (packetType == 6) {
                packetValue = packetValues[0] < packetValues[1] ? 1 : 0
            }else if (packetType == 7) {
                packetValue = packetValues[0] == packetValues[1] ? 1 : 0
            }
            readBytes += 7 + 15

        } else {
            var length = parseInt(items.slice(offset + 7, offset + 18), 2)
            console.log(offset + " length: " + length)

            var packetValues = []
            for (var i = 0; i < length; i++) {
                var packetResult = readPacket(offset + 18 + readBytes)
                readBytes += packetResult[0]
                console.log(packetResult[1])
                packetValues.push(packetResult[1])
            }
            if (packetType == 0) {
                packetValue = packetValues.reduce((acc,el)=>acc + el, 0)
            } else if (packetType == 1) {
                packetValue = packetValues.reduce((acc,el)=>acc * el, 1)
            } else if (packetType == 2) {
                packetValue = Math.min(...packetValues)
            } else if (packetType == 3) {
                packetValue = Math.max(...packetValues)
            } else if (packetType == 5) {
                packetValue = packetValues[0] > packetValues[1] ? 1 : 0
            } else if (packetType == 6) {
                packetValue = packetValues[0] < packetValues[1] ? 1 : 0
            }else if (packetType == 7) {
                packetValue = packetValues[0] == packetValues[1] ? 1 : 0
            }
            readBytes += 7 + 11

        }

    }
    console.log(offset + " readBytes: " + readBytes)
    console.log("")
    return [readBytes, packetValue]
}
while (offset < items.length - 7) {
    offset += readPacket(offset)
}

// console.log("packetVersionSum : " + packetVersionSum)
