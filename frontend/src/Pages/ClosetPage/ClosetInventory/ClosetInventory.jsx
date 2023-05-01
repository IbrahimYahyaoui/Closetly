import React, { useState } from "react";
import { motion } from "framer-motion";
import shirtPlaceholder from "../../../assets/closetAssets/shirtPlaceholder.svg";
import { Button, Dropdown, Input, Modal } from "@nextui-org/react";
import { ArrowUpTrayIcon } from "@heroicons/react/24/solid";
const ClosetInventory = () => {
  const [visible, setVisible] = React.useState(false);
  const handler = () => setVisible(true);
  const closeHandler = () => {
    setVisible(false);
    console.log("closed");
  };
  const [selected, setSelected] = useState(new Set(["Category"]));

  const selectedValue = React.useMemo(
    () => Array.from(selected).join(", ").replaceAll("_", " "),
    [selected]
  );
  return (
    <div>
      <h1 className="font-bold  text-2xl">Browse your Closet</h1>
      <p className="mt-2 mb-5">
        yourCloset {">"} shirt {">"}summer {">"}yourCloset
      </p>
      <div className="">
        {/* add piece */}
        <motion.div
          className=" bg-slate-200 w-40 h-44 rounded-lg flex flex-col justify-center items-center cursor-pointer"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.9 }}
          onClick={handler}
        >
          <img src={shirtPlaceholder} className="w-8" />
          <p className="font-bold ">add Clothes</p>
        </motion.div>
        {/* add piece Form  */}
        <Modal
          closeButton
          blur
          aria-labelledby="modal-title"
          open={visible}
          onClose={closeHandler}
        >
          <Modal.Header className="flex flex-col">
            <p className="mb-10">upload your Clothes</p>
            <div>
              <label>
                <input type="file" hidden />
                <p className="h-36  rounded w-40 flex items-center justify-center border-2 border-dashed ">
                  <ArrowUpTrayIcon className="text-black stroke-none w-8 " />
                </p>
              </label>
              {/* <Input label="Full Name" placeholder="Guillermo Rauch" /> */}
              <div className="mt-8">
                <Input
                  css={{ textAlign: "left ", fontSize: 16 }}
                  label="Full Name"
                  placeholder="Guillermo Rauch"
                />
              </div>
              <label className="flex flex-col justify-start ">
                <p className="text-left my-2 text-base">Category :</p>
                <Dropdown>
                  <Dropdown.Button
                    flat
                    css={{
                      tt: "capitalize",
                      backgroundColor: "#cccccc",
                      color: "$blue700",
                    }}
                    className="btnNextUi"
                  >
                    {selectedValue}
                  </Dropdown.Button>
                  <Dropdown.Menu
                    aria-label="Single selection actions"
                    color="current"
                    disallowEmptySelection
                    selectionMode="single"
                    selectedKeys={selected}
                    onSelectionChange={setSelected}
                    disabledKeys={["Category"]}
                  >
                    {/* <Dropdown.Item key="head">Category</Dropdown.Item> */}
                    <Dropdown.Item key="Category">Choose one</Dropdown.Item>
                    <Dropdown.Item key="number">Number</Dropdown.Item>
                    <Dropdown.Item key="date">Date</Dropdown.Item>
                    <Dropdown.Item key="single_date">Single Date</Dropdown.Item>
                    <Dropdown.Item key="iteration">Iteration</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </label>
            </div>
          </Modal.Header>
          <Modal.Body></Modal.Body>
          <Modal.Footer className="flex justify-center ">
            <button className="h-10 bg-btnColor w-80 rounded text-white font-semibold text-md">
              Add it
            </button>
          </Modal.Footer>
        </Modal>
        {/* end  add  piece */}
      </div>
    </div>
  );
};

export default ClosetInventory;
