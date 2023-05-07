import React, { useState } from "react";

import AddClothes from "./components/AddClothes/AddClothes";
import InventoryClothes from "./components/Inventoryitems/InventoryClothes";
const ClosetInventory = ({ id }) => {
  return (
    <div className=" ">
      <h1 className="font-bold  text-2xl">Browse your Closet</h1>
      <p className="mt-2 mb-5">
        yourCloset {">"} shirt {">"}summer {">"}yourCloset
      </p>
      <div className="container grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4  h-screen overflow-scroll pb-32">
        <AddClothes id={id} />
        <InventoryClothes />
      </div>
    </div>
  );
};

export default ClosetInventory;
