const PersonForm = 
({newName, newNameChange, addPerson, newNumberChange, newNumber}) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input onChange={newNameChange} value={newName}/> <br />
      </div>
      <div>
        number: <input onChange={newNumberChange} value={newNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
