import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Auth0Provider } from '@auth0/auth0-react';
import { GoogleOAuthProvider } from '@react-oauth/google'


// const clientId = process.env.REACT_APP_CLIENT_ID 
// console.log("clientId : ", clientId)


createRoot(document.getElementById('root')).render(
  
      <StrictMode>
  <GoogleOAuthProvider 
  clientId="722446415910-9sa2opkceeh8e0kr40ablbs0j2hpqfnv.apps.googleusercontent.com">
        <App />
  </GoogleOAuthProvider>
      </StrictMode>
    
)
