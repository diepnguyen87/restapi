const { error } = require('console')
const fs = require('fs')

const LOG_FILE = './src/logs/log.txt'

let logRepo = {
    write: function (data, resolve, reject) {
        let toWrite = "*".repeat(80) + "\n"
        toWrite += "Date/Time: " + new Date().toLocaleDateString() + "\n"
        toWrite += "Exception Info: " + JSON.stringify(data) + "\n"
        toWrite += "*".repeat(80) + "\n"

        fs.writeFile(LOG_FILE, toWrite, function (err) {
            if (err) reject(err)
            else {
                resolve(true)
            }
        })
    }
}

module.exports = logRepo
