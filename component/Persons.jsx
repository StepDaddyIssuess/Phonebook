const Person = ({ filteredPersons, deletePerson }) => {   
    return (
        <div>
            {filteredPersons.map((p) => (
                <p key={p.id}>
                    {p.name} - {p.number}
                    <button onClick={() => deletePerson(p)}>
                        Delete
                    </button>
                </p>
            ))}
        </div>
    )
}

export default Person;