import Person from './Person/Person'

const Persons = ({ persons }) => {
  const personsEl = persons.map((person) => (
    <Person key={person.id} name={person.name} number={person.number} />
  ))
  return <>{personsEl}</>
}

export default Persons
