import React from "react";
import { useParams } from "react-router-dom";
import ClosetInventory from "./ClosetInventory/ClosetInventory";

const ClosetPage = () => {
  const { id } = useParams();
  return (
    <div className="flex p-2">
      <section className="border  w-2/4 mr-2  h-screen p-2">
        <ClosetInventory />
      </section>

      <section className="border w-2/4  h-screen "></section>
    </div>
  );
};

export default ClosetPage;
