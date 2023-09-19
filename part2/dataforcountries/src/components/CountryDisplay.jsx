import { useEffect, useState } from 'react';
import weatherService from "../services/weather.service";

const CountryDisplay = ({ country, foundCountries, setFoundCountries }) => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    if (foundCountries.length !== 1) {
      return;
    }
    const c = foundCountries[0];
    weatherService.getCurrentWeather(c).then(response => {
      console.log(response.data);
      setWeatherData(response.data);
    }).catch(error => {
      console.log(error);
    });
  }, [foundCountries]);

  if (country === '') {
    return <></>;
  }

  if (foundCountries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  }

  if (foundCountries.length > 1) {
    const foundCountriesElements = foundCountries.map(c => {
      return (
        <p key={c.name.common} style={{margin: 0}}>
          {c.name.common}
          <button style={{marginLeft: 10}} onClick={() => setFoundCountries([c])}>show</button>
        </p>
      );
    });
    return (
      <>
        {foundCountriesElements}
      </>
    );
  }

  if (foundCountries.length === 1) {
    console.log('found single country');
    const c = foundCountries[0];

    return (
      <>
        <h1>{c.name.common}</h1>
        <p>
          capital {c.capital[0]} <br />
          population {c.population}
        </p>
        <h2>languages</h2>
        <ul>
          {Object.values(c.languages).map(l => <li key={l}>{l}</li>)}
        </ul>
        <img src={c.flags.png} alt={c.name.common} width="200" height="200"/>

        {!weatherData ? null : 
        <>
          <h2>Weather in {c.capital[0]}</h2>
          <p><b>temperature:</b> {weatherData.main.temp} Celsius</p>
          <img src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`} alt={weatherData.weather[0].description} />
          <p><b>wind:</b> {weatherData.wind.speed} m/s</p>
        </>
        }
        
      </>
    );
  }

  return (
    <>
    </>
  )
};

export default CountryDisplay;