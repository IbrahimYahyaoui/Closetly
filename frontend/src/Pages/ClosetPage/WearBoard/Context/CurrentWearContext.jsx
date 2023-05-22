import { createContext, useEffect, useReducer } from "react";

export const CurrentWearContext = createContext();

const ClosetItemsReducer = (state, action) => {
  switch (action.type) {
    case "SET_READY_TO_WEAR":
      return { readyToWear: action.payload };
    case "SET_TODAY_OUTFIT":
      return { TodayOutfit: action.payload };
    case "SET_IS_DRAGGING":
      // console.log(action.payload, "is dragging");
      return { ...state, isDragging: action.payload };
    default:
      return state;
  }
};

export const CurrentWearContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ClosetItemsReducer, {
    readyToWear: null,
    TodayOutfit: {},
    isDragging: false,
  });

  // useEffect(() => {
  //   console.log(state, "state");
  // }, [state]);
  return (
    <CurrentWearContext.Provider value={{ ...state, dispatch }}>
      {children}
    </CurrentWearContext.Provider>
  );
};
