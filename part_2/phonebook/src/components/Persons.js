import React from 'react';

const Persons = ({personsToShow, handlePersonDelete}) => {
    return (
    <div>
          {personsToShow.map(person =>
          <p key={person.id}>
            {person.name} {person.number} {' '}
            <button onClick={() => handlePersonDelete(person)}>Delete</button>
          </p>
          )}
    </div>
    )
  }

export default Persons