const PersonForm = ({handleSubmitNewPerson, handleNewNameChange, handleNewNumberChange}) => {
    return (
        <form onSubmit={handleSubmitNewPerson}>
            <div>
            name
            <input onChange={handleNewNameChange} />
            <div>number: <input onChange={handleNewNumberChange} /></div>
            </div>
            <div>
            <button type="submit">add</button>
            </div>
        </form>
    )


}


export default PersonForm