import axios from "axios";
import { useState } from "react";
export const useProfile = () => {
  const [userData, setUserData] = useState(null);
  const profile = (id) => {
    axios
      .get(`${import.meta.env.VITE_APP_Production_ROOT}follow/profile/${id}`)
      .then((res) => {
        setUserData(res.data);
      })
      .catch((err) => console.log(err));
  };
  return { profile, userData };
};
