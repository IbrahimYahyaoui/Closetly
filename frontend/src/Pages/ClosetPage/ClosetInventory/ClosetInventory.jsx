import React, { useState } from "react";

import AddClothes from "./components/AddClothes/AddClothes";
const ClosetInventory = ({ id }) => {
  return (
    <div>
      <h1 className="font-bold  text-2xl">Browse your Closet</h1>
      <p className="mt-2 mb-5">
        yourCloset {">"} shirt {">"}summer {">"}yourCloset
      </p>
      <div>
        <AddClothes id={id} />
      </div>
    </div>
  );
};

export default ClosetInventory;
