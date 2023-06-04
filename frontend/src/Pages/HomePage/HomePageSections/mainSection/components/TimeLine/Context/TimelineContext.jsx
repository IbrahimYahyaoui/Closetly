import { createContext, useEffect, useReducer } from "react";

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
                    profilePic: action.payload.profilePic,
                  },
                ],
              }
            : post
        ),
      };
    }

    case "ADD_LIKE": {
      return {
        ...state,
        TimelinePosts: state.TimelinePosts.map((post) => {
          if (post._id === action.payload.postId) {
            const existingLikeIndex = post.likes.findIndex(
              (like) => like.likerId === action.payload.likerId
            );

            if (existingLikeIndex === -1) {
              // If the liker has not already liked the post, add the like
              return {
                ...post,
                likes: [
                  ...post.likes,
                  {
                    likerId: action.payload.likerId,
                    liker: action.payload.liker,
                  },
                ],
                dislikes: post.dislikes.filter(
                  (dislike) => dislike.dislikerId !== action.payload.likerId
                ),
              };
            } else {
              // If the liker has already liked the post, remove the like
              return {
                ...post,
                likes: post.likes.filter(
                  (like) => like.likerId !== action.payload.likerId
                ),
              };
            }
          } else {
            return post;
          }
        }),
      };
    }

    case "ADD_DISLIKE": {
      return {
        ...state,
        TimelinePosts: state.TimelinePosts.map((post) => {
          if (post._id === action.payload.postId) {
            const existingDislikeIndex = post.dislikes.findIndex(
              (dislike) => dislike.dislikerId === action.payload.dislikerId
            );

            if (existingDislikeIndex === -1) {
              // If the disliker has not already disliked the post, add the dislike
              return {
                ...post,
                dislikes: [
                  ...post.dislikes,
                  {
                    dislikerId: action.payload.dislikerId,
                    disliker: action.payload.disliker,
                  },
                ],
                likes: post.likes.filter(
                  (like) => like.likerId !== action.payload.dislikerId
                ),
              };
            } else {
              // If the disliker has already disliked the post, remove the dislike
              return {
                ...post,
                dislikes: post.dislikes.filter(
                  (dislike) => dislike.dislikerId !== action.payload.dislikerId
                ),
              };
            }
          } else {
            return post;
          }
        }),
      };
    }
    case "RESET_TIMELINE": {
      return {
        ...state,
        TimelinePosts: [],
        postCount: 0,
        pageCount: 1,
      };
    }
    default:
      return state;
  }
};

export const TimelineContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(TimelineReducer, {
    TimelinePosts: [],
    postCount: 0,
    pageCount: 1,
  });

  return (
    <TimelineContext.Provider value={{ ...state, dispatch }}>
      {children}
    </TimelineContext.Provider>
  );
};
