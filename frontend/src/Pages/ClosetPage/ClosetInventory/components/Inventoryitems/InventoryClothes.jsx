import React, { useContext } from "react";
import { inventoryContext } from "../../context/InventoryContext";

const InventoryClothes = () => {
  const { inventoryItems } = useContext(inventoryContext);
  console.log(inventoryItems);
  return (
    <>
      {inventoryItems &&
        inventoryItems.map((item) => {
          return (
            <div
              className="w-40 h-44 rounded-lg bg-slate-200 border-2 border-slate-200 cursor-pointer overflow-hidden flex items-center flex-col"
              key={item.clothId}
            >
              <div>
                <img
                  src={item.image}
                  className="bg-contain h-36 w-full object-contain"
                ></img>
              </div>
              <div>
                <p className="font-semibold text-sm">{item.name}</p>
              </div>
            </div>
          );
        })}
      <style jsx>{`
        /* Firefox */
        * {
          scrollbar-width: thin;
          scrollbar-color: black;
        }

        /* Chrome, Edge, and Safari */
        *::-webkit-scrollbar {
          width: 5px;
          border-radius: 80px;
        }

        *::-webkit-scrollbar-track {
          background-color: rgba(0, 0, 0, 0.2);
          border-radius: 80px;
        }

        *::-webkit-scrollbar-thumb {
          background-color: black;
          border-radius: 20px;
          border: 1px solid black;
          //   opacity: 0.3;
        }
      `}</style>
    </>
  );
};

export default InventoryClothes;
