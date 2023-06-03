import axios from "axios";
import toast from "react-hot-toast";
import { FollowersContext } from "../context/FollowersContext";
import { useContext } from "react";
export const useFollow = () => {
  const { dispatch } = useContext(FollowersContext);
  const follow = async (destinationId, sourceId, tempUserObj) => {
    toast.dismiss();
    axios
      .post(`${import.meta.env.VITE_APP_Production_ROOT}follow/add`, {
        destinationId,
        sourceId,
      })
      .then((res) => {
        console.log(res.data);
        toast.success("followed successfully");
        dispatch({ type: "ADD_FOLLOWER_LOCALLY", payload: tempUserObj });
      })
      .catch((err) => {
        toast.error("something went wrong");
        console.log(err);
      });
  };
  const unfollow = async (destinationId, sourceId, tempUserObj) => {
    axios
      .post(`${import.meta.env.VITE_APP_Production_ROOT}follow/delete`, {
        destinationId,
        sourceId,
      })
      .then((res) => {
        console.log(res.data);
        toast.success("unfollowed successfully");
        dispatch({ type: "REMOVE_FOLLOWER_LOCALLY", payload: tempUserObj });
      })
      .catch((err) => {
        toast.error("something went wrong");
        console.log(err);
      });
  };

  return { follow, unfollow };
};
