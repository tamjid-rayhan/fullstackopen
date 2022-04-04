import { useState } from 'react'

const Person = ({person})=> {
  return (<div>
    {`${person.name} ${person.number}`}
  </div>)
}

const Persons = ({personsToShow}) => {
 return (<>
   {personsToShow.map((person)=> <Person person={person} key={person.id}/>)}
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

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterInput, setFilterInput] = useState('')

  let personsToShow= filterInput? persons.filter((person)=>{
    return person.name.toLowerCase().includes(filterInput.toLowerCase())
  }): persons

  const handleSubmit = (event) => {
    event.preventDefault()
    // console.log('form',event.target)
    
    let addPerson = persons.findIndex((person)=> person.name===newName)<0?true:false;
    if(addPerson){
      let newPerson = {name: newName, number: newNumber, id: persons.length + 1}
      setPersons(persons.concat(newPerson))
    }else{
      window.alert(`${newName} is already added to phoneook`)
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

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter filterInput={filterInput} handleFilterInput={handleFilterInput}/>

      <h2>add a new</h2>
      
      <PersonForm handleSubmit={handleSubmit} newName={newName} handleNewName={handleNewName} newNumber={newNumber} handleNewNumber={handleNewNumber}/>
      
      <h2>Numbers</h2>
      
      <Persons personsToShow={personsToShow}/>  
      
    </div>
  )
}

export default App
