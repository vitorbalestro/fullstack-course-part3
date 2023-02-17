import { useState, useEffect } from 'react'
import personService from './services/persons.js'
import AddForm from './components/AddForm'
import DisplayAll from './components/DisplayAll'
import FilterForm from './components/FilterForm'
import getFilteredEntries from './components/Filter'
import Notification from './components/Notifications'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState(null)
  const [notificationType, setNotificationType] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => setPersons(initialPersons))
  },[])

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    for(var person of persons){
      if(person.name === newName){
        
        if(window.confirm(`${newName} is already added to the phonebook. Replace the old number with a new one?`)){
          
          personService 
            .update(person.id,personObject).then(returnedPerson =>{
              setPersons(persons.map(person => person.id === returnedPerson.id ? returnedPerson : person))
              setNewName('')
              setNewNumber('')
            })
            .catch(error => {
              console.log(error.response.data.error)
              setNotification(error.response.data.error)
              setNotificationType('error')
              setNewName('')
              setNewNumber('')
              setTimeout(()=> {
                setNotification(null)
                setNotificationType('')
                
              },3000)
            })
            
          return
        }
        return
      }
    }
    personService
      .create(personObject)
      .then(newPerson => {
        setPersons(persons.concat(newPerson))
        setNotificationType('success')
        setNotification(`Added ${newPerson.name}`)
        setTimeout(() => {
          setNotification(null)
          setNotificationType('')
      },3000)
      }).catch(error => {
        console.log(error.response.data.error)
        setNotification(error.response.data.error)
        setNotificationType('error')
        setNewName('')
        setNewNumber('')
        setTimeout(()=> {
          setNotification(null)
          setNotificationType('')
          
        },3000)
      })
    setNewName('')
    setNewNumber('')
    
  }

  const deletePerson = (id) => {
    
    var name = persons.find(person => person.id === id).name
    if(window.confirm(`Delete ${name}`)){
      personService 
        .del(id)
        .then(() => setPersons(persons.filter(person => person.id !== id)))
    }
  }
  
  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleFilterChange = (event) => setFilter(event.target.value)
     
 

  return(
    <div>
      <h2>Phonebook</h2>
      <Notification message = {notification} notificationType = {notificationType} />
      <FilterForm handleFilterChange={handleFilterChange} />
      <AddForm addPerson={addPerson} newName={newName} newNumber={newNumber} 
      handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}/>
      <DisplayAll persons= {getFilteredEntries(persons,filter)} onDelete = {deletePerson}/>
    </div>
  )
}

export default App;