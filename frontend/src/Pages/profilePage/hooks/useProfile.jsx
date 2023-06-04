import axios from "axios";
import { useContext, useState } from "react";
import { ProfileContext } from "../context/ProfileContext";
export const useProfile = () => {
  const { dispatch } = useContext(ProfileContext);
  const [userData, setUserData] = useState(null);
  const [isChangeLoading, setIsChangeLoading] = useState(false);
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
        dispatch({ type: "MY_POST", payload: res.data });
      })
      .catch((err) => console.log(err));
  };
  const changeProfilePic = (formData) => {
    setIsChangeLoading(true);
    axios
      .post(
        `${import.meta.env.VITE_APP_Production_ROOT}auth/profilePicSet`,
        formData
      )
      .then((res) => {
        setUserData(res.data);
        setIsChangeLoading(false);
        window.location.reload();
      })
      .catch((err) => {
        setIsChangeLoading(false);
        console.log(err);
      });
  };
  return { profile, userData, getMyPost, changeProfilePic, isChangeLoading };
};
