import axios from "axios";

const findCountry = (name) => {
  return axios.get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`);
};

const getAllCountries = () => {
  return axios.get("https://studies.cs.helsinki.fi/restcountries/api/all");
};

export default { 
  findCountry,
  getAllCountries
};