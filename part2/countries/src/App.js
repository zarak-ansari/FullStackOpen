import './App.css';
import countriesService from './components/countriesService'
import weatherService from './components/weatherService'
import { useState, useEffect } from 'react'


const DisplayCountryNames = ({ countriesToDisplay, selectedCountry, setSelectedCountry }) => {

  if (countriesToDisplay.length === 0) {
    return <div></div>
  } else if (countriesToDisplay.length === 1) {
    return <CountryData country={countriesToDisplay[0]} />
  } else if (countriesToDisplay.length > 10) {
    return <div>Too Many Countries to Display</div>
  } else {
    return selectedCountry ? <CountryData country={selectedCountry} /> : <ul>{countriesToDisplay.map(country => <li key={country.cca3}>{country.name.common} <button onClick={(e) => setSelectedCountry(country)}>show</button></li>)}</ul>
  }
}

const CountryData = ({ country }) => {
  return (
    <div>
      <h1>{country.name.common}</h1>

      <p>{`capital: ${country.capital[0]}`}</p>
      <p>{`area: ${country.area}`}</p>


      <h2>Languages</h2>
      <Languages languagesObj={country.languages} />
      <FlagPicture flagObj={country.flags} />
      <WeatherInfo capital={country.capital} capitalInfo={country.capitalInfo} />
    </div>
  )
}

const Languages = ({ languagesObj }) => {
  const languagesArray = []
  for (const [key, value] of Object.entries(languagesObj)) {
    languagesArray.push(value)
  }
  return <ul>{languagesArray.map(lang => <li key={lang}>{lang}</li>)}</ul>
}

const FlagPicture = ({ flagObj }) => {
  return <img src={flagObj.png} alt={flagObj.alt} />
}

const WeatherInfo = ({ capital, capitalInfo }) => {
  const [weatherData, setWeatherData] = useState(null)

  useEffect(() => {
    weatherService
      .getWeatherData(capitalInfo)
      .then(response => setWeatherData(response))
  }, [])

  if (!weatherData) {
    return <div></div>
  } else {
    return (
      <div>
        <h2>{`Weather for ${capital}`}</h2>
        <p>{`current temp: ${weatherData.current_weather.temperature}`}</p>
        <p>{`wind speed: ${weatherData.current_weather.windspeed}`}</p>
      </div>
    )
  }
}

function App() {

  const [countriesData, setCountriesData] = useState([])
  const [searchInput, setSearchInput] = useState('')
  const [selectedCountry, setSelectedCountry] = useState(null)

  useEffect(() => {
    countriesService
      .getAllCountries()
      .then(countriesData => setCountriesData(countriesData))
  }, [])

  const countriesToDisplay = searchInput.length > 0 ? countriesData.filter(country => country.name.common.toLowerCase().includes(searchInput.toLowerCase())) : []

  const handleChangeInSearchInput = (e) => {
    setSearchInput(e.target.value)
    setSelectedCountry(null)
  }

  return (
    <div>
      <span>filter countries: </span>
      <input value={searchInput} onChange={handleChangeInSearchInput} />
      <DisplayCountryNames countriesToDisplay={countriesToDisplay} selectedCountry={selectedCountry} setSelectedCountry={setSelectedCountry} />
    </div>
  )
}

export default App;
