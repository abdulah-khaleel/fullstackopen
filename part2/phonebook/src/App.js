import React, { useEffect, useState } from 'react'
import Filter from './components/Filter/Filter'
import Form from './components/Form/Form'
import Persons from './components/Persons/Persons'
import axios from 'axios'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [filteredPersons, setFilteredPersons] = useState([])
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    personService.getAll().then((a) => {
      setPersons(a)
    })
  }, [])
  console.log('render', persons.length, 'persons')

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
    }
    personService.create(personObj).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson))
      setNewName('')
      setNewNumber('')
    })
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
