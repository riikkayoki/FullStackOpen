import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/personService'


const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response)
      })
  }, [])

  const addName = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }

    if (persons.some(person => person.name.toLowerCase().includes(newName.toLowerCase()))) {
        if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {

          const person = persons.find(person => person.name === newName)
          const changedPerson = { ...person, number: newNumber}

          personService
          .update(person.id, changedPerson)
          .then(response => {
            setPersons(
              persons.map(person => person.name !== newName
              ? person
              : response))
            setNewName('')
            setNewNumber('')
          })
        }
      }
    else {
      personService
      .create(personObject)
      .then(response => {
        setPersons(persons.concat(response))
        setNewName('')
        setNewNumber('')
      })
    }
    return
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const handlePersonDelete = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
        personService
        .remove(person.id)
        .then(() => {
          setPersons(persons.filter(name => name.id !== person.id ))
        })
    }
  }

  const personsToShow = newFilter
    ? persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))
    : persons

   return (
    <div>
      <h2>Phonebook</h2>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange}/>
      <h3>Add a new</h3>
      <PersonForm addName={addName}
                  newName={newName}
                  handleFilterChange={handleFilterChange}
                  handleNameChange={handleNameChange}
                  newNumber={newNumber}
                  handleNumberChange={handleNumberChange}/>
      <h3>Numbers</h3>
      <Persons personsToShow={personsToShow} handlePersonDelete={handlePersonDelete}/>
    </div>
  )
}

export default App
