const PersonForm = ({ addContact, newName, newNumber, handleNameChange, handleNumberChange }) => {
    return (
        <form onSubmit={addContact}>
            <div>
                <p>name: <input value={newName} onChange={handleNameChange} /></p>
            </div>
            <div>
                <p>number: <input value={newNumber} onChange={handleNumberChange} /></p>
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default PersonForm