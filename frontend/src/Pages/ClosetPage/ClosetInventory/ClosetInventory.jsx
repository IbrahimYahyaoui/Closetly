import React, { useContext, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import AddClothes from "./components/AddClothes/AddClothes";
import InventoryClothes from "./components/Inventoryitems/InventoryClothes";
import { inventoryContext } from "./context/InventoryContext";
import { AuthContext } from "../../AuthPage/context/AuthContext";
import { ArrowLongUpIcon } from "@heroicons/react/24/solid";
const ClosetInventory = ({ id }) => {
  const { categoryListItem, inventoryItems } = useContext(inventoryContext);
  const { user } = useContext(AuthContext);

  return (
    <AnimatePresence>
      {/* <div className="flex justify-center">
        <ArrowLongUpIcon className="w-8" />
        <p className="text-lg font-bold">Slide up to open your clothe</p>
        <ArrowLongUpIcon className="w-8" />
      </div> */}
      <motion.div
        // layout
        className="z-20 bg-white"
      >
        <h1 className="mb-5  text-2xl font-bold">
          {user && user.Username}'s Closet
        </h1>
        <div className="mb-5 mt-2 flex">
          {categoryListItem && categoryListItem.length > 0 && (
            <p className="mx-1 cursor-pointer rounded-xl border-2 px-2">All</p>
          )}
          {categoryListItem && categoryListItem.length > 0 ? (
            categoryListItem.map((item) => {
              return (
                <p
                  className="mx-1 cursor-pointer rounded-xl border-2 px-2"
                  key={item}
                >
                  {item}
                </p>
              );
            })
          ) : (
            <p className="text-center text-2xl font-bold ">
              You have no clothes upload some🤷‍♂️
            </p>
          )}
        </div>
        <motion.div
          layout
          className="container grid  h-screen grid-cols-2 grid-rows-4  gap-6 overflow-scroll bg-white pb-32  md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4"
        >
          {id && <AddClothes id={id} />}
          {inventoryItems && inventoryItems.length > 0 && (
            <InventoryClothes id={id} />
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ClosetInventory;
