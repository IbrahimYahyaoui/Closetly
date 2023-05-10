import React, { useState } from "react";
import { useParams } from "react-router-dom";
import ClosetInventory from "./ClosetInventory/ClosetInventory";
import WearBoard from "./WearBoard/WearBoard";
import { Transition } from "@headlessui/react";
import { motion } from "framer-motion";
const ClosetPage = () => {
  const { id } = useParams();
  const [isShowing, setIsShowing] = useState(false);
  return (
    <div className="flex h-screen overflow-hidden p-2">
      {/* <Transition
        show={isShowing}
        enter="transition ease duration-75"
        enterFrom=""
        enterTo="opacity-100"
        leave="transition-opacity duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      > */}
      <motion.section className="top-20    z-20 mr-2 h-screen  w-full border  bg-white p-2  md:w-2/4">
        <ClosetInventory id={id} />
      </motion.section>
      {/* </Transition> */}
      <section className=" bgPattern h-screen w-screen border md:block  md:w-2/4">
        {/* <button
          className="p-4 bg-slate-500"
          onClick={() => setIsShowing((isShowing) => !isShowing)}
        >
          open
        </button> */}
        <WearBoard />
      </section>
    </div>
  );
};

export default ClosetPage;
