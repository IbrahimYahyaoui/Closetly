import React, { useContext, useEffect, useRef, useState } from "react";
import { CurrentWearContext } from "../CurrentWear/Context/CurrentWearContext";
import shirt from "../../../assets/closetAssets/shirtPlaceholder.svg";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { toast } from "react-hot-toast";
const WearBoard = () => {
  const { readyToWear } = useContext(CurrentWearContext);
  // console.log(readyToWear, "ready to wear");
  const [inventory, setInventory] = useState([]);
  //  all the logic below is related to drag and drop the item from the inventory to the wear board
  // 1- set the item to be ready to wear

  //
  const [ChildAry, setChildAry] = useState([]);
  const DropZoneRef = useRef(null);
  const childRefs = useRef([]);
  const handleDrop = (event) => {
    event.preventDefault();
    const itemId = event.dataTransfer.getData("itemId");
    console.log(itemId);
    const item = inventory.find((item) => item.id === itemId);
    console.log(item, "item");
    setReadyToWear(item);

    // Add the dropped item to the inventory
    setInventory([...inventory, item]);
  };
  useEffect(() => {
    function handleClick() {
      const childNodes = DropZoneRef.current.childNodes;
      const newChildAry = Array.from(childNodes).map((childNode, i) => {
        const { left, top } = childNode.getBoundingClientRect();
        const { scrollX, scrollY } = window;
        const clientX = left + scrollX;
        const clientY = top + scrollY;
        // console.log(`Child node coordinates: (${clientX}, ${clientY})`);
        return { id: i, X: clientX, Y: clientY };
      });
      setChildAry(newChildAry);
    }

    handleClick();
  }, [DropZoneRef]);

  useEffect(() => {
    if (!readyToWear || ChildAry.length === 0) return;

    ChildAry.forEach((child, i) => {
      const childRef = childRefs.current[i];
      if (
        readyToWear.X >= child.X &&
        readyToWear.X <= child.X + childRef.offsetWidth &&
        readyToWear.Y >= child.Y &&
        readyToWear.Y <= child.Y + childRef.offsetHeight &&
        childRef.style.backgroundImage !== `url(${readyToWear.image})`
        // childRef.style.backgroundImage !== ""
      ) {
        // childRef.style.backgroundColor = "red";
        childRef.style.backgroundImage = `url(${readyToWear.image})`;
        childRef.style.backgroundSize = "contain";
        childRef.style.backgroundPosition = "center";
        childRef.style.backgroundRepeat = "no-repeat";
        // cler child nodes
        childRef.innerHTML = "";
      } else {
        childRef.style.backgroundImage = `url(${shirt})`;
        // childRef.style.backgroundSize = "contain";
        childRef.style.backgroundPosition = "center";
        childRef.style.backgroundRepeat = "no-repeat";
        // bg size 10px
        childRef.style.backgroundSize = "25px";
      }
    });
  }, [readyToWear, ChildAry]);

  return (
    <div className=" relative h-full w-full">
      <nav className="flex h-16 w-full items-center  justify-between border-b-2 bg-white  shadow-xl">
        <p className="p-4 font-bold">
          Drag from your inventory and make your style
        </p>
        <p
          className="  mr-4 flex cursor-pointer items-center rounded bg-slate-400 px-8 py-2 font-bold text-white"
          onClick={() => {
            toast.dismiss();
            toast("under development ", {
              icon: "🚧",
            });
          }}
        >
          Share it
          <PaperAirplaneIcon className="ml-2 h-6  w-6" />
        </p>
      </nav>
      <div className="flex justify-center">
        <div
          className="   mt-10 grid grid-cols-5  border-2"
          ref={DropZoneRef}
          onDrop={handleDrop}
          onDragOver={(event) => event.preventDefault()}
        >
          {Array.from(Array(20).keys()).map((item) => {
            return (
              <div
                className="flex h-36 w-36 items-center justify-center border "
                ref={(ref) => (childRefs.current[item] = ref)}
              >
                <img src={shirt} alt="" className="z-1 h-4 w-4" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WearBoard;
