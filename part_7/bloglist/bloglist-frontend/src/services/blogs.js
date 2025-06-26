import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

export const setToken = (newToken) => {
    token = `Bearer ${newToken}`
}

export const fetchBlogs = async () => {
    const request = axios.get(baseUrl)
    const response = await request
    return response.data
}

export const fetchBlog = async (id) => {
    const request = axios.get(`${baseUrl}/${id}`)
    const response = await request
    return response.data
}

export const createBlog = async (newObject) => {
    const config = { headers: { Authorization: token } }
    const response = await axios.post(baseUrl, newObject, config)
    return response.data
}

export const updateBlog = async (id, newObject) => {
    const response = await axios.put(`${baseUrl}/${id}`, newObject)
    return response.data
}

export const deleteBlog = async (id) => {
    const config = {
        headers: { Authorization: token },
    }

    const response = await axios.delete(`${baseUrl}/${id}`, config)
    return response.data
}

export const createBlogComment = async (id, content) => {
    const response = await axios.post(`${baseUrl}/${id}/comments`, {
        content: content,
    })
    return response.data
}

export const fetchBlogComments = async (id) => {
    const response = await axios.get(`${baseUrl}/${id}/comments`)
    return response.data
}

// eslint-disable-next-line
export default {
    createBlog,
    updateBlog,
    deleteBlog,
    fetchBlogs,
    setToken,
    fetchBlog,
    fetchBlogComments,
    createBlogComment,
}
