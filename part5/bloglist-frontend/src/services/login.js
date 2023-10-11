import axios from 'axios';
const baseUrl = import.meta.env.VITE_BACKEND_HOST + '/api/login';

const login = async ({ username, password }) => {
  try {
    const response = await axios.post(baseUrl, {
      username,
      password
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default {
  login
};

