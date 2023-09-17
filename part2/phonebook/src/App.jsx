import { useEffect, useState } from 'react'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'
import axios from 'axios'

function App() {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
  ]);

  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');

  useEffect(() => {
    console.log('effect');
    axios.get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled');
        setPersons(response.data);
      });
  },[]);

  const newNameChange = (event) => {
    setNewName(event.target.value);
  };

  const newNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const filterChange = (event) => {
    setFilter(event.target.value);
  };

  const addPerson = (event) => {
    event.preventDefault();

    for (let person of persons) {
      if (person.name.toLowerCase() === newName.toLowerCase()) {
        alert(`${newName} is already added to phonebook`);
        return;
      }
    }
    console.log('attempting to add person');
    const personObject = {
      name: newName,
      id: persons.length + 1,
      number: newNumber,
    };
    setPersons(persons.concat(personObject));
    setNewName('');
    setNewNumber('');
  };
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        filter={filter}
        filterChange={filterChange}
      />
      <h3>Add a new</h3>
      <PersonForm
        newName={newName}
        newNameChange={newNameChange}
        addPerson={addPerson}
        newNumberChange={newNumberChange}
        newNumber={newNumber}
      />
      <h2>Numbers</h2>
      <Persons
        persons={persons}
        filter={filter}
      />
    </div>
  );
}

export default App
