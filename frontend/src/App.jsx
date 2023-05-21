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
// function logClick(event) {
//   console.log("Clicked!", event);
// }

// function logTouch(event) {
//   console.log("Touched!", event);
// }

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<SignIn />}></Route>
      <Route path="/signup" element={<SignUp />}></Route>
      <Route path="/home" element={<HomePage />}></Route>
      <Route path="/closet" element={<ClosetPage />}></Route>

      <Route path="*" element={<h1>Page not found</h1>}></Route>
    </>
  )
);

function App() {
  // useEffect(() => {
  //   document.addEventListener("click", logClick);
  //   document.addEventListener("touchstart", logTouch);

  //   return () => {
  //     document.removeEventListener("click", logClick);
  //     document.removeEventListener("touchstart", logTouch);
  //   };
  // }, []);
  // polyfill({
  //   // use this to make use of the scroll behaviour
  //   dragImageTranslateOverride: scrollBehaviourDragImageTranslateOverride,
  // });
  // useEffect(() => {
  //   const script = document.createElement("script");

  //   script.src = "";
  //   script.async = true;

  //   document.body.appendChild(script);

  //   return () => {
  //     document.body.removeChild(script);
  //   };
  // }, []);
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
