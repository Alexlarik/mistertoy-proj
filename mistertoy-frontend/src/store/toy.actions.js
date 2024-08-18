import { toyService } from '../services/toy.service.js'
// import { toyService } from '../services/toy.service.local.js'
import { SET_TOYS, UPDATE_TOY, ADD_TOY, REMOVE_TOY, SET_FILTER_BY, ADD_TOY_MSG, SET_TOY } from './toy.reducer.js'
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

export async function loadToy(toyId) {
    console.log('toyId:', toyId)
    try {
        const toy = await toyService.getById(toyId)
        store.dispatch(getCmdSetToy(toy))
    } catch (err) {
        console.log('Cannot load toy', err)
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

export async function addToyMsg(toyId, txt) {
    try {
        const msg = await toyService.addToyMsg(toyId, txt)
        store.dispatch(getCmdAddToyMsg(msg))
        return msg
    } catch (err) {
        console.log('Cannot add toy msg', err)
        throw err
    }
}

function getCmdAddToyMsg(msg) {
    return {
        type: ADD_TOY_MSG,
        msg
    }
}

function getCmdSetToy(toy) {
    return {
        type: SET_TOY,
        toy
    }
}