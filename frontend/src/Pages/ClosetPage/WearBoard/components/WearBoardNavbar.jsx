import React, { useContext, useEffect, useRef, useState } from "react";
import { PaperAirplaneIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { LoaderIcon, toast } from "react-hot-toast";
import { Dialog } from "@headlessui/react";
import { Loading, Textarea } from "@nextui-org/react";
import { CurrentWearContext } from "../Context/CurrentWearContext";
import { AuthContext } from "../../../AuthPage/context/AuthContext";

import shirt from "../../../../assets/closetAssets/shirtPlaceholder.svg";
import { useAddPost } from "../hooks/useAddPost";
const WearBoardNavbar = () => {
  const { TodayOutfit } = useContext(CurrentWearContext);
  const { user } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [description, setDescription] = useState("");

  const { addPostHandler, isLoading } = useAddPost();
  // call hook to add post

  const addPost = () => {
    addPostHandler(description, TodayOutfit, user.id);
  };

  return (
    <nav className="flex h-16 w-full items-center  justify-between border-b-2 bg-white  shadow-xl">
      <p className="p-4 text-xs  font-bold md:text-lg">
        Drag from your inventory and make your style
      </p>
      <p
        className="  mr-4 flex cursor-pointer items-center whitespace-nowrap rounded bg-slate-400 px-8 py-2 text-sm font-bold text-white"
        onClick={() => {
          if (Object.keys(TodayOutfit).length === 0) {
            toast.error("You have to wear something first");
            return;
          }
          setIsOpen(true);
        }}
      >
        Share it
        <PaperAirplaneIcon className="ml-2 h-6  w-6" />
      </p>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        {/* The backdrop, rendered as a fixed sibling to the panel container */}
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

        {/* Full-screen container to center the panel */}
        <div className="fixed inset-0 flex items-center justify-center p-4">
          {/* The actual dialog panel  */}
          <Dialog.Panel className="  w-96  rounded bg-white ">
            <div
              className="fixed -bottom-2 left-0 right-0 mb-4 flex justify-center"
              onClick={() => setIsOpen(false)}
            >
              <div className="cursor-pointer rounded-full bg-white px-2 py-2">
                <XMarkIcon className="w-4" />
              </div>
            </div>

            <Dialog.Title className=" py-4 text-center font-bold  capitalize ">
              share your outfit out there
            </Dialog.Title>

            <section className=" mb-10 ">
              <Textarea
                bordered
                //  if pass 200 char limit, color
                color="default"
                status="default"
                helperColor="default"
                helperText={`${description.length}/200 char used.`}
                label="Description"
                placeholder="Description"
                maxLength={200}
                css={{ width: "100%", padding: "0px 12px" }}
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
            </section>
            <section className="mx-3">
              <label className="">Shared Outfit</label>
              <div className=" grid w-full grid-cols-3 place-items-center text-center ">
                {TodayOutfit &&
                  Array.from({ length: 12 }).map((_, i) => {
                    if (TodayOutfit[i] !== "none") {
                      return (
                        <div
                          key={i}
                          className="h-20 w-full border-2 border-slate-100 "
                          style={{
                            backgroundImage: `url(${TodayOutfit[i]})`,
                            backgroundSize: "60px", // Add this line
                            backgroundPosition: "center",
                            backgroundRepeat: "no-repeat",
                          }}
                        ></div>
                      );
                    } else {
                      return (
                        <div
                          key={i}
                          className="h-20 w-full border-2 border-slate-100 "
                          style={{
                            backgroundImage: `url(${shirt})`,
                            backgroundSize: "20px", // Add this line
                            backgroundPosition: "center",
                            backgroundRepeat: "no-repeat",
                          }}
                        ></div>
                      );
                    }
                  })}
              </div>
            </section>
            {!isLoading ? (
              <button
                className=" my-4 ml-4 h-10 w-11/12 rounded bg-slate-400 font-bold capitalize text-white"
                onClick={() => {
                  addPost();
                }}
              >
                share it
              </button>
            ) : (
              <button className=" my-4 ml-4 h-10 w-11/12 rounded bg-slate-400 font-bold capitalize text-white">
                <Loading color={"currentColor"} size="sm" />
              </button>
            )}
          </Dialog.Panel>
        </div>
      </Dialog>
    </nav>
  );
};

export default WearBoardNavbar;
