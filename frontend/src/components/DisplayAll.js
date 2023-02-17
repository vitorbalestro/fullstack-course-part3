
const DisplayPerson = ({ person, onDelete }) => {
    return (
        <div>
            {person.name} {person.number}&nbsp;
            <button onClick = {() => onDelete(person.id)}> delete </button>
        
        </div>
    )
}

const DisplayAll = ({ persons, onDelete }) => {
    return (
        <>
        <h2>Numbers</h2>
        <div>
            {persons.map(person=><DisplayPerson key={person.id} person={person} onDelete = {onDelete} />)}
        </div>
        </>
    )
}

  export default DisplayAll;