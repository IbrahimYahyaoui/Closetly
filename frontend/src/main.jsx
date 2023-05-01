import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthContextProvider } from "./Pages/AuthPage/context/AuthContext.jsx";
import { NextUIProvider } from "@nextui-org/react";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <NextUIProvider disableBaseline="true">
        <App />
      </NextUIProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
