import { useEffect, useState } from 'react';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import Filter from './components/Filter';
import phoneService from './services/phoneService';
import Notification from './components/Notification';

function App() {
  const [persons, setPersons] = useState([]);

  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    phoneService.getPersons().then(data => {
      console.log('persons fetched', data);
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
    if (window.confirm(`Delete ${persons.find(person => person.id === id).name}?`)) {
      phoneService.deletePerson(id).then(() => {
        setPersons(persons.filter(person => person.id !== id));
      }).catch(error => {
        console.error('failed to delete person', error);
        setErrorMessage(`Information of ${persons.find(person => person.id === id).name} has already been removed from server`);
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      });
    }
  
  };

  const filterChange = (event) => {
    setFilter(event.target.value);
  };

  const onSubmitPerson = (event) => {
    event.preventDefault();
    let personFound = null;
    let newId = 0;
    for (let person of persons) {
      if (person.name.toLowerCase() === newName.toLowerCase() && person.number === newNumber) {
        alert(`${newName} is already added to phonebook`);
        return;
      }
      if (person.number === newNumber) {
        alert(`number ${newNumber} is already added to phonebook`);
        return;
      }
      if(person.id >= newId) {
        newId = person.id;
      }

      if (person.name.toLowerCase() === newName.toLowerCase() && person.number !== newNumber) {
        personFound = person;
      }
    }

    if(personFound) {
      console.log('person found', personFound);
      const confirm = window.confirm(`${personFound.name} is already added to phonebook, replace the old number with a new one?`);
      if (!confirm) {
        return;
      }
      console.log('attempting to update phone');
      const personObject = {
        number: newNumber,
      };

      phoneService.updatePerson(personFound.id, personObject).then(data => {
        setPersons(persons.map(person => person.id !== personFound.id ? person : data));
        setNewName('');
        setNewNumber('');
        setSuccessMessage(`Updated ${personFound.name}`);
        setTimeout(() => {
          setSuccessMessage(null);
        }, 5000);

      }).catch(error => {
        console.error('failed to update person', error);
        setErrorMessage(error.response.data.error);
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      });
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
      };
      console.log('attempting to add person', personObject);
      phoneService.savePerson(personObject).then(data => {
        setPersons(persons.concat(data));
        setNewName('');
        setNewNumber('');
        setSuccessMessage(`Added ${personObject.name}`);
        setTimeout(() => {
          setSuccessMessage(null);
        }, 5000);
      }).catch(error => {
        console.error('failed to add person', error);
        setErrorMessage(error.response.data.error);
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      });
    }
  };
  
  return (
    <div>
      <Notification success={successMessage} error={errorMessage}/>
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
