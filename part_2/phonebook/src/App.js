import { useState } from 'react'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')

  const addName = (event) => {
    event.preventDefault()
    const nameObject = {name: newName}
    console.log(nameObject.name, 'uusi nimi')
    console.log(persons, ' lista nimistä')
    console.log(persons.includes(person => person.name === newName), 'onko nimi listassa')


    if (persons.some(person => person.name === newName)) {
      console.log(persons.includes(newName))

        alert(`${newName} is already added to phonebook`)
      }
    else {
      setPersons(persons.concat(nameObject))
      setNewName('')
    }
    return
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
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
        <button type='submit'>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map(person =>
        <p key={person.name}>
          {person.name}
          </p>
        )}
      </div>
    </div>

  )

}

export default App
