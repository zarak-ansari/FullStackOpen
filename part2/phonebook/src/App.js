import { useState } from 'react'

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

const Person = ({ person }) => <p key={person.id}>{person.name} {person.number}</p>

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchInput, setSearchInput] = useState('')


  const addNewName = (event) => {
    event.preventDefault()

    const alreadyInPhoneBook = persons.reduce((isInPhoneBook, person) => person.name === newName || isInPhoneBook, false)

    if (alreadyInPhoneBook) {
      alert(`${newName} is already added to phonebook.`)
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
        id: (persons.length + 1)
      }
      setPersons(persons.concat(newPerson))
      console.log(personsToShow)
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