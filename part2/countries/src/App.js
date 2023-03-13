import { useState, useEffect } from 'react'
import Search from './components/Search/Search'
import Country from './components/Country/Country'
import axios from 'axios'

function App() {
  const [searchString, setSearchString] = useState('')
  const [errorMessage, setErrorMessage] = useState(
    'Too many matching countries ..'
  )
  const [country, setCountry] = useState(null)
  const [resultList, setResultList] = useState([])

  useEffect(() => {
    const fetchTimer = setTimeout(() => {
      if (searchString.length > 0) {
        console.log('fetching api ..')
        axios
          .get(`https://restcountries.com/v3.1/name/${searchString}`)
          .then((response) => {
            console.log('promise fulfilled')
            const res = response.data
            if (res.length === 1) {
              setCountry((oldCountry) => response.data[0])
              console.log(response.data[0])
              setResultList([])
            } else if (res.length > 1 && res.length < 10) {
              const searchMatch = res.map((country) => country.name.common)
              setResultList((x) => searchMatch)
              setCountry(null)
            } else {
              console.log('more than 10 matches')
              setResultList(['too many matches ..'])
              setCountry(null)
            }
          })
          .catch((error) => {
            console.log(error)
            setResultList(['no results found ..'])
            setCountry(null)
          })
      }
    }, 700)
    return () => {
      // cleanup function
      console.log('CLEAN UP')
      clearTimeout(fetchTimer)
    }
  }, [searchString])

  const onSearchChange = (event) => {
    setSearchString(event.target.value)
  }

  const SearchResult = () => {
    const styles = { marginTop: 1, marginBottom: 1 }
    let searchResultList = null
    if (resultList.length >= 1) {
      searchResultList = resultList.map((item) => (
        <p key={item} style={styles}>
          {item}
        </p>
      ))
    }
    return searchResultList
  }

  return (
    <div className="App">
      <Search handleSearchChange={onSearchChange} searchString={searchString} />
      <SearchResult />
      {country !== null ? <Country country={country} /> : ''}
    </div>
  )
}

export default App
