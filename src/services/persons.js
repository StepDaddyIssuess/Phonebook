import axios from "axios";
const baseUrl = import.meta.env.VITE_API_BASE_URL;

const getAllPersons = () => {
    const req = axios.get(`${baseUrl}`)
    return req.then(res => res.data)
}

const addNewPerson = (newObject) => {
    const req = axios.post(baseUrl, newObject)
    return req.then(res => res.data)
}

const deletePerson = (id) => {
    const req = axios.delete(`${baseUrl}/${id}`)
    return req.then(res => res.data)
}

const updatePerson = (id, newObject) => {
    const req = axios.put(`${baseUrl}/${id}`, newObject)
    return req.then(res => res.data)
}


export default {
    addNewPerson: addNewPerson,
    getAllPersons: getAllPersons,
    deletePerson: deletePerson,
    updatePerson: updatePerson,
}