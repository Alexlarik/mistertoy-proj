import { toyService } from '../services/toy.service.js'
// import { toyService } from '../services/toy.service.local.js'
import { SET_TOYS, UPDATE_TOY, ADD_TOY, REMOVE_TOY, SET_FILTER_BY } from './toy.reducer.js'
import { store } from './store.js'


export async function loadToys() {
    const filterBy = store.getState().x.filterBy

    try {
        const toys = await toyService.query(filterBy)
        console.log('Loaded toys:', toys)
        store.dispatch({ type: SET_TOYS, toys })
    } catch (err) {
        console.error('Error loading toys:', err)
        throw err
    }
}

export async function removeToy(toyId) {
    try {
        await toyService.remove(toyId)
        store.dispatch({ type: REMOVE_TOY, toyId })
    } catch (err) {
        console.error('Error removing toy:', err)
        throw err
    }
}

export async function saveToy(toy) {
    const type = toy._id ? UPDATE_TOY : ADD_TOY

    try {
        const newToy = await toyService.save(toy)
        store.dispatch({ type, toy: newToy })
        return newToy
    } catch (err) {
        console.error('Error saving toy:', err)
        throw err
    }
}