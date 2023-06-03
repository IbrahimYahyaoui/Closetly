import { createContext, useReducer } from "react";

export const TimelineContext = createContext();

const TimelineReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_TIMELINE":
      return {
        ...state,
        TimelinePosts: [...state.TimelinePosts, ...action.payload],
        // TimelinePosts: action.payload,
      };
    case "setPostCount":
      return {
        ...state,
        postCount: action.payload,
      };
    case "setPageCount":
      return {
        ...state,
        pageCount: action.payload,
      };
    // add post comment locally
    // ...

    case "ADD_COMMENT": {
      return {
        ...state,
        TimelinePosts: state.TimelinePosts.map((post) =>
          post._id === action.payload.postId
            ? {
                ...post,
                comments: [
                  ...post.comments,
                  {
                    posterId: action.payload.posterId,
                    poster: action.payload.poster,
                    comment: action.payload.comment,
                  },
                ],
              }
            : post
        ),
      };
    }

    // ...

    default:
      return state;
  }
};

export const TimelineContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(TimelineReducer, {
    TimelinePosts: [],
    postCount: 1,
    pageCount: 1,
  });
  console.log(state);
  return (
    <TimelineContext.Provider value={{ ...state, dispatch }}>
      {children}
    </TimelineContext.Provider>
  );
};
