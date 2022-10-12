import {SearchResult} from './SearchResult'

const SearchResults = ({results, setFilter}) => {
  let content
  if (results.length > 10) {
    content = <p>Too many matches, specify another filter</p>
  } else if (results.length < 10 && results.length > 1) {
    content = results.map(result => (
      <SearchResult
        key={result.cca3}
        value={result}
        detailed={false}
        setFilter={setFilter}
      />
    ))
  } else if (results.length === 1) {
    content = (
      <SearchResult value={results[0]} detailed={true} setFilter={setFilter} />
    )
  } else {
    content = <p>No results</p>
  }
  return <div>{content}</div>
}

export {SearchResults}
