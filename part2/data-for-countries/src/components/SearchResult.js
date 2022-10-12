import {Button} from './Button'
import {WeatherData} from './WeatherData'

const SearchResult = ({value, detailed, setFilter}) => {
  return (
    <>
      {detailed ? (
        <div>
          <h2>{value.name.common}</h2>
          <p>Capital: {value.capital}</p>
          <p>Area: {value.area}</p>
          <b>languages:</b>
          <ul>
            {Object.keys(value.languages).map(language => (
              <li key={language}>{value.languages[language]}</li>
            ))}
          </ul>
          <img
            height='125'
            width='125'
            src={value.flags.png}
            alt='country flag'
          />
          <WeatherData city={value.capital} cca2={value.cca2} />
        </div>
      ) : (
        <div style={{display: 'flex', alignItems: 'center'}}>
          <p style={{paddingRight: '5px'}}>{value.name.common}</p>
          <Button label='show' onClick={() => setFilter(value.name.common)} />
        </div>
      )}
    </>
  )
}

export {SearchResult}
