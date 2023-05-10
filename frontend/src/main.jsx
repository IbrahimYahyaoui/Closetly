import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
// context providers
import { AuthContextProvider } from "./Pages/AuthPage/context/AuthContext.jsx";
import { NextUIProvider } from "@nextui-org/react";
import { InventoryContextProvider } from "./Pages/ClosetPage/ClosetInventory/context/InventoryContext.jsx";
import { CurrentWearContextProvider } from "./Pages/ClosetPage/CurrentWear/Context/CurrentWearContext.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <InventoryContextProvider>
        <CurrentWearContextProvider>
          <NextUIProvider disableBaseline="true">
            <App />
          </NextUIProvider>
        </CurrentWearContextProvider>
      </InventoryContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
