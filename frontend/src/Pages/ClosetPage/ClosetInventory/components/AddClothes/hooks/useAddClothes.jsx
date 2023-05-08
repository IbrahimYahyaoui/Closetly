import axios from "axios";
import { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { inventoryContext } from "../../../context/InventoryContext";

export const useAddClothes = () => {
  const [isLoading, setLoading] = useState(false);
  const { dispatch } = useContext(inventoryContext);
  const addClothesHandler = (formData) => {
    setLoading(true);
    axios
      .post(
        `${import.meta.env.VITE_APP_Production_ROOT}inventory/addcloth`,
        formData
      )
      .then((response) => {
        console.log(response.data);
        dispatch({ type: "ADD_CLOTHS", payload: response.data });
        // localStorage.setItem("user", JSON.stringify(response.data));
        toast.dismiss();
        toast.success("added successfully ", {
          icon: "🙋‍♂️",
        });

        setLoading(false);
      })
      .catch((error) => {
        toast.dismiss();
        toast.error(error.response.data.error);
        setLoading(false);
      });
  };
  return { addClothesHandler, isLoading };
};
