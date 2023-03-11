import Button from '../../Button/Button'

const Person = ({ name, number, onDeleteClick }) => {
  return (
    <div>
      <p style={{ display: 'inline' }}>
        {name} {number}
      </p>
      <Button onDeleteClick={onDeleteClick}>delete</Button>
    </div>
  )
}

export default Person
