import axios from "axios";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const UseSignUp = () => {
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const signup = async (username, password) => {
    console.log(import.meta.env.VITE_APP_Production_ROOT);
    setIsLoading(true);
    axios
      .post(`${import.meta.env.VITE_APP_Production_ROOT}auth/signup`, {
        username,
        password,
      })
      .then((response) => {
        dispatch({ type: "SIGNIN", payload: response.data });
        localStorage.setItem("user", JSON.stringify(response.data));
        toast.dismiss();
        toast.success("Account created successfully");
        setIsLoading(false);
        navigate("/home", { replace: true });
      })
      .catch((data) => {
        toast.dismiss();
        toast.error(data.response.data.error);
        setIsLoading(false);
      });
  };

  return { signup, isLoading };
};
