import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from 'react-query'
import { NotificationProvider } from './NotificationContext'
import './index.css'
import { BrowserRouter as Router } from 'react-router-dom'

import App from './App'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
    <NotificationProvider>
        <Router>
            <QueryClientProvider client={queryClient}>
                <App />
            </QueryClientProvider>
        </Router>
    </NotificationProvider>
)
