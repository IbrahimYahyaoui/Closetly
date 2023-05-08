import React, { useContext, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import AddClothes from "./components/AddClothes/AddClothes";
import InventoryClothes from "./components/Inventoryitems/InventoryClothes";
import { inventoryContext } from "./context/InventoryContext";
import { AuthContext } from "../../AuthPage/context/AuthContext";
const ClosetInventory = ({ id }) => {
  const { categoryListItem, inventoryItems } = useContext(inventoryContext);
  const { user } = useContext(AuthContext);
  console.log(categoryListItem, "state");
  return (
    <AnimatePresence>
      <motion.div layout>
        <h1 className="font-bold  text-2xl mb-5">
          {user && user.Username}'s Closet
        </h1>
        <div className="mt-2 mb-5 flex">
          {categoryListItem && categoryListItem.length > 0 && (
            <p className="px-2 mx-1 border-2 rounded-xl cursor-pointer">All</p>
          )}
          {categoryListItem && categoryListItem.length > 0 ? (
            categoryListItem.map((item) => {
              return (
                <p
                  className="px-2 mx-1 border-2 rounded-xl cursor-pointer"
                  key={item}
                >
                  {item}
                </p>
              );
            })
          ) : (
            <p className="text-2xl font-bold text-center ">
              You have no clothes upload some🤷‍♂️
            </p>
          )}
        </div>
        <motion.div
          layout
          className="container grid gap-6 grid-rows-4  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4  h-screen overflow-scroll pb-32"
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
