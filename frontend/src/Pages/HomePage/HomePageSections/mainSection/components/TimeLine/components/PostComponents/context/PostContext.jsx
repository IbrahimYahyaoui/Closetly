import { createContext } from "react";

export const postContext = createContext();

export const PostContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(postReducer, {});
  return <postContext.Provider value={{}}>{children}</postContext.Provider>;
};
