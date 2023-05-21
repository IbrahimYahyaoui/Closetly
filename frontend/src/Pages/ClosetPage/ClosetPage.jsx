import React, { useContext, useEffect, useState } from "react";

import ClosetInventory from "./ClosetInventory/ClosetInventory";
import WearBoard from "./WearBoard/WearBoard";
import { motion, AnimatePresence } from "framer-motion";
import { CurrentWearContext } from "./CurrentWear/Context/CurrentWearContext";

const ClosetPage = () => {
  //  get id from local storage

  const [isShowing, setIsShowing] = useState(false);

  const { readyToWear, isDragging } = useContext(CurrentWearContext);

  // useEffect(() => {
  //   // setIsDragging(!isDragging);
  //   console.log("isDragging a", isDragging);
  //   // if (!isDragging) {
  //   //   setIsShowing(false);
  //   // }
  // }, [isDragging]);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-black  md:flex-row">
      {!isShowing && (
        <button
          className="absolute bottom-0 right-0  z-50 h-12 w-1/2 bg-slate-200 md:hidden"
          onClick={() => setIsShowing(!isShowing)}
        >
          Open Your Closet
        </button>
      )}
      {/* mobile device */}
      <AnimatePresence>
        {isShowing && (
          <motion.div
            className={` absolute bottom-0 left-0 top-0 z-10 mb-20     border-2 bg-white p-1 py-4 md:mt-0 md:hidden md:w-2/4`}
            initial={{ y: window.innerHeight }}
            animate={{ y: 150 }}
            exit={{ y: window.innerHeight }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <ClosetInventory
              isShowing={isShowing}
              setIsShowing={setIsShowing}
            />
          </motion.div>
        )}
      </AnimatePresence>
      {/* desktop */}
      <div className="inv bottom-0 z-20 hidden border-2 bg-white p-4 md:mt-0 md:block md:w-2/4">
        <ClosetInventory />
      </div>
      <section
        className={`bgPattern w-4/4 fixed  h-screen w-screen md:right-0 md:w-2/4 ${
          isDragging && "z-20"
        }`}
      >
        <WearBoard />
      </section>
    </div>
  );
};

export default ClosetPage;
