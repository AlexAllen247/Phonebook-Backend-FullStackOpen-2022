import { useState, useEffect } from "react"
import Persons from "./components/Persons"
import Filter from "./components/Filter"
import PersonForm from "./components/PersonForm"
import Header from "./components/Header"
import contactService from "./services/Contacts"
import Notification from "./components/Notification"

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [search, setSearch] = useState("")
  const [personSearch, setPersonSearch] = useState([])
  const [message, setMessage] = useState(null)

  const hook = () => {
    contactService
      .getAll()
      .then((initialContact) => {
        setPersons(initialContact)
        setPersonSearch(initialContact)
      })
  }

  useEffect(hook, [])

  useEffect(() => {
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }, [message])

  const addContact = (event) => {
    event.preventDefault()
    const contactObject = {
      name: newName,
      number: newNumber
    }
    const findPerson = persons.find((person) => { return (person.name === contactObject.name) })

    if (findPerson && findPerson.number === newNumber) {
      alert(contactObject)
    } else if (findPerson && findPerson.number !== newNumber) {
      const confirmNumber = window.confirm(`${newName} is already added to the phonebook, do you want to replace the old number with a new one?`)
      if (confirmNumber) {
        const contactUpdate = { ...findPerson, number: newNumber }
        contactService
          .update(findPerson.id, contactUpdate)
          .then((returnedContact) => {
            const updatedPersonList = persons.map((person) => {
              return (person.id !== findPerson.id ? person : returnedContact)
            })
            setPersons(updatedPersonList)
            setPersonSearch(updatedPersonList)
            setMessage(`Updated ${contactObject.name}`)
          })
          .catch((error) => {
            setMessage(`Information of ${contactObject.name} has already been removed from the server`)
          })
      }
    } else {
      contactService
        .create(contactObject)
        .then((returnedContact) => {
          setPersons(persons.concat(returnedContact))
          setPersonSearch(persons.concat(returnedContact))
          setNewName("")
          setNewNumber("")
          setMessage(`Added ${contactObject.name}`)
        })
    }
  }

  const deleteContact = (id, name) => {
    if (window.confirm(`Do you want to delete ${name}?`)) {
      contactService
        .remove(id)
        .then((response) => {
          const updatedList = persons.filter((person) => person.id !== id)
          setPersons(updatedList)
          setPersonSearch(updatedList)
        })
    }
  }

  const handleSearch = (event) => {
    setSearch(event.target.value)
    setPersonSearch(persons.filter((person) => person.name.toLowerCase().includes(event.target.value)))
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <Header header="Phonebook" />
      <Notification message={message} />
      <Filter search={search} handleSearch={handleSearch} />
      <PersonForm addContact={addContact} newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
      <Header header="Numbers" />
      <Persons personSearch={personSearch} deletePerson={deleteContact} />
    </div>
  )
}

export default App