import axios from "axios";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
export const UseSignIn = () => {
  const { dispatch } = useContext(AuthContext);
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();
  const signin = async (username, password) => {
    setLoading(true);
    console.log(import.meta.env.VITE_APP_Production_ROOT);
    // console.log(`${VITE_APP_Production_ROOT}/auth/signin`);
    axios
      .post(`${import.meta.env.VITE_APP_Production_ROOT}auth/signin`, {
        username,
        password,
      })
      .then((response) => {
        dispatch({ type: "SIGNIN", payload: response.data });
        localStorage.setItem("user", JSON.stringify(response.data));
        toast.dismiss();
        toast.success("Welcome back ", {
          icon: "🙋‍♂️",
        });

        setLoading(false);

        navigate("/home", { replace: true });
      })
      .catch((error) => {
        toast.dismiss();
        toast.error(error.response.data.error);
        setLoading(false);
      });
  };

  return { signin, isLoading };
};
