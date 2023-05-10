import { createContext, useReducer } from "react";

export const CurrentWearContext = createContext();

const ClosetItemsReducer = (state, action) => {
  switch (action.type) {
    case "SET_READY_TO_WEAR":
      return { readyToWear: action.payload };
    case "SET_TODAY_WEAR":
      return { ...state, TodayWear: action.payload };
    default:
      return state;
  }
};

export const CurrentWearContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ClosetItemsReducer, {
    readyToWear: null,
    TodayWear: null,
  });
  //   console.log(state, "current wear context");
  return (
    <CurrentWearContext.Provider value={{ ...state, dispatch }}>
      {children}
    </CurrentWearContext.Provider>
  );
};
