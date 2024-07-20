import axios from "axios"
const BASE_URL = '/api/toy'

export const toyService = {
    query,
    getById,
    save,
    remove,
    createDefaultFilter,
}

function query(filterBy = {}) {
    return axios.get(BASE_URL, { params: filterBy }).then(res => res.data)
}
function getById(toyId) {
    return axios.get(BASE_URL + `/${toyId}`).then(res => res.data)
}
function remove(toyId) {
    return axios.delete(BASE_URL + `/${toyId}`).then(res => res.data)
}
function save(toy) {
    // const {_id , description, title, createdAt , severity} = toy
    if (toy.id) {
        return axios.put(BASE_URL + `/${toy.id}` + toy)
            .then(res => res.data)
    } else {
        return axios.post(BASE_URL, toy)
            .then(res => res.data)
    }
}
function createDefaultFilter() {
    return { txt: '' }
}
