import axios from 'axios'
import {useState, useEffect} from 'react'

const WeatherData = ({city, cca2}) => {
  const [data, setData] = useState(null)
  const API_KEY = process.env.REACT_APP_OPENWEATHERMAP_API_KEY
  const QUERY = `http://api.openweathermap.org/data/2.5/weather?q=${city},${cca2}&units=metric&APPID=${API_KEY}`

  const getWeatherIcon = description => {
    const baseUrl = 'http://openweathermap.org/img/wn/'
    const descriptionIdentifiers = {
      'clear sky': '01',
      'few clouds': '02',
      'scattered clouds': '03',
      'broken clouds': '04',
      'shower rain': '09',
      rain: '10',
      thunderstorm: '11',
      snow: '13',
      mist: '50',
    }

    if (!(description in descriptionIdentifiers)) {
      return null
    }

    const descriptionIdentifier = descriptionIdentifiers[description]
    const hours = new Date().getHours()
    const dayNightIdentifier = hours >= 6 && hours < 18 ? 'd' : 'n'
    const extension = '@2x.png'
    const fullUrl =
      baseUrl + descriptionIdentifier + dayNightIdentifier + extension

    return <img height='100' width='100' src={fullUrl} alt='Weather icon' />
  }

  const weatherIcon = data ? getWeatherIcon(data.weather[0].description) : null

  useEffect(() => {
    axios.get(QUERY).then(response => setData(response.data))
  }, [QUERY])

  return (
    <>
      {data ? (
        <>
          <h3>Weather in {city}</h3>
          <p>Temperature: {data.main.temp} celcius</p>
          {weatherIcon}
          <p>Wind: {data.wind.speed} m/s</p>
        </>
      ) : null}
    </>
  )
}

export {WeatherData}
