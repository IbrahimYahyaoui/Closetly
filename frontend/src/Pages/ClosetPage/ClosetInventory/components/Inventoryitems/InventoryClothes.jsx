import React, { useContext, useRef, useState } from "react";
import { inventoryContext } from "../../context/InventoryContext";
import { TrashIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import { useDeleteCloth } from "./hooks/useDeleteCloth";
import wearIcon from "../../../../../assets/closetAssets/shirtPlaceholder.svg";
import { CurrentWearContext } from "../../../CurrentWear/Context/CurrentWearContext";

const InventoryClothes = ({ id }) => {
  // get the inventory items from the context
  const { inventoryItems } = useContext(inventoryContext);
  // get the dispatch to update what user want to wear in the the context
  const { dispatch } = useContext(CurrentWearContext);
  // call the hook to delete the cloth
  const { deleteClothHandler } = useDeleteCloth();
  // handel the delete cloth
  const handelDeleteCloth = (clothId) => {
    deleteClothHandler(clothId, id);
  };
  // set the image to be dragged
  const [draggabelImage, setDraggabelImage] = useState(null);
  function handleDragStart(event) {
    dispatch({
      type: "SET_READY_TO_WEAR",
      payload: { X: event.clientX, Y: event.clientY, image: draggabelImage },
    });
  }

  return (
    <>
      {inventoryItems &&
        inventoryItems.length > 0 &&
        inventoryItems.map((item) => {
          return (
            <motion.div
              className="z-50 flex  h-44   w-40 cursor-pointer flex-col items-center overflow-hidden rounded-lg border-4 border-slate-200 bg-slate-200  "
              key={item.clothId}
              id="dragged-element"
              draggable
              onDrag={handleDragStart}
              onDragStart={() => {
                setDraggabelImage(item.image);
              }}
              whileHover={{ scale: 1.01 }}
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
      <style jsx>{`
        /* Firefox */
        * {
          scrollbar-width: thin;
          scrollbar-color: black;
        }

        /* Chrome, Edge, and Safari */
        *::-webkit-scrollbar {
          width: 5px;
          border-radius: 80px;
        }

        *::-webkit-scrollbar-track {
          background-color: rgba(0, 0, 0, 0.2);
          border-radius: 80px;
        }

        *::-webkit-scrollbar-thumb {
          background-color: black;
          border-radius: 20px;
          border: 1px solid black;
          //   opacity: 0.3;
        }
      `}</style>
    </>
  );
};

export default InventoryClothes;
