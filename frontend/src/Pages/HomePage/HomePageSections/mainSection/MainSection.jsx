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
          {user && <Link to={`/closet/${user.id}`}>visit your closet</Link>}
        </motion.button>
      </div>
      {
        // this section will appear only on desktop
        !isInView && (
          <motion.div
            className="w-20 h-20  bg-btnColor rounded-full fixed bottom-0 right-0  m-4 md:hidden flex justify-center items-center"
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
            {user && (
              <Link to={`/closet/${user.id}`} className="">
                <p className="text-center font-semibold  text-white p-4 text-sm">
                  visit your closet
                </p>
              </Link>
            )}
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
