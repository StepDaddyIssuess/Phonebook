const PersonForm = ({ handleSubmitNewPerson, handleNewNameChange, handleNewNumberChange, newName, newNumber}) => {
    return (
        <form onSubmit={handleSubmitNewPerson}>
            <div>
            name
            <input onChange={handleNewNameChange} value={newName}/>
            <div>number: <input onChange={handleNewNumberChange} value={newNumber}/></div>
            </div>
            <div>
            <button type="submit">add</button>
            </div>
        </form>
    )


}


export default PersonForm