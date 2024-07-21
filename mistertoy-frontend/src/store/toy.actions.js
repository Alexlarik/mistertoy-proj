// import { toyService } from '../services/toy.service.js'
import { toyService } from '../services/toy.service.local.js'
import { SET_TOYS, UPDATE_TOY, ADD_TOY, REMOVE_TOY, SET_FILTER_BY } from './toy.reducer.js'
import { store } from './store.js'


export function loadToys() {
    const filterBy = store.getState().x.filterBy

    return toyService.query(filterBy)
        .then(toys => {
            console.log('Loaded toys:', toys)
            store.dispatch({ type: SET_TOYS, toys })
        })
        .catch(err => {
            console.error('Error loading toys:', err)
            throw err
        })
}

export function removeToy(toyId) {
    return toyService.remove(toyId)
        .then(() => store.dispatch({ type: REMOVE_TOY, toyId }))
}

export function saveToy(toy) {

    const type = toy._id ? UPDATE_TOY : ADD_TOY

    return toyService.save(toy)
        .then(newToy => {
            store.dispatch({ type, toy: newToy })
            return newToy
        })
        .catch(err => {
            console.error('Error saving toy:', err)
            // throw err
        })
}
