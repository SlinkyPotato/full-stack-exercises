import { useEffect, useState } from 'react'
import FindCountries from './components/FindCountries'
import countriesService from './services/countries.service';
import CountryDisplay from './components/CountryDisplay';

function App() {
  const [country, setCountry] = useState('');
  const [countries, setCountries] = useState([]);
  const [foundCountries, setFoundCountries] = useState([]);
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    countriesService.getAllCountries()
      .then(response => {
        setCountries(response.data);
        setIsDisabled(false);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const onCountryChange = (event) => {
    setCountry(event.target.value);
    setFoundCountries([]);

    const filteredCountries = countries.filter(c => c.name.common.toLowerCase().includes(event.target.value.toLowerCase()));
    setFoundCountries(filteredCountries);
  };

  return (
    <>
      <FindCountries country={country} onCountryChange={onCountryChange} isDisabled={isDisabled}/>
      <CountryDisplay country={country} foundCountries={foundCountries} setFoundCountries={setFoundCountries}/>
    </>
  )
}

export default App
