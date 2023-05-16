import axios from 'axios'
const baseURL = "https://api.open-meteo.com/v1/forecast" 

const getWeatherData = (capitalInfo) => {
    const lat = capitalInfo.latlng[0]
    const lng = capitalInfo.latlng[1]

    return axios
        .get(baseURL, {params: {latitude:lat, longitude:lng, current_weather:true}})
        .then(response => response.data)
}

export default {getWeatherData}