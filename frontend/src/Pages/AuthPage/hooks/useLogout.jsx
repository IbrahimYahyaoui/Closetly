import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
export const useLogout = () => {
  const { dispatch } = useContext(AuthContext);

  const navigate = useNavigate(); //  clear localStorage
  const logout = () => {
    localStorage.removeItem("user");
    //  clear authContext
    dispatch({ type: "LOGOUT" });
    // navigate to / and replace true
    navigate("/", { replace: true });
  };
  return { logout };
};
