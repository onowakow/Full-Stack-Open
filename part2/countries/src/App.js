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

const CountriesList = ({ filteredCountries, onClick }) => {
  return filteredCountries.map((country, i) => (
    <div key={country.population}>
      {country.name.common}
      <button onClick={onClick} value={i}>
        Show
      </button>
    </div>
  ));
};

const Weather = ({capital}) => {
  const [weatherState, setWeatherState] = useState()

   // Load weather JSON for capital
  useEffect(() => {
    axios.get("http://api.weatherstack.com/current", {
      params: { 
        access_key: process.env.REACT_APP_API_KEY,
        query: capital,
        units: 'f'
      }
    })
    .then(response => {
      setWeatherState(response.data)
    })
  }, [capital])

  if (weatherState) {
    const current = weatherState.current
    return (
      <div>
        <h3>Weather in {capital}</h3>
        <b>Temperature</b>
        <p>{current.temperature} F</p>
        <img src={current.weather_icons[0]} alt={current.weather_descriptions[0]} />
        <p><b>Wind:</b> {current.wind_speed} mph {current.wind_dir}</p>
      </div>
    )
  } else {
    return <div>weather loading...</div>
  }

}

const CountrySingleView = ({ country }) => {
  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>capital: {country.capital}</p>
      <p>population: {country.population}</p>
      <h3>Languages</h3>
      <ul>
        <Languages languages={country.languages} />
      </ul>
      <img src={country.flags.png} alt="flag" />
      <Weather capital={country.capital[0]} />
    </div>
  );
};

const Countries = ({ filteredCountries, onClick, single, singleCountry }) => {
  if (filteredCountries.length > 10) {
    return <div>Too many results. Narrow search.</div>;
  }

  // Single country display
  else if (filteredCountries.length === 1) {
    return <CountrySingleView country={filteredCountries[0]} />;
  } else if (single) {
    return <CountrySingleView country={singleCountry} />;
  }

  // If listing countries, check state of countryView. Button updates state
  // List countries (countries > 10)
  return (
    <CountriesList onClick={onClick} filteredCountries={filteredCountries} />
  );
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

  // For single-view
  const [single, setSingle] = useState(false);
  const [singleCountry, setSingleCountry] = useState({});

  const handleClick = (event) => {
    setSingleCountry(filteredCountries[event.target.value]);
    setSingle(true);
  };

  // Load countries API. Second parameter dictates this will load once, the first time app component is loaded
  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setCountries(response.data);
      setFilteredCountries(response.data);
    });
  }, []);

  

  // handles search, filtering countries by their name
  const handleQuery = (event) => {
    event.preventDefault();
    setSingle(false);
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
      <Countries
        onClick={handleClick}
        filteredCountries={filteredCountries}
        single={single}
        singleCountry={singleCountry}
      />
    </div>
  );
};

export default App;
