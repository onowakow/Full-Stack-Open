import Search from './components/Search'
import People from './components/People'
import PersonForm from './components/PersonForm'
import React, { useState, useEffect } from 'react'
import personService from './services/persons'

const App = () => {

  // State declarations
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ query, setQuery ] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response)
      })
  }, [])
  

  // Handler functions
  const addPerson = (event) => {
    event.preventDefault()

    const newPerson = {
      name: newName,
      number: newNumber
    }

    // Check if name exists
    const names = persons.map(person => person.name)
    if (names.indexOf(newName) !== -1) {
      // Is this the best place for this alert function? Should it be in another component?
      return alert(`${newName} is already added to the phonebook. Please select a different name.`)
    }

    personService
      .create(newPerson)
      .then(response => {
        setPersons(persons.concat(response))
        setNewNumber('')
        setNewName('')
      })
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

  const handleDelete = (event) => {
    // value is a string. Must be parsed for strict equality.
    const id = parseInt(event.target.value)
    const name = persons.find(person => person.id === id).name
    const isConfirmDelete = window.confirm(`Are you sure you want to delete ${name}?`)
    if (isConfirmDelete) {
      personService
        .remove(id)
        .then(response => 
          setPersons(persons
            .filter(person => person.id !== id))
        )
    }
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
      <People handleDelete={handleDelete} persons={persons} query={query} />
    </div>
  )
}

export default App;
