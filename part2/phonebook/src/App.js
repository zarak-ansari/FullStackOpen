import { useEffect, useState } from 'react'
// import axios from 'axios'
import { getAll, create } from './components/personsService'

const PersonForm = ({ name, changeName, newNumber, changeNumber, addNewName }) => {
  return (
    <form onSubmit={(e) => addNewName(e)}>
      <div>
        name: <input
          value={name}
          onChange={e => changeName(e.target.value)}
        />
      </div>
      <div>
        number: <input
          value={newNumber}
          onChange={e => changeNumber(e.target.value)}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Filter = ({ searchInput, setSearchInput }) => <input value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />

const Person = ({ person }) => <p key={person.id}>{person.name} {person.number} <button>delete</button></p>

const App = () => {


  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchInput, setSearchInput] = useState('')

  useEffect(() => {
    const initialPersons = getAll()
    setPersons(initialPersons)
  }
    , []
  )

  const addNewName = (event) => {
    event.preventDefault()

    const alreadyInPhoneBook = persons.reduce((isInPhoneBook, person) => person.name === newName || isInPhoneBook, false)

    if (alreadyInPhoneBook) {
      alert(`${newName} is already added to phonebook.`)
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
      }

      const personCreatedOnServer = create(newPerson)
      setPersons(persons.concat(personCreatedOnServer))
    }
  }


  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(searchInput.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>

      <div>
        filter shown with :
        <Filter searchInput={searchInput} setSearchInput={setSearchInput} />

      </div>

      <h2>add a new</h2>
      <PersonForm
        name={newName}
        changeName={setNewName}
        newNumber={newNumber}
        changeNumber={setNewNumber}
        addNewName={addNewName}
      />
      <h2>Numbers</h2>
      {personsToShow.map(person => <Person key={person.id} person={person} />)}
    </div>
  )
}

export default App