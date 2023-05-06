import React, { useState, Fragment } from "react";
import { motion } from "framer-motion";

import shirtPlaceholder from "../../../../assets/closetAssets/shirtPlaceholder.svg";
import { Input } from "@nextui-org/react";
import {
  ArrowUpTrayIcon,
  ChevronUpDownIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";

import { Dialog, Listbox, Transition } from "@headlessui/react";
const AddClothes = () => {
  let [isOpen, setIsOpen] = useState(false);
  const people = [
    { name: "Wade Cooper" },
    { name: "Arlene Mccoy" },
    { name: "Devon Webb" },
    { name: "Tom Cook" },
    { name: "Tanya Fox" },
    { name: "Hellen Schmidt" },
  ];
  const [selected, setSelected] = useState(people[0]);
  const [isAddCategory, setIsAddCategory] = useState(true);
  const [ClothesPicture, setClothesPicture] = useState();

  return (
    <>
      <motion.div
        className=" bg-slate-200 w-40 h-44 rounded-lg flex flex-col justify-center items-center cursor-pointer"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
      >
        <img src={shirtPlaceholder} className="w-8" />
        <p className="font-bold ">add Clothes</p>
      </motion.div>
      {/* add piece Form  */}

      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        {/* The backdrop, rendered as a fixed sibling to the panel container */}
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

        {/* Full-screen scrollable container */}
        <div className="fixed inset-0 overflow-y-auto">
          {/* Container to center the panel */}
          <div className="flex min-h-full items-center justify-center p-4">
            {/* The actual dialog panel  */}
            <Dialog.Panel className="mx-auto  rounded bg-white w-96 flex flex-col items-center">
              <div
                className="absolute bottom-5 bg-white py-2 px-2 rounded-full "
                onClick={() => setIsOpen(false)}
              >
                <XMarkIcon className="w-4" />
              </div>
              <Dialog.Title className="font-semibold  uppercase mt-5">
                Add your clothes
              </Dialog.Title>
              <label className="mt-5">
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={(e) => setClothesPicture(e.target.files[0])}
                />
                {ClothesPicture ? (
                  <img
                    src={URL.createObjectURL(ClothesPicture)}
                    className="w-40 h-40 object-cover"
                  />
                ) : (
                  <p className="h-36  rounded w-40 flex items-center justify-center border-2 border-dashed  border-blue-400 ">
                    <ArrowUpTrayIcon className="text-black stroke-none w-8 " />
                  </p>
                )}
              </label>
              <div className="mt-5">
                <Input
                  css={{
                    textAlign: "left ",
                    fontSize: 16,
                  }}
                  label="Full Name"
                  placeholder="set an item name"
                  className="w-60"
                />
              </div>
              {isAddCategory ? (
                <div className="mt-3">
                  <p className="capitalize text-sm">select category</p>
                  <Listbox
                    value={selected}
                    onChange={setSelected}
                    className="z-30 mt-2"
                  >
                    <div className="relative mt-1">
                      <Listbox.Button className="relative w-60 cursor-default rounded-lg bg-NextInputColor py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                        <span className="block truncate">{selected.name}</span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 bg-NextInputColor">
                          <ChevronUpDownIcon
                            className="h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                        </span>
                      </Listbox.Button>
                      <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <Listbox.Options className="absolute mt-1 max-h-40 w-full overflow-auto rounded-md bg-white  py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                          {people.map((person, personIdx) => (
                            <Listbox.Option
                              key={personIdx}
                              className={({ active }) =>
                                `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                  active
                                    ? "bg-slate-100  cursor-pointer"
                                    : "text-gray-900"
                                }`
                              }
                              value={person}
                            >
                              {({ selected }) => (
                                <>
                                  <span
                                    className={`block truncate ${
                                      selected ? "font-medium" : "font-normal"
                                    }`}
                                    onClick={() => {
                                      console.log("clicked");
                                    }}
                                  >
                                    {person.name}
                                  </span>
                                  {selected ? (
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                      <CheckIcon
                                        className="h-5 w-5"
                                        aria-hidden="true"
                                      />
                                    </span>
                                  ) : null}
                                </>
                              )}
                            </Listbox.Option>
                          ))}
                        </Listbox.Options>
                      </Transition>
                    </div>
                  </Listbox>
                </div>
              ) : (
                <div className="mt-3">
                  <Input
                    css={{
                      textAlign: "left ",
                      fontSize: 16,
                    }}
                    label="New Category"
                    placeholder="category name"
                    className="w-60"
                  />
                </div>
              )}
              <div className="flex items-center w-3/4 mx-auto my-2">
                <hr className="flex-grow border-t-2  border-slate-300" />
                <span className="mx-4 font-bold text-slate-300">or</span>
                <hr className="flex-grow border-t-2 border-slate-300" />
              </div>
              {isAddCategory ? (
                <p
                  className="text-sm text-blue-400 font-bold cursor-pointer"
                  onClick={() => setIsAddCategory(false)}
                >
                  add new category
                </p>
              ) : (
                <p
                  className="text-sm text-blue-400 font-bold  cursor-pointer"
                  onClick={() => setIsAddCategory(true)}
                >
                  select category
                </p>
              )}

              <button
                className="h-10 bg-btnColor w-80 rounded text-white font-semibold text-md z-10 my-5"
                onClick={() => {
                  console.log("clicked");
                }}
              >
                Add it
              </button>
            </Dialog.Panel>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default AddClothes;