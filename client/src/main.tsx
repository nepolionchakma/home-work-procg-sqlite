import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { NavContextProvider } from "./Context/NavContext.tsx";
// import { AuthContextProvider } from "./Context/AuthContext.tsx";
import { SqliteAuthContextProvider } from "./Context/SqliteContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <SqliteAuthContextProvider>
      <NavContextProvider>
        <App />
      </NavContextProvider>
    </SqliteAuthContextProvider>
  </React.StrictMode>
);
