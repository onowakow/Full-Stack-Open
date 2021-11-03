import React, { useState } from 'react'

// Components
const Person = ({name}) => {
  return (
    <p>{name}</p>
  )
}

const App = () => {

  // State declarations
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')
  
  // Handler functions
  const addPerson = (event) => {
    event.preventDefault()
    setPersons(persons.concat({name: newName}))
    setNewName('')
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {/* Key is set to index. Not a good practice, but I lack guidance on better alternatives. */}
      {persons.map( (person, i) => (
        <Person key={i} name={person.name}/>
      ))}
    </div>
  )
}

export default App;
