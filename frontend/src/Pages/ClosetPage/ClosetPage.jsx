import React, { useContext, useEffect, useState } from "react";

import ClosetInventory from "./ClosetInventory/ClosetInventory";
import WearBoard from "./WearBoard/WearBoard";
import { motion, AnimatePresence } from "framer-motion";
import { CurrentWearContext } from "../ClosetPage/WearBoard/Context/CurrentWearContext";
import Navbar from "../HomePage/components/Navbar";

const ClosetPage = () => {
  //  get id from local storage

  const [isShowing, setIsShowing] = useState(false);

  const { isDragging } = useContext(CurrentWearContext);

  // useEffect(() => {
  //   // setIsDragging(!isDragging);
  //   console.log("isDragging a", isDragging);
  //   // if (!isDragging) {
  //   //   setIsShowing(false);
  //   // }
  // }, [isDragging]);

  return (
    <>
      <div className="">
        <Navbar className="mb-10" />
      </div>
      <div className="flex h-screen w-screen overflow-hidden bg-black  md:flex-row">
        {!isShowing && (
          <button
            className="fixed bottom-0 right-0  z-50 h-12 w-full bg-slate-200 md:hidden"
            onClick={() => setIsShowing(!isShowing)}
          >
            Open Your Closet
          </button>
        )}
        {/* mobile device */}
        <AnimatePresence>
          {isShowing && (
            <motion.div
              className={` absolute bottom-0 left-0 top-0 z-10 mb-20     w-screen border-2 bg-white p-1 py-4 md:mt-0 md:hidden`}
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
          className={`bgPattern w-4/4 fixed  mt-10 h-screen w-screen md:right-0 md:w-2/4 ${
            isDragging && "z-20"
          }`}
        >
          <WearBoard />
        </section>
      </div>
    </>
  );
};

export default ClosetPage;
