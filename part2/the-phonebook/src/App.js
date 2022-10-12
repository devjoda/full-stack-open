import {useState, useEffect} from 'react'
import {Filter} from './components/Filter'
import {PersonForm} from './components/PersonForm'
import {Persons} from './components/Persons'
import {Notification} from './components/Notification'
import {personsService} from './services/persons'
import * as validate from './utils/validate'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')
  const [notificationMessageType, setNotificationType] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState(null)

  //prettier-ignore
  useEffect(() => {
    personsService
      .getPersons()
      .then(persons => {
        setPersons(persons)
      })
  }, [])

  const validatePerson = () => {
    return Promise.all([
      validate.stringIsNotEmpty(newName, 'Name cannot be empty'),
      validate.lengthIsGreaterThan(
        newNumber,
        7,
        'Number must be at least 7 digits',
      ),
      validate.numberIsNumeric(newNumber, 'Number must be numeric'),
    ])
  }

  const handleOnChangeName = event => {
    setNewName(event.target.value)
  }

  const handleOnChangeNumber = event => {
    setNewNumber(event.target.value)
  }

  const handleOnChangeFilterName = event => {
    setFilterName(event.target.value)
  }

  const handleOnClickDeleteNumber = id => {
    const person = persons.find(p => p.id === id)
    if (window.confirm(`Delete ${person.name} from phone book?`)) {
      const updatedPersons = persons.filter(p => p.id !== id)
      personsService.deletePerson(id).catch(e => console.error(e))
      setPersons(updatedPersons)
    }
  }

  const showNotification = (type, message) => {
    setNotificationType(type)
    setNotificationMessage(message)
    setTimeout(() => {
      setNotificationType(null)
      setNotificationMessage(null)
    }, 3500)
  }

  const clearPersonForm = () => {
    setNewName('')
    setNewNumber('')
  }

  const handleSubmit = async event => {
    event.preventDefault()
    const newPerson = {name: newName, number: newNumber}
    try {
      await validatePerson()
    } catch (error) {
      showNotification('error', error)
      return
    }
    try {
      await validate.arrayDoesNotContainObjectWithProperty(
        persons,
        'name',
        newName,
        `${newName} is already added to phonebook. Do you want to replace the old number with a new one?`,
      )
    } catch (e) {
      if (window.confirm(e)) {
        updatePerson(newPerson)
        return
      } else {
        return
      }
    }
    addPerson(newPerson)
    clearPersonForm()
  }

  //prettier-ignore
  const addPerson = newPerson => {
    personsService
    .createPerson(newPerson)
    .then(returnedPerson => {
      setPersons([...persons, returnedPerson])
      showNotification('success', `Added ${newPerson.name}`)
    }).catch(error => {
      showNotification('error', error.message)
    })
    clearPersonForm()
  }

  const updatePerson = newPerson => {
    const id = persons.find(p => p.name === newPerson.name).id
    const newPersonCopy = {...newPerson, id}
    personsService
      .updatePerson(id, newPersonCopy)
      .then(returnedPerson => {
        const updatedPersons = persons.map(person =>
          person.name !== newPerson.name ? person : returnedPerson,
        )
        setPersons(updatedPersons)
        showNotification(
          'success',
          `Succesfully updated ${newPerson.name}'s number`,
        )
      })
      .catch(error => {
        if (error.code === 'ERR_BAD_REQUEST') {
          const customMessage = `Information of ${newPersonCopy.name} has already been removed from server`
          showNotification('error', customMessage)
        } else {
          console.log('error', error.message)
        }
      })
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification
        type={notificationMessageType}
        message={notificationMessage}
      />
      <Filter
        label='Filter by name'
        filter={filterName}
        onChange={handleOnChangeFilterName}
      />
      <h3>Add a new</h3>
      <PersonForm
        name={newName}
        number={newNumber}
        onSubmit={handleSubmit}
        onChangeName={handleOnChangeName}
        onChangeNumber={handleOnChangeNumber}
      />
      <h3>Numbers</h3>
      <Persons
        persons={persons}
        filter={filterName}
        onClickDeleteNumber={handleOnClickDeleteNumber}
      />
    </div>
  )
}

export default App
