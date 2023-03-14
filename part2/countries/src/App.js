import { useState, useEffect } from 'react'
import Search from './components/Search/Search'
import Country from './components/Country/Country'
import SearchResult from './components/SearchResult/SearchResult'
import axios from 'axios'

const ErrorMessageComponent = (props) => {
  return <p>{props.message}</p>
}

function App() {
  const [searchString, setSearchString] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [country, setCountry] = useState(null)
  const [cityWeather, setCityWeather] = useState({
    cityName: '',
    temperature: '',
    windSpeed: '',
    icon: '',
  })
  const [resultList, setResultList] = useState([])

  useEffect(() => {
    const fetchTimer = setTimeout(() => {
      if (searchString.length > 0) {
        axios
          .get(`https://restcountries.com/v3.1/name/${searchString}`)
          .then((response) => {
            const res = response.data
            if (res.length === 1) {
              setCountry((oldCountry) => response.data[0])
              setResultList([])
              setErrorMessage(null)
              getWeather(`${response.data[0].capital}`)
            } else if (res.length > 1 && res.length < 10) {
              const searchMatch = res.map((country) => country.name.common)
              setResultList((x) => searchMatch)
              setErrorMessage(null)
              setCountry(null)
            } else {
              setErrorMessage('too many matches ..')
              setCountry(null)
              setResultList([])
            }
          })
          .catch((error) => {
            setErrorMessage('no match found ..')
            setCountry(null)
          })
      }
    }, 300)
    return () => {
      // cleanup function
      clearTimeout(fetchTimer)
    }
  }, [searchString])

  const getWeather = (cityName) => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=${api_key}&units=metric`
      )
      .then((response) => {
        const res = response.data
        const cityWeatherObj = {
          cityName: cityName,
          temperature: res.main.temp,
          windSpeed: res.wind.speed,
          icon: res.weather[0].icon,
        }
        setCityWeather((oldV) => cityWeatherObj)
      })
  }

  const api_key = process.env.REACT_APP_API_KEY

  const onSearchChange = (event) => {
    setSearchString(event.target.value)
  }

  const showCountryHandler = (item) => {
    axios
      .get(`https://restcountries.com/v3.1/name/${item}`)
      .then((response) => {
        const res = response.data
        if (res.length === 1) {
          setCountry((oldCountry) => response.data[0])
          getWeather(`${response.data[0].capital}`)
          setResultList([])
          setErrorMessage(null)
        } else if (res.length > 1) {
        }
      })
      .catch((error) => {
        setErrorMessage('no match found')
        setCountry(null)
      })
  }

  return (
    <div className="App">
      <Search handleSearchChange={onSearchChange} searchString={searchString} />
      {errorMessage ? <ErrorMessageComponent message={errorMessage} /> : ''}
      <SearchResult resultList={resultList} onShowClick={showCountryHandler} />
      {country ? <Country country={country} cityWeather={cityWeather} /> : ''}
    </div>
  )
}

export default App
