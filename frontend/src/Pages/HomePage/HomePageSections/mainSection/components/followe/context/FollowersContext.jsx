import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import axios from "axios";
export const FollowersContext = createContext();

import { AuthContext } from "../../../../../../AuthPage/context/AuthContext";
//
const FollowersDispatcher = (state, action) => {
  switch (action.type) {
    case "GET_FOLLOWERS":
      return {
        ...state,
        followers: action.payload,
      };
    case "GET_FOLLOWING":
      return {
        ...state,
        following: action.payload,
      };
    case "GET_SUGGESTIONS":
      return {
        ...state,
        suggestions: action.payload,
      };
    default:
      return state;
  }
};
//
export const FollowersContextProvider = ({ children }) => {
  const { user } = useContext(AuthContext);

  const [userId, setUserId] = useState();
  useEffect(() => {
    if (user && user.id) {
      setUserId(user.id);
    }
  }, [user]);
  const [state, dispatch] = useReducer(FollowersDispatcher, {
    followers: [],
    following: [],
    suggestions: [],
  });
  // get followers
  useEffect(() => {
    const getFollowers = async () => {
      axios
        .get(
          `${
            import.meta.env.VITE_APP_Production_ROOT
          }follow/followersList/${userId}`
        )
        .then((res) => {
          console.log(res.data);
          dispatch({ type: "GET_FOLLOWERS", payload: res.data });
        })
        .catch((err) => {
          console.log(err);
        });
    };
    if (userId) {
      getFollowers();
    }
  }, [userId]);
  // get following
  useEffect(() => {
    const getFollowers = async () => {
      axios
        .get(
          `${
            import.meta.env.VITE_APP_Production_ROOT
          }follow/followingList/${userId}`
        )
        .then((res) => {
          console.log(res.data);
          dispatch({ type: "GET_FOLLOWING", payload: res.data });
        })
        .catch((err) => {
          console.log(err);
        });
    };
    if (userId) {
      getFollowers();
    }
  }, [userId]);
  // get suggestion users
  useEffect(() => {
    const getFollowers = async () => {
      axios
        .get(
          `${import.meta.env.VITE_APP_Production_ROOT}follow/followSuggestion`
        )
        .then((res) => {
          console.log(res.data);
          dispatch({ type: "GET_SUGGESTIONS", payload: res.data });
        })
        .catch((err) => {
          console.log(err);
        });
    };
    if (userId) {
      getFollowers();
    }
  }, [userId]);
  useEffect(() => {
    console.log(state, "stateFollowers");
  }, [state]);
  return (
    <FollowersContext.Provider value={{ ...state, dispatch }}>
      {children}
    </FollowersContext.Provider>
  );
};
