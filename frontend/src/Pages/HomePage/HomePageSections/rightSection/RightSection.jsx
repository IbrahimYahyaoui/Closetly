import { motion } from "framer-motion";
import React, { useContext } from "react";
import Tshirt from "../../../../assets/wear.svg";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../AuthPage/context/AuthContext";
const RightSection = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className="flex  flex-col items-center px-8 ">
      <div className=" border-2  rounded-md h-fit  w-full flex flex-col items-center  p-2  font-semibold">
        <p className="opacity-80">
          Create your own virtual closet by uploading pictures of your own
          clothes. Explore and discover your personal style and then share it
          with others.
        </p>
        <motion.button
          className=" bg-btnColor w-full h-10 text-white capitalize font-semibold rounded mt-4  "
          whileTap={{ scale: 0.9 }}
        >
          <img
            src={Tshirt}
            className="w-8 text-white absolute rotate-45  opacity-60 -translate-x-2 translate-y-1"
          />
          {user && <Link to={`/closet/${user.id}`}>visit your closet</Link>}
        </motion.button>
      </div>
      {/* Friends List */}
      <div className="border-2 rounded-md h-80 mt-10 w-full ">
        <h3 className="font-semibold m-4 flex justify-between items-center cursor-pointer">
          <p>My Friends</p>
          <p className="text-xs cursor-pointer">sell all</p>
        </h3>
      </div>
    </div>
  );
};

export default RightSection;
