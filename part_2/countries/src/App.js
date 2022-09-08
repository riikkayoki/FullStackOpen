
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
  console.log(country)
  return (
    <>
  <h1>{country.name.common}</h1>
  <div> capital {country.capital}</div>
  <div> area {country.area}</div>
  <p>
  <b> languages: </b>
  <ul>
  {Object.values(country.languages).map(language => <li key={language}>{language}</li>)}
  </ul>
  <img src={country.flags.png}></img>
  </p>
  </>
  )
}

const Countries = ({countriesToShow}) => {
  if (countriesToShow.length > 10) {
    return(<p>Too many matches, specify another filter</p>)
  }
  if (countriesToShow.length > 1) {
   return( <div>
        {countriesToShow.map(country =>
        <p key={country.name.common}>
          {country.name.common}
        </p>
        )}
    </div>)
  }
  if (countriesToShow.length === 1) {
    return( <div>
      {countriesToShow.map(country =>
      <div key={country.name.common}>
        <Country country={country}/>
      </div>
      )}
  </div>)
  }
}

const App = () => {
  const [newFilter, setNewFilter] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)

      })
  }, [])

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const countriesToShow = countries.filter(country => country.name.common.toLowerCase().includes(newFilter)) /** true*/

   return (
    <div>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange}/>
      <Countries countriesToShow={countriesToShow}/>
    </div>

  )
}

export default App
