import Button from '../components/Button'

const LogOut = () => {

    const handleLogOut = () => {
        window.localStorage.removeItem('loggedNoteappUser')
        window.location.reload()
    }

    return (
        <div>
        <Button handleEvent={handleLogOut} todo={'log out'}/>
        </div>
    )
}

export default LogOut