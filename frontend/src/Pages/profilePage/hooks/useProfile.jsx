import axios from "axios";
import { useContext, useState } from "react";
import { ProfileContext } from "../context/ProfileContext";
export const useProfile = () => {
  const { dispatch } = useContext(ProfileContext);
  const [userData, setUserData] = useState(null);
  const [myPost, setMyPost] = useState(null);
  const profile = (id) => {
    axios
      .get(`${import.meta.env.VITE_APP_Production_ROOT}follow/profile/${id}`)
      .then((res) => {
        setUserData(res.data);
      })
      .catch((err) => console.log(err));
  };

  const getMyPost = (id) => {
    axios
      .post(`${import.meta.env.VITE_APP_Production_ROOT}post/getPost/${id}`)
      .then((res) => {
        // console.log(res.data);
        setMyPost(res.data);
        dispatch({ type: "MY_POST", payload: res.data });
      })
      .catch((err) => console.log(err));
  };
  return { profile, userData, getMyPost };
};
