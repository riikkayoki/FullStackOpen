import axios from 'axios'

const baseUrl = '/api/users'

export const fetchUsers = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

export const fetchUser = async (id) => {
    const response = await axios.get(`${baseUrl}/${id}`)
    return response.data
}

// eslint-disable-next-line
export default { fetchUsers }
