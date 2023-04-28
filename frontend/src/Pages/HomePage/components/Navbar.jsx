import { Avatar, User } from "@nextui-org/react";
import React, { useContext } from "react";
import { AuthContext } from "../../AuthPage/context/AuthContext";
import {
  ChevronDownIcon,
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
  CogIcon,
} from "@heroicons/react/24/solid";
import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
const Navbar = () => {
  const { user } = useContext(AuthContext);
  console.log(user);
  return (
    <nav className="flex flex-col lg:flex-row lg:mt-4   lg:justify-between ">
      <section className="flex  justify-between w-full mt-2 border-b-2 pb-3 items-center">
        <div className="LogoFont text-2xl  opacity-70">closetly</div>
        <section className="flex justify-between">
          {user && (
            <Menu
              menuButton={
                <MenuButton>
                  <Avatar
                    src={`https://eu.ui-avatars.com/api/?name=${user.Username}&size=300`}
                    // name={user.Username}
                    // className="h-10"
                  />
                  {/* <p className="mx-2 font-semibold text-sm">
                    {user && user.Username}
                  </p> */}
                  {/* <ChevronDownIcon className="w-4 " /> */}
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
          )}
          <button className=" hidden md:block bg-btnColor px-10 py-2 rounded-xl text-white font-semibold  mx-2 ml-10 ">
            Open your wardrobe
          </button>
        </section>
      </section>
    </nav>
  );
};

export default Navbar;
