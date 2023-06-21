import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import SignUp from "./Pages/AuthPage/SignUp";
import SignIn from "./Pages/AuthPage/SignIn";
import { Toaster } from "react-hot-toast";
import HomePage from "./Pages/HomePage/HomePage";
import ClosetPage from "./Pages/ClosetPage/ClosetPage";
import { useEffect } from "react";
import ProfilePage from "./Pages/profilePage/ProfilePage";
import { Analytics } from "@vercel/analytics/react";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<SignIn />}></Route>
      <Route path="/signup" element={<SignUp />}></Route>
      <Route path="/home" element={<HomePage />}></Route>
      <Route path="/closet" element={<ClosetPage />}></Route>
      <Route path="/profile/:id" element={<ProfilePage />}></Route>

      <Route path="*" element={<h1>Page not found</h1>}></Route>
    </>
  )
);

function App() {
  return (
    <>
      <Toaster
        toastOptions={{
          style: {
            background: "#363636",
            color: "#fff",
            zIndex: "9999",
          },
        }}
      />
      <Analytics />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
