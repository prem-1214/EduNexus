import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
// import LandingPage from './LandingPage.jsx'
import Login from './components/Login/Login.jsx'


createRoot(document.getElementById('root')).render(
  
      <StrictMode>
  <GoogleOAuthProvider 
       clientId={import.meta.env.VITE_CLIENT_ID}>
        <App />
  </GoogleOAuthProvider>
      </StrictMode>
    
)
