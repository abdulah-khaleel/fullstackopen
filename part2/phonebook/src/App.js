import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas' }])
  const [newName, setNewName] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    console.log(event.target.value)
    if (persons.some((e) => e.name === newName)) {
      alert(`${newName} is already added to phonebook`)
      return
    }
    const personObj = {
      name: newName,
    }
    setPersons((oldArr) => persons.concat(personObj))
    setNewName('')
  }

  // const checkName = (arr) => {
  //   if (arr.)
  // }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const numbersEl = persons.map((person) => (
    <p key={Math.random()}>{person.name}</p>
  ))

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input onChange={handleNameChange} value={newName} />
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
