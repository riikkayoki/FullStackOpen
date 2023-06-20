import { createContext, useReducer, useContext } from "react";

// add timer for notification

let timer


const NotificationContext = createContext()

const notificationReducer = (state, action) => {
    switch (action.type) {
        case 'SET_NOTIFICATION':
        return action.data
        case 'CLEAR_NOTIFICATION':
        return null
        default:
        return state
    }
    }

export const NotificationProvider = ({ children }) => {
    const [state, dispatch] = useReducer(notificationReducer, undefined)
    return (
        <NotificationContext.Provider value={[state, dispatch]}>
        {children}
        </NotificationContext.Provider>
     )
    }

export const useNotificationDispatch = () => {
    const context = useContext(NotificationContext)
    if (context === undefined) {
        throw new Error('useNotificationDispatch must be used within a NotificationProvider')
    }
    // add timer for notification
    clearTimeout(timer)
    timer = setTimeout(() => {
        context[1]({type: 'CLEAR_NOTIFICATION'})
    }, 3000)
    return context[1]
}

export const useNotificationValue = () => {
    const context = useContext(NotificationContext)
    if (context === undefined) {
        throw new Error('useNotificationValue must be used within a NotificationProvider')
    }
    return context[0]
}



export default NotificationContext