import { utilService } from './util.service.js'
import { httpService } from './http.service.js'
import { storageService } from './async-storage.service.js'
// import Axios from "axios"

// const axios = Axios.create({
//     withCredentials: true
// })
// const BASE_URL = ''
// const TOY_KEY = 'toyDB'
// _createToys()
const BASE_URL = 'toy/'

export const toyService = {
    query,
    get,
    remove,
    save,
    getToy,
    getDefaultFilter,
    addToyMsg

}
// For Debug (easy access from console):
window.cs = toyService

function query(filterBy = {}) {
    return httpService.get(BASE_URL, { filterBy })
}

function get(toyId) {
    return httpService.get(BASE_URL + toyId)
}

async function remove(toyId) {
    try {
        const response = await httpService.delete(BASE_URL + toyId)
        console.log('Toy deleted:', response)
        return response;
    } catch (err) {
        console.log('Error deleting toy:', err)
        throw err
    }
}

function save(toy) {
    if (toy._id) {
        // console.log('Updating toy:', toy)
        return httpService.put(BASE_URL + toy._id, toy)
    } else {
        // console.log('Creating new toy:', toy)
        return httpService.post(BASE_URL, toy)
    }
}

async function addToyMsg(toyId, txt) {
    const savedMsg = await httpService.post(`toy/${toyId}/msg`, { txt })
    return savedMsg
}

function getToy() {
    return { txt: '', price: '', inStock: '', label: '' }
}

function getDefaultFilter() {
    return { txt: '', price: '', inStock: '' }
}

function _createToys() {
    let toys = utilService.loadFromStorage(TOY_KEY)
    if (!toys || !toys.length) {
        toys = []
        const labels = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle', 'Outdoor', 'Battery Powered']
        for (var i = 0; i < 20; i++) {
            // toys.push(_createToy())
            toys.push(_createToy(null, null, Math.random() > 0.5))
        }
        // for (let i = 0; i < 20; i++) {
        //     const toy = toys[utilService.getRandomIntInclusive(0, txts.length - 1)]
        //     toys.push(_createToy(toy + (i + 1), utilService.getRandomIntInclusive(1, 10)))
        // }
        utilService.saveToStorage(TOY_KEY, toys)
    }
}

function _createToy(txt, price, inStock) {
    const toy = getToy(txt, price, inStock)
    toy.txt = utilService.makeLorem(1)
    toy.price = utilService.getRandomIntInclusive(5, 80)
    toy.inStock = inStock ? true : false
    toy._id = utilService.makeId()
    toy.createdAt = toy.updatedAt = Date.now() - utilService.getRandomIntInclusive(0, 1000 * 60 * 60 * 24)
    toy.label = utilService.getRandomLabel()
    return toy
}

// const labels = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle',
//     'Outdoor', 'Battery Powered']
// const toy = {
//     _id: 't101',
//     name: 'Talking Doll',
//     price: 123,
//     labels: ['Doll', 'Battery Powered', 'Baby'],
//     createdAt: 1631031801011,
//     inStock: true,
// }
