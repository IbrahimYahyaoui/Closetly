import React, { useContext, useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";

import { CurrentWearContext } from "../WearBoard/Context/CurrentWearContext";
import shirt from "../../../assets/closetAssets/shirtPlaceholder.svg";
import { PaperAirplaneIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { toast } from "react-hot-toast";
import WearBoardNavbar from "./components/WearBoardNavbar";

const WearBoard = () => {
  const {
    readyToWear,
    TodayOutfit: TodayOutfitContext,
    dispatch: CurrentWearDispatch,
  } = useContext(CurrentWearContext);
  // how many cloth spot to wear are available
  // help in future to add more cloth spot dynamically
  const [clothSpot, setClothSpot] = useState(12);

  // console.log(readyToWear, "ready to wear");
  const [itemTodropOver, setItemTodropOver] = useState(null);

  //  all the logic below is related to drag and drop the item from the inventory to the wear board
  const [coordinateAry, setCoordinateAry] = useState([]);
  const DropZoneRef = useRef(null);

  const childRefs = useRef([]);
  // add empty background image
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
    //
    CurrentWearDispatch &&
      CurrentWearDispatch({ type: "SET_IS_DRAGGING", payload: false });
    // console.log(coordinateAry);
    childRefs.current.forEach((childRef, i) => {
      // console.log(childRef.style.backgroundImage);
      if (i === itemTodropOver) {
        childRef.style.backgroundImage = `url(${readyToWear.image})`;
        childRef.style.backgroundSize = "contain";
        childRef.style.backgroundPosition = "center";
        childRef.style.backgroundRepeat = "no-repeat";
        // add delete icon to each item

        const xMarkIcon = (
          <XMarkIcon
            className="absolute right-2 top-2 h-4 w-4 cursor-pointer rounded bg-black text-white"
            onClick={() => {
              childRef.style.backgroundImage = `url(${shirt})`;
              childRef.style.backgroundSize = "24px";
              childRef.style.backgroundPosition = "center";
              childRef.style.backgroundRepeat = "no-repeat";

              TodayOutfitHandler();
              // clear html
              ReactDOM.render("", childRef);
            }}
          />
        );
        ReactDOM.render(xMarkIcon, childRef);
      } else {
      }
    });
    // set the current outfit to the context
    TodayOutfitHandler();
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
  // extract the current wear background from the wareBoard and send it to the currentWearContext
  const [TodayOutfit, setTodayOutfit] = useState({});
  const TodayOutfitHandler = () => {
    childRefs.current.map((childRef, i) => {
      const backgroundImage = childRef.style.backgroundImage;

      if (!backgroundImage.includes("shirtPlaceholder.svg")) {
        const urlStartIdx = backgroundImage.indexOf('"') + 1;
        const urlEndIdx = backgroundImage.lastIndexOf('"');
        const url = backgroundImage.substring(urlStartIdx, urlEndIdx);
        setTodayOutfit((prev) => ({
          ...prev,
          [i]: url,
        }));
      } else {
        setTodayOutfit((prev) => ({
          ...prev,
          [i]: "none",
        }));
      }
    });
  };
  useEffect(() => {
    CurrentWearDispatch({ type: "SET_TODAY_OUTFIT", payload: TodayOutfit });
  }, [TodayOutfit]);
  return (
    <div className="  h-full w-full p-2">
      <div className="pt-2">
        <WearBoardNavbar />
      </div>
      <div className="flex justify-center">
        <div
          className="  grid-row-4   mt-10 grid w-full  grid-cols-3 border-2"
          ref={DropZoneRef}
          onDrop={handleDrop}
          onDragOver={(event) => event.preventDefault()}
        >
          {Array.from(Array(clothSpot).keys()).map((item) => {
            return (
              <div
                className=" w-3/3 lg: relative  flex h-32 items-center justify-center  border"
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
