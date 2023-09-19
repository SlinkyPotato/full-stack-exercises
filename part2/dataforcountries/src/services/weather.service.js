import axios from 'axios';

const getCurrentWeather = (country) => {
  const weatherApiKey = import.meta.env.VITE_OPEN_WEATHER_API_KEY;
  const lat = country.capitalInfo.latlng[0];
  const lon = country.capitalInfo.latlng[1];

  return axios.get(`https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${lat}&lon=${lon}&appid=${weatherApiKey}`);
};

export default {
  getCurrentWeather,
};