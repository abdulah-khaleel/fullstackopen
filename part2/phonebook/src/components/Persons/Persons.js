import Person from './Person/Person'

const Persons = ({ persons, onDeleteClick }) => {
  const personsEl = persons.map((person) => (
    <Person
      key={person.id}
      name={person.name}
      number={person.number}
      onDeleteClick={() => onDeleteClick(person.id)}
    />
  ))
  return <>{personsEl}</>
}

export default Persons
