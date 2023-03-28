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
  const [notification, setNotification] = useState(null)
  const [messageType, setMessageType] = useState(null)




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

  const handleNotify = (message, type) => {
    setNotification(message)
    setMessageType(type)
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }


    if (user === null) {
        return(
        <div>
        <Notification message={notification} type={messageType}/>
        <LoginForm setUser={setUser} blogService={blogService} handleNotify={handleNotify}/>
        </div>
        )

      } else {
        return (
        <div>
        <Notification message={notification} type={messageType}/>
        <UserDetails user={user}/>
        <LogOut/>
        <BlogList blogs={blogs}/>
        <BlogForm blogs={blogs} setBlogs={setBlogs} handleNotify={handleNotify}/>
        </div>
        )
      }

    }

export default App