import axios from "axios";
const baseUrl = "http://localhost:3001/api/persons"

const getAllPersons = () => {
    return axios.get(`${baseUrl}`)
}

const addNewPerson = (newObject) => {
    return axios.post(baseUrl, newObject)
}

const deletePerson = (id) => {
    return axios.delete(`${baseUrl}/${id}`)
}

const updatePerson = (id, newObject) => {
    return axios.put(`${baseUrl}/${id}`, newObject)
}


export default {
    addNewPerson: addNewPerson,
    getAllPersons: getAllPersons,
    deletePerson: deletePerson,
    updatePerson: updatePerson,
}