import axios from 'axios'

const baseURL = "http://localhost:3001/countries/" // countries api is about to be discontinued. use 'npm run server' to start a local server

const getAllCountries = () => {
    return axios
        .get(`${baseURL}`)
        .then(response => (response.data))
}

export default { getAllCountries }