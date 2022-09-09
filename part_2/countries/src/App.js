
import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({newFilter, handleFilterChange}) => {
  return (
  <div>find countries:
        <input type="text" value={newFilter} onChange={handleFilterChange}/>
   </div>
  )
}

const Country = ({country}) => {
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
