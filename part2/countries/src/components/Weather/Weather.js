const Weather = ({ cityWeather }) => {
  let weatherComponent = <div className="weather"></div>
  if (cityWeather.cityName.length > 0) {
    let weatherIcon = `https://openweathermap.org/img/wn/${cityWeather.icon}@2x.png`
    weatherComponent = (
      <div className="weather">
        <h2>Weather in {cityWeather.cityName}</h2>
        <p>temperature {cityWeather.temperature} Celcius</p>
        <img src={weatherIcon} alt="logo-weather" />
        <p>wind {cityWeather.windSpeed} k/s</p>
      </div>
    )
  }
  return weatherComponent
}

export default Weather
