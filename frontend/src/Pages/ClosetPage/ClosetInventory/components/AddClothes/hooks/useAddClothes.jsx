import axios from "axios";
import { useState } from "react";
import { toast } from "react-hot-toast";

export const useAddClothes = () => {
  const [isLoading, setLoading] = useState(false);

  const addClothesHandler = (formData) => {
    axios
      .post(
        `${import.meta.env.VITE_APP_Production_ROOT}inventory/addcloth`,
        formData
      )
      .then((response) => {
        // dispatch({ type: "SIGNIN", payload: response.data });
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
  return { addClothesHandler };
};
