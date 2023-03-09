const Filter = ({ handleFilterChange, newFilter }) => {
  return (
    <>
      <form>
        <div>
          filter shown with:{' '}
          <input onChange={handleFilterChange} value={newFilter} />
        </div>
      </form>
    </>
  )
}

export default Filter
