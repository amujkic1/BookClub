import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { GoogleOAuthProvider } from '@react-oauth/google';

ReactDOM.createRoot(document.getElementById('body')).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="4809613069-nckr4fj0k3bg1dpjevggmiuo03mc7nvm.apps.googleusercontent.com">
    <App />
    </GoogleOAuthProvider>
  </React.StrictMode>,
)
