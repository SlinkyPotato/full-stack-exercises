const PersonForm = 
({newName, onNameChange, onSubmitPerson, onNumberChange, newNumber}) => {
  return (
    <form onSubmit={onSubmitPerson}>
      <div>
        name: <input onChange={onNameChange} value={newName}/> <br />
      </div>
      <div>
        number: <input onChange={onNumberChange} value={newNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
