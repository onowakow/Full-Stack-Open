import React, { useState } from 'react'

// Components
const Person = ({name}) => {
  return (
    <p>{name}</p>
  )
}

const People = ({persons}) => {
  
  return (
    persons.map(( person ) => (
      <Person key={person.name} name={person.name}/>
    ))
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
    if (persons.indexOf({name: newName}) === -1) {
      // Is this the best place for this alert function? Should it be in another component?
      return alert("Name already taken. Please select a different name.")
    }
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
      <People persons={persons} />
    </div>
  )
}

export default App;
