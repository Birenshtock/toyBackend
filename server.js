const express = require('express')
const cors = require('cors')
const app = express()
    // const PORT = 3030

app.use(express.json())
app.use(cors());
app.use(express.static('public'));

// import { utilService } from './services/util-service.js'
const port = process.env.PORT || 3030;
const toyService = require('./services/toy.service')

app.get('/', (req, res) => {
    res.send('please work!:)')
})


// LIST
app.get('/api/toy', (req, res) => {
    const filterBy = req.query

    console.log('fff', req.query)

    toyService.query(filterBy)
        .then(toys => res.send(toys))
        .catch((err) => res.status(500).send('Cannot get toys'))

})


//צריך לשים ראוט זה מעלה מה שמתחתיו כדי שינצח
// POST-create
app.post('/api/toy/', (req, res) => {
    const { name, price, id } = req.body
    const toy = {
        // id: utilService.makeId(),
        id,
        name,
        price,
        createdAt: Date.now(),
        inStock: true,
        reviews: ['review 1 best 1', 'review 2 almost 1', 'review 3 far from 1'],
        labels: ['Battery powered', 'Outdoor', 'On wheels'],

    }
    toyService.save(toy)
        .then((savedToy) => res.send(savedToy))
        .catch((err) => res.status(500).send('Cannot add toy'))
})


// Put-update
app.put('/api/toy/:toyId', (req, res) => {

    const { id, name, price, inStock, reviews, labels } = req.body
    const toy = {
        id,
        name,
        price,
        inStock,
        reviews,
        labels,
    }
    toyService.save(toy)
        .then((savedToy) => res.send(savedToy))
        .catch((err) => res.status(500).send('Cannot update bug'))
})

// READ
app.get('/api/toy/:toyId', (req, res) => {
    const toyId = req.params.toyId

    toyService.getById(toyId)
        .then(toy => {
            // console.log("toy by ID:", toy);
            res.send(toy)
        })
        .catch((err) => res.status(500).send('can not get toy'))
})

// DELETE
app.delete('/api/toy/:toyId/', (req, res) => {
    const toyId = req.params.toyId
    toyService.remove(toyId)
        .then(() => res.send('removed'))
        .catch((err) => res.status(500).send('Cannot remove toy'))
})



app.listen(port, () => {
    console.log(`Example app listening on port  http://localhost:${port}`)
})