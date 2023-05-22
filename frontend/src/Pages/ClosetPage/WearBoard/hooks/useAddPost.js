import axios from "axios";
import { useState } from "react";
import { toast } from "react-hot-toast";
export const useAddPost = () => {
  const [isLoading, setIsLoading] = useState(false);
  const addPostHandler = (description, outfit, userId) => {
    setIsLoading(true);
    axios
      .post(`${import.meta.env.VITE_APP_Production_ROOT}post/addPost`, {
        Description: description,
        Outfit: JSON.stringify(outfit),
        UserId: userId,
      })
      .then((res) => {
        console.log(res);
        setIsLoading(false);
        toast.success("Post Added Successfully");
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        toast.error("Error Adding Post");
      });
  };
  return { addPostHandler, isLoading };
};
