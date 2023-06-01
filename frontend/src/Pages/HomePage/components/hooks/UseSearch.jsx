import axios from "axios";
import { useContext, useState } from "react";
import { SearchContext } from "../context/SearchContext";
import toast from "react-hot-toast";
import { AuthContext } from "../../../AuthPage/context/AuthContext";
export const UseSearch = () => {
  const { dispatch } = useContext(SearchContext);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useContext(AuthContext);
  const search = (username) => {
    setIsLoading(true);
    axios
      .post(`${import.meta.env.VITE_APP_Production_ROOT}follow/search`, {
        username,
        sender: user.Username,
      })
      .then((res) => {
        if (res.data === "empty") {
          toast.error("no user found");
        }
        console.log(res.data);
        dispatch({ type: "GET_SEARCH_RESULT", payload: res.data });
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };
  return { search, isLoading };
};
