import axios from "axios";
const baseUrl = import.meta.env.VITE_API_BASE_URL;

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