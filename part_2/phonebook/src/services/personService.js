import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = async () => {
    const request = axios.get(baseUrl)
    const response = await request
    return response.data
}

const create = async newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

export default { getAll, create }
