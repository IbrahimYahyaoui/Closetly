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

    default:
      return state;
  }
};

export const TimelineContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(TimelineReducer, {
    TimelinePosts: [],
    postCount: 0,
    pageCount: 0,
  });
  console.log(state);
  return (
    <TimelineContext.Provider value={{ ...state, dispatch }}>
      {children}
    </TimelineContext.Provider>
  );
};
