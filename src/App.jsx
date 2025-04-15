import { useState, useEffect} from 'react'
import PersonForm from "../component/PersonForm";
import Filter from "../component/Filter"
import Persons from "../component/Persons"
import personService from "./services/persons"
import Notification from "../component/Notification"
import ErrorMessage from "../component/ErrorMessage"


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState([])
  const [message, setMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    personService
      .getAllPersons()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const duplicatedName = (name) => {

    const person = persons.find((p) => p.name === name)

    const confirmChange = window.confirm(`Do you wanne change the old number of ${person.name} with the new number ?`)

    if (confirmChange) {
      const newObject = {
        ...person,
        number: newNumber
      }

      personService
        .updatePerson(person.id, newObject)
        .then((updatedPerson) => {
          console.log(updatedPerson.data)
          setPersons(persons.map((p) => (p.id !== person.id ? p : updatedPerson.data)))

          // update message
          setMessage(`Number of ${person.name} is changed!`)
        })
        .catch((error) => {
          console.log(person)
          setErrorMessage(error.response.data.error)
          if (error.response.status === 404) {
            setPersons(persons.filter((p) => p.id !== person.id))
        }

          setTimeout(() => {
            setMessage("")
            setErrorMessage("")
          }, 5000);
        })
    }

  }


  const handleNewNameChange = (e) => {
    setNewName(e.target.value);
  }
  const handleNewNumberChange = (e) => {
    setNewNumber(e.target.value)
  }

  const handleFilterChange = (e) => setFilter(e.target.value.toLowerCase());
  
  const handleSubmitNewPerson = (e) => {
    e.preventDefault()
    // prevent duplicated names
    if (persons.some(p => p.name === newName)) {
      duplicatedName(newName)
      return;
    }

    const newPersonObject = {
      name: newName,
      number: newNumber,
      id: String(persons.length + 1),
    }

    personService.addNewPerson(newPersonObject)
      .then(() => {
        setNewName("")
        setNewNumber("")
        setPersons(persons.concat(newPersonObject));
        setMessage(`Added ${newName}`)
      }).catch(error => {
      setErrorMessage(error.response.data.error)
    })

    // message

    setTimeout(() => {
      setMessage("")
      setErrorMessage("")
    }, 5000)
  }

  const deletePerson = (person) => {

    const deleteConfirmation = window.confirm(`Do you wanne delete ${person.name}`)

    console.log(person)

    if (deleteConfirmation) {
      personService.deletePerson(person.id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== person.id))
        })
        .catch(error => {
          console.log("Errorrrrrr", error)
        })
      
      // Message
      setMessage(`Succesfully deleted ${person.name}`)

      setTimeout(() => {
        setMessage("")
      }, 5000)
    } else {
      setMessage(`Canceled deletion of ${person.name}`)

      setTimeout(() => {
        setMessage("")
      }, 5000)
    }
  }


  const filteredPersons =
    filter.length === 0
      ? persons
      : persons.filter((p) => p.name.toLowerCase().includes(filter));

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={message} />
      <ErrorMessage message={errorMessage} />

      <Filter
        handleFilterChange={handleFilterChange}
      />

      <div>
        <h1>Add a new</h1>
      </div>

      <PersonForm
        handleNewNameChange={handleNewNameChange}
        handleNewNumberChange={handleNewNumberChange}
        handleSubmitNewPerson={handleSubmitNewPerson}
      />


      <h2>Numbers</h2>
      
      <Persons
        filteredPersons={filteredPersons}
        deletePerson={deletePerson}
      />
    </div>
  )
}

export default App