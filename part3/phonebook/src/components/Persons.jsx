const Persons = ({ persons, filter, onDelete }) => {
  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase()));

  return (
    <div>
      {
        filteredPersons.map((person) => 
          <p key={person.name}>{person.name} {person.number} 
            <button key={person.name} onClick={() => onDelete(person.id)}>delete</button>
          </p>
        )
      }
    </div>
  );
};

export default Persons;