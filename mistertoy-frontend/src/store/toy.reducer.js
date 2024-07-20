import { toyService } from '../services/toy.service'
// import { toyService } from '../services/toy.service.local'

export const SET_TOYS = 'SET_TOYS'
export const SET_FILTER_BY = 'SET_FILTER_BY'
export const REMOVE_TOY = 'REMOVE_TOY'
export const ADD_TOY = 'ADD_TOY'
export const UPDATE_TOY = 'UPDATE_TOY'


const initialState = {
    toys: [],
    filterBy: toyService.getDefaultFilter(),
}

export function toyReducer(state = initialState, action = {}) {
    switch (action.type) {
        case SET_TOYS:
            return { ...state, toys: action.toys }
        case SET_FILTER_BY:
            return { ...state, filterBy: action.filterBy }
        case REMOVE_TOY:
            var toys = state.toys.filter(toy => toy._id !== action.toyId)
            return { ...state, toys }
        case ADD_TOY:
            return { ...state, toys: [...state.toys, action.toy] }
        case UPDATE_TOY:
            var toys = state.toys.map(toy => toy._id === action.toy._id ? action.toy : toy)
            return { ...state, toys }
        default:
            return state
    }
}