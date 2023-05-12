import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ClosetInventory from "./ClosetInventory/ClosetInventory";
import WearBoard from "./WearBoard/WearBoard";
import { motion, AnimatePresence } from "framer-motion";
import { CurrentWearContext } from "./CurrentWear/Context/CurrentWearContext";

const ClosetPage = () => {
  const { id } = useParams();
  const [isShowing, setIsShowing] = useState(false);

  const { readyToWear, isDragging } = useContext(CurrentWearContext);
  useEffect(() => {
    // setIsDragging(!isDragging);
    console.log("isDragging", isDragging);
  }, [isDragging]);
  return (
    <div className="flex h-screen overflow-hidden md:flex-row">
      <button
        className="absolute bottom-0 z-50  h-12 w-full bg-slate-200 md:hidden"
        onClick={() => setIsShowing(!isShowing)}
      >
        {isShowing ? "Close Your Closet" : "Open Your Closet"}
      </button>

      <AnimatePresence>
        {isShowing && (
          <motion.div
            className={`inv ${
              isDragging ? "-translate-y-768 opacity-50" : ""
            } bottom-0 z-20
              border-2 bg-white p-4 md:mt-0 md:hidden
            md:w-2/4`}
            initial={{ y: window.innerHeight }}
            animate={{ y: 150 }}
            exit={{ y: window.innerHeight }}
            // while isDragging is true translate the inventory to the bottom of the screen then back to the top when their place
          >
            <ClosetInventory id={id} />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="inv bottom-0 z-20 hidden border-2 bg-white p-4 md:mt-0 md:block md:w-2/4">
        <ClosetInventory id={id} />
      </div>
      <section className="bgPattern w-4/4 fixed h-screen md:right-0 md:w-2/4">
        <WearBoard />
      </section>
    </div>
  );
};

export default ClosetPage;
