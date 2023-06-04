import axios from "axios";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../../../../../AuthPage/context/AuthContext";
import { TimelineContext } from "../Context/TimelineContext";

export const useTimeline = (page) => {
  const { user } = useContext(AuthContext);
  const { dispatch } = useContext(TimelineContext);

  const fetchTimeline = (page) => {
    if (user) {
      axios
        .post(`${import.meta.env.VITE_APP_Production_ROOT}post/getAllPosts`, {
          currentUserId: user.id,
          page: page,
          limit: 10,
        })
        .then((res) => {
          // const { posts, totalCount, totalPages } = res.data;
          dispatch({
            type: "FETCH_TIMELINE",
            payload: res.data.post,
          });
          dispatch({
            type: "setPostCount",
            payload: res.data.totalCount,
          });
          dispatch({
            type: "setPageCount",
            payload: res.data.totalPages,
          });
        })
        .catch((err) => console.log(err));
    }
  };

  return {
    fetchTimeline,
  };
};
