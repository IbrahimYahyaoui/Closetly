import { Avatar, Badge, Dropdown, User } from "@nextui-org/react";
import React, { useContext } from "react";
import { AuthContext } from "../../AuthPage/context/AuthContext";
import {
  ChevronDownIcon,
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
  CogIcon,
  HeartIcon,
  BellIcon,
} from "@heroicons/react/24/solid";
import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import { motion } from "framer-motion";
const Navbar = () => {
  const { user } = useContext(AuthContext);
  console.log(user);
  return (
    <nav className="flex   lg:mt-4   justify-between w-full pt-2 border-b-2 pb-1 ">
      <div className="LogoFont text-2xl  opacity-70 w-1/3 ">closetly</div>
      <section className="flex items-center w-2/3 justify-end ">
        <div className="flex  w-16 justify-between items-center ">
          <div>
            <Dropdown placement="bottom-right ">
              <Dropdown.Button className="p-0">
                <Badge color="error" content={0}>
                  <HeartIcon className=" fill-none  stroke-black w-6  cursor-pointer" />
                </Badge>
              </Dropdown.Button>
              <Dropdown.Menu aria-label="Static Actions">
                <Dropdown.Item key="new">New file</Dropdown.Item>
                <Dropdown.Item key="copy">Copy link</Dropdown.Item>
                <Dropdown.Item key="edit">Edit file</Dropdown.Item>
                <Dropdown.Item key="delete" withDivider color="error">
                  Delete file
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <div>
            <Dropdown placement="bottom-right ">
              <Dropdown.Button
                className="p-0 "
                style={{
                  background: "transparent",
                }}
              >
                <Badge color="error" content={0} className="mr-2">
                  <BellIcon
                    className=" fill-none  stroke-black w-6  cursor-pointer "
                    style={{
                      background: "transparent",
                    }}
                  />
                </Badge>
              </Dropdown.Button>
              <Dropdown.Menu aria-label="Static Actions">
                <Dropdown.Item key="new">
                  <p>hello</p>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
        {user && (
          <div className="flex items-center mr-2">
            <p className="h-8 bg-slate-300 w-1 rounded mx-4 opacity-50  ml-5"></p>
            <Menu
              // menu styles
              menuStyle={{
                borderRadius: "0.5rem",
                marginTop: "0.6rem",
                marginRight: "0.5rem",
              }}
              menuButton={
                <MenuButton className="flex items-center  cursor-pointer">
                  <Avatar
                    src={`https://eu.ui-avatars.com/api/?name=${user.Username}&size=300`}
                    // name={user.Username}
                    className="cursor-pointer"
                  />
                  {/* <p className="mx-2 font-semibold text-sm">
                    {user && user.Username}
                  </p> */}
                  <ChevronDownIcon className="w-4 ml-2" />
                </MenuButton>
              }
              transition
            >
              <MenuItem className="flex items-end h-8 ">
                <UserCircleIcon className="w-5 mr-5 self-start" />
                <p className="self-start"> Profile</p>
              </MenuItem>
              <MenuItem className="flex items-end h-8 pt-3 ">
                <ArrowRightOnRectangleIcon className="w-5 mr-5 self-start" />
                <p className="self-start"> logout</p>
              </MenuItem>
              <MenuItem className="flex items-end h-8 pt-3 " disabled>
                <CogIcon className="w-5 mr-5 self-start" />
                <p className="self-start">V 1.0.0</p>
              </MenuItem>
            </Menu>
          </div>
        )}
        {/* <button className=" hidden md:block bg-btnColor px-10 py-2 rounded-xl text-white font-semibold  mx-2 ml-10 ">
            Open your wardrobe
          </button> */}
      </section>
    </nav>
  );
};

export default Navbar;
