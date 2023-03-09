import { useState } from 'react'
import Filter from './components/Filter/Filter'
import Form from './components/Form/Form'
import Persons from './components/Persons/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
  ])
  const [newName, setNewName] = useState('')
  const [filteredPersons, setFilteredPersons] = useState([])
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    if (newName === '' || newNumber === '') {
      return
    }
    if (persons.some((e) => e.name === newName)) {
      alert(`${newName} is already added to phonebook`)
      return
    }
    const personObj = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    }
    setPersons((oldArr) => persons.concat(personObj))
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    const filterVal = event.target.value
    setNewFilter(filterVal)
    filterNumbers(filterVal.trim())
  }

  const filterNumbers = (str) => {
    const filteredData = persons.filter((el) => {
      if (str === '') {
        return el
      } else {
        return el.name.toLowerCase().includes(str)
      }
    })
    setFilteredPersons(filteredData)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilterChange={handleFilterChange} newFilter={newFilter} />
      <Form
        addPerson={addPerson}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        newName={newName}
        newNumber={newNumber}
      />
      <h2>Numbers</h2>
      <Persons persons={newFilter.length === 0 ? persons : filteredPersons} />
    </div>
  )
}

export default App
