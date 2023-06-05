import { useContext, useState } from "react";
import { AuthContext } from "../../../AuthPage/context/AuthContext";
import axios from "axios";
export const useNotification = () => {
  const [notification, setNotification] = useState([]);
  const { user } = useContext(AuthContext);
  const getNotification = () => {
    if (user) {
      axios
        .post(
          `${import.meta.env.VITE_APP_Production_ROOT}post/getNotification`,
          {
            id: user.id,
          }
        )

        .then((res) => {
          setNotification(res.data);
        })
        .catch((err) => console.log(err));
    }
  };
  return { getNotification, notification };
};
