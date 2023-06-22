import { useState, useEffect } from 'react'
import BlogList from './components/BlogList'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import LogOut from './components/LogOut'
import UserDetails from './components/UserDetails'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  useEffect(() => {
    const getBlogs = async () => {
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    }

    getBlogs()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  if (user === null) {
    return (
      <div>
        <Notification />
        <LoginForm
          setUser={setUser}
          blogService={blogService}
        />
      </div>
    )
  } else {
    return (
      <div>
        <Notification />
        <UserDetails user={user} />
        <LogOut />
        <BlogForm
          blogs={blogs}
          setBlogs={setBlogs}
        />
        <BlogList
          blogs={blogs}
          setBlogs={setBlogs}
        />
      </div>
    )
  }
}

export default App
