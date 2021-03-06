import axios from 'axios'
import { useState, useEffect } from 'react'

import personService from './services/persons'


const Person = ({person, handleDelete})=> {
  return (<div>
    {`${person.name} ${person.number}`}
    <button onClick={handleDelete}>delete</button>
  </div>)
}

const Persons = ({personsToShow ,handleDeleteID}) => {

  

 return (<>
   {personsToShow.map((person)=> <Person person={person} key={person.id}
     handleDelete={()=>handleDeleteID(person.id)}
   />)}
 </>)
}

const PersonForm = ({handleSubmit, newName, handleNewName, newNumber, handleNewNumber}) => {
  return (<form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleNewName}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNewNumber}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>)
}

const Filter = ({filterInput, handleFilterInput}) => {
  return (
    <div>filter shown with<input value={filterInput} onChange={handleFilterInput}/></div>
  )
}

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className='error'>
      {message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterInput, setFilterInput] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(()=>{
    personService
        .getAll()
        .then((personsData=>{
          setPersons(personsData)
        }))
  }, [])
  console.log('render', persons.length, 'persons');

  let personsToShow= filterInput? persons.filter((person)=>{
    return person.name.toLowerCase().includes(filterInput.toLowerCase())
  }): persons

  const handleSubmit = (event) => {
    event.preventDefault()
    // console.log('form',event.target)
    
    let addPerson = persons.findIndex((person)=> person.name===newName)<0?true:false;
    if(addPerson){
      let newPerson = {name: newName, number: newNumber}
      personService
          .create(newPerson)
          .then((newPersonS)=> {
            setPersons(persons.concat(newPersonS))
            setErrorMessage(`Added ${newPersonS.name}`)
            setTimeout(()=> setErrorMessage(null), 2000)
          })
    }else{
      if(window.confirm(`${newName} is already added to phoneook, replace the old number with a new one?`)){
        let person = persons.find((person)=> person.name===newName)
        let updatedPerson = {...person, number:newNumber}
        personService
              .update(updatedPerson)
              .then((updatedPerson)=>{
                let removePerson = persons.filter((p)=>p.id !==updatedPerson.id)
                setPersons(removePerson.concat(updatedPerson))
                setErrorMessage(`Changed ${updatedPerson.name}'s number!`)
                setTimeout(()=> setErrorMessage(null), 2000)
              })
              .catch(error=> {
                console.log('error in update', error);
                let removePerson = persons.filter((p)=>p.id !==updatedPerson.id)
                setPersons(removePerson)
                setErrorMessage(`${person.name} is already deleted from phonebook!`)
                setTimeout(()=> setErrorMessage(null), 2000)
              })
      }
    }
    setNewName('')
    setNewNumber('')
  }

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterInput = (event) => {
    console.log('filter input ', event.target.value)
    setFilterInput(event.target.value)
  }

  const handleDeleteID = (id)=>{
    const person = persons.find((p)=>p.id===id)
    const msg = `Delete ${person.name} ?`
    if (window.confirm(msg)){
      personService
                .deleteID(id)
                .then((r)=>{
                  console.log(r.status);
                  setPersons(persons.filter((p)=> p.id!==id))
                })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={errorMessage}/>

      <Filter filterInput={filterInput} handleFilterInput={handleFilterInput}/>

      <h2>add a new</h2>
      
      <PersonForm handleSubmit={handleSubmit} newName={newName} handleNewName={handleNewName} newNumber={newNumber} handleNewNumber={handleNewNumber}/>
      
      <h2>Numbers</h2>
      
      <Persons personsToShow={personsToShow} handleDeleteID={handleDeleteID}/>  
      
    </div>
  )
}

export default App
