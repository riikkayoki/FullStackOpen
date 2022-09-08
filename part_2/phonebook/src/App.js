import { useState } from 'react'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const addName = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    console.log(personObject.name, 'uusi nimi', personObject.number, 'uusi numero')
    console.log(persons, ' lista nimistä')
    console.log(persons.includes(person => person.name === newName), 'onko nimi listassa')


    if (persons.some(person => person.name === newName)) {
      console.log(persons.includes(newName))

        alert(`${newName} is already added to phonebook`)
      }
    else {
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }
    return
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name:
          <input
            value={newName}
            onChange={handleNameChange}
          />
        </div>
        <div>
          number:
          <input
          value={newNumber}
          onChange={handleNumberChange}
          />
        </div>
        <div>
        <button type='submit'>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map(person =>
        <p key={person.name}>
          {person.name} {person.number}
          </p>
        )}
      </div>
    </div>

  )

}

export default App
