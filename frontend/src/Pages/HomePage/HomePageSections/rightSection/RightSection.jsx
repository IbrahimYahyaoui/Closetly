import { motion } from "framer-motion";
import React, { useContext } from "react";
import Tshirt from "../../../../assets/wear.svg";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../AuthPage/context/AuthContext";
const RightSection = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className="flex  flex-col items-center px-8 ">
      <div className="  flex  h-fit w-full  flex-col items-center rounded-md border-2  p-2  font-semibold">
        <p className="opacity-80">
          Create your own virtual closet by uploading pictures of your own
          clothes. Explore and discover your personal style and then share it
          with others.
        </p>
        <motion.button
          className=" mt-4 h-10 w-full rounded bg-btnColor font-semibold capitalize text-white  "
          whileTap={{ scale: 0.9 }}
        >
          <img
            src={Tshirt}
            className="absolute w-8 -translate-x-2 translate-y-1  rotate-45 text-white opacity-60"
          />
          {user && (
            <Link
              onClick={() => {
                console.log("clicked");
              }}
              to={`/closet/${user.id}`}
            >
              visit your closet
            </Link>
          )}
        </motion.button>
      </div>
      {/* Friends List */}
      <div className="mt-10 h-80 w-full rounded-md border-2 ">
        <h3 className="m-4 flex cursor-pointer items-center justify-between font-semibold">
          <p>My Friends</p>
          <p className="cursor-pointer text-xs">sell all</p>
        </h3>
      </div>
    </div>
  );
};

export default RightSection;
