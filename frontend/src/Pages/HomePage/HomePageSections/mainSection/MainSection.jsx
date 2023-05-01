import React, { useEffect, useRef } from "react";
import Tshirt from "../../../../assets/wear.svg";
import { motion, useInView } from "framer-motion";
const MainSection = () => {
  const isButtonInViewPort = useRef();
  const isInView = useInView(isButtonInViewPort);

  return (
    <div className=" w-full overflow-hidden  ">
      {/* this button will appear only on phone device  */}
      <div
        className="border-2 rounded-md flex flex-col items-center md:hidden "
        ref={isButtonInViewPort}
        style={{ overflow: "scroll" }}
      >
        <p className="font-semibold p-2">
          Start discover your personal style and then share it with others.
        </p>
        <motion.button
          className=" bg-btnColor w-11/12 h-12 text-white capitalize font-semibold rounded my-4  "
          whileTap={{ scale: 0.9 }}
        >
          <img
            src={Tshirt}
            className="w-8 text-white absolute rotate-45  opacity-60 -translate-x-2 translate-y-2"
          />
          visit your closet
        </motion.button>
      </div>
      {
        // this section will appear only on desktop
        !isInView && (
          <motion.div
            className="w-24 h-24  bg-btnColor rounded-full fixed bottom-0 right-0  m-4"
            drag
            dragConstraints={{
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
            }}
            // dragElastic={0.5}
            whileDrag={{ scale: 1.2 }}
          >
            <p className="text-center font-semibold  text-white p-2">
              {" "}
              Visite your closet
            </p>
          </motion.div>
        )
      }
      {
        // thsi is test section
      }
      <div className="w-full  h-screen"></div>
      <div className="w-full  h-screen"></div>
      <div className="w-full  h-screen"></div>
      <div className="w-full  h-screen"></div>
    </div>
  );
};

export default MainSection;
