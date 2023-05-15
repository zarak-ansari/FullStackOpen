import { useEffect, useState } from 'react'
import personsService from './components/personsService'

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

const Person = ({ person, deletePerson }) => <p key={person.id}>{person.name} {person.number} <button onClick={() => deletePerson(person)}>delete</button></p>

const notificationStyles = {
  color: 'green',
  background: 'lightgrey',
  fontSize: 20,
  borderStyle: 'solid',
  borderRadius: 5,
  padding: 10,
  marginBottom: 10
}
const errorStyles = {
  ...notificationStyles,
  color: 'red'
}

const Notification = ({ message }) => {

  if (message === null) return <div></div>

  return <div style={notificationStyles}>{message}</div>
}

const ErrorNotification = ({ errorMessage }) => {
  if (errorMessage === null) return <div></div>

  return <div style={errorStyles}>{errorMessage}</div>

}

const App = () => {


  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchInput, setSearchInput] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)


  useEffect(() => {
    personsService
      .getAll()
      .then(initialPersons => setPersons(initialPersons))
  }
    , []
  )

  const displayNotification = (message) => {
    setNotificationMessage(message)
    setTimeout(() => setNotificationMessage(null), 5000)
  }

  const displayErrorNotification = (errorMessage) => {
    setErrorMessage(errorMessage)
    setTimeout(() => setErrorMessage(null), 5000)
  }

  const addNewPerson = (event) => {
    event.preventDefault()

    const personWithSameName = persons.find(person => person.name === newName)

    if (personWithSameName) {
      const userWantsToUpdate = window.confirm(`${newName} is already added to phonebook. Replace the old number with a new one?`)
      if (userWantsToUpdate) {
        const updatedPerson = {
          ...personWithSameName,
          number: newNumber
        }
        personsService
          .updatePerson(personWithSameName.id, updatedPerson)
          .then(updatedPersonReceived => setPersons(persons.map(person => person.id !== updatedPersonReceived.id ? person : updatedPersonReceived)))
          .catch(err => {
            displayErrorNotification(`Information for ${updatedPerson.name} has already been removed from server`)
          })

      }
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
      }
      displayNotification(`Added ${newPerson.name}`)
      personsService
        .create(newPerson)
        .then(createdPerson => setPersons(persons.concat(createdPerson)))
    }
  }

  const deletePerson = person => {
    const confirmed = window.confirm(`Do you want to delete ${person.name}?`)
    if (confirmed) {
      personsService
        .deletePerson(person.id)
        .then(setPersons(persons.filter(personInList => personInList.id !== person.id)))
        .catch(err => {
          displayErrorNotification(`Information for ${person.name} already removed from server`)
        })
    }
  }

  const personsToShow = persons.length > 0 ? persons.filter(person => person.name.toLowerCase().includes(searchInput.toLowerCase())) : []

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} />
      <ErrorNotification errorMessage={errorMessage} />
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
        addNewName={addNewPerson}
      />
      <h2>Numbers</h2>
      {personsToShow.map(person => <Person key={person.id} person={person} deletePerson={deletePerson} />)}
    </div>
  )
}

export default App