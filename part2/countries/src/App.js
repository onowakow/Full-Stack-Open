import React, { useState, useEffect } from "react";
import axios from "axios";

const CountriesList = ({ filteredCountries, onClick }) => {
  return filteredCountries.map((country) => (
    <div key={country.population}>
      {country.name.common} 
      <button onClick={onClick} value={country}>Show</button>
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
      <div>{country.flag}</div>
    </div>
  );
};

const Countries = ({ filteredCountries }) => {
  const [isSingleView, setSingleView] = useState(false)
  const [country, setCountry] = useState({})

  const handleShowClick = (event) => {
    setCountry(event.target.value)
    setSingleView(true)
  }

  if (isSingleView) {
    return <CountrySingleView country={country} />
  }

  if (filteredCountries.length > 10) {
    return <div>Too many results. Narrow search.</div>;
  }

  // Single country display
  else if (filteredCountries.length === 1) {
    return <CountrySingleView country={filteredCountries[0]} />;
  }

  // List countries (countries > 10)
  return <CountriesList onClick={handleShowClick} filteredCountries={filteredCountries} />;
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
      <Countries filteredCountries={filteredCountries} />
    </div>
  );
};

export default App;
