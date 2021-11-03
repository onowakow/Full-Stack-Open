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
    event.preventDefault()

    // Check if name exists
    const names = persons.map(person => person.name)
    console.log(names)
    if (names.indexOf(newName) !== -1) {
      // Is this the best place for this alert function? Should it be in another component?
      return alert(`${newName} already taken. Please select a different name.`)
    }

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
