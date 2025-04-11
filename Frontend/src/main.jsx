import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { BrowserRouter, HashRouter } from "react-router-dom";
import { UserProvider } from "./context/UserContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="722446415910-9sa2opkceeh8e0kr40ablbs0j2hpqfnv.apps.googleusercontent.com">
      <UserProvider>
        <HashRouter>
          <App />
        </HashRouter>
      </UserProvider>
    </GoogleOAuthProvider>
  </StrictMode>
);

// ✅ Force reload on HMR issues (fixes white screen after refresh)
if (import.meta.hot) {
  import.meta.hot.dispose(() => {
    window.location.reload();
  });
}
