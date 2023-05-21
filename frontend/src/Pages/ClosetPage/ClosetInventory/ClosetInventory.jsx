import React, { useContext, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import AddClothes from "./components/AddClothes/AddClothes";
import InventoryClothes from "./components/Inventoryitems/InventoryClothes";
import { inventoryContext } from "./context/InventoryContext";
import { AuthContext } from "../../AuthPage/context/AuthContext";
import { ArrowLongUpIcon } from "@heroicons/react/24/solid";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";

const ClosetInventory = ({ isShowing, setIsShowing }) => {
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

  const getSlidesPerView = () => {
    // Define the number of slides per view based on screen size
    if (window.innerWidth >= 768) {
      return 6; // 6 slides on desktop
    } else {
      return 3; // 3 slides on mobile
    }
  };

  return (
    <>
      <motion.div layout className="z-20 h-full overflow-hidden md:h-full">
        <button
          className="top-0 z-50 h-12 w-full bg-slate-200 md:hidden"
          onClick={() => setIsShowing(!isShowing)}
        >
          Close Your Closet
        </button>
        <h1 className="mb-5 text-2xl font-bold">
          {user && user.Username}'s Closet
        </h1>
        <div className="flex w-96 md:w-screen">
          {categoryListItem && categoryListItem.length > 0 && (
            <p
              className={`mx-1 h-8 cursor-pointer rounded-xl border-2 px-2 ${
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
            <Swiper
              slidesPerView={getSlidesPerView()}
              spaceBetween={6}
              pagination={{
                clickable: true,
              }}
              className="mySwiper ml-0 h-10"
            >
              {categoryListItem.map((item) => (
                <SwiperSlide
                  key={item}
                  className="mx-0 flex h-8 w-24 justify-center"
                >
                  <p
                    className={`w-fit cursor-pointer whitespace-nowrap rounded-xl border-2 px-2 ${
                      selectedCategory === item && "bg-gray-200"
                    }`}
                    onClick={() => setSelectedCategory(item)}
                  >
                    {item}
                  </p>
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <p className="text-center text-2xl font-bold">
              You have no clothes. Upload some 🤷‍♂️
            </p>
          )}
        </div>
        <motion.div
          layout
          className="wrapper grid-rows-auto grid h-full grid-cols-2  overflow-x-hidden bg-white p-4 pb-32 md:grid-cols-2 md:pr-4 lg:grid-cols-3 xl:grid-cols-4"
          style={{ gridAutoRows: "min-content" }}
        >
          <AddClothes />

          {inventoryItems && inventoryItems.length > 0 && (
            <InventoryClothes selectedCategory={selectedCategory} />
          )}
        </motion.div>
      </motion.div>
      <style>
        {`
          /* Firefox */
          * {
            scrollbar-width: thin;
            scrollbar-color: black;
          }

          /* Chrome, Edge, and Safari */
          *::-webkit-scrollbar {
            width: 5px; /* increase the width */
            border-radius: 20px; /* increase the border-radius */
          }

          *::-webkit-scrollbar-track {
            background-color: rgba(0, 0, 0, 0.2);
            border-radius: 20px;
          }

          *::-webkit-scrollbar-thumb {
            background-color: black;
            border-radius: 10px;
            border: 1px solid black;
            //   opacity: 0.3;
          }
        `}
      </style>
    </>
  );
};

export default ClosetInventory;
