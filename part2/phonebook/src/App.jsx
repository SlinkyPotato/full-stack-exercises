import { useEffect, useState } from 'react'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'
import phoneService from './services/phoneService'


function App() {
  const [persons, setPersons] = useState([]);

  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');

  useEffect(() => {
    console.log('effect');
    phoneService.getPersons().then(data => {
      console.log('promise fulfilled');
      setPersons(data);
    }).catch(error => {
      console.error('failed to fetch persons', error);
    });
  },[]);

  const onNameChange = (event) => {
    setNewName(event.target.value);
  };

  const onNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const onDelete = (id) => {
    console.log('delete button clicked');
    if (window.confirm(`Delete ${persons.find(person => person.id === id).name}?`)) {
      phoneService.deletePerson(id).then(() => {
        console.log('promise fulfilled');
        setPersons(persons.filter(person => person.id !== id));
      }).catch(error => {
        console.error('failed to delete person', error);
      });
    }
  
  };

  const filterChange = (event) => {
    setFilter(event.target.value);
  };

  const onSubmitPerson = (event) => {
    event.preventDefault();
    let isNewPerson = false;
    let personFound = null;
    for (let person of persons) {
      if (person.name.toLowerCase() === newName.toLowerCase() && person.number === newNumber) {
        alert(`${newName} is already added to phonebook`);
        return;
      }
      if (person.number === newNumber) {
        alert(`number ${newNumber} is already added to phonebook`);
        return;
      }
      if (person.name.toLowerCase() === newName.toLowerCase() && person.number !== newNumber) {
        personFound = person;
        break;
      }
    }

    if(personFound) {
      const confirm = window.confirm(`${personFound.name} is already added to phonebook, replace the old number with a new one?`);
      if (!confirm) {
        return;
      }
      console.log('attempting to update phone');
      const personObject = {
        name: personFound.name,
        id: personFound.id,
        number: newNumber,
      };

      phoneService.updatePerson(personFound.id, personObject).then(data => {
        console.log('promise fulfilled');
        setPersons(persons.map(person => person.id !== personFound.id ? person : data));
        setNewName('');
        setNewNumber('');
      }).catch(error => {
        console.error('failed to update person', error);
      });
    }

    if(isNewPerson) {
      console.log('attempting to add person');
      const personObject = {
        name: newName,
        id: persons.length + 1,
        number: newNumber,
      };

      phoneService.savePerson(personObject).then(data => {
        console.log('promise fulfilled');
        setPersons(persons.concat(data));
        setNewName('');
        setNewNumber('');
      }).catch(error => {
        console.error('failed to save person', error);
      });
    }
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
        newNumber={newNumber}
        onNameChange={onNameChange}
        onSubmitPerson={onSubmitPerson}
        onNumberChange={onNumberChange}
      />
      <h2>Numbers</h2>
      <Persons
        persons={persons}
        filter={filter}
        onDelete={onDelete}
      />
    </div>
  );
}

export default App
