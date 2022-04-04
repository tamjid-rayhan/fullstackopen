import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')


  const handleSubmit = (event) => {
    event.preventDefault()
    // console.log('form',event.target)
    
    let addPerson = persons.findIndex((person)=> person.name===newName)<0?true:false;
    if(addPerson){
      let newPerson = {name: newName, number: newNumber}
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

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleNewName}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNewNumber}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person)=> <div>{`${person.name} ${person.number}`}</div>)}
    </div>
  )
}

export default App
