import axios from "axios";
import { AuthContext } from "../../../AuthPage/context/AuthContext";
import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";

export const inventoryContext = createContext();

const inventoryReducer = (state, action) => {
  switch (action.type) {
    case "GET_CLOTHS":
      return { inventoryItems: action.payload };
    case "ADD_CLOTHS":
      return { inventoryItems: [action.payload, ...state.inventoryItems] };
    case "Delete_CLOTHS":
      return {
        inventoryItems: state.inventoryItems.filter(
          (item) => item.clothId !== action.payload
        ),
      };

    default:
      return state;
  }
};

export const InventoryContextProvider = ({ children }) => {
  const [categoryListItem, setCategoryList] = useState([]);
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
            // extract category
          })
          .catch((err) => console.log(err + " error in getcloths"));
    }
  }, [user]);

  useEffect(() => {
    {
      state.inventoryItems &&
        setCategoryList(
          state.inventoryItems
            .map((item) => item.category)
            .filter((v, i, a) => a.indexOf(v) === i)
        );
      // // add default value  to category list
      // state.inventoryItems && setCategoryList((prev) => ["All", ...prev]);
    }
  }, [state]);
  return (
    <inventoryContext.Provider value={{ ...state, dispatch, categoryListItem }}>
      {children}
    </inventoryContext.Provider>
  );
};
