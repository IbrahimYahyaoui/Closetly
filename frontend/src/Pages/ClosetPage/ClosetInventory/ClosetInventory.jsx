import React, { useContext, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import AddClothes from "./components/AddClothes/AddClothes";
import InventoryClothes from "./components/Inventoryitems/InventoryClothes";
import { inventoryContext } from "./context/InventoryContext";
import { AuthContext } from "../../AuthPage/context/AuthContext";
import { ArrowLongUpIcon } from "@heroicons/react/24/solid";

const ClosetInventory = ({ id, isShowing, setIsShowing }) => {
  const { categoryListItem, inventoryItems } = useContext(inventoryContext);
  const { user } = useContext(AuthContext);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const ChildrenRef = useRef(null);

  // map over child nodes
  useEffect(() => {
    if (ChildrenRef.current) {
      Array.from(ChildrenRef.current.childNodes).forEach((child) => {
        // apply any necessary logic to child nodes
        console.log(child);
      });
    }
  }, [ChildrenRef]);
  return (
    <AnimatePresence>
      <motion.div layout className="z-20 bg-white">
        <button
          className=" top-0 z-50 h-12  w-full bg-slate-200 md:hidden"
          onClick={() => setIsShowing(!isShowing)}
        >
          Close Your Closet
        </button>
        <h1 className="mb-5  text-2xl font-bold">
          {user && user.Username}'s Closet
        </h1>
        <div className="mb-5 mt-2 flex">
          {categoryListItem && categoryListItem.length > 0 && (
            <p
              className={`mx-1 cursor-pointer rounded-xl border-2 px-2 ${
                selectedCategory === "All" && "bg-gray-200"
              }`}
              onClick={(e) => {
                setSelectedCategory("All");
              }}
            >
              All
            </p>
          )}
          {categoryListItem && categoryListItem.length > 0 ? (
            categoryListItem.map((item) => {
              return (
                <p
                  className={`mx-1 cursor-pointer rounded-xl border-2 px-2 ${
                    selectedCategory === item && "bg-gray-200"
                  }`}
                  key={item}
                  onClick={(e) => {
                    setSelectedCategory(item);
                    // console.log(e.target.value);
                  }}
                >
                  {item}
                </p>
              );
            })
          ) : (
            <p className="text-center text-2xl font-bold ">
              You have no clothes upload some 🤷‍♂️
            </p>
          )}
        </div>
        <motion.div
          layout
          className=" container grid h-screen touch-none  grid-cols-2   gap-6 overflow-scroll bg-white p-2 pb-32  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {id && <AddClothes id={id} />}
          {inventoryItems && inventoryItems.length > 0 && (
            <InventoryClothes id={id} selectedCategory={selectedCategory} />
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ClosetInventory;
