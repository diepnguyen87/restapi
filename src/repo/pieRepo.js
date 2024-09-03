const { error } = require('console');
let fs = require('fs')
const FILE_PATH = './src/asset/pies.json'

let pieRepo = {
    get: function (resolve, reject) {
        fs.readFile(FILE_PATH, function (err, data) {
            if (err) {
                reject(err)
            } else {
                resolve(JSON.parse(data))
            }
        });
    },
    getByID: function (id, resolve, reject) {
        fs.readFile(FILE_PATH, function (err, data) {
            if (err) {
                reject(err)
            } else {
                let pie = JSON.parse(data).find(p => p.id == id)
                resolve(pie)
            }
        })
    },
    search: function (searchObject, resolve, reject) {
        fs.readFile(FILE_PATH, function (err, data) {
            if (err) reject(err)
            else {
                let pies = JSON.parse(data)
                if (searchObject) {
                    pies = pies.filter(p =>
                        searchObject.id ? p.id == searchObject.id : true &&
                            searchObject.name ? p.name.toLowerCase().indexOf(searchObject.name.toLowerCase()) >= 0 : true
                    )
                }
                resolve(pies)
            }
        })
    },
    insertPie: function (newPie, resolve, reject) {
        fs.readFile(FILE_PATH, function (err, data) {
            if (err) reject(err)
            else {
                let pies = JSON.parse(data)
                pies.push(newPie)
                fs.writeFile(FILE_PATH, JSON.stringify(pies), function (err) {
                    if (err) reject(err)
                    else {
                        resolve(newPie)
                    }
                })
            }
        })
    },
    updatePie: function (newData, id, resolve, reject) {
        fs.readFile(FILE_PATH, function (err, data) {
            if (err) reject(err)
            else {
                let pies = JSON.parse(data)
                let pie = pies.find(p => p.id == id)
                if (pie) {
                    Object.assign(pie, newData)
                    fs.writeFile(FILE_PATH, JSON.stringify(pies), function (err) {
                        if (err) reject(err)
                        else {
                            resolve(newData)
                        }
                    })
                }
            }
        })
    },
    deletePie: function (id, resolve, reject) {
        fs.readFile(FILE_PATH, function (err, data) {
            if (err) reject(err)
            else {
                let pies = JSON.parse(data)
                let deletedIndex = pies.findIndex(pie => pie.id == id)
                if (deletedIndex != -1) {
                    pies.splice(deletedIndex, 1)
                    fs.writeFile(FILE_PATH, JSON.stringify(pies), function (err) {
                        if (err) reject(err)
                        else {
                            resolve(deletedIndex + 1)
                        }
                    })
                }
            }
        })
    }
}

module.exports = pieRepo