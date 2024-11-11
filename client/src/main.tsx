import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import SocketContextProvider from './socket.connection/SocketContext.js'
import { BrowserRouter as Router } from 'react-router-dom'
import Routesprovider from './Routes.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
    <SocketContextProvider>
        <Routesprovider/>
    </SocketContextProvider>
    </Router>
  </StrictMode>
)
