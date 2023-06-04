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
  const addLike = (postId, likerId, liker) => {
    console.log(postId, likerId, liker);
    axios
      .post(`${import.meta.env.VITE_APP_Production_ROOT}post/like`, {
        postId,
        likerId,
        liker,
      })

      .catch((err) => console.log(err));
  };

  const addDislike = (postId, dislikerId, disliker) => {
    console.log(postId, dislikerId, disliker);
    axios
      .post(`${import.meta.env.VITE_APP_Production_ROOT}post/dislike`, {
        postId,
        dislikerId,
        disliker,
      })

      .catch((err) => console.log(err));
  };

  return {
    addComment,
    addLike,
    addDislike,
  };
};
