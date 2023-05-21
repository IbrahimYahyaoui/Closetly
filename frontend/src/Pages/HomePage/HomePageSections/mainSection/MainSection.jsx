import React, { useContext, useEffect, useRef } from "react";
import Tshirt from "../../../../assets/wear.svg";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../AuthPage/context/AuthContext";
const MainSection = () => {
  const isButtonInViewPort = useRef();
  const isInView = useInView(isButtonInViewPort);
  const { user } = useContext(AuthContext);

  return (
    <div className=" w-full overflow-hidden  ">
      {/* this button will appear only on phone device  */}
      <div
        className="flex flex-col items-center rounded-md border-2 md:hidden "
        ref={isButtonInViewPort}
      >
        <p className="p-2 font-semibold">
          Start discover your personal style and then share it with others.
        </p>
        <Link
          to="/closet"
          className="relative my-4 flex h-12 w-11/12 items-center justify-center rounded bg-btnColor font-semibold capitalize text-white  "
        >
          <img
            src={Tshirt}
            className="absolute -bottom-1  -left-3 w-8  rotate-45 text-white opacity-60"
          />
          visit your closet
        </Link>
      </div>
      {
        // this section will appear only on desktop
        !isInView && (
          <motion.div
            className="fixed bottom-0  right-0 m-4 flex h-20 w-20  items-center justify-center rounded-full bg-btnColor md:hidden"
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
            <Link to={`/closet`} className="">
              <p className="p-20 text-center  text-sm font-semibold text-white">
                visit your closet
              </p>
            </Link>
          </motion.div>
        )
      }
      {
        // thsi is test section
      }
      <div className="h-screen  w-full"></div>
      <div className="h-screen  w-full"></div>
      <div className="h-screen  w-full"></div>
      <div className="h-screen  w-full"></div>
    </div>
  );
};

export default MainSection;
