function getFilteredEntries(persons,filter){
    return ( 
      
      persons.filter(person => person.name.toLowerCase().includes(filter))
    )
}

export default getFilteredEntries;