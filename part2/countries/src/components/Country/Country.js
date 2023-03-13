const Country = ({ country }) => {
  const countryLanguages = []
  for (const [key, val] of Object.entries(country.languages)) {
    countryLanguages.push(`${val}`)
  }
  console.log('t', countryLanguages)

  return (
    <div className="country">
      <h1>{country.name.common}</h1>
      <div className="country-stats">
        <p>capital {country.capital}</p>
        <p>area {country.area}</p>
      </div>
      <h3>languages:</h3>
      <ul>
        {countryLanguages.map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt={country.flags.alt} />
    </div>
  )
}

export default Country
