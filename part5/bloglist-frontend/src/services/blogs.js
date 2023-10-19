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
  axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
};

const create = async (newObject, setUser) => {
  try {
    const response = await axios.post(baseUrl, newObject, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data
  } catch (error) {
    if (error.response.status === 401) {
      window.localStorage.removeItem('loggedUser');
      setUser(null);
    }
    console.log(error);
    return null;
  }
};

const updateLikesForBlog = async (blog, user, setUser) => {
  try {
    const response = await axios.patch(`${baseUrl}/${blog.id}`, {
      likes: blog.likes + 1,
      user: user,
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data
  } catch (error) {
    if (error.response.status === 401) {
      window.localStorage.removeItem('loggedUser');
      setUser(null);
    }
    console.log(error);
    return null;
  }
};

const deleteBlog = async (blog, setUser) => {
  try {
    await axios.delete(`${baseUrl}/${blog.id}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    if (error.response.status === 401) {
      window.localStorage.removeItem('loggedUser');
      setUser(null);
    }
    console.log(error);
  }
};

export default {
  getAll,
  setToken,
  create,
  updateLikesForBlog,
  deleteBlog,
};