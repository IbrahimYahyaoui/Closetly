import React, { useContext } from "react";
import { inventoryContext } from "../../context/InventoryContext";
import { TrashIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import { useDeleteCloth } from "./hooks/useDeleteCloth";

const InventoryClothes = ({ id }) => {
  const { inventoryItems } = useContext(inventoryContext);
  const { deleteClothHandler } = useDeleteCloth();

  const handelDeleteCloth = (clothId) => {
    deleteClothHandler(clothId, id);
  };
  return (
    <>
      {inventoryItems &&
        inventoryItems.length > 0 &&
        inventoryItems.map((item) => {
          return (
            <motion.div
              className="w-40 h-44 rounded-lg bg-slate-200 border-4 border-slate-200 cursor-pointer overflow-hidden flex items-center flex-col  "
              key={item.clothId}
              whileHover={{ scale: 1.01 }}
            >
              <div className="w-full h-3/4 relative ">
                <motion.div
                  className=" absolute top-2 right-0 bg-white p-1 rounded-md z-20"
                  whileHover={{ scale: 1.1 }}
                  onClick={() => {
                    handelDeleteCloth(item.clothId);
                  }}
                >
                  <p>
                    <TrashIcon className="w-4 " />
                  </p>
                </motion.div>
                <p className=" w-full h-full absolute top-0   itemOverlay"></p>
                <img
                  src={item.image}
                  className="bg-contain h-full w-full object-contain"
                ></img>
              </div>
              <div className=" shadow-xl w-full h-1/4 grid  place-content-center">
                <p className="font-semibold text-sm  ">{item.name}</p>
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
