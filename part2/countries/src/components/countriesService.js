import axios from 'axios'

const baseURL = "http://localhost:3001/countries/"

const getAllCountries = () => {
    return axios
        .get(`${baseURL}`)
        .then(response => (response.data))
}

const getCountry = (id) => {
    return "hello"
}

export default { getAllCountries, getCountry }