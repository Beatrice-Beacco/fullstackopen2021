import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

const update = (id, newObject) => {
    console.log("Oggetto da sostituire", newObject);
    const request = axios.put(baseUrl + '/' + id, newObject)
    return request.then(response => response.data)
}

const deleteNumber = id => {
    const request = axios.delete(`${baseUrl}/${id}`)
    const updates = request.then(getAll)
    
    console.log('Ud',updates);
    return updates
}

export default {getAll, create, update, deleteNumber}
