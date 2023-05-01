import React from "react";
import { motion } from "framer-motion";
const LeftSection = () => {
  return (
    <div className="flex flex-col  items-center px-8 fixed  w-inherit">
      {/* Friends List */}
      <div className="border h-80 mt-10 w-full  ">
        <h3 className="font-semibold m-4 flex justify-between items-center  ">
          <p>My Friends</p>
          <p className="text-xs cursor-pointer">sell all</p>
        </h3>
      </div>
    </div>
  );
};

export default LeftSection;
