import { createSlice } from "@reduxjs/toolkit"

const initialState = ''
// https://developer.mozilla.org/en-US/docs/Web/API/clearTimeout
let timeoutID

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        showNotification(state, action) {
            state = action.payload
            return state
        },
        clearNotification(state, action) {
            state = initialState
            return state
        }
    }
})


export const { showNotification, clearNotification } = notificationSlice.actions

export const setNotification = (message, time) => {
    return dispatch => {
        clearTimeout(timeoutID)
        dispatch(showNotification(message))
        timeoutID = setTimeout(() => dispatch(clearNotification()), time*1000)
    }
}
export default notificationSlice.reducer