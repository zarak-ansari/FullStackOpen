import './App.css';
import countriesService from './components/countriesService';
import { useState, useEffect } from 'react'


const DisplayCountryNames = ({countriesToDisplay}) => {
  if(countriesToDisplay.length === 0) {
    return <div></div>
  } else if(countriesToDisplay.length === 1){
    return <CountryData country={countriesToDisplay[0]} /> 
  } else if(countriesToDisplay.length >10) {
    return <div>Too Many Countries to Display</div>
  } else {
    return (
      <ul>
        {countriesToDisplay.map(country => <li key={country.cca3}>{country.name.common}</li>)}
      </ul>
    )
  }
}

const CountryData = ({country}) => {
  console.log(country)
  return (
    <div>
      <h1>{country.name.common}</h1>

      <p>{`capital: ${country.capital[0]}`}</p>
      <p>{`area: ${country.area}`}</p>
      
      
      <h2>Languages</h2>
      <Languages languagesObj={country.languages} />
      <FlagPicture flagObj={country.flags} />
    </div>
  )
}

const Languages = ({languagesObj}) => {
  const languagesArray = []
  for (const [key, value] of Object.entries(languagesObj)){
    languagesArray.push(value)
  }
  return <ul>{languagesArray.map(lang => <li key={lang}>{lang}</li>)}</ul>
}

const FlagPicture = ({flagObj}) => {
  return <img src={flagObj.png} />
}

function App() {

  const [countriesData, setCountriesData] = useState([])
  const [searchInput, setSearchInput] = useState('')
  useEffect(() => {
    countriesService
      .getAllCountries()
      .then(countriesData => setCountriesData(countriesData))
  }, [])

  const countriesToDisplay = searchInput.length > 0 ? countriesData.filter(country => country.name.common.toLowerCase().includes(searchInput.toLowerCase())) : []

  return (
    <div>
      <span>filter countries: </span>
      <input value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
      <DisplayCountryNames countriesToDisplay={countriesToDisplay} />
    </div>
  )
}

export default App;
