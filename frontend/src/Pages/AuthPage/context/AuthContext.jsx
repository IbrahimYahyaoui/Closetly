import { createContext, useEffect, useReducer } from "react";
import { Navigate } from "react-router-dom";
import { redirect } from "react-router-dom";
export const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case "SIGNIN":
      return { user: action.payload };
    case "logout":
      return { user: null };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
  });
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      dispatch({ type: "SIGNIN", payload: user });
    }
  }, []);
  // console.log("AuthContext", state);
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
