const Person = ({ person, deletePerson }) => {
    return (
        <li key={person.name}>
            {person.name} {person.number}
            <button onClick={() => {
                return ( deletePerson(person.id, person.name))
            }}>Delete</button>
        </li>
    )
}

export default Person