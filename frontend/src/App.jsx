import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Routes,
  RouterProvider,
  useLocation,
} from "react-router-dom";
import SignUp from "./Pages/AuthPage/SignUp";
import SignIn from "./Pages/AuthPage/SignIn";
import { Toaster } from "react-hot-toast";
import HomePage from "./Pages/HomePage/HomePage";
import ClosetPage from "./Pages/ClosetPage/ClosetPage";
import { useEffect } from "react";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<SignIn />}></Route>
      <Route path="/signup" element={<SignUp />}></Route>
      <Route path="/home" element={<HomePage />}></Route>
      <Route path="/closet/:id" element={<ClosetPage />}></Route>

      <Route path="*" element={<h1>Page not found</h1>}></Route>
    </>
  )
);

function App() {
  // polyfill({
  //   // use this to make use of the scroll behaviour
  //   dragImageTranslateOverride: scrollBehaviourDragImageTranslateOverride,
  // });

  return (
    <>
      <Toaster
        toastOptions={{
          style: {
            background: "#363636",
            color: "#fff",
          },
        }}
      />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
