import axios from "axios";
import { createContext, useEffect, useReducer } from "react";
import { Navigate } from "react-router-dom";
import { redirect } from "react-router-dom";
export const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case "SIGNIN":
      return { ...state, user: action.payload };
    case "logout":
      return { ...state, user: null };
    case "SET_ACTIVE_USER":
      return { ...state, activeUser: action.payload };

    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    activeUser: null,
  });
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      dispatch({ type: "SIGNIN", payload: user });
      // console.log(user.id, "user");
      axios
        .get(
          `${import.meta.env.VITE_APP_Production_ROOT}follow/profile/${user.id}`
        )
        .then((response) => {
          // console.log(response.data, "active user");
          dispatch({ type: "SET_ACTIVE_USER", payload: response.data });
        })
        .catch((error) => {
          console.log(error.response.data.error);
        });
    }
  }, []);

  // console.log("AuthContext", state);
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
