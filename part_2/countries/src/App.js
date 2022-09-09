
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import personService from '../../phonebook/src/services/personService'


const Filter = ({newFilter, handleFilterChange}) => {
  return (
  <div>find countries:
        <input type="text" value={newFilter} onChange={handleFilterChange}/>
   </div>
  )
}


const Country = ({country}) => {
  const api_key = process.env.REACT_APP_API_KEY
  const [weather, setWeather] = useState([])
  const [wind, setWind] = useState([])
  const [picture, setPicture] = useState([])

  useEffect(() => {
    axios
        .get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${api_key}&units=metric`)
        .then(response => {
            setWeather(response.data.main)
            setWind(response.data.wind)
            setPicture(response.data.weather[0])
        })
    }, [])

  return (
  <div>
  <h1>{country.name.common}</h1>
  <div> capital {country.capital}</div>
  <div> area {country.area}</div>
  <p>
  <b> languages: </b>
  </p>
  <ul>
  {Object.values(country.languages).map(language => <li key={language}>{language}</li>)}
  </ul>
  <img src={country.flags.png} alt='flag' height='50' width='100'></img>
  <h2>Weather in {country.capital}</h2>
  <div><b>temperature: </b>
  {weather.temp} Celcius</div>
  <img></img>
  <img src={`http://openweathermap.org/img/wn/${picture.icon}@2x.png`} alt='weather'></img>
  <div><b>wind: </b>{wind.speed} m/s</div>

  </div>
  )
}

const Countries = ({countriesToShow, handleClick}) => {
  return (
    <div>
    {countriesToShow.length > 10 && <p>Too many matches, specify another filter</p>}

    {countriesToShow.length <= 10 && countriesToShow.length > 1 &&
      countriesToShow.map(country =>
      <div key={country.name.common}>{country.name.common}
       <button key={country.name.common} onClick={() => handleClick(country)}>show</button>
      </div>)
    }

    {countriesToShow.length === 1 &&
      countriesToShow.map(country => 
      <div key={country.name.common}><Country country={country}/></div>)
    }
    </div>
  )
}

const App = () => {
  const [newFilter, setNewFilter] = useState('')
  const [countries, setCountries] = useState([])
  const [showAll, setShowAll] = useState([])



  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setShowAll(response.data)
      })
  }, [])


  const handleFilterChange = (event) => {
    setCountries(showAll.filter(country => country.name.common.toLowerCase().includes(newFilter.toLowerCase())))
    setNewFilter(event.target.value)
  }

  const handleShowCountry = (country) => {
    setCountries([country])
  }

   return (
    <div>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange}/>
      <Countries countriesToShow={countries} handleClick={handleShowCountry}/>
    </div>

  )
}

export default App
