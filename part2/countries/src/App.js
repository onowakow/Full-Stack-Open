import React, { useState, useEffect } from "react";
import axios from "axios";

/* Countries component exists in one of 3 states. Countries either displays a 
  "too many results" warning, CountriesList, or SingleCountryView. 
  
  Two different imputs can change these states. First, the length of the
  filtered array: If the array is < 10, a list is shown. If > 10, the warning
  is shown. Finally, if only one country is in the query, the SingleCountryView
  is shown. 
  
  The second input are the "show" buttons, which are rendered alongside the
  countries in the country list. This 'show' button should trigger the SCV.
  
  Making a new search query should reset any previous action by the show button
  */

const CountriesList = ({ filteredCountries }) => {
  console.log(filteredCountries);
  return filteredCountries.map((country) => (
    <div key={country.population}>
      {country.name.common}
      <button>Show</button>
    </div>
  ));
};

const CountrySingleView = ({ country }) => {
  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>capital: {country.capital}</p>
      <p>population: {country.population}</p>
      <h3>languages</h3>
      <ul>
        <Languages languages={country.languages} />
      </ul>
      <img src={country.flags.png} alt="flag" />
    </div>
  );
};

const Countries = ({ filteredCountries }) => {
  if (filteredCountries.length > 10) {
    return <div>Too many results. Narrow search.</div>;
  }

  // Single country display
  else if (filteredCountries.length === 1) {
    return <CountrySingleView country={filteredCountries[0]} />;
  }

  // List countries (countries > 10)
  return <CountriesList filteredCountries={filteredCountries} />;
};

const Languages = ({ languages }) => {
  const languageArray = [];
  for (var key in languages) {
    languageArray.push(languages[key]);
  }
  return languageArray.map((language, i) => <li key={i}>{language}</li>);
};

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  /*countryView state. 0, 1, or 2. 0 is too wide, 1 is single view, 2 is a list */

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setCountries(response.data);
      setFilteredCountries(response.data);
    });
  }, []);

  // handles search, filtering countries by their name
  const handleQuery = (event) => {
    event.preventDefault();
    const filtered = countries.filter((country) =>
      country.name.common
        .toLowerCase()
        .includes(event.target.value.toLowerCase())
    );

    setFilteredCountries(filtered);
  };

  return (
    <div>
      <h1>Data for countries</h1>
      <form>
        <input onChange={handleQuery} />
      </form>
      {/* pass countryView here */}
      <Countries filteredCountries={filteredCountries} />
    </div>
  );
};

export default App;
