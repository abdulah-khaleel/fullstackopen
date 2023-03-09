const Form = ({
  addPerson,
  handleNameChange,
  handleNumberChange,
  newName,
  newNumber,
}) => {
  return (
    <>
      <h2>add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input onChange={handleNameChange} value={newName} />
        </div>
        <div>
          number: <input onChange={handleNumberChange} value={newNumber} />
        </div>

        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  )
}

export default Form
