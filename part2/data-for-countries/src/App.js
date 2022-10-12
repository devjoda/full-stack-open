import {useState, useEffect} from 'react'
import axios from 'axios'
import {SearchField} from './components/SearchField'
import {SearchResults} from './components/SearchResults'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filterCountry, setFilterCountry] = useState('')

  const filteredCountries =
    filterCountry.length > 0
      ? countries.filter(country =>
          country.name.common
            .toLowerCase()
            .includes(filterCountry.toLowerCase()),
        )
      : null

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all').then(response => {
      setCountries(response.data)
    })
  }, [])

  const handleOnChange = e => {
    setFilterCountry(e.target.value)
  }

  return (
    <div>
      <SearchField
        label='Find countries'
        value={filterCountry}
        onChange={handleOnChange}
      />
      {filteredCountries ? (
        <SearchResults
          results={filteredCountries}
          setFilter={setFilterCountry}
        />
      ) : null}
    </div>
  )
}

export {App}
