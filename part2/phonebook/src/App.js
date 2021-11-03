import React, { useState } from 'react'

// Components
const Person = ({person}) => {
  return (
    <p>{person.name} {person.number}</p>
  )
}

const People = ({persons}) => {
  
  return (
    persons.map(( person ) => (
      <Person key={person.name} person={person}/>
    ))
  )
}

const App = () => {

  // State declarations
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456'},
    { name: 'Ada Lovelace', number: '39-44-5323523'},
    { name: 'Dan Abramov', number: '12-43-234345'},
    { name: 'Mary Poppendieck', number: '39-23-6423122'}
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filteredPersons, setFilter ] = useState(persons)
  
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
    const newPersons = persons.filter(person => (
      person
      .name
      .toLowerCase()
      .includes(event.target.value.toLowerCase())
    ))
    setFilter(newPersons)
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <h3>Filter shown with</h3>
      <form>
        <div>
          query: <input onChange={handleQuery} />
        </div>
      </form>
      <h3>Add new</h3>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h3>Numbers</h3>
      <People persons={filteredPersons} />
    </div>
  )
}

export default App;
