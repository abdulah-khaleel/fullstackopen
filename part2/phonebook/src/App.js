import React, { useEffect, useState } from 'react'
import Filter from './components/Filter/Filter'
import Form from './components/Form/Form'
import Persons from './components/Persons/Persons'
import axios from 'axios'
import personService from './services/persons'
import Button from './components/Button/Button'
import Notification from './components/Notification/Notification'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [filteredPersons, setFilteredPersons] = useState([])
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    personService.getAll().then((a) => {
      setPersons(a)
    })
  }, [])

  const displayNotification = (message) => {
    setErrorMessage(`${message}`)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  const clearFields = () => {
    setNewName('')
    setNewNumber('')
  }

  const addPerson = (event) => {
    event.preventDefault()
    if (newName === '' || newNumber === '') {
      return
    }
    if (persons.some((e) => e.name === newName)) {
      const matchingId = persons.find((p) => p.name === newName).id
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with the new one?`
        )
      ) {
        const personObj = {
          name: newName,
          number: newNumber,
        }
        personService.update(matchingId, personObj).then((returnedPerson) => {
          setPersons(
            persons.map((person) =>
              person.id !== matchingId ? person : returnedPerson
            )
          )
        })
        clearFields()
        displayNotification(`Updated ${personObj.name}'s number`)
      }

      return
    }
    const personObj = {
      name: newName,
      number: newNumber,
    }
    personService.create(personObj).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson))
      clearFields()
      displayNotification(`Added ${returnedPerson.name}`)
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

  const deleteHandler = (id) => {
    if (window.confirm(`Delete ${persons.find((p) => p.id === id).name}?`)) {
      personService.deletePerson(id)
      setPersons(persons.filter((person) => person.id !== id))
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} />
      <Filter handleFilterChange={handleFilterChange} newFilter={newFilter} />
      <Form
        addPerson={addPerson}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        newName={newName}
        newNumber={newNumber}
      />
      <h2>Numbers</h2>
      <Persons
        persons={newFilter.length === 0 ? persons : filteredPersons}
        onDeleteClick={deleteHandler}
      />
    </div>
  )
}

export default App
