import { toyReducer } from './toy.reducer.js'
import { combineReducers, compose, legacy_createStore as createStore, } from 'redux'
// const { createStore, combineReducers, compose } = Redux

const rootReducer = combineReducers({
    x: toyReducer,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export const store = createStore(rootReducer, composeEnhancers())

window.gStore = store
