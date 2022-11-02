import Person from "./Person"

const Persons = ({ personSearch, deletePerson }) => {
    return (
        <div>
            <ul>
                {Object.values(personSearch).map((person) => (
                    <Person key={person.name} person={person} deletePerson={deletePerson}/>
                ))}
            </ul>
        </div>
    )
}

export default Persons