import { useState } from 'react'
import { findRenderedDOMComponentWithClass } from 'react-dom/test-utils'

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
    filterNumbers(filterVal)
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

  const displayNumbers = (arr) => {
    return arr.map((person) => (
      <p key={person.id}>
        {person.name} {'   '}
        {person.number}
      </p>
    ))
  }

  let numbersEl
  if (newFilter.length === 0) {
    numbersEl = displayNumbers(persons)
  } else {
    numbersEl = displayNumbers(filteredPersons)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          filter shown with:{' '}
          <input onChange={handleFilterChange} value={newFilter} />
        </div>
      </form>
      <h2>add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input onChange={handleNameChange} value={newName} />
        </div>
        <div>
          number: <input onChange={handleNumberChange} />
        </div>

        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>{numbersEl}</div>
    </div>
  )
}

export default App
