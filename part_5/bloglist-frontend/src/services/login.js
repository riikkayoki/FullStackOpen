import axios from 'axios'
const baseUrl = '/api/login'

const login = async credentials => {
  console.log(credentials, 'hello')
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

// eslint-disable-next-line
export default { login }
