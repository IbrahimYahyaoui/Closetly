import React, { useContext, useRef, useState, useEffect } from "react";
import { inventoryContext } from "../../context/InventoryContext";
import { TrashIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import { useDeleteCloth } from "./hooks/useDeleteCloth";
import wearIcon from "../../../../../assets/closetAssets/shirtPlaceholder.svg";
import { CurrentWearContext } from "../../../WearBoard/Context/CurrentWearContext";
import { AuthContext } from "../../../../AuthPage/context/AuthContext";

const InventoryClothes = ({ id, selectedCategory }) => {
  // user id
  const { user } = useContext(AuthContext);

  // get the inventory items from the context
  const { inventoryItems } = useContext(inventoryContext);
  // get the dispatch to update what user want to wear in the the context
  const { dispatch } = useContext(CurrentWearContext);
  // call the hook to delete the cloth
  const { deleteClothHandler } = useDeleteCloth();
  // handel the delete cloth
  const handelDeleteCloth = (clothId) => {
    deleteClothHandler(clothId, user.id);
  };
  // set the image to be dragged
  const [draggabelImage, setDraggabelImage] = useState(null);
  function handleDragStart(event) {
    dispatch({
      type: "SET_READY_TO_WEAR",
      payload: { X: event.clientX, Y: event.clientY, image: draggabelImage },
    });
    dispatch({
      type: "SET_IS_DRAGGING",
      payload: true,
    });
  }

  const filteredItems =
    selectedCategory === "All"
      ? inventoryItems
      : inventoryItems.filter((item) => item.category === selectedCategory);

  function handleTouchStart(event) {
    // Set the `style.left` and `style.top` properties of the draggable element to the current position of the cursor.

    const touch = event.touches[0];
    dispatch({
      type: "SET_READY_TO_WEAR",
      payload: { X: touch.clientX, Y: touch.clientY, image: draggabelImage },
    });
    dispatch({
      type: "SET_IS_DRAGGING",
      payload: true,
    });
  }
  function handleTouchMove(event) {
    // event.preventDefault();
    const touch = event.touches[0];
    dispatch({
      type: "SET_READY_TO_WEAR",
      payload: { X: touch.clientX, Y: touch.clientY, image: draggabelImage },
    });
    dispatch({
      type: "SET_IS_DRAGGING",
      payload: true,
    });
  }
  const ref = useRef();

  useEffect(() => {
    ref.current.addEventListener("touchmove", handleTouchMove);
  }, []);

  return (
    <>
      {filteredItems &&
        filteredItems.length > 0 &&
        filteredItems.map((item) => {
          return (
            <motion.div
              className=" z-50  mb-10 flex h-44  w-40  cursor-pointer touch-none flex-col items-center overflow-hidden rounded-lg border-2  border-stone-200 bg-slate-200  "
              key={item.clothId}
              id="dragged-element"
              draggable
              onDrag={handleDragStart}
              onDragStart={() => {
                setDraggabelImage(item.image);

                dispatch({
                  type: "SET_IS_DRAGGING",
                  payload: true,
                });
              }}
              whileHover={{ scale: 1.01 }}
              onTouchStart={handleTouchStart}
              ref={ref}
              onTouchEnd={() => {
                dispatch({
                  type: "SET_IS_DRAGGING",
                  payload: false,
                });
              }}
              onDragEnd={() => {
                dispatch({
                  type: "SET_IS_DRAGGING",
                  payload: false,
                });
              }}
            >
              <div className="relative h-3/4 w-full ">
                <motion.div
                  className=" absolute right-0 top-2 z-20 rounded-md border border-slate-200 bg-white p-1"
                  whileHover={{ scale: 1.1 }}
                  onClick={() => {
                    handelDeleteCloth(item.clothId);
                  }}
                >
                  <p>
                    <TrashIcon className="w-4 " />
                  </p>
                </motion.div>

                <p className=" itemOverlay absolute top-0 h-full   w-full"></p>
                <img
                  src={item.image}
                  className="h-full w-full bg-contain object-contain"
                ></img>
              </div>
              <div className=" grid h-1/4 w-full place-content-center  shadow-xl">
                <p className="text-sm font-semibold">{item.name}</p>
              </div>
            </motion.div>
          );
        })}
    </>
  );
};

export default InventoryClothes;
