import Weather from '../Weather/Weather'

const Country = ({ country, cityWeather, setCityWeather }) => {
  const styles = { marginTop: 1, marginBottom: 1 }
  const countryLanguages = []
  for (const [key, val] of Object.entries(country.languages)) {
    countryLanguages.push(`${val}`)
  }

  return (
    <div className="country">
      <h1>{country.name.common}</h1>
      <div className="country-stats">
        <p style={styles}>capital {country.capital}</p>
        <p style={styles}>area {country.area}</p>
      </div>
      <h3>languages:</h3>
      <ul>
        {countryLanguages.map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt={country.flags.alt} />
      <Weather cityWeather={cityWeather} />
    </div>
  )
}

export default Country
