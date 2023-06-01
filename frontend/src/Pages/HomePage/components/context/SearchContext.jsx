import { useReducer, createContext } from "react";

export const SearchContext = createContext();

const SearchReducer = (state, action) => {
  switch (action.type) {
    case "GET_SEARCH_RESULT":
      return {
        ...state,
        searchResult: action.payload,
      };
    default:
      return state;
  }
};

export const SearchProvider = ({ children }) => {
  const [state, dispatch] = useReducer(SearchReducer, {
    searchResult: [],
  });

  return (
    <SearchContext.Provider value={{ ...state, dispatch }}>
      {children}
    </SearchContext.Provider>
  );
};
