import axios from 'axios'
const baseURL = "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current_weather=true"

const getWeatherData = (capitalInfo) => {
    const lat = capitalInfo.latlng[0]
    const lng = capitalInfo.latlng[1]

    console.log(capitalInfo)
    return axios
        .get("https://api.open-meteo.com/v1/forecast", {params: {latitude:lat, longitude:lng, current_weather:true}})
        .then(response => response.data)
}

export default {getWeatherData}