import axios from 'axios';

const url = 'http://localhost:3001/persons';

const savePerson = (person) => axios.post(url, person).then(response => response.data);

const getPersons = () => axios.get(url).then(response => response.data);

const deletePerson = (id) => axios.delete(`${url}/${id}`).then(response => response.data);

const updatePerson = (id, person) => axios.put(`${url}/${id}`, person).then(response => response.data);

export default {
  savePerson,
  getPersons,
  deletePerson,
  updatePerson,
};
