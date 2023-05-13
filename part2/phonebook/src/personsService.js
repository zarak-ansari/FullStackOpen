import axios from 'axios'

const baseURL = "http://localhost:3001/persons"

const getAll = () => {
    return axios
        .get(baseURL)
        .then(response => response.data)
}

const create = (newPerson) => {
    return axios
        .post(baseURL, newPerson)
        .then(response => response.data)
}

const deletePerson = (id) => {
    return axios.delete(`${baseURL}/${id}`)

}

const updatePerson = (id, updatedPerson) => {
    return axios
        .put(`${baseURL}/${id}`, updatedPerson)
        .then(response => response.data)
}

export default { getAll, create, deletePerson, updatePerson }
