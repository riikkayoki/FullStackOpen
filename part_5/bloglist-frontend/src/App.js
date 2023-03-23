import { useState, useEffect } from 'react'
import BlogList from './components/BlogList'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import LogOut from './components/LogOut'
import UserDetails from './components/UserDetails'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

    if (user === null) {
        return(
        <LoginForm setUser={setUser} blogService={blogService}/>
        )

      } else {
        return (
        <div>
        <UserDetails user={user}/>
        <LogOut/>
        <BlogList blogs={blogs}/>
        <BlogForm blogs={blogs} setBlogs={setBlogs}/>
        </div>
        )
      }

    }

export default App