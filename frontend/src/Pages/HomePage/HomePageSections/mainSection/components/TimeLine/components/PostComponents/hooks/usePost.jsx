import axios from "axios";
import { toast } from "react-hot-toast";

export const usePost = () => {
  const addComment = (postId, posterId, comment, poster) => {
    axios
      .post(`${import.meta.env.VITE_APP_Production_ROOT}post/comment`, {
        postId,
        posterId,
        comment,
        poster,
      })
      .then((res) => {
        toast.success("Comment Added");
      })
      .catch((err) => console.log(err));
  };
  return {
    addComment,
  };
};
