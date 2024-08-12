import { toyReducer } from './toy.reducer.js'
import { userReducer } from './user.reducer.js'
import { combineReducers, compose, legacy_createStore as createStore, } from 'redux'
// const { createStore, combineReducers, compose } = Redux

const rootReducer = combineReducers({
    x: toyReducer,
    y: userReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export const store = createStore(rootReducer, composeEnhancers())

window.gStore = store
