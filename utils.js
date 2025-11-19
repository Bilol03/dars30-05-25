const fs = require('fs')
function readFile(path) {
    let data = fs.readFileSync(path, 'utf-8')
    data = data ? JSON.parse(data) : []

    return data
}

function writeFile(path, data) {
    fs.writeFileSync(path, JSON.stringify(data, null, 4))
    return true
}

module.exports = {
    readFile,
    writeFile
}