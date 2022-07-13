const fs = require('fs')
const toys = require('../data/toy.json')

module.exports = {
    query,
    getById,
    remove,
    save,
}


function query(filterBy) {

    const regex = new RegExp(filterBy.name || '', 'i')

    let filteredToys = toys.filter((toy) => regex.test(toy.name))


    console.log('hi', filterBy)

    if (filterBy.status !== 'all') {

        console.log('dddd', filterBy)
        filteredToys = filteredToys.filter(toy =>
            filterBy.status === 'In stock' ? toy.inStock : !toy.inStock
        )
    }
    console.log('filteredToys', filteredToys)
    return Promise.resolve(filteredToys)
        // return Promise.resolve(toys)
}

function getById(toyId) {
    console.log(toyId);
    // console.log('w', toys);
    const toy = toys.find((toy) => toy.id === toyId)
    return Promise.resolve(toy)
}


function remove(toyId) {
    const idx = toys.findIndex((toy) => toy._id === toyId)
    toys.splice(idx, 1)
    return _saveToysToFile()
}

function save(toy) {
    if (toy.id) {
        const idx = toys.findIndex(currToy => currToy.id === toy.id)
        toys[idx] = toy
    } else {
        toy.id = _makeId()
        toys.push(toy)
    }
    return _saveToysToFile()
        .then(() => toy)
}



function _makeId(length = 5) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return txt
}

//עושה שהשינויים יהיו על הdata/bug.json
function _saveToysToFile() {
    return new Promise((resolve, reject) => {
        const content = JSON.stringify(toys, null, 2)
        fs.writeFile('./data/toy.json', content, err => {
            if (err) {
                // console.error(err)
                return reject(err)
            }
            resolve()
        })
    })
}