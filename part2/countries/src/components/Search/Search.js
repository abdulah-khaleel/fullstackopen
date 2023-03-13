import React from 'react'

const Search = ({ handleSearchChange, searchString }) => {
  return (
    <form className="search-form">
      <div>
        find countries{' '}
        <input onChange={handleSearchChange} value={searchString}></input>
      </div>
    </form>
  )
}

export default Search
