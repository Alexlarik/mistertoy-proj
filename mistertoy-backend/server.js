import path from 'path'
import express from 'express'
import cookieParser from 'cookie-parser'

import { toyService } from './services/toy.service.js'
import { loggerService } from './services/logger.service.js'
import { utilService } from './services/util.service.js'

const app = express()
app.use(express.static('public'))
app.use(cookieParser())
app.use(express.json())
app.use(cors(corsOptions))

// Express Routing:

app.get('/api/toy', (req, res) => {

    toyService.query(filterBy)
        .then(toys => res.send(toys))
        .catch(err => {
            loggerService.error(`Couldn't get toys...`, err)
            res.status(500).send(`Couldn't get toys...`)
        })
})

app.put('/api/toy/:id', (req, res) => {

    toyService.save(toyToSave)
        .then(savedToy => res.send(savedToy))
        .catch(err => {
            loggerService.error(`Couldn't save toys (${_id})`, err)
            res.status(500).send(`Couldn't save toys (${_id})`)
        })
})

app.post('/api/toy/', (req, res) => {

    toyService.save(toyToSave)
        .then(savedToy => res.send(savedToy))
        .catch(err => {
            loggerService.error(`Couldn't save toys...`, err)
            res.status(500).send(`Couldn't save toys...`)
        })
})

app.get('/api/toy/:id', (req, res) => {
    const { id } = req.params

    toyService.getById(id).then((toy) => res.send(toy))
        .catch(err => {
            loggerService.error(`Couldn't get toy (${id})`, err)
            res.status(500).send(`Couldn't get toy (${id})`)
        })
})

app.delete('/api/toy/:id', (req, res) => {
    const { id } = req.params

    toyService.remove(id)
        .then(() => res.send(`toy ${id} deleted...`))
        .catch(err => {
            loggerService.error(`Couldn't delete toy (${id})`, err)
            res.status(500).send(`Couldn't delete toy (${id})`)
        })
})

app.get('/**', (req, res) => {
    res.sendFile(path.resolve('public/index.html'))
})

const PORT = process.env.PORT || 3030
app.listen(PORT, () => loggerService.info(`Server listening on port http://127.0.0.1:${PORT}/`))
