import axios from 'axios'
const baseUrl = import.meta.env.VITE_BACKEND_HOST + '/api/blogs'

const getAll = async () => {
  try {
    const response = await axios.get(baseUrl)
    return response.data
  } catch (error) {
    console.log(error);
    return null;
  }
};

const setToken = (newToken) => {
  axios.defaults.headers.common['Authorization'] = `bearer ${newToken}`
};

const create = async (newObject) => {
  try {
    const response = await axios.post(baseUrl, newObject)
    return response.data
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default {
  getAll,
  setToken,
  create
};