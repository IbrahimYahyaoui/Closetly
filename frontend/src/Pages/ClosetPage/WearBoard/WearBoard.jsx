import React, { useContext, useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";

import { CurrentWearContext } from "../CurrentWear/Context/CurrentWearContext";
import shirt from "../../../assets/closetAssets/shirtPlaceholder.svg";
import { PaperAirplaneIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { toast } from "react-hot-toast";
const WearBoard = () => {
  const { readyToWear } = useContext(CurrentWearContext);
  // console.log(readyToWear, "ready to wear");
  const [itemTodropOver, setItemTodropOver] = useState(null);
  //  all the logic below is related to drag and drop the item from the inventory to the wear board
  const [coordinateAry, setCoordinateAry] = useState([]);
  const DropZoneRef = useRef(null);
  const childRefs = useRef([]);
  // console log Background image of child nodes
  useEffect(() => {
    childRefs.current.forEach((childRef) => {
      if (!childRef.style.backgroundImage) {
        childRef.style.backgroundImage = `url(${shirt})`;
        childRef.style.backgroundSize = "24px";
        childRef.style.backgroundPosition = "center";
        childRef.style.backgroundRepeat = "no-repeat";
      }
    });
  }, []);

  const handleDrop = (event) => {
    console.log("dropped");
    // console.log(coordinateAry);
    childRefs.current.forEach((childRef, i) => {
      console.log(childRef.style.backgroundImage);
      if (i === itemTodropOver) {
        childRef.style.backgroundImage = `url(${readyToWear.image})`;
        childRef.style.backgroundSize = "contain";
        childRef.style.backgroundPosition = "center";
        childRef.style.backgroundRepeat = "no-repeat";
        // add delete icon to each item

        // clear html
        const xMarkIcon = (
          <XMarkIcon
            className="w-' full absolute right-2 top-2 h-4 cursor-pointer rounded
           bg-black text-white"
            onClick={() => {
              childRef.style.backgroundImage = `url(${shirt})`;
              childRef.style.backgroundSize = "24px";
              childRef.style.backgroundPosition = "center";
              childRef.style.backgroundRepeat = "no-repeat";
              // clear html
              ReactDOM.render("", childRef);
            }}
          />
        );
        ReactDOM.render(xMarkIcon, childRef);
      } else {
      }
    });
  };
  // get all the child nodes coordinates to Drag over Them
  useEffect(() => {
    function handleClick() {
      const childNodes = DropZoneRef.current.childNodes;
      const newCoordinateAry = Array.from(childNodes).map((childNode, i) => {
        const { left, top } = childNode.getBoundingClientRect();
        const { scrollX, scrollY } = window;
        const clientX = left + scrollX;
        const clientY = top + scrollY;

        return { id: i, X: clientX, Y: clientY };
      });
      setCoordinateAry(newCoordinateAry);
    }
    handleClick();
  }, [DropZoneRef]);
  //
  useEffect(() => {
    if (!readyToWear || coordinateAry.length === 0) return;

    coordinateAry.forEach((child, i) => {
      const childRef = childRefs.current[i];
      if (
        readyToWear.X >= child.X &&
        readyToWear.X <= child.X + childRef.offsetWidth &&
        readyToWear.Y >= child.Y &&
        readyToWear.Y <= child.Y + childRef.offsetHeight
      ) {
        setItemTodropOver(i);
      }
    });
  }, [readyToWear]);

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
                className="relative flex h-36 w-36 items-center justify-center border"
                ref={(ref) => (childRefs.current[item] = ref)}
                key={item}
                onClick={() => {
                  console.log(item);
                }}
              ></div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WearBoard;
