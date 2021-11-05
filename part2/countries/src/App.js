import React, {useState, useEffect} from "react";
import axios from 'axios';

const Countries = ({ filteredCountries }) => {
  if (filteredCountries.length > 10) {
    return <div>Too many results. Narrow search.</div>
  }

  // Populations seem to be random enough for a key, given the scope of this application
  return (
    filteredCountries.map(country => (
      <div key={country.population}>
        {country.name.common}
      </div>
    ))
  )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
        setFilteredCountries(response.data)
      })
  }, [])

  // handles search, filtering countries by their name
  const handleQuery = (event) => {
    const filtered = countries.filter(country => 
      (country.name.common
        .toLowerCase()
        .includes(event.target.value.toLowerCase())
      )
    )

    setFilteredCountries(filtered)
  }
  
  return (
    <div>
      <h1>Data for countries</h1>
      <form>
        <input onChange={handleQuery} />
      </form>
      <Countries filteredCountries={filteredCountries}/>
    </div>
  );
}

export default App;
