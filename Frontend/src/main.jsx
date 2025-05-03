import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import App from "./App.jsx"
import { GoogleOAuthProvider } from "@react-oauth/google"
import { BrowserRouter, HashRouter } from "react-router-dom"
import { ChatProvider } from "./Context/ChatContext.jsx"
import { UserProvider } from "./Context/UserContext.jsx"

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENT_ID}>
      <UserProvider>
        <ChatProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ChatProvider>
      </UserProvider>
    </GoogleOAuthProvider>
  </StrictMode>
)

if (import.meta.hot) {
  import.meta.hot.dispose(() => {
    window.location.reload()
  })
}
