import axios from "axios";
import { useContext } from "react";
import { toast } from "react-hot-toast";
import { inventoryContext } from "../../../context/InventoryContext";

export const useDeleteCloth = () => {
  const { dispatch } = useContext(inventoryContext);
  const deleteClothHandler = (clothId, id) => {
    axios
      .post(
        `${import.meta.env.VITE_APP_Production_ROOT}inventory/deletecloth`,
        {
          id,
          clothId,
        }
      )
      .then((response) => {
        // toast.dismiss();
        console.log(response.data);
        dispatch({ type: "Delete_CLOTHS", payload: response.data });

        toast.success("delete successfully ", {
          icon: "👌",
        });

        setLoading(false);
      })
      .catch((error) => {
        toast.error(error.response.data.error);
        setLoading(false);
      });
  };
  return { deleteClothHandler };
};
