import React from 'react'
import { useNotificationValue } from '../NotificationContext'
import styled from 'styled-components'

const StyledNotification = styled.div`
    color: green;
    background: rgb(209, 102, 196);
    border: 1px solid rgb(103, 12, 91);
    color: white;
    font-size: 20px;
    border-style: solid;
    border-radius: 5px;
    padding: 10px;
    margin-bottom: 10px;
    text-transform: uppercase;
`

export const Notification = () => {
    const [notification] = useNotificationValue()

    if (!notification) {
        return null
    }

    return <StyledNotification>{notification}</StyledNotification>
}
