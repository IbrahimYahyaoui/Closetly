import React, { useState } from "react";
import { motion } from "framer-motion";
import shirtPlaceholder from "../../../assets/closetAssets/shirtPlaceholder.svg";
import { Button, Dropdown, Input, Modal } from "@nextui-org/react";
import { ArrowUpTrayIcon } from "@heroicons/react/24/solid";
import AddClothes from "./components/AddClothes";
const ClosetInventory = () => {
  return (
    <div>
      <h1 className="font-bold  text-2xl">Browse your Closet</h1>
      <p className="mt-2 mb-5">
        yourCloset {">"} shirt {">"}summer {">"}yourCloset
      </p>
      <div>
        <AddClothes />
      </div>
    </div>
  );
};

export default ClosetInventory;
