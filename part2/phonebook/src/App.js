import axios from 'axios'
import Search from './components/Search'
import People from './components/People'
import PersonForm from './components/PersonForm'
import React, { useState, useEffect } from 'react'



const App = () => {

  // State declarations
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ query, setQuery ] = useState('')

  //Effect Hook
  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])
  

  // Handler functions
  const addPerson = (event) => {
    event.preventDefault()

    // Check if name exists
    const names = persons.map(person => person.name)
    if (names.indexOf(newName) !== -1) {
      // Is this the best place for this alert function? Should it be in another component?
      return alert(`${newName} is already added to the phonebook. Please select a different name.`)
    }

    
    setPersons(persons.concat({
      name: newName,
      number: newNumber,
    }))

    setNewNumber('')
    setNewName('')

  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleQuery = (event) => {
    setQuery(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <h3>Filter shown with</h3>
      <Search handleQuery={handleQuery} />
      <h3>Add new</h3>
      <PersonForm 
        addPerson={addPerson} 
        newName={newName} 
        newNumber={newNumber} 
        handleNumberChange={handleNumberChange}
        handleNameChange={handleNameChange}
      />
      <h3>Numbers</h3>
      <People persons={persons} query={query} />
    </div>
  )
}

export default App;
