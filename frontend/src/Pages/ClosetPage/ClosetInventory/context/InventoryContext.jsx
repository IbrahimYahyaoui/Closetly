import axios from "axios";
import { AuthContext } from "../../../AuthPage/context/AuthContext";
import { createContext, useContext, useEffect, useReducer } from "react";

export const inventoryContext = createContext();

const inventoryReducer = (state, action) => {
  switch (action.type) {
    case "GET_CLOTHS":
      return { inventoryItems: action.payload };
    case "Delete_CLOTHS":
      return { inventoryItems: action.payload };
    default:
      return state;
  }
};

export const InventoryContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(inventoryReducer, {
    inventoryItems: null,
  });
  const { user } = useContext(AuthContext);

  //  get user from local storage

  useEffect(() => {
    {
      user &&
        axios
          .post(
            `${import.meta.env.VITE_APP_Production_ROOT}inventory/getcloths`,
            {
              id: user.id,
            }
          )
          .then((res) => {
            // console.log(res.data);
            dispatch({ type: "GET_CLOTHS", payload: res.data });
          })
          .catch((err) => console.log(err + " error in getcloths"));
    }
  }, [user]);

  return (
    <inventoryContext.Provider value={{ ...state, dispatch }}>
      {children}
    </inventoryContext.Provider>
  );
};
