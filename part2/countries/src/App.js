import React, {useState, useEffect} from "react";
import axios from 'axios';

const Countries = ({filteredCountries}) => {
  /* React will render this component before the data is recieved from the API.
    This is an issue because filteredCountries will be null, and calling .length on 
    a null object makes JavaScript sad.

    My solution is to first simply check if filteredCountries is null or not. 
    I'm unsure if there is a better solution (I am guessing there is one.)
  */
  if (filteredCountries) {
    console.log(filteredCountries.length)
  }
  
  
  return (
    <div>
      placeholder text uwu
    </div>
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

  console.log(filteredCountries)

  return (
    <div>
      <h1>Data for countries</h1>
      <form>
        <input onChange={handleQuery} />
      </form>
      <Countries countries={filteredCountries}/>
    </div>
  );
}

export default App;
